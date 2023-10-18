export async function onRequestGet(context) {
    const db = context.env.DB
    const stmt = db.prepare("SELECT * FROM games")
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
    console.log(JSON.stringify(body))
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