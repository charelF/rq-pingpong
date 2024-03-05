interface Player {
    name: string;
    rating: number;
}
type Match = [string, string];
interface Env {
    DB: D1Database;
}
export const onRequest: PagesFunction<Env> = async (context) => {
    function compute_ELO(matches: Match[], initialRating: number = 1500, K: number = 32): Map<string, number> {
        let ratings: Map<string, number> = new Map()
        for (let match of matches.reverse()) {
            let [winner, loser] = match;
            if (!ratings.has(winner)) ratings.set(winner, initialRating);
            if (!ratings.has(loser)) ratings.set(loser, initialRating);
            let R_A = ratings.get(winner);
            let R_B = ratings.get(loser);
            let E_A = 1 / (1 + Math.pow(10, (R_B - R_A) / 400));
            let E_B = 1 - E_A;
            ratings.set(winner, R_A + K * (1 - E_A));
            ratings.set(loser, R_B - K * E_B);
        }
        return ratings
    }
    const db = context.env.DB
    // const stmt = db.prepare("SELECT * FROM games ORDER BY dt DESC LIMIT 10000")
    const stmt = db.prepare("SELECT * FROM games WHERE dt >= DATE('now', '-28 days') ORDER BY dt DESC LIMIT 10000")

    const { results } = await stmt.all()
    const matches: Match[] = results.map(item => [item.winner, item.loser])

    const playerStats: Record<string, { wins: number; losses: number }> = {};
    matches.forEach(([winner, loser]) => {
        // Update winner's stats
        if (!playerStats[winner]) {
            playerStats[winner] = { wins: 1, losses: 0 };
        } else {
            playerStats[winner].wins += 1;
        }

        // Update loser's stats
        if (!playerStats[loser]) {
            playerStats[loser] = { wins: 0, losses: 1 };
        } else {
            playerStats[loser].losses += 1;
        }
    });

    let eloRatings = Object.fromEntries(compute_ELO(matches));
    const eloList = Object.keys(eloRatings).map(key => {
        const score = Math.floor(eloRatings[key])
        const winpct = playerStats[key].wins / (playerStats[key].losses + playerStats[key].wins)
        return { username: key, score: score, winpct: winpct };
    }).sort((a, b) => b.score - a.score);

    return new Response(JSON.stringify(eloList))
}