import tseslint from "typescript-eslint";
import baseConfig from "../../eslint.config.js";

export default tseslint.config(
  ...baseConfig,

  {
    rules: {
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
  }
);
