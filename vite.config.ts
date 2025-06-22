import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/Grocery-App/",
  plugins: [react(), tsconfigPaths()],
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./public/index.html"
      }
    }
  },
});
