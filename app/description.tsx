'use client';

import useWindowSize from 'app/custom/useWindowSize';

export default function description(
  props: React.DetailedHTMLProps<
    React.QuoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >
) {
  const window = useWindowSize({ defaultSize: { width: 501, height: 501 } });

  return (
    <q {...props}>
      I’m a Systems Design Engineering{' '}
      {optionalBreakpoint(
        () => (window.width ?? 0) > 500 || window.width === undefined
      )}
      student at the University of Waterloo{' '}
      {optionalBreakpoint(
        () => (window.width ?? 0) > 500 || window.width === undefined
      )}
      I like exploring and creating with tech{' '}
      {optionalBreakpoint(
        () => (window.width ?? 0) > 500 || window.width === undefined
      )}
      and sometimes I post about it here
    </q>
  );
}

function optionalBreakpoint(expression: () => boolean) {
  if (expression()) {
    return <br />;
  }
}
