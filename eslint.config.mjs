import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ["node_modules", "dist"],
    rules: {
      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
      "no-unused-expressions": "error",
      "no-undef": "error",
    },
    globals: {
      process: "readonly",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
