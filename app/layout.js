import "./globals.css";
import "./fontawesome";

export const metadata = {
  title: "Mohaiminul Islam | Portfolio",
  description:
    "Portfolio of Mohaiminul Islam, a CS graduate and software developer focused on MERN stack, Django, and databases.",
};

const navItems = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grid min-h-screen grid-cols-1 bg-slate-900 font-sans text-white">
        <nav className="sticky top-0 z-50 grid grid-cols-1 items-center justify-center gap-4 border-2 border-amber-400 bg-slate-900 px-4 py-5 text-amber-400 lg:grid-cols-[auto_1fr] lg:justify-between lg:px-16">
          <a
            className="mx-auto text-center text-3xl font-semibold hover:text-orange-600 lg:m-0 lg:text-left lg:text-5xl"
            href="#about"
          >
            MOHAIMINUL ISLAM
          </a>
          <ul className="grid grid-cols-5 items-center justify-center gap-2">
            {navItems.map((item) => (
              <li className="grid items-center justify-center" key={item}>
                <a
                  className="max-w-16 break-words text-center text-xs font-semibold leading-tight hover:text-orange-600 sm:max-w-none sm:text-xl"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
