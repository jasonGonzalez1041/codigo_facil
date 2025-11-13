// Configuración simplificada para Next.js 16 + ESLint 9
const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**", 
      "build/**",
      "next-env.d.ts",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts"
    ],
  },
];

export default eslintConfig;
