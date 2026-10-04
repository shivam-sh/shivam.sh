import 'styles/globals.scss';
import 'styles/highlight.scss';
import { Inter } from '@next/font/google';
import Navbar from './navbar';

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className={'container'}>
          <Navbar />
          <div className={'content'}>{children}</div>
        </div>
      </body>
    </html>
  );
}
