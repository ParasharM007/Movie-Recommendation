// 'use client'
// import { useEffect, useState } from "react";
// import { Home, Search, Grid, User, Menu } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Sidebar() {
//   const { status, data } = useSession();
//   let userId
//   if(data){
//     console.log("Data in session ",data)
//       userId=  data.user._id

//   } 

//   const [open, setOpen] = useState(false);
//   const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  

  
//   useEffect(() => {
//     const checkDevice = () => {
//       const width = window.innerWidth;
//       if (width >= 1024) setDevice("desktop");
//       else if (width >= 768) setDevice("tablet");
//       else setDevice("mobile");
//     };

//     checkDevice();
//     window.addEventListener("resize", checkDevice);
//     return () => window.removeEventListener("resize", checkDevice);
//   }, []);

//   const isDesktop = device === "desktop";
//   const isTablet = device === "tablet";
//   const isMobile = device === "mobile";

//   return (
//     <div className="">
      
//       {isMobile && !open && (
//    <button
//     className="fixed top-4 left-4 z-50 text-white 
//               h-12 w-12  rounded-full 
//              flex items-center justify-center " 
//     onClick={(e) => {
//       e.stopPropagation();
//       setOpen(true);
//     }}
//   >
//     <Menu size={28} />
//   </button>
// )}
      
//      <div
//   onClick={() => setOpen(false)}
//   className={`fixed inset-0 z-[70] backdrop-blur-sm bg-black/30
//   transition-opacity duration-300
//   ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
// />

      
//    <div
//   className={`
//     fixed left-0 top-0 h-screen z-[80] flex flex-col gap-8 p-4
//     bg-gradient-to-r from-black/70 to-transparent
//     transition-all duration-300 ease-in-out

//   ${isDesktop 
//   ? open 
//     ? "w-52" 
//     : "w-16"
//   : isTablet
//     ? "w-16"   // always collapsed for tablet 
//     : open 
//       ? "w-52 translate-x-0" 
//       : "w-52 -translate-x-full"
// }
//   `
  
// }


//         onMouseEnter={isDesktop ? () => setOpen(true) : undefined}
//         onMouseLeave={isDesktop ? () => setOpen(false) : undefined}
// //        onClick={
// //   isTablet
// //     ? (e) => {
// //         e.stopPropagation();
// //         setOpen(prev => !prev);
// //       }
// //     : undefined
// // }
        
//       >
//         <NavItem icon={<Home size={24}  />} path="/" label="Home" show={open} setOpen={setOpen} />
//         <NavItem icon={<Search size={24}/>}  path="/search-page" label="Search" show={open} setOpen={setOpen} />
//         <NavItem icon={<Grid size={24} />}  path="/explore" label="Explore" show={open} setOpen={setOpen} />
//         <NavItem
//           icon={<User size={24}  />} 
//           path={status === "authenticated" ? `/profile` : "/sign-in"} 
//           label={status === "authenticated" ? "Profile" : "SignIn"}
//           show={open}
//           setOpen={setOpen}
//         />
//       </div>
//     </div>
//   );
// }

// function NavItem({
//   label,
//   show,
//   icon,
//   path,
//   setOpen
// }: {
//   label: string;
//   show: boolean;
//   icon: React.ReactNode;
//   path:string;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const router= useRouter()
  
//   return (
//     <div className="flex items-center ml-2 gap-4 text-white cursor-pointer" 
//     onClick={(e)=>
//      {  e.stopPropagation(); 
//        router.replace(path)
//        setOpen(false)
       
       
//     } 
//     }
//     >
//       <div className="flex-shrink-0">{icon}</div>

//       <span
//         className={`whitespace-nowrap text-lg font-medium
//         transition-all duration-300 ease-in-out
//         ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Home, Search, Grid, User, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Sidebar() {

   const { status, data } = useSession();
  let userId
  if(data){
    console.log("Data in session ",data)
      userId=  data.user._id

  } 
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white h-12 w-12 rounded-full flex items-center justify-center md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* ✅ Overlay (only mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[80] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ✅ Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-[80] flex flex-col gap-8 p-4
          bg-gradient-to-r from-black/70 to-transparent
          transition-all duration-300

          /* Mobile */
          ${open ? "translate-x-0" : "-translate-x-full"}
          
          /* Tablet (always visible, collapsed) */
          md:translate-x-0 md:w-16
          
          /* Desktop */
          lg:w-16 lg:hover:w-52
        `}
      >
        <NavItem icon={<Home size={24} />} label="Home" path="/" setOpen={setOpen}/>
        <NavItem icon={<Search size={24} />} label="Search" path="/search-page" setOpen={setOpen}/>
        <NavItem icon={<Grid size={24} />} label="Explore" path="/explore" setOpen={setOpen}/>
        <NavItem
          icon={<User size={24}  />} 
          path={status === "authenticated" ? `/profile` : "/sign-in"} 
          label={status === "authenticated" ? "Profile" : "SignIn"}
          setOpen={setOpen}
        />
      </div>
    </>
  );
}

function NavItem({
  icon,
  label,
  path,
  setOpen
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.replace(path)
               setOpen(false)
      }}
      className="relative flex items-center gap-4 top-4 left-4 text-white cursor-pointer group"
    >
      <div>{icon}</div>

      
      <span
        className={`
          whitespace-nowrap text-lg font-medium
    transition-all duration-300

    /* Mobile → always visible */
    block md:hidden

    /* Desktop → show on hover */
    lg:block
    opacity-100 lg:opacity-0
    translate-x-0 lg:-translate-x-2
    lg:group-hover:opacity-100 
    lg:group-hover:translate-x-0

        `}
      >
        {label}
      </span>
    </div>
  );
}