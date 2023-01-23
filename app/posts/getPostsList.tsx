"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const GetPostsList: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://strapi.jahz.xyz/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            posts {
              data {
                attributes {
                  title
                  slug
                  excerpt
                  content
                  featured_image {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data.posts.data);
      });
  }, []);

  return (
    <div>
      {posts.map((post:any) => (
        <div key={post.attributes.slug}>
          <h2>{post.attributes.title}</h2>
          <p>{post.attributes.excerpt}</p>
          <img src={post.attributes.featured_image.data.attributes.url} alt={post.attributes.title} />
          <Link href={`/posts/${post.attributes.slug}`} >Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default GetPostsList;
