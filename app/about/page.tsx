import Link from 'next/link';

export const metadata = {
  title: 'About • Spectre',
  description: 'Spectre, a website template built to integrate with the Ghost CMS',
  openGraph: {
    siteName: 'Shivam Sh',
    title: 'About • Spectre',
    description: 'Spectre, a website template built to integrate with the Ghost CMS',
    url: (process.env.SITE_URL ?? process.env.VERCEL_URL) + '/about'
  }
};

export default function Page() {
  return (
    <div className="postContent">
      <p />
      <h2>Hey, I&apos;m Shivam 👋</h2>
      <p>
        I built Spectre to work as an engine for my own website, and decided to move it to its own
        repo so that I can use it as a template to work off of and improve for future sites.
      </p>
      <p>
        Feel free to take a look around the site, but if you&apos;d like to visit my personal site,
        you can find it at <Link href="https://shivam.sh">shivam.sh</Link>.
      </p>
      <p>
        I&apos;ve populated the posts and projects pages with some of my own content as
        placeholders.
      </p>
      <p>
        If you&apos;d like to get in touch, feel free to email me at{' '}
        <Link href="mailto:contact@shivam.sh">contact@shivam.sh</Link>.
      </p>
      <p>
        You can also find some of my work on <Link href="https://github.com/shivam-sh">Github</Link>{' '}
        and <Link href="https://linkedin.com/in/shivam-sh">LinkedIn</Link>.
      </p>
      <p>Thanks for dropping by!</p>

      <p className="endnote">
        If you find my work to be helpful and want to show your support, you can buy me a coffee{' '}
        <Link href="https://www.buymeacoffee.com/shivamsh">here</Link>.
      </p>
    </div>
  );
}
