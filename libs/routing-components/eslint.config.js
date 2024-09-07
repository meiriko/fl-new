import tseslint from "typescript-eslint";
import baseConfig, { mergeImportRestriction } from "../../eslint.config.js";

const result = tseslint.config(...baseConfig, {
  rules: {
    "no-restricted-imports": [
      "error",
      mergeImportRestriction(baseConfig, {
        patterns: [
          {
            group: ["@fl/*"],
            message:
              "@fl/routing-components is a low level library, it should not import other @fl/* libraries",
          },
        ],
      }),
    ],
  },
});

export default result;
