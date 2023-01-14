import 'styles/globals.scss';
import 'styles/highlight.scss';
import Navbar from './navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className={'container'}>
          <Navbar />
          <div className={'content'}>{children}</div>
        </div>
      </body>
    </html>
  );
}

export const dynamicParams = false;
