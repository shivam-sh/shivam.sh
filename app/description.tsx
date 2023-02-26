import useWindowSize from 'layout/useWindowSize';

export default function description(props) {
  const size = useWindowSize();
  return (
    <q {...props}>
      I’m a Systems Design Engineering{' '}
      {optionalBreakpoint(
        () => (size.width ?? 0) > 500 || size.width === undefined
      )}
      student at the University of Waterloo{' '}
      {optionalBreakpoint(
        () => (size.width ?? 0) > 500 || size.width === undefined
      )}
      I like exploring and creating with tech{' '}
      {optionalBreakpoint(
        () => (size.width ?? 0) > 500 || size.width === undefined
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
