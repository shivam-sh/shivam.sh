'use client';

export default function description(
  props: React.DetailedHTMLProps<React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>
) {
  return (
    <q {...props}>
      I’m a Systems Design Engineering
      <br />
      student at the University of Waterloo
      <br />
      I like exploring and creating with tech
      <br />
      and sometimes I post about it here
    </q>
  );
}
