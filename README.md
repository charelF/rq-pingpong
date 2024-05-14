# 🏓 Riskquest Ping Pong App 🏓

![Screenshot 2023-10-19 at 18 48 00](https://github.com/charelF/rq-pingpong/assets/29770094/e5cb0483-16f1-488e-b451-c89f9015e063)

![Screenshot 2024-05-14 at 17 30 08](https://github.com/charelF/rq-pingpong/assets/116723764/543fa190-0c18-4ace-b798-f889959f00b6)


## Local testing

`npx wrangler pages dev public --d1=DB`
`npm run build-loop`  for tailwind

## D1 setup

Production:
- ` WARNING npx wrangler d1 execute riskquest-pingpong --file schemas/init.sql DANGER`

Local:
- `npx wrangler d1 execute riskquest-pingpong --local --file schemas/init.sql`
- `npx wrangler d1 execute riskquest-pingpong --local --file schemas/dummy.sql`
