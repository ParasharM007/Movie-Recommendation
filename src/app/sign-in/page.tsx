"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   const router = useRouter()

  const handleCredentialsLogin = async () => {
    setLoading(true);

   try {
     const res= await signIn("credentials", {
       email,
       password,
        // redirect: false
       redirect: true,
       callbackUrl: "/post-auth",
     });
     console.log(res)
      if (res?.ok) {
    toast("Login Successful");
    router.replace("/genres-selection");
  }
   } catch (error) {
    
   }
   finally{

     setLoading(false);
   }

  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-black border border-gray-500 rounded-2xl shadow-lg p-8">
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Sign in to your account
        </h1>
        <p className="text-center  text-white mb-6">
          Welcome back 👋
        </p>

       
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
          <button
            onClick={handleCredentialsLogin}
            disabled={loading}
            className="w-full cursor-pointer bg-black text- font-medium text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <p className="text-center text-sm text-gray-100 ">
          <Link href="/send-code" className="text-gray-400 font-medium">
            forget password?{" "}
          </Link>
        </p>
        </div>

     
      <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-white" />
            <span className="px-4 text-sm text-gray-200">OR</span>
            <div className="flex-1 h-px bg-white" />
          </div>


        <div className="space-y-3">
          <button
            onClick={() => signIn("google",{callbackUrl: "/post-auth"})}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg cursor-pointer text-white hover:bg-gray-50 hover:text-black transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("discord",{callbackUrl: "/post-auth"})}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg cursor-pointer text-white hover:bg-gray-50 hover:text-black transition"
          >
            <img
              src="https://www.svgrepo.com/show/353655/discord-icon.svg"
              alt="Discord"
              className="w-5 h-5"
            />
            Continue with Discord
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-100 mt-6">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-purple-400 font-medium">
            Sign up
          </Link>
        </p>
        
      </div>
    </div>
  );
}
