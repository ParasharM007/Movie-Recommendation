import mongoose, { Schema, Types } from "mongoose";


const UserTasteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    likedGenres: {
      type: [String],
      default: []
    },

    favorites: {
      type: [String], // tmdb movie/tv ids 
      default: []
    },

    recentlyLiked: {
      type: [String],
      default: []
    },

    alreadyWatched: {
      type: [String],
      default: []
    },

    watchlist: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true 
  }
);

export const UserTasteModel = mongoose.models.UserTaste || mongoose.model("UserTaste", UserTasteSchema);
