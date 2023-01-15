import '../styles/globals.scss';
import '../styles/highlight.scss';
import Navbar from './Navbar';

function RootLayout({ children }) {
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

export default RootLayout;

export const dynamicParams = false;
