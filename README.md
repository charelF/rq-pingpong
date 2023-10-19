```
npx wrangler d1 execute riskquest-pingpong --local --file schemas/init.sql
npx wrangler d1 execute riskquest-pingpong --local --file schemas/dummy.sql
```

```
npx wrangler d1 execute riskquest-pingpong --file schemas/init.sql
npx wrangler d1 execute riskquest-pingpong --file schemas/dummy.sql
```


Start:

```
npx wrangler pages dev public --d1=DB
```


to get ts support (https://developers.cloudflare.com/pages/platform/functions/typescript/):
- npm install --save-dev typescript @cloudflare/workers-types
