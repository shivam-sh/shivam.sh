export default function Head() {
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;
  return (
    <>
      <title>Blog • Shivam Sh</title>
      <meta
        property="og:url"
        content={`https://${siteURL}/blog`}
      />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content="Blog • Shivam Sh" />
      <meta
        property="og:description"
        content="Some blog posts about topics that are on my mind • Shivam Sh"
      />
      <meta
        name="description"
        content="Some blog posts about topics that are on my mind • Shivam Sh"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
