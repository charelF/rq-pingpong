# 🏓 Riskquest Ping Pong App 🏓

![Screenshot 2023-10-19 at 18 48 00](https://github.com/charelF/rq-pingpong/assets/29770094/e5cb0483-16f1-488e-b451-c89f9015e063)

## Local testing

`npx wrangler pages dev public --d1=DB`

## D1 setup

Production:
- `npx wrangler d1 execute riskquest-pingpong --file schemas/init.sql`

Local:
- `npx wrangler d1 execute riskquest-pingpong --local --file schemas/init.sql`
- `npx wrangler d1 execute riskquest-pingpong --local --file schemas/dummy.sql`
