import tseslint from "typescript-eslint";
import baseConfig from "../../eslint.config.js";

export default tseslint.config(...baseConfig, {
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@fl/*"],
            message:
              "@fl/theme is a low level library, it should not import other @fl/* libraries",
          },
        ],
      },
    ],
  },
});
