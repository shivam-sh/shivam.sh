import './globals.scss';
import './posts.scss';
import './highlight.scss';
import { AppContextController } from 'app/components/AppContextController';
import { Inter, Montserrat, Ubuntu_Mono } from 'next/font/google';
import Navbar from 'app/components/navbar';

export const metadata = {
  title: 'Shivam Sh',
  description: "Shivam Sh's Personal Website",
  metadataBase: new URL(process.env.SITE_URL ?? `https://${process.env.VERCEL_URL}/`),
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      type: 'image/x-icon'
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16'
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32'
    },
    {
      rel: 'icon',
      url: '/favicon-96x96.png',
      type: 'image/png'
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest'
    }
  ],
  openGraph: {
    siteName: 'Shivam Sh',
    title: 'Shivam Sh',
    description: "Shivam Sh's Personal Website",
    url: process.env.SITE_URL ?? process.env.VERCEL_URL
  }
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  variable: '--font-ubuntu-mono',
  weight: ['400']
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} ${montserrat.variable} ${ubuntuMono.variable}`}>
      <body>
        <AppContextController>
          <div className={'site'}>
            <a id={'skipLink'} href="#content" tabIndex={0}>
              Skip to Content
            </a>
            <Navbar />
            <main id={'content'}>{children}</main>
          </div>
        </AppContextController>
      </body>
    </html>
  );
}
