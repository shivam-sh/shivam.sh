export default function Head() {
  return (
    <>
      <title>Shivam Sh</title>
      <meta property="og:url" content={`https://${process.env.SITE_URL}`} />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content="Homepage • Shivam Sh" />
      <meta
        property="og:description"
        content="I'm a Systems Design Engineering student at the University of Waterloo I like exploring a variety of technologiesand sometimes I post about them here"
      />
      <meta name="description" content="Shivam Sharma's personal site" />
      <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
