export async function onRequestGet(context) {
    const { searchParams } = new URL(context.request.url)
    const amount = searchParams.get('limit') ?? 20
    const db = context.env.DB
    const stmt = db.prepare("SELECT * FROM games ORDER BY dt DESC LIMIT ?").bind(amount)
    const { results } = await stmt.all()
    return new Response(JSON.stringify(results), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function onRequestPost(context) {
    const body = await context.request.json()
    const { winner, loser } = body
    if (winner == loser) {
        return new Response("Winner cant be the same as loser", { status: 400 })
    }
    const db = context.env.DB
    try {
        const stmt = db.prepare("INSERT INTO games (winner, loser) VALUES (?1, ?2)").bind(winner, loser)
        const { success } = await stmt.run()
        return new Response(JSON.stringify(success), {
            headers: {
                "Content-Type": "application/json",
            },
        })
    } catch (e) {
        return new Response(e.message, { status: 400 })
    }
}