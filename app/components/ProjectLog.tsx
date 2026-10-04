import EntryDate from 'app/components/EntryDate';
import { fetchProjectLog } from 'app/lib/server/ghostData';
import Link from 'next/link';

// Write-ups linked to a project via the `#project-<slug>` internal tag in Ghost
export default async function ProjectLog({ slug }: { slug: string }) {
  const entries = await fetchProjectLog(slug);
  if (entries.length === 0) return null;

  return (
    <section className="projectLog" aria-labelledby="project-log">
      <h4 id="project-log">Log</h4>
      <ol>
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Link href={entry.url} className="logEntry">
              <h5 className="logTitle">
                <span className="accent">{'// '}</span>
                {entry.title}
              </h5>
              <p className="footnote logDate">
                [<EntryDate date={entry.publishedAt} />]
              </p>
              {entry.excerpt ? <q className="logExcerpt">{entry.excerpt}</q> : null}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
