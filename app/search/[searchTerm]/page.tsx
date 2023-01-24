import Link from "next/link";
import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

const search = async (searchTerm: string) => {
  const res = await fetch(`${process.env.API_ENDPOINT}/posts?filters[title][$contains]=${searchTerm}&populate=*`);
  const data:any = await res.json();
  return data;
};

async function SearchResults({ params: { searchTerm } }: PageProps) {
    const searchResults = await search(searchTerm);
    console.log(searchResults)
    return (
      <>
        <div className="container mx-auto my-20">
        <p className="text-gray-500 text-lg mb-5">You searched for: {searchTerm}</p>
        <ul>
        {searchResults.data.map((results:any)=>{
            console.log(searchResults)
          return (
            <>
              <li key={results.attributes.id} className="bg-white p-2 mb-2 border border-zinc-800 rounded-md">
                <Link href={`/posts/${results.attributes.slug }`} className="font-bold">
                    <span dangerouslySetInnerHTML={{__html:results.attributes.title}} ></span>
                </Link>
              </li>
            </>
          );
        })}
        </ul>
        </div>
      </>
    );
  }

export default SearchResults;