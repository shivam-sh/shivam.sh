'use client';

export default function description(
  props: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
) {
  return (
    <q {...props}>
      Spectre is a website template for Next.js
      <br />
      focusing on accessibility and performance.
      <br />
      It is built to integrate with the Ghost CMS.
      <br />
      and is fully adaptable to your needs.
    </q>
  );
}
