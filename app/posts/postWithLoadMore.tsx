"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

async function fetchPosts(page:any) {
    const res = await fetch(`${process.env.API_ENDPOINT}/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=1`, {next: {revalidate: 20}})
    if (!res.ok) {
        console.error(`Error: ${res.status} ${res.statusText}`);
        throw new Error(res.statusText);
    }
    return res.json();
}

function LoadMorePosts() {
    const [page, setPage] = useState(1);
    const [postList, setPostList] = useState<Array<any>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const postsPerPage = 1;

    async function loadMore() {
        setIsLoading(true);
        const newPosts = await fetchPosts(page);
        setPostList([...postList, ...newPosts.data]);
        setPage(page + 1);
        setIsLoading(false);

        if (newPosts.data.length < postsPerPage) {
            setIsButtonDisabled(true);
        }
    }

    useEffect(() => {
        loadMore();
    }, []);

    return (
        <div>
            {postList.map((post: any) => (
                <div key={post.id} className='my-10'>
                    {post.attributes.title}
                    <p dangerouslySetInnerHTML={{ __html: post.attributes.content }}></p>
                    <Link href={`/posts/${post.attributes.slug}`}>Read More</Link>
                </div>
            ))}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <button onClick={loadMore} disabled={isButtonDisabled}>Load More</button>
            )}
        </div>
    )
}

export default LoadMorePosts
