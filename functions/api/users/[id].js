export async function onRequestGet(context) {
    const id = context.params.id
    const db = context.env.DB
    const stmt = db.prepare("SELECT * FROM users WHERE username = ? LIMIT 1").bind(id)
    const result = await stmt.first()
    return new Response(JSON.stringify(result), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export async function onRequestPost(context) {
    const id = context.params.id
    const db = context.env.DB
    const stmt = db.prepare("INSERT INTO users (username) VALUES (?)").bind(id)
    const { success } = await stmt.run()
    return new Response(JSON.stringify(success), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}