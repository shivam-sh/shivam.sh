export default async function Head({ params }) {
  const metadata = await getMetadata(params);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;
  return (
    <>
      <title>{metadata.title}</title>
      <meta property="og:url" content={`${siteURL}${metadata.url}`} />
      <meta property="og:image" content={`${metadata.image}`} />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta name="description" content={metadata.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

async function getMetadata({ project }) {
  const metadata = await fetch(
    `${process.env.CDN_URL}/projects/${project}/data.json`,
    { next: { revalidate: 3600 } }
  )
    .then((res) => res.json())
    .catch(() => {
      return {
        title: 'Project not found',
        description: 'The project you are looking for does not exist',
        image: '',
      };
    });

  return metadata;
}
