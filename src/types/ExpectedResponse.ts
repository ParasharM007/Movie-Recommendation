
//  email:string,
//     password?:string,
//     isVerified:boolean,
//     verifyCode:string,
//     verifyCodeExpiry:Date,
//     providers:string[]
//     likedGenres:string[],
//     alreadyWatched:string[],
//     favorites:string[],
//     watchlist:string[],    
//     recentlyLiked:string[] 
export interface ExpectedResponse<T> {
    success:boolean,
    message:string,
    isVerified?:boolean,
    data?: T
}