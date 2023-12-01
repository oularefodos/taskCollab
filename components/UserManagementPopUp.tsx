"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { User, Settings, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const UserManagementPopUp = () => {
  const [isOpened, setIsOpened] = useState(false);
  const { data: session } = useSession();
  if (!session?.user) {
    return <div></div>;
  }
  const user = session.user;
  return (
    <div>
      <button onClick={() => setIsOpened(!isOpened)} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50">
        <User />
        <p>{user.email}</p>
      </button>
      <div className={` ${isOpened ? 'flex' : 'hidden'} h-auto hover:cursor-pointer py-4 px-6 flex-col items-start bg-white border w-auto absolute rounded right-4 top-[5rem]`}>
        <Link href="/params" className="flex items-center gap-2 p-2 border-b">
          {" "}
          <Settings /> <p>Settings</p>{" "}
        </Link>
        <Button className="flex items-center gap-2 p-1" onClick={() => signOut()}>
          <LogOut />
          <p>Disconnect</p>
        </Button>
      </div>
    </div>
  );
};

export default UserManagementPopUp;
