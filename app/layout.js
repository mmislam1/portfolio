import Link from "next/link";
import "./globals.css";
import "./fontawesome";
import { getPortfolioData } from "@/lib/portfolioDb";
import { getVisibleNavItems, hasText } from "@/lib/portfolioVisibility";
import { seoKeywords, siteDescription, siteTitle, siteUrl } from "@/lib/seo";
import { getSiteThemeStyle, normalizeSiteColors } from "@/lib/siteTheme";

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

export async function generateViewport() {
  const data = await getPortfolioData();
  const colors = normalizeSiteColors(data.theme?.colors);

  return {
    colorScheme: "dark",
    themeColor: colors.background,
  };
}

export default async function RootLayout({ children }) {
  const data = await getPortfolioData();
  const navItems = getVisibleNavItems(data);
  const brandName = hasText(data.profile?.name) ? data.profile.name : "Portfolio";
  const brandHref = navItems[0]?.href || "/";
  const themeStyle = getSiteThemeStyle(data.theme);

  return (
    <html lang="en">
      <body
        className="grid min-h-screen grid-cols-1 bg-site-bg text-site-text"
        style={themeStyle}
      >
        <nav className="sticky top-0 z-50 flex flex-col items-center justify-center gap-2 border border-site-accent bg-site-bg px-5 py-2 text-site-accent sm:gap-5 sm:px-8 sm:py-6 lg:flex-row lg:justify-between lg:px-24">
          <Link
            className="motion-action inline-flex min-h-10 items-center justify-center text-center text-3xl font-light uppercase leading-none hover:text-site-hover lg:min-h-12 lg:justify-start lg:text-5xl"
            href={brandHref}
          >
            {brandName}
          </Link>
          {navItems.length > 0 && (
            <ul className="flex w-full flex-nowrap items-center justify-between gap-x-3 gap-y-2 sm:w-auto sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-4 lg:justify-end lg:gap-x-14">
              {navItems.map((item) => (
                <li
                  className="grid items-center justify-center"
                  key={item.label}
                >
                  <Link
                    className="motion-action inline-flex min-h-7 items-center justify-center whitespace-nowrap text-center text-[15px] font-light uppercase leading-none tracking-normal hover:text-site-hover sm:min-h-9 sm:text-xl sm:tracking-wide"
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
