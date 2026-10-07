import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev
export default defineConfig({
    plugins: [react()],
    base: "./", // ВАЖНО: обеспечивает относительные пути в сборке для Яндекс Игр
});
