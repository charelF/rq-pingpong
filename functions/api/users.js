export async function onRequestGet(context) {
    const db = context.env.DB
    const stmt = db.prepare("SELECT * FROM users")
    const { results } = await stmt.all()
    return new Response(JSON.stringify(results), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}