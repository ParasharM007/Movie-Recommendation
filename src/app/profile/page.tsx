

import { Film, Lock } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Your Profile</h1>
          <p className="text-gray-400 text-sm">Manage your account</p>
        </div>

        
        <div className="space-y-4">

          
          <Link
          href={`/profile/library`}
            
            className="flex items-center gap-4 bg-[#262626] hover:bg-[#333] p-4 rounded-xl cursor-pointer transition"
          >
            <Film size={22} />
            <span className="text-lg">Library</span>
          </Link>

          
          <Link
           href={`/profile/change-password`}            
            className="flex items-center gap-4 bg-[#262626] hover:bg-[#333] p-4 rounded-xl cursor-pointer transition"
          >
            <Lock size={22} />
            <span className="text-lg">Change Password</span>
          </Link>

          
          <LogoutButton />

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

// 'use client'
// import { Film, Lock, LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
// const ProfilePage = () => {
//   const router = useRouter()

//   const handleLogout =async() => {
//     const data = await signOut({redirect:false, callbackUrl:`/`})
//     router.push(data.url)
    
    
    
//   };

//   return (
//     <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-6">
        
        
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold">Your Profile</h1>
//           <p className="text-gray-400 text-sm">Manage your account</p>
//         </div>

        
//         <div className="space-y-4">

          
//           <div
//             onClick={() => router.push("/profile/library")}
//             className="flex items-center gap-4 bg-[#262626] hover:bg-[#333] p-4 rounded-xl cursor-pointer transition"
//           >
//             <Film size={22} />
//             <span className="text-lg">Library</span>
//           </div>

          
//           <div
//             onClick={() => router.push("/profile/change-password")}
//             className="flex items-center gap-4 bg-[#262626] hover:bg-[#333] p-4 rounded-xl cursor-pointer transition"
//           >
//             <Lock size={22} />
//             <span className="text-lg">Change Password</span>
//           </div>

          
//           <div
//             onClick={handleLogout}
//             className="flex items-center gap-4 bg-red-600 hover:bg-red-700 p-4 rounded-xl cursor-pointer transition"
//           >
//             <LogOut size={22} />
//             <span className="text-lg">Logout</span>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;