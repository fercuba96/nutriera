import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "from/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
      main: resolve(__dirname, "from/index.html"),
      login: resolve(__dirname, "from/login/index.html"),
      register: resolve(__dirname, "from/register/index.html"),
      diet: resolve(__dirname, "from/diet/index.html"),
      dashboard: resolve(__dirname, "from/dashboard/index.html"),
      },
    },
  },
});
