# MOMENCE TEST APP

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.

* API URL: ( https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt> )https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt>

* Documentation: ( https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/> )https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/>

2. Parses the downloaded data and clearly displays a list to the user in the UI.

3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.

4. Commit your code throughout your work and upload the resulting codebase into a Github repo.

5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
6. Add automated tests which might be appropriate to ensure that your solution is working correctly.

7. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.


Please submit here:

https://app5.greenhouse.io/tests/b3e7d297525cf65a93d660743751de05?utm_medium=email&utm_source=TakeHomeTest>


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
