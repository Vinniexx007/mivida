import next from "eslint-config-next";

/**
 * eslint-config-next 16 ships a native flat config array, so we spread it
 * directly rather than going through FlatCompat (which breaks under ESLint 9).
 */
const eslintConfig = [
  ...next,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
];

export default eslintConfig;
