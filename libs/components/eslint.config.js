import tseslint from "typescript-eslint";
import baseConfig, { mergeImportRestriction } from "../../eslint.config.js";

export default tseslint.config(
  ...baseConfig,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        mergeImportRestriction(baseConfig, {
          patterns: [
            {
              group: ["@fl/*"],
              message:
                "@fl/components is a low level library, it should not import other @fl/* libraries",
            },
          ],
        }),
      ],
    },
  },
  {
    files: ["**/{stories,.storybook}/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-restricted-imports": "off",
    },
  }
);
