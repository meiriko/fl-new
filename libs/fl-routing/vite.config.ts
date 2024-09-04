// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import { resolve } from "path";
// import dts from "vite-plugin-dts";
// import { peerDependencies } from "./package.json";

// export default defineConfig({
//   plugins: [react(), dts({ include: ["lib"] })],
//   build: {
//     copyPublicDir: false,
//     lib: {
//       entry: resolve(__dirname, "lib/main.ts"),
//       name: "fl-routing",
//       formats: ["cjs", "es"],
//     },
//     rollupOptions: {
//       external: [...Object.keys(peerDependencies)],
//     },
//     sourcemap: true,
//   },
// });

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: "./lib/main.ts",
      name: "fl-routing",
      fileName: (format) => `index.${format}.js`,
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts({ include: ["lib"] })],
});
