"use client";
import { useRouter } from "next/navigation";
import ProfileDetails from "../ProfileDetails";


const Profile = () => {
  const router = useRouter();
  const arr = [
    {
      title: "Favourite genres",
      para: "Check your Favourite generes here...",
      path: "/profile/library/get-genres",
    },
    {
      title: "Your WatchList",
      para: "Check your watchlist here...",
      path: "/profile/library/watch-list",
    },
    {
      title: "Recently Liked by you",
      para: "Check your recently liked content here...",
      path: "/profile/library/recently-liked",
    },
    {
      title: "Your Favourite content",
      para: "Check your Favourite content here...",
      path: "/profile/library/favorites",
    },
    {
      title: "Your Already Watched content",
      para: "Check your already watched content here...",
      path: "/profile/library/already-watched",
    },
  ];

  return (
    <div className="min-h-screen flex justify-center items-center">

    <div className="flex flex-wrap justify-center items-center">
      {arr.map((item,index) => (
        <div
        key={index}
          className="text-white ml-20 m-2 p-5 cursor-pointer"
          onClick={() => router.push(item.path)}
        >
          <ProfileDetails
            title={item.title}
            para={item.para}
            />
        </div>
      ))}
    </div>
            </div>
  );
};

export default Profile;
