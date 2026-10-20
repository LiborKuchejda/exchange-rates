import { defineConfig } from 'orval';

export default defineConfig({
  rates: {
    input: {
      target: 'http://localhost:3001/docs/json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/api/gen/rates.ts',
      schemas: 'src/api/gen/models',
      client: 'fetch',
      mock: false,
      override: {
        fetch: { includeHttpResponseReturnType: false },
        mutator: { path: "./src/api/customFetch.ts", name: "customFetch" },
      },
    },
  },
});