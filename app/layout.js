
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./globals.css";
import FontAwesomeConfig from "./fontawesome";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <FontAwesomeConfig/>
      </head>
      <title>MM</title>
      <body className="grid grid-cols-1 bg-slate-500 font-sans text-white bg-slate-900">
        <nav className="grid grid-cols-1 grid-rows-2 items-center justify-center px-15 border-solid border-2 border-amber-400 text-amber-400 lg:grid-cols-2 lg:grid-rows-1 lg:justify-between lg:p-6 lg:px-16">
          <h3 className=" text-4xl mx-auto lg:text-5xl lg:m-0">MOHAIMINUL ISLAM</h3>
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center">
            <ul className="grid grid-cols-4 items-center justify-center">
              <li className="grid grid-cols-1 items-center justify-center mx-auto">
                <a href="#about" className="text-xl hover:text-orange-600 font-semibold">About</a>
              </li>
              <li className="grid grid-cols-1 items-center justify-center mx-auto">
                <a href="#skills" className="text-xl hover:text-orange-600 font-semibold">Skills</a>
              </li>
              <li className="grid grid-cols-1 items-center justify-center mx-auto">
                <a href="#projects" className="text-xl hover:text-orange-600 font-semibold">Projects</a>
              </li>
              <li className="grid grid-cols-1 items-center justify-center mx-auto">
                <a href="#contact" className="text-xl hover:text-orange-600 font-semibold">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
