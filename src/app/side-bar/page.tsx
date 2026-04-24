'use client'
import { useEffect, useState } from "react";
import { Home, Search, Grid, User, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { status, data } = useSession();
  let userId
  if(data){
    console.log("Data in session ",data)
      userId=  data.user._id

  } 

  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  

  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width >= 1024) setDevice("desktop");
      else if (width >= 768) setDevice("tablet");
      else setDevice("mobile");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const isDesktop = device === "desktop";
  const isTablet = device === "tablet";
  const isMobile = device === "mobile";

  return (
    <div className="">
      
      {isMobile && !open && (
   <button
    className="fixed top-4 left-4 z-50 text-white 
              h-12 w-12  rounded-full 
             flex items-center justify-center " 
    onClick={(e) => {
      e.stopPropagation();
      setOpen(true);
    }}
  >
    <Menu size={28} />
  </button>
)}
      
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[80] backdrop-blur-sm bg-black/30
        transition-opacity duration-300
        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      
      <div
        className={`fixed left-0 top-0 h-screen z-[80] flex flex-col gap-8 p-4
        bg-gradient-to-r from-black/70 to-transparent
        transition-all duration-300 ease-in-out
        ${isDesktop ? (open ? "w-52" : "w-16") : "w-52"}
        ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}`}
        onMouseEnter={isDesktop ? () => setOpen(true) : undefined}
        onMouseLeave={isDesktop ? () => setOpen(false) : undefined}
//        onClick={
//   isTablet
//     ? (e) => {
//         e.stopPropagation();
//         setOpen(prev => !prev);
//       }
//     : undefined
// }
        
      >
        <NavItem icon={<Home size={24}  />} path="/" label="Home" show={open} setOpen={setOpen} />
        <NavItem icon={<Search size={24}/>}  path="/search-page" label="Search" show={open} setOpen={setOpen} />
        <NavItem icon={<Grid size={24} />}  path="/explore" label="Explore" show={open} setOpen={setOpen} />
        <NavItem
          icon={<User size={24}  />} 
          path={status === "authenticated" ? `/profile` : "/sign-in"} 
          label={status === "authenticated" ? "Profile" : "Sign in"}
          show={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}

function NavItem({
  label,
  show,
  icon,
  path,
  setOpen
}: {
  label: string;
  show: boolean;
  icon: React.ReactNode;
  path:string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router= useRouter()
  
  return (
    <div className="flex items-center ml-2 gap-4 text-white cursor-pointer" 
    onClick={(e)=>
     {  e.stopPropagation(); 
       router.replace(path)
       setOpen(false)
       
       
    } 
    }
    >
      <div className="flex-shrink-0">{icon}</div>

      <span
        className={`whitespace-nowrap text-lg font-medium
        transition-all duration-300 ease-in-out
        ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
      >
        {label}
      </span>
    </div>
  );
}
