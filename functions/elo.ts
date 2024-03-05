interface Player {
    name: string;
    rating: number;
}
type Match = [string, string, Date];
interface Env {
    DB: D1Database;
}

function weeksAgo(dateToCheck: Date): number {
    const currentDate = new Date();
    const millisecondsPerWeek = 7 * 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = currentDate.getTime() - dateToCheck.getTime();
    return Math.floor(differenceInMilliseconds / millisecondsPerWeek);
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
    const stmt = db.prepare("SELECT * FROM games ORDER BY dt DESC LIMIT 10000")
    // const stmt = db.prepare("SELECT * FROM games WHERE dt >= DATE('now', '-28 days') ORDER BY dt DESC LIMIT 10000")

    const { results } = await stmt.all()
    const matches: Match[] = results.map(item => [item.winner, item.loser, item.dt])

    const playerStats: Record<string, { wins: number; losses: number; mostRecentGame: Date }> = {};
    matches.forEach(([winner, loser, date]) => {
        // Update winner's stats
        if (!playerStats[winner]) {
            playerStats[winner] = { wins: 1, losses: 0, mostRecentGame: new Date(date) };
        } else {
            playerStats[winner].wins += 1;
        }

        // Update loser's stats
        if (!playerStats[loser]) {
            playerStats[loser] = { wins: 0, losses: 1, mostRecentGame: new Date(date) };
        } else {
            playerStats[loser].losses += 1;
        }
    });

    let eloRatings = Object.fromEntries(compute_ELO(matches));
    const eloList = Object.keys(eloRatings).map(key => {
        const score = Math.floor(eloRatings[key])
        const winpct = playerStats[key].wins / (playerStats[key].losses + playerStats[key].wins)
        const date = playerStats[key].mostRecentGame
        const weeks = weeksAgo(date)
        const opacity =
            (weeks <= 1) ? 1 :
                (weeks <= 2) ? 0.8 :
                    (weeks <= 3) ? 0.6 :
                        (weeks <= 4) ? 0.4 :
                            (weeks <= 5) ? 0.2 :
                                0.1
        return { username: key, score: score, winpct: winpct, opacity: opacity };
    }).sort((a, b) => b.score - a.score);
    return new Response(JSON.stringify(eloList))
}