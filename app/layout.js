import Link from "next/link";
import "./globals.css";
import "./fontawesome";

export const metadata = {
  title: "Mohaiminul Islam | Portfolio",
  description:
    "Portfolio of Mohaiminul Islam, a CS graduate and software developer focused on MERN stack, Django, and databases.",
};

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "Edit", href: "/admin" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid min-h-screen grid-cols-1 bg-slate-900 font-sans text-white">
        <nav className="sticky top-0 z-50 grid grid-cols-1 items-center justify-center gap-4 border-2 border-amber-400 bg-slate-900 px-4 py-5 text-amber-400 lg:grid-cols-[auto_1fr] lg:justify-between lg:px-16">
          <Link
            className="mx-auto text-center text-3xl font-semibold hover:text-orange-600 lg:m-0 lg:text-left lg:text-5xl"
            href="/#about"
          >
            MOHAIMINUL ISLAM
          </Link>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-end">
            {navItems.map((item) => (
              <li className="grid items-center justify-center" key={item.label}>
                <Link
                  className="text-center text-sm font-semibold leading-tight hover:text-orange-600 sm:text-xl"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
