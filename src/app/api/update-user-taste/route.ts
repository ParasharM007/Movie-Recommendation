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
   
    // TODO:- we have to check if movie already exists in field if user wants to add a movie?
   if (action === "add") {
  const existing = await UserTasteModel.findOne({
    userId: user._id,
    [field]: { $in: values }
  });

  if (existing) {
    return apiResponse(true, `Already exists in user's ${field}`, 200);
  }

  const updatedUser = await UserTasteModel.updateOne(
    { userId: user._id },
    { $addToSet: { [field]: { $each: values } } }
  );

  if(!updatedUser) return apiResponse(false,`Failed to update user's ${field}`,400)
    return apiResponse(true, `Data added in ${field} successfully`, 200);
}


if (action === "remove") {
 const updatedUser = await UserTasteModel.updateOne(
    { userId: user._id },
    { $pull: { [field]: { $in: values } } }
  );
  if(!updatedUser) return apiResponse(false,`Failed to update user's ${field}`,400)
    return apiResponse(true, `Data removed from ${field} successfully`, 200);
}



    
    

   
    
  } catch (error) {
    console.log("Error ",error)
    return apiResponse(
      false,
      "Something unexpected error occured in uploading users' taste data",
      400
    );
  }
}
