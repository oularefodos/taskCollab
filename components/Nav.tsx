"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogIn, Menu, UserPlus2 } from "lucide-react";
import UserManagementPopUp from "./UserManagementPopUp";
import { useSession } from "next-auth/react";
import Slider from "../app/(protected)/organizations/(components)/Slider";
import { SheetContent, SheetTrigger, Sheet } from "./ui/sheet";

/**
 * TODO mobile nav bar
 */
const Nav = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="flex backdrop-blur-sm bg-slate-200/30 items-center justify-between py-4 px-11">
      <div className="hidden sm:block uppercase text-xl">
        <Link href="/">
          Task<span className="text-blue-400">Collab</span>
        </Link>
      </div>
      <div className="block md:hidden uppercase text-xl">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="mt-11">
              <Slider screenType="mobile" />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {status !== "loading" &&
        (session?.user ? (
          <div className="flex items-center gap-x-5">
            <UserManagementPopUp />
          </div>
        ) : (
          <div className="flex items-center gap-x-5">
            <Link href="/signin">
              <Button className="border border-black flex items-center gap-x-2 text-black hover:text-white bg-slate-100">
                {" "}
                <LogIn /> Signin
              </Button>
            </Link>
            <Link href="/signup">
              <Button className=" flex items-center gap-x-2 bg-black text-white">
                {" "}
                <UserPlus2 /> Signup
              </Button>
            </Link>
          </div>
        ))}
    </nav>
  );
};

export default Nav;
