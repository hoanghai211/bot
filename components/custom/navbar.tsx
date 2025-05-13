import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/app/(auth)/auth";
import { History } from "./history";
import { SlashIcon, MessageIcon, UserIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="text-gray-600 dark:text-gray-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

export const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm shadow-md z-40 transition-colors duration-500">
      <div className="max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* History Button */}
          <History user={session?.user} className="hover:scale-105 transform transition" />

          {/* GetApp CTA */}
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-transform duration-200 hover:scale-105"
          >
            <PhoneIcon />
            GetApp
          </Button>

          {/* Additional icons (upgraded) */}
          <Link href="/slash" passHref>
            <a className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <SlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </a>
          </Link>
          <Link href="/messages" passHref>
            <a className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <MessageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {/* Example badge */}
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                3
              </span>
            </a>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User / Login */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <UserIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 p-1">
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full block">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                    className="w-full"
                  >
                    <button
                      type="submit"
                      className="w-full text-left text-red-500"
                    >
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
