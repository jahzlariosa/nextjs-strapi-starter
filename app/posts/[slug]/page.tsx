import React from 'react'
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    slug: string;
  };
};

const fetchPostSingle = async (slug: string) => {
  const res =  await fetch(`${process.env.API_ENDPOINT}/posts?filters[slug][$eq]=${slug}&populate=*`, {next: {revalidate: 20}})
  if (!res.ok) {
    console.error(`Error: ${res.status} ${res.statusText}`);
    throw new Error(res.statusText);
  }
  return res.json();
};

async function SlugPage({ params: { slug } }: PageProps) {
  const post = await fetchPostSingle(slug);
  if (!post) return notFound();
  console.log(post)
  return (
    <div>
      {post?.data.map((post:any) => (
            <div key={post.id} className='mb-10'>
              {post.attributes.title}
              <p dangerouslySetInnerHTML={{ __html: post.attributes.content }}></p>
            </div>
        ))}
    </div>
  )
}

export default SlugPage