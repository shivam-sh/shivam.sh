import Link from 'next/link';
import styles from 'styles/Post.module.scss';

export default function About() {
  return (
    <div className={styles.postContent}>
      <p />
      <h5>Hey, I'm Shivam 👋</h5>
      <p>
        I built this website to showcase some of my projects, explorations, and
        experiences. I love pushing the boundaries with technology, design, and
        interactions to uncover innovative solutions and creative designs.
        <br />
        This lets me learn about the creative design of the hardware and
        software we interact with, while learning new things along the way.
      </p>
      <p>
        If you'd like to get in touch, feel free to email me at{' '}
        <Link href="mailto:contact@shivam.sh">contact@shivam.sh</Link>.
      </p>
      <p>
        In case you want to know more about my work & experience, you can find
        my resume <Link href="/resume.pdf">here</Link>.
      </p>
      <p>
        You can also find some of my work on{' '}
        <Link href="https://github.com/shivam-sh">Github</Link> and{' '}
        <Link href="https://linkedin.com/in/shivam-sh">LinkedIn</Link>.
      </p>
      <p>
        I'd love to hear your thoughts on my projects, or chat about anything
        that interests you. Whether it's related to technology, design, or
        something completely different, feel free to connect with me on LinkedIn
        or drop me an email.
      </p>
      <p>Thanks for dropping by!</p>

      <p className="endnote">
        If you find my work to be helpful and want to show your support, you can
        buy me a coffee{' '}
        <Link href="https://www.buymeacoffee.com/shivamsh">here</Link>.
      </p>
    </div>
  );
}
