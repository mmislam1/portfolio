import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", ".next-build/**", ".next-dev/**", "node_modules/**"],
  },
  ...nextVitals,
];

export default eslintConfig;
