export async function getPostsMetadata() {
  const postData = await fetch(`${process.env.CDN_URL}/blog-posts.json`)
    .then((res) => res.json())
    .then((data) => data.posts);

  return postData;
}
