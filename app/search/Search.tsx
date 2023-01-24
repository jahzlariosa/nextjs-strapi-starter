"use client"
import {useRouter} from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import {FaSearchengin} from 'react-icons/fa'


function Search() {
  const [search,setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={search}
        placeholder="Enter the Search term"
        className='p-2 border border-gray-300 rounded-md rounded-r-none border-r-0 ring-inset'
        onChange={(e)=>setSearch(e.target.value)}>
      </input>
      <button type="submit" className='btn bg-slate-900 p-2 rounded-md text-white hover:bg-indigo-700 transition-colors rounded-l-none border border-gray-300'>
          <FaSearchengin size={20} className='inline-block'/>
      </button>
    </form>
  )
}

export default Search