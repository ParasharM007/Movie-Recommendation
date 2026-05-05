import { ErrorType } from "@/types/ErrorType";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import { MovieData } from "@/types/MovieData";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

const recommedationsFromLikedGenres = async ():Promise<MovieData[]> => {
    const res: AxiosResponse=
      await axios.get(`/api/movie-suggest`);
    return res.data.data;
    // return [
    //   {
    //     id: 76341,
    //     title: "Mad Max: Fury Road",
    //     genre: "Action",
    //     poster: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
    //     rating: 7.629,
    //     overview:
    //       "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
    //     reason: "Based on your interest in high-octane action",
    //   },
    //   {
    //     id: 245891,
    //     title: "John Wick",
    //     genre: "Action",
    //     poster: "/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg",
    //     rating: 7.454,
    //     overview:
    //       "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
    //     reason: "Recommended for fans of intense action sequences",
    //   },
    //   {
    //     id: 155,
    //     title: "The Dark Knight",
    //     genre: "Action",
    //     poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    //     rating: 8.527,
    //     overview:
    //       "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    //     reason: "Suggested because of its gripping storyline and action",
    //   },
    //   {
    //     id: 353081,
    //     title: "Mission: Impossible - Fallout",
    //     genre: "Action",
    //     poster: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    //     rating: 7.448,
    //     overview:
    //       "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
    //     reason: "Similar in tone to action-packed movies you'll enjoy",
    //   },
    //   {
    //     id: 562,
    //     title: "Die Hard",
    //     genre: "Action",
    //     poster: "/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg",
    //     rating: 7.805,
    //     overview:
    //       "NYPD cop John McClane's plan to reconcile with his estranged wife is thrown for a serious loop when, minutes after he arrives at her office's Christmas Party, the entire building is overtaken by a group of terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.",
    //     reason: "Classic action movie that never gets old",
    //   },
    //   {
    //     id: 110492,
    //     title: "Peacemaker",
    //     genre: "Action",
    //     poster: "/eYzbGcYnOUlvj2fa76pTgIXogd7.jpg",
    //     rating: 8.2,
    //     overview:
    //       "The continuing story of Peacemaker, a vainglorious superhero/supervillain who believes in peace at any cost — no matter how many people he has to kill. After a miraculous recovery from his duel with Bloodsport, Peacemaker soon discovers that his freedom comes at a price.",
    //     reason: "Recommended for fans of action-packed superhero series",
    //   },
    //   {
    //     id: 18785,
    //     title: "The Hangover",
    //     genre: "Comedy",
    //     poster: "/A0uS9rHR56FeBtpjVki16M5xxSW.jpg",
    //     rating: 7.329,
    //     overview:
    //       "When three friends finally come to after a raucous night of bachelor-party revelry, they find a baby in the closet and a tiger in the bathroom. But they can't seem to locate their best friend, Doug – who's supposed to be tying the knot. Launching a frantic search for Doug, the trio perseveres through a nasty hangover to try to make it to the church on time.",
    //     reason: "Laughter guaranteed with this hilarious comedy",
    //   },
    //   {
    //     id: 8363,
    //     title: "Superbad",
    //     genre: "Comedy",
    //     poster: "/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
    //     rating: 7.259,
    //     overview:
    //       "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    //     reason: "Suggested because of its relatable coming-of-age humor",
    //   },
    //   {
    //     id: 55721,
    //     title: "Bridesmaids",
    //     genre: "Comedy",
    //     poster: "/gJtA7hYsBMQ7EM3sPBMUdBfU7a0.jpg",
    //     rating: 6.506,
    //     overview:
    //       "Annie's life is a mess. But when she finds out her lifetime best friend is engaged, she simply must serve as Lillian's maid of honor. Though lovelorn and broke, Annie bluffs her way through the expensive and bizarre rituals. With one chance to get it perfect, she’ll show Lillian and her bridesmaids just how far you’ll go for someone you love.",
    //     reason: "Recommended for fans of female-led comedies",
    //   },
    //   {
    //     id: 6957,
    //     title: "The 40 Year Old Virgin",
    //     genre: "Comedy",
    //     poster: "/mVeoqL37gzhMXQVpONi9DGOQ3tZ.jpg",
    //     rating: 6.416,
    //     overview:
    //       "Andy Stitzer has a pleasant life with a nice apartment and a job stamping invoices at an electronics store. But at age 40, there's one thing Andy hasn't done, and it's really bothering his sex-obsessed male co-workers: Andy is still a virgin. Determined to help Andy get laid, the guys make it their mission to de-virginize him. But it all seems hopeless until Andy meets small business owner Trish, a single mom.",
    //     reason: "Classic comedy that never gets old",
    //   },
    //   {
    //     id: 61662,
    //     title: "Schitt's Creek",
    //     genre: "Comedy",
    //     poster: "/iRfSzrPS5VYWQv7KVSEg2BZZL6C.jpg",
    //     rating: 7.768,
    //     overview:
    //       "Formerly filthy rich video store magnate Johnny Rose, his soap star wife Moira, and their two kids, über-hipster son David and socialite daughter Alexis, suddenly find themselves broke and forced to live in Schitt's Creek, a small depressing town they once bought as a joke.",
    //     reason: "Heartwarming comedy series that will leave you smiling",
    //   },
    //   {
    //     id: 8592,
    //     title: "Parks and Recreation",
    //     genre: "Comedy",
    //     poster: "/5IOj62y2Eb2ngyYmEn1IJ7bFhzH.jpg",
    //     rating: 8.035,
    //     overview:
    //       "In an attempt to beautify her town — and advance her career — Leslie Knope, a mid-level bureaucrat in the Parks and Recreation Department of Pawnee, Indiana, takes on bureaucrats, cranky neighbors, and single-issue fanatics whose weapons are lawsuits, the jumble of city codes, and the democratic process she loves so much.",
    //     reason: "Similar in tone to feel-good comedies you'll love",
    //   },
    //   {
    //     id: 157336,
    //     title: "Interstellar",
    //     genre: "Sci-Fi",
    //     poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    //     rating: 8.468,
    //     overview:
    //       "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    //     reason: "Mind-bending sci-fi movie that explores the universe",
    //   },
    //   {
    //     id: 329865,
    //     title: "Arrival",
    //     genre: "Sci-Fi",
    //     poster: "/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    //     rating: 7.624,
    //     overview:
    //       "Taking place after alien crafts land around the world, an expert linguist is recruited by the military to determine whether they come in peace or are a threat.",
    //     reason: "Suggested because of its thought-provoking storyline",
    //   },
    //   {
    //     id: 286217,
    //     title: "The Martian",
    //     genre: "Sci-Fi",
    //     poster: "/3ndAx3weG6KDkJIRMCi5vXX6Dyb.jpg",
    //     rating: 7.691,
    //     overview:
    //       "During a manned mission to Mars, Astronaut Mark Watney is presumed dead after a fierce storm and left behind by his crew. But Watney has survived and finds himself stranded and alone on the hostile planet. With only meager supplies, he must draw upon his ingenuity, wit and spirit to subsist and find a way to signal to Earth that he is alive.",
    //     reason: "Recommended for fans of survival sci-fi movies",
    //   },
    //   {
    //     id: 66732,
    //     title: "Stranger Things",
    //     genre: "Sci-Fi",
    //     poster: "/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    //     rating: 8.579,
    //     overview:
    //       "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    //     reason: "Nostalgic sci-fi series that will transport you back in time",
    //   },
    //   {
    //     id: 63247,
    //     title: "Westworld",
    //     genre: "Sci-Fi",
    //     poster: "/8MfgyFHf7XEboZJPZXCIDqqiz6e.jpg",
    //     rating: 8.027,
    //     overview:
    //       "A dark odyssey about the dawn of artificial consciousness and the evolution of sin. Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite, no matter how noble or depraved, can be indulged.",
    //     reason: "Thought-provoking sci-fi series that explores AI and humanity",
    //   },
    //   {
    //     id: 264660,
    //     title: "Ex Machina",
    //     genre: "Sci-Fi",
    //     poster: "/dmJW8IAKHKxFNiUnoDR7JfsK7Rp.jpg",
    //     rating: 7.573,
    //     overview:
    //       "Caleb, a coder at the world's largest internet company, wins a competition to spend a week at a private mountain retreat belonging to Nathan, the reclusive CEO of the company. But when Caleb arrives at the remote location he finds that he will have to participate in a strange and fascinating experiment in which he must interact with the world's first true artificial intelligence, housed in the body of a beautiful robot girl.",
    //     reason: "Similar in tone to psychological sci-fi movies you'll enjoy",
    //   },
    //   {
    //     id: 278,
    //     title: "The Shawshank Redemption",
    //     genre: "Drama",
    //     poster: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    //     rating: 8.715,
    //     overview:
    //       "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    //     reason: "Timeless drama movie that will leave you inspired",
    //   },
    //   {
    //     id: 37799,
    //     title: "The Social Network",
    //     genre: "Drama",
    //     poster: "/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    //     rating: 7.37,
    //     overview:
    //       "In 2003, Harvard undergrad and computer programmer Mark Zuckerberg begins work on a new concept that eventually turns into the global social network known as Facebook. Six years later, Mark is one of the youngest billionaires ever, but his unprecedented success leads to both personal and legal complications when he ends up on the receiving end of two lawsuits, one involving his former friend.",
    //     reason: "Suggested because of its gripping storyline and characters",
    //   },
    //   {
    //     id: 76203,
    //     title: "12 Years a Slave",
    //     genre: "Drama",
    //     poster: "/xdANQijuNrJaw1HA61rDccME4Tm.jpg",
    //     rating: 7.932,
    //     overview:
    //       "In the pre-Civil War United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery. Facing cruelty as well as unexpected kindnesses Solomon struggles not only to stay alive, but to retain his dignity. In the twelfth year of his unforgettable odyssey, Solomon’s chance meeting with a Canadian abolitionist will forever alter his life.",
    //     reason: "Recommended for fans of powerful drama movies",
    //   },
    //   {
    //     id: 67136,
    //     title: "This Is Us",
    //     genre: "Drama",
    //     poster: "/huxmY6Dmzwpv5Q2hnNft0UMK7vf.jpg",
    //     rating: 8.2,
    //     overview:
    //       "Follows the lives and families of three adults living and growing up in the United States of America in present and past times. As their paths cross and their life stories intertwine in curious ways, we find that several of them share the same birthday - and so much more than anyone would expect.",
    //     reason:
    //       "Heartwarming drama series that explores family and relationships",
    //   },
    //   {
    //     id: 1396,
    //     title: "Breaking Bad",
    //     genre: "Drama",
    //     poster: "/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    //     rating: 8.9,
    //     overview:
    //       "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    //     reason:
    //       "Intense drama series that will keep you on the edge of your seat",
    //   },
    //   {
    //     id: 1402,
    //     title: "The Pursuit of Happyness",
    //     genre: "Drama",
    //     poster: "/lBYOKAMcxIvuk9s9hMuecB9dPBV.jpg",
    //     rating: 7.885,
    //     overview:
    //       "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career.",
    //     reason: "Similar in tone to inspiring drama movies you'll love",
    //   },
    //   {
    //     id: 1016188,
    //     title: "Seven",
    //     genre: "Thriller",
    //     poster: "/8XOvSLNXUASmSJ8hHEMtxqr7bua.jpg",
    //     rating: 8,
    //     overview:
    //       "After his affluent father passes, a man must survive seven days in the Nigerian neighborhood of Ajegunie, where obstacles keep him from his inheritance.",
    //     reason:
    //       "Gripping thriller movie that explores the darker side of human nature",
    //   },
    //   {
    //     id: 77,
    //     title: "Memento",
    //     genre: "Thriller",
    //     poster: "/fKTPH2WvH8nHTXeBYBVhawtRqtR.jpg",
    //     rating: 8.176,
    //     overview:
    //       "Leonard Shelby is tracking down the man who raped and murdered his wife. The difficulty of locating his wife's killer, however, is compounded by the fact that he suffers from a rare, untreatable form of short-term memory loss. Although he can recall details of life before his accident, Leonard cannot remember what happened fifteen minutes ago, where he's going, or why.",
    //     reason: "Suggested because of its mind-bending storyline and twists",
    //   },
    //   {
    //     id: 274,
    //     title: "The Silence of the Lambs",
    //     genre: "Thriller",
    //     poster: "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    //     rating: 8.346,
    //     overview:
    //       "Clarice Starling is a top student at the FBI's training academy.  Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism.  Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
    //     reason: "Recommended for fans of intense thriller movies",
    //   },
    //   {
    //     id: 72750,
    //     title: "Killing Eve",
    //     genre: "Thriller",
    //     poster: "/4wKhTVw8aGq5AZMa0Q1spERdi7n.jpg",
    //     rating: 7.914,
    //     overview:
    //       "A security consultant hunts for a ruthless assassin. Equally obsessed with each other, they go head to head in an epic game of cat-and-mouse.",
    //     reason:
    //       "Psychological thriller series that will keep you on the edge of your seat",
    //   },
    //   {
    //     id: 72844,
    //     title: "The Haunting of Hill House",
    //     genre: "Thriller",
    //     poster: "/38PkhBGRQtmVx2drvPik3F42qHO.jpg",
    //     rating: 8.106,
    //     overview:
    //       "Flashing between past and present, a fractured family confronts haunting memories of their old home and the terrifying events that drove them from it.",
    //     reason: "Similar in tone to spooky thriller series you'll enjoy",
    //   },
    //   {
    //     id: 146233,
    //     title: "Prisoners",
    //     genre: "Thriller",
    //     poster: "/jsS3a3ep2KyBVmmiwaz3LvK49b1.jpg",
    //     rating: 8.102,
    //     overview:
    //       "Keller Dover is facing every parent’s worst nightmare. His six-year-old daughter, Anna, is missing, together with her young friend, Joy, and as minutes turn to hours, panic sets in. The only lead is a dilapidated RV that had earlier been parked on their street.",
    //     reason:
    //       "Thrilling movie that explores the themes of kidnapping and mystery",
    //   },
    // ];
  };

  export const useUserFeed=(initialMovies:MovieData[])=>{
    

  const { data: session } = useSession();

  return useQuery<MovieData[],ErrorType>({
    queryKey: ["movie-recommendations", session?.user?._id],
    queryFn: recommedationsFromLikedGenres,
    initialData: initialMovies ?? undefined,
    staleTime: 1000 * 60,   //60 sec
    refetchOnWindowFocus: false,
    retry:1
  })
  }