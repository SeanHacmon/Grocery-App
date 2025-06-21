import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
  // Use environment variable or detect production build
  const basePath = process.env.VITE_BASE_PATH || (mode === 'production' ? "/Grocery-App/" : "/");
  
  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    base: basePath,
    build: {
      outDir: "build/client",
    },
  };
});