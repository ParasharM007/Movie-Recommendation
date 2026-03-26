import { apiResponse } from "@/lib/apiResponse";

import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/options";
import { UserTasteModel } from "@/model/UserTaste.model";
import { getServerSession, User } from "next-auth";

export async function POST(req: Request) {
  const allowedActions = ["add", "remove"] as const;
  const allowedFields = [
    "likedGenres",
    "favorites",
    "recentlyLiked",
    "alreadyWatched",
    "watchlist",
  ] as const;

  type allowedField = (typeof allowedFields)[number];
  type allowedAction = typeof allowedActions[number];
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    const isUnauthorized = !user || !user._id || !session;
    if (isUnauthorized)
      return apiResponse(false, "Not Authorized", 401);
    
    const body = await req.json();
    const { action ,data, field } = body as {
      action:allowedAction,
      field: allowedField;
      data: string | string[];
    };

    if (!field || !action || !data) {
  return apiResponse(false,"Missing fields",400)
}
    
    if (!allowedFields.includes(field) || !allowedActions.includes(action)) {
      return apiResponse(false, "Invalid details", 400);
    }

    const values = Array.isArray(data) ? data : [data]; // we will check whether data is already in array or not
    console.log("Values:- ",values)
    const updateQuery =
    action === "add"
      ? { $addToSet: { [field]: { $each: values } } }
      : { $pull: { [field]: { $in: values } } };
    // TODO:- we have to check if movie already exists in field?
    const updatedUser = await UserTasteModel.updateOne(
  
      { userId: user._id },
      { $addToSet: { [field]: { $each: values } } }
);
    
    if(updatedUser.modifiedCount===0)  //1 for updated successfully
      return apiResponse(true, "Movie already exists", 200);


    
    

      console.log("updweowipgjspjg ",updatedUser)
      // const updatedUserDTO = {          Removed this from res
      //   id:updatedUser._id.toString(),
      //   updatedField:updatedUser[field],

      // }
    return apiResponse(
      true,
      `User's ${field} updated successfully`,
      200
    );
  } catch (error) {
    console.log("Error ",error)
    return apiResponse(
      false,
      "Something unexpected error occured in uploading users' taste data",
      400
    );
  }
}
