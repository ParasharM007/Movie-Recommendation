"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/",
    });

    router.push(data.url);
  };

  return (
    <div
      onClick={handleLogout}
      className="flex items-center gap-4 bg-red-600 hover:bg-red-700 p-4 rounded-xl cursor-pointer transition"
    >
      <LogOut size={22} />
      <span className="text-lg">Logout</span>
    </div>
  );
}