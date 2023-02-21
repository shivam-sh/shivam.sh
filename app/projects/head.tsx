export default function Head() {
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;
  return (
    <>
      <title>Projects • Shivam Sh</title>
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content="Projects • Shivam Sh" />
      <meta property="og:url" content={`${siteURL}/projects`} />
      <meta property="og:description" content="A list of some of my projects • Shivam Sh" />
      <meta name="description" content="A list of some of my projects • Shivam Sh" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};
