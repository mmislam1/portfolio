import Link from "next/link";
import "./globals.css";
import "./fontawesome";
import { getPortfolioData } from "@/lib/portfolioDb";
import { getVisibleNavItems, hasText } from "@/lib/portfolioVisibility";

export const metadata = {
  title: "Mohaiminul Islam | Portfolio",
  description:
    "Portfolio of Mohaiminul Islam, a CS graduate and software developer focused on MERN stack, Django, and databases.",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }) {
  const data = await getPortfolioData();
  const navItems = getVisibleNavItems(data);
  const brandName = hasText(data.profile?.name) ? data.profile.name : "Portfolio";
  const brandHref = navItems[0]?.href || "/";

  return (
    <html lang="en">
      <body className="grid min-h-screen grid-cols-1 bg-slate-900 font-sans text-white">
        <nav className="sticky top-0 z-50 grid grid-cols-1 items-center justify-center gap-4 border-2 border-amber-400 bg-slate-900 px-4 py-5 text-amber-400 lg:grid-cols-[auto_1fr] lg:justify-between lg:px-16">
          <Link
            className="motion-action mx-auto text-center text-3xl font-semibold hover:text-orange-600 lg:m-0 lg:text-left lg:text-5xl"
            href={brandHref}
          >
            {brandName}
          </Link>
          {navItems.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-end lg:gap-x-12">
              {navItems.map((item) => (
                <li
                  className="grid items-center justify-center"
                  key={item.label}
                >
                  <Link
                    className="motion-action text-center text-sm font-semibold leading-tight tracking-wide hover:text-orange-600 sm:text-xl"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
