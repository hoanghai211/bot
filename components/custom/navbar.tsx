import Image from "next/image";
import Link from "next/link";

import { auth, signOut } from "@/app/(auth)/auth";

import { History } from "./history"; // Đảm bảo file history.tsx đã export History
import { SlashIcon, MessageIcon, UserIcon } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Icon cho nút GetApp
const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="4"
      fill="none"
      stroke="none"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

export const Navbar = async () => {
  let session = await auth();

  return (
    <>
      <div className="bg-gradient-to-r from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 backdrop-blur-md p-4 px-6 rounded-b-lg shadow-md flex justify-between items-center z-30">
        {/* Left Section */}
        <div className="flex flex-row gap-4 items-center">
          <History user={session?.user} />
          <Button
            variant="outline"
            className="py-1 px-4 h-fit font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 flex items-center justify-center gap-2 rounded-lg border-none shadow-lg"
          >
            <PhoneIcon />
            <span className="text-sm font-medium">GetApp</span>
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full shadow">
                  <UserIcon className="text-gray-600 dark:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-2"
              >
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2">
                  <ThemeToggle />
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md p-2">
                  <form
                    className="w-full"
                    action={async () => {
                      "use server";
                      await signOut({
                        redirectTo: "/",
                      });
                    }}
                  >
                    <button
                      type="submit"
                      className="w-full text-left text-red-500 hover:text-red-600"
                    >
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
