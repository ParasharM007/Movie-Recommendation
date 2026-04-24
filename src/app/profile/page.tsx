"use client";
import { useRouter } from "next/navigation";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const router = useRouter();
  const arr = [
    {
      title: "Favourite genres",
      para: "Check your Favourite generes here...",
      path: "/profile/get-genres",
    },
    {
      title: "Your WatchList",
      para: "Check your watchlist here...",
      path: "/profile/watch-list",
    },
    {
      title: "Recently Liked by you",
      para: "Check your recently liked content here...",
      path: "/profile/recently-liked",
    },
    {
      title: "Your Favourite content",
      para: "Check your Favourite content here...",
      path: "/profile/favorites",
    },
    {
      title: "Your Already Watched content",
      para: "Check your already watched content here...",
      path: "/profile/already-watched",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center">
      {arr.map((item,index) => (
        <div
          key={index}
          className="text-white ml-20 m-5 p-5 cursor-pointer"
          onClick={() => router.push(item.path)}
        >
          <ProfileDetails
            title={item.title}
            para={item.para}
          />
        </div>
      ))}
    </div>
  );
};

export default Profile;
