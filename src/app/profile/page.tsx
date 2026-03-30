"use client";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  console.log("In User profile ");

  return (
    <div>
      Profile page :-
      <div
        className="text-white ml-20 m-5 p-5 cursor-pointer "
        onClick={() => router.replace(`/profile/get-genres`)}
      >
        Favourite genres
      </div>
      <div
        className="text-white ml-20 m-5 p-5 cursor-pointer "
        onClick={() => router.replace(`/profile/watch-list`)}
      >
        Watchlist
      </div>
      <div
        className="text-white ml-20 m-5 p-5 cursor-pointer "
        onClick={() => router.replace(`/profile/favorites`)}
      >
        Favorites
      </div>
      
    </div>
  );
};

export default Profile;
