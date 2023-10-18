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