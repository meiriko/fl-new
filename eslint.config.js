import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import _ from "lodash";

function getRulesByName(configs, ruleName) {
  const getRuleForKey = _.ary(_.curryRight(_.get, 2)(`rules.${ruleName}`), 1);
  const entries = _.compact(_.map(configs, getRuleForKey));
  return _.find(_.flatten(entries), _.negate(_.isString));
}

function mergeArrays(a1, a2) {
  return _.compact(_.flatten([a1, a2]));
}

export function mergeImportRestriction(configs, addedImportRestrictions) {
  const existingImportRestrictions = getRulesByName(
    configs,
    "no-restricted-imports",
  );
  return _.mergeWith(
    existingImportRestrictions,
    addedImportRestrictions,
    mergeArrays,
  );
}

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          caughtErrors: "all",
          ignoreRestSiblings: false,
          reportUsedIgnorePattern: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["libs/*"],
              message: "Do not import from libs/* directly, use @fl/* instead",
            },
          ],
        },
      ],
    },
  },
);
