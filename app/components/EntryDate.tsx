import { differenceInDays, format } from 'date-fns';

// Edits within this window of publishing aren't worth calling out as an update
const MEANINGFUL_UPDATE_DAYS = 30;

export default function EntryDate({ date }: { date: string }) {
  const parsed = new Date(date);
  return <time dateTime={parsed.toISOString()}>{format(parsed, 'MMM d, yyyy')}</time>;
}

export function EntryDates({
  publishedAt,
  updatedAt
}: {
  publishedAt: string | null;
  updatedAt: string | null;
}) {
  if (!publishedAt) return null;
  const updated =
    updatedAt &&
    differenceInDays(new Date(updatedAt), new Date(publishedAt)) > MEANINGFUL_UPDATE_DAYS;

  return (
    <>
      <EntryDate date={publishedAt} />
      {updated ? (
        <>
          {' · Updated '}
          <EntryDate date={updatedAt} />
        </>
      ) : null}
    </>
  );
}
