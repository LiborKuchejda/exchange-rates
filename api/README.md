# Why

It is API to wrap CNB daily rates

[daily.txt]( https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt )

> Because CORS 
> and why not to convert it to JSON and ISO date 


# Development

```
npm install
npm run dev
```

To check it and get daily rates:

```
curl localhost:3001/api/rates/daily
```

# Testing

Tests use [Vitest](https://vitest.dev) and mock `fetch`, so no network is needed.

```
npm test        # run once
npm run test:watch   # watch mode
```

