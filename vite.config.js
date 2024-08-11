import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["Option"].includes(tag),
        },
      },
    }),
  ],
  server: {
    port: 3001,
  },
});
