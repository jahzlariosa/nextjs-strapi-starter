import Link from 'next/link';
import React from 'react'

async function fetchPosts(){
    const res =  await fetch(`${process.env.API_ENDPOINT}/posts?populate=*`, {next: {revalidate: 20}})
    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        throw new Error(res.statusText);
      }
    return res.json();
}

async function GetPosts() {
const postList = await fetchPosts();
console.log(postList)
  return (
    <div>
        {postList?.data.map((post:any) => (
            <div key={post.id} className='mb-10'>
              {post.attributes.title}
              <p dangerouslySetInnerHTML={{ __html: post.attributes.content }}></p>
              <Link href={`/posts/${post.attributes.slug}`}>Read More</Link>
            </div>
        ))}
    </div>
  )
}

export default GetPosts