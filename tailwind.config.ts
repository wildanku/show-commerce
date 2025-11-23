import type { Config } from "tailwindcss";

export default {
    content: [
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
        "./resources/js/**/*.ts",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
            },
        },
    },
    plugins: [],
} satisfies Config;
