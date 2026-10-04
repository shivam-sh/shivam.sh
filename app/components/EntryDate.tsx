import { format } from 'date-fns';

export default function EntryDate({ date }: { date: string }) {
  const parsed = new Date(date);
  return <time dateTime={parsed.toISOString()}>{format(parsed, 'MMM d, yyyy')}</time>;
}
