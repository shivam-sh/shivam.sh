export async function getProjectsMetadata() {
  const metadata = await fetch(`${process.env.CDN_URL}/projects.json`)
    .then((res) => res.json())
    .then((data) => data.projects);

  return metadata;
}
