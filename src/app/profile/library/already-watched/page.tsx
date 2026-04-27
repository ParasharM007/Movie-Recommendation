"use client";

import ProfileData from "@/helpers/ProfileData";

export default function alreadyWatched() {
  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className="text-yellow-300/80 text-4xl font-medium m-5 p-4">Already Watched</h1>
      <ProfileData
        message={"Error in loading watched content"}
        field={"alreadyWatched"}
      />
    </div>
  );
}
