import { Ast } from 'app/components/asterism';
import Link from 'next/link';

export const metadata = {
  title: 'About • Shivam Sh',
  description: "Hey, I'm Shivam 👋",
  openGraph: {
    siteName: 'Shivam Sh',
    title: 'About • Shivam Sh',
    description: "Hey, I'm Shivam 👋",
    url: (process.env.SITE_URL ?? process.env.VERCEL_URL) + '/about'
  }
};

export default function Page() {
  return (
    <div className="postContent">
      <p />
      <h2>Hey, I&apos;m Shivam 👋</h2>
      <p>
        I built this website to showcase some of my projects, explorations, and experiences. I love
        pushing the boundaries with technology, design, and interactions to uncover innovative
        solutions and creative designs.
        <br />
        This lets me learn about the creative design of the hardware and software we interact with,
        while learning new things along the way.
      </p>
      <p>
        If you&apos;d like to get in touch, feel free to email me at{' '}
        <Link href="mailto:contact@shivam.sh">contact@shivam.sh</Link>.
      </p>
      <p>
        In case you want to know more about my work & experience, you can find my resume{' '}
        <Link href="/resume.pdf">here</Link>.
      </p>
      <p>
        You can also find some of my work on <Link href="https://github.com/shivam-sh">Github</Link>{' '}
        and <Link href="https://linkedin.com/in/shivam-sh">LinkedIn</Link>.
      </p>
      <p>
        I&apos;d love to hear your thoughts on my projects, or chat about anything that interests
        you. Whether it&apos;s related to technology, design, or something completely different,
        feel free to connect with me on LinkedIn or drop me an email.
      </p>
      <p>Thanks for dropping by!</p>

      <p className="endnote">
        If you find my work to be helpful and want to show your support, you can buy me a coffee{' '}
        <Link href="https://www.buymeacoffee.com/shivamsh">here</Link>.
      </p>

      <Link className='center' href="https://socratica.info"><Ast/></Link>
      </div>
  );
}
