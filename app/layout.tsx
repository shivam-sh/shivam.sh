import "styles/globals.scss";
import "styles/highlight.scss";
import { Inter, Montserrat, Ubuntu_Mono } from "@next/font/google";
import Navbar from "./navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: ["400"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${montserrat.variable} ${ubuntuMono.variable}`}
    >
      <body>
        <div className={"container"}>
          <a id={"skipLink"} href="#content">
            Skip to Content
          </a>
          <Navbar />
          <main id={"content"}>{children}</main>
        </div>
      </body>
    </html>
  );
}
