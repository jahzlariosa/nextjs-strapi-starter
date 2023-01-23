import Image from 'next/image';
import React from 'react';

interface Post {
  attributes:any;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: {
    data: any;
    url: string;
  };
}


type PageProps = {
  params: {
    slug: string;
  };
};

const fetchPostSingle = async (slug: string) => {
  const response = await fetch(process.env.GRAPHURL_ENDPOINT as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            posts(filters: { slug: { eq: "${slug}" } }) {
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
    });
    const json = await response.json();
    return json.data.posts.data[0].attributes as Post;
}

function notFound() {
  return <div>404 Not Found</div>;
}

async function SinglePostPage({ params: { slug } }: PageProps) {
  const post = await fetchPostSingle(slug);
  if (!post) return notFound();
  return (
    <>
      <h2 dangerouslySetInnerHTML={{ __html: post.title }} className="text-7xl text-center mb-20"></h2>
      {post && (
        <div>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
          <Image src={`https://${process.env.IMAGE_DOMAIN + post.featured_image.data.attributes.url}`} width={500} height={500} alt={post.title} />
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
      )}
    </>
  );
}

export default SinglePostPage;