"use client";
import { useState } from "react";
import Link from "next/link";
import Search from "@/app/search/Search";

const Logo = () =>  "LOGO"

const MenuLinks = () => {
  return (
    <>
      <Link href="/" className=" dark:text-white mr-3">
        <span className="dark:text-white">Home</span>
      </Link>
      <Link href="/blogs" className=" dark:text-white mr-3">
        <span className="dark:text-white">Blog</span>
      </Link>
    </>
  )
}

const MobileNav = ({ open, setOpen }:any) => {
  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen dark:bg-black bg-white transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md dark:bg-slate-900 h-20">
      {Logo()}   
      </div>
      <div className="flex flex-col ml-4">
        <MenuLinks />
      </div>
    </div>
  );
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
    <nav
      className="sticky top-0 z-50 flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center dark:bg-neutral-800"
    >
      <div className="container mx-auto  flex">
        <MobileNav open={open} setOpen={setOpen} />
        <div className="w-5/12 flex items-center">
          <Link href="/" className="text-xl font-semibold dark:text-white">          
             {Logo()}
          </Link>
        </div>
        <div className="w-9/12 flex justify-end items-center">
          <div
            className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden mr-3 "
            onClick={() => {
              setOpen(!open);
            }}
          >
            {/* hamburger button */}
            <span
              className={`h-1 w-full bg-black dark:bg-white rounded-lg transform transition duration-300 ease-in-out ${
                open ? "rotate-45 translate-y-3.5" : ""
              }`}
            />
            <span
              className={`h-1 w-full bg-black dark:bg-white  rounded-lg transition-all duration-300 ease-in-out ${
                open ? "w-0" : "w-full"
              }`}
            />
            <span
              className={`h-1 w-full bg-black dark:bg-white brounded-lg transform transition duration-300 ease-in-out ${
                open ? "-rotate-45 -translate-y-3.5" : ""
              }`}
            />
          </div>
          <div className="hidden md:flex">
            <MenuLinks />
          </div>
          <div className="hidden md:flex">
            <Search />
          </div>
        </div>
      </div>
    </nav>
    </>   
  );
}

export default Navigation