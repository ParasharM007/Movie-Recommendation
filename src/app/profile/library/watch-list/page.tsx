"use client";

import ProfileData from "@/helpers/ProfileData";

export default function WatchList() {

  return (

    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-yellow-300/80 text-4xl font-medium m-5 p-4">Your Watchlist</h1>
      <ProfileData message={"Error in loading watchlist"} field={"watchlist"}/>
    </div>  )

  
}
