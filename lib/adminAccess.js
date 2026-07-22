export function isPortfolioAdminEnabled() {
  return (
    process.env.NODE_ENV !== "production" ||
    process.env.PORTFOLIO_ADMIN_ENABLED === "true"
  );
}
