"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Logo from "@/assets/logo.svg";
import { Wallet } from "../wallet";

declare const window: any;

const style = {
  wrapper: `max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`,
  logoContainer: `flex items-center space-x-3`,
  logoImage: `w-10 h-10 fill-white`,
  logoText: ` self-center text-2xl font-semibold whitespace-nowrap text-white`,
  headerItems: `flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 border-gray-700`,
  headerItem: `block py-2 px-3 rounded md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700 cursor-pointer`,
  HamburgerMenuIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointerinline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600`,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black border-b border-gray-600">
      <div className={style.wrapper}>
        <a href="https://app.nexusfi.xyz/" className={style.logoContainer}>
          <Logo className={style.logoImage} />
          <span className={style.logoText}>NexusFi</span>
        </a>
        <div className="flex md:order-2 space-x-1 md:space-x-0">
          <Wallet />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            onClick={toggleMenu}
            className={style.HamburgerMenuIcon}
            aria-controls="navbar-sticky"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${isMenuOpen && "bg-[#181818c5]"
            } w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"
            }`}
          id="navbar-sticky"
        >
          <div className={style.headerItems}>
            <div
              className={style.headerItem}
              onClick={() => {
                router.push("/");
              }}
            >
              Dashboard
            </div>

            <div
              className={style.headerItem}
              onClick={() => {
                router.push("/stake");
              }}
            >
              Stake
            </div>

            <div
              className={style.headerItem}
              onClick={() => {
                router.push("/restake");
              }}
            >
              Restake
            </div>
            {/* <div
              className={style.headerItem}
              onClick={() => {
                router.push("/operator");
              }}
            >
              Operator
            </div> */}
            <div
              className={style.headerItem}
              onClick={() => {
                router.push("/avs");
              }}
            >
              AVS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
