import Link from "next/link";
import "./globals.css";
import "./fontawesome";
import { getPortfolioData } from "@/lib/portfolioDb";
import { getVisibleNavItems, hasText } from "@/lib/portfolioVisibility";
import { seoKeywords, siteDescription, siteTitle, siteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Mohaiminul Islam Portfolio",
  title: {
    default: siteTitle,
    template: "%s | Mohaiminul Islam",
  },
  description: siteDescription,
  keywords: seoKeywords,
  authors: [{ name: "Mohaiminul Islam" }],
  creator: "Mohaiminul Islam",
  publisher: "Mohaiminul Islam",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Mohaiminul Islam Portfolio",
    images: [
      {
        url: "/mm.jpg",
        width: 300,
        height: 300,
        alt: "Mohaiminul Islam",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/mm.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
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
        <nav className="sticky top-0 z-50 flex flex-col items-center justify-center gap-3 border-2 border-amber-400 bg-slate-900 px-3 py-4 text-amber-400 sm:gap-5 sm:px-5 sm:py-6 lg:flex-row lg:justify-between lg:px-20">
          <Link
            className="motion-action inline-flex min-h-12 items-center justify-center text-center text-3xl font-light leading-none hover:text-orange-600 lg:justify-start lg:text-5xl"
            href={brandHref}
          >
            {brandName}
          </Link>
          {navItems.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-10 sm:gap-y-4 lg:justify-end lg:gap-x-14">
              {navItems.map((item) => (
                <li
                  className="grid items-center justify-center"
                  key={item.label}
                >
                  <Link
                    className="motion-action inline-flex min-h-8 items-center justify-center whitespace-nowrap text-center text-xs font-light leading-none tracking-wide hover:text-orange-600 sm:min-h-9 sm:text-xl"
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
