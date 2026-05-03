'use client'
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { ChevronRight, Heading1, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function TrendingRow({initialTrending}:any) {
  const router = useRouter()
  const fetchTrendingMovies=async()=>{
   try {
    const res:AxiosResponse<any>= await axios.get(`/api/trending-movies`)
    if(!res) return null
    console.log("Trendign movies",res.data.data)
    return res.data.data
    
    // return  [
    //     {
    //         "adult": false,
    //         "backdrop_path": "/xnb15logFGJRniA7Ud3NILSPPhs.jpg",
    //         "id": 1292695,
    //         "title": "They Will Kill You",
    //         "original_title": "They Will Kill You",
    //         "overview": "A woman answers a help wanted ad to be a housekeeper in a mysterious New York City high-rise, unaware that she is entering a community that has seen a number of disappearances over the years and may be under the grip of a Satanic cult.",
    //         "poster_path": "/nSXCFSvI2p5WLgMrOHACbVnEJSR.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             28,
    //             35,
    //             27
    //         ],
    //         "popularity": 219.7171,
    //         "release_date": "2026-03-25",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.453,
    //         "vote_count": 200
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/u53UYu5XG2hNgWGvs3xGhAVzypl.jpg",
    //         "id": 1327819,
    //         "title": "Hoppers",
    //         "original_title": "Hoppers",
    //         "overview": "Scientists have discovered how to 'hop' human consciousness into lifelike robotic animals, allowing people to communicate with animals as animals. Animal lover Mabel seizes an opportunity to use the technology, uncovering mysteries within the animal world beyond anything she could have imagined.",
    //         "poster_path": "/xjtWQ2CL1mpmMNwuU5HeS4Iuwuu.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             16,
    //             10751,
    //             878,
    //             35,
    //             12
    //         ],
    //         "popularity": 194.1653,
    //         "release_date": "2026-03-04",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7.643,
    //         "vote_count": 557
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/p8777bPIlyFYcjqP2hU8htoz1RG.jpg",
    //         "id": 1318447,
    //         "title": "Apex",
    //         "original_title": "Apex",
    //         "overview": "A grieving woman pushing her limits on a solo adventure in the Australian wild is ensnared in a twisted game with a cunning killer who thinks she's prey.",
    //         "poster_path": "/9iuGBLJBRuGKR6nRL4SxUV1tIdt.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             28,
    //             53
    //         ],
    //         "popularity": 588.8779,
    //         "release_date": "2026-04-24",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.513,
    //         "vote_count": 390
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/y3fQa7pytlysovXzovpXc1OQlTW.jpg",
    //         "id": 1314481,
    //         "title": "The Devil Wears Prada 2",
    //         "original_title": "The Devil Wears Prada 2",
    //         "overview": "As Miranda Priestly nears retirement, she reunites with Andy Sachs to face off against her former assistant turned rival: Emily Charlton.",
    //         "poster_path": "/sRTYF65JvbHLoC3LoBj4UKYqIlA.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             18,
    //             35
    //         ],
    //         "popularity": 67.8527,
    //         "release_date": "2026-04-29",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 8.1,
    //         "vote_count": 7
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/xBT0oNq6rsTFv4SxG5uGRIEOrq6.jpg",
    //         "id": 936075,
    //         "title": "Michael",
    //         "original_title": "Michael",
    //         "overview": "The story of Michael Jackson, one of the most influential artists the world has ever known, and his life beyond the music. His journey from the discovery of his extraordinary talent as the lead of the Jackson Five, to the visionary artist whose creative ambition fueled a relentless pursuit to become the biggest entertainer in the world, highlighting both his life off-stage and some of the most iconic performances from his early solo career.",
    //         "poster_path": "/3Qud19bBUrrJAzy0Ilm8gRJlJXP.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             10402,
    //             18
    //         ],
    //         "popularity": 264.1109,
    //         "release_date": "2026-04-22",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7.635,
    //         "vote_count": 323
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/6xEdQND18WFuKeRNwfzMfKHoK5N.jpg",
    //         "id": 1450527,
    //         "title": "Forbidden Fruits",
    //         "original_title": "Forbidden Fruits",
    //         "overview": "Free Eden employee Apple secretly runs a witchy femme cult in the basement of the mall store after hours - with fellow fruits Cherry and Fig. But when new hire Pumpkin challenges their performative sisterhood, the women are forced to face their own poisons or succumb to a bloody fate.",
    //         "poster_path": "/t3hvrrrqvRoURz4y1A1aCys6WD9.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             27,
    //             35
    //         ],
    //         "popularity": 25.8901,
    //         "release_date": "2026-03-26",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.575,
    //         "vote_count": 20
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/8Tfys3mDZVp4tNoH2ktm06a0Tau.jpg",
    //         "id": 687163,
    //         "title": "Project Hail Mary",
    //         "original_title": "Project Hail Mary",
    //         "overview": "Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of who he is or how he got there. As his memory returns, he begins to uncover his mission: solve the riddle of the mysterious substance causing the sun to die out. He must call on his scientific knowledge and unorthodox ideas to save everything on Earth from extinction.",
    //         "poster_path": "/yihdXomYb5kTeSivtFndMy5iDmf.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             878,
    //             12
    //         ],
    //         "popularity": 168.4848,
    //         "release_date": "2026-03-15",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 8.209,
    //         "vote_count": 1806
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/kxQiIJ4gVcD3K6o14MJ72p5yRcE.jpg",
    //         "id": 1226863,
    //         "title": "The Super Mario Galaxy Movie",
    //         "original_title": "The Super Mario Galaxy Movie",
    //         "overview": "Having thwarted Bowser's previous plot to marry Princess Peach, Mario and Luigi now face a fresh threat in Bowser Jr., who is determined to liberate his father from captivity and restore the family legacy. Alongside companions new and old, the brothers travel across the stars to stop the young heir's crusade.",
    //         "poster_path": "/eJGWx219ZcEMVQJhAgMiqo8tYY.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             10751,
    //             35,
    //             12,
    //             14,
    //             16
    //         ],
    //         "popularity": 513.3125,
    //         "release_date": "2026-04-01",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.738,
    //         "vote_count": 666
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/m6ciqp691frwE1nNeMgWFBr0AZf.jpg",
    //         "id": 931285,
    //         "title": "Mortal Kombat II",
    //         "original_title": "Mortal Kombat II",
    //         "overview": "The fan favorite champions—now joined by Johnny Cage himself—are pitted against one another in the ultimate, no-holds barred, gory battle to defeat the dark rule of Shao Kahn that threatens the very existence of the Earthrealm and its defenders.",
    //         "poster_path": "/lIsMeDbwntNXSUVHmWMMRXEZOVc.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             28,
    //             14,
    //             12
    //         ],
    //         "popularity": 31.0326,
    //         "release_date": "2026-05-06",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 0,
    //         "vote_count": 0
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/1s1r4OOdnU8VX2inALVTA2q94uY.jpg",
    //         "id": 1321179,
    //         "title": "The King's Warden",
    //         "original_title": "왕과 사는 남자",
    //         "overview": "In a remote mountain village of 15th-century Joseon, humble headman Heung-do hears a rumor that any village hosting an exiled nobleman will be blessed with abundance and fortune. Hoping to bring prosperity to his impoverished community, he eagerly submits a petition to host one—unaware that his guest is none other than the fallen monarch, deposed boy-king Danjong.",
    //         "poster_path": "/3CnVA1jAA64Q3qNVAW8DekCu19b.jpg",
    //         "media_type": "movie",
    //         "original_language": "ko",
    //         "genre_ids": [
    //             36,
    //             18
    //         ],
    //         "popularity": 15.616,
    //         "release_date": "2026-02-04",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.9,
    //         "vote_count": 10
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/zc08qkHtWfZ2cQGQBK1S5yafJmR.jpg",
    //         "id": 1304313,
    //         "title": "Lee Cronin's The Mummy",
    //         "original_title": "Lee Cronin's The Mummy",
    //         "overview": "The young daughter of a journalist disappears into the desert without a trace—eight years later, the broken family is shocked when she is returned to them, as what should be a joyful reunion turns into a living nightmare.",
    //         "poster_path": "/8L8efNkz8rUmwR7sV0g3vnC9yjn.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             27,
    //             9648
    //         ],
    //         "popularity": 92.9342,
    //         "release_date": "2026-04-15",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.772,
    //         "vote_count": 160
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/nBRtRfvmRT3ZCUMZHUl575eQAhM.jpg",
    //         "id": 938150,
    //         "title": "Wardriver",
    //         "original_title": "Wardriver",
    //         "overview": "He’s a Wardriver: a hacker who steals from banks, not people—until he’s noticed. Now the money turns violent, and the woman caught in it could save him or kill them both.",
    //         "poster_path": "/ipTXhWCJgeg5RN0CpmFZYDzOzQi.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             53,
    //             80
    //         ],
    //         "popularity": 7.2072,
    //         "release_date": "2026-03-04",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.3,
    //         "vote_count": 16
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/iN41Ccw4DctL8npfmYg1j5Tr1eb.jpg",
    //         "id": 83533,
    //         "title": "Avatar: Fire and Ash",
    //         "original_title": "Avatar: Fire and Ash",
    //         "overview": "In the wake of the devastating war against the RDA and the loss of their eldest son, Jake Sully and Neytiri face a new threat on Pandora: the Ash People, a violent and power-hungry Na'vi tribe led by the ruthless Varang. Jake's family must fight for their survival and the future of Pandora in a conflict that pushes them to their emotional and physical limits.",
    //         "poster_path": "/aabwWZWx6z1aYP4PX2ADvbDKktd.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             878,
    //             12,
    //             14
    //         ],
    //         "popularity": 215.0432,
    //         "release_date": "2025-12-17",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7.4,
    //         "vote_count": 2751
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/tq3h43fZy0H80vzf47MAY7R9Mxo.jpg",
    //         "id": 1297842,
    //         "title": "GOAT",
    //         "original_title": "GOAT",
    //         "overview": "A small goat with big dreams gets a once-in-a-lifetime shot to join the pros and play roarball, a high-intensity, co-ed, full-contact sport dominated by the fastest, fiercest animals in the world.",
    //         "poster_path": "/wfuqMlaExcoYiUEvKfVpUTt1v4u.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             16,
    //             35,
    //             10751
    //         ],
    //         "popularity": 138.7314,
    //         "release_date": "2026-02-11",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7.9,
    //         "vote_count": 462
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/zQcj9CaPFrxhJE30AIn8XqDM4yK.jpg",
    //         "id": 1430077,
    //         "title": "Hokum",
    //         "original_title": "Hokum",
    //         "overview": "When novelist Ohm Bauman retreats to a remote inn to scatter his parents' ashes, he is consumed by tales of a witch haunting the honeymoon suite. Disturbing visions and a shocking disappearance forces him to confront dark corners of his past.",
    //         "poster_path": "/gC4FtEthYvx6XV2JHCQibf4P3FT.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             27,
    //             9648,
    //             53
    //         ],
    //         "popularity": 14.4401,
    //         "release_date": "2026-04-29",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 4,
    //         "vote_count": 1
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/1oKLEA9JOhvaBwLpqjROisvWMy7.jpg",
    //         "id": 1325734,
    //         "title": "The Drama",
    //         "original_title": "The Drama",
    //         "overview": "A happily engaged couple is put to the test when an unexpected turn sends their wedding week off the rails.",
    //         "poster_path": "/ikcNOWB6Qo1ER1H1BJL6Vf0W22s.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             10749,
    //             35,
    //             18
    //         ],
    //         "popularity": 32.4909,
    //         "release_date": "2026-03-26",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7,
    //         "vote_count": 557
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/m0V80Si2IfjrLXKwkCy7iCBLzqS.jpg",
    //         "id": 829487,
    //         "title": "Je m'appelle Agneta",
    //         "original_title": "Je m'appelle Agneta",
    //         "overview": "Craving a fresh start, recently unemployed Agneta accepts an au pair gig in Provence that turns into an indulgent escape — and an unexpected awakening.",
    //         "poster_path": "/itQJWqOMwboEOaMD5aNBRmUcZE9.jpg",
    //         "media_type": "movie",
    //         "original_language": "sv",
    //         "genre_ids": [
    //             35,
    //             18,
    //             10749
    //         ],
    //         "popularity": 0.9242,
    //         "release_date": "2026-04-29",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 0,
    //         "vote_count": 0
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/uQmr1eJvNwa7mCd3rXEXquA6Z3c.jpg",
    //         "id": 1383731,
    //         "title": "Protector",
    //         "original_title": "Protector",
    //         "overview": "Former war hero Nikki's peaceful life is shattered when her daughter is kidnapped. Thrust into the criminal underworld while hunted by cops and military, she must fight to rescue her child.",
    //         "poster_path": "/icOZpnGuH9YrEaW3wrw5GJaXGih.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             28,
    //             53
    //         ],
    //         "popularity": 42.6869,
    //         "release_date": "2026-02-20",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 6.4,
    //         "vote_count": 40
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/zTnAnYIn0Iv3cn0ZHlzLhou3ybm.jpg",
    //         "id": 1368166,
    //         "title": "The Housemaid",
    //         "original_title": "The Housemaid",
    //         "overview": "Trying to escape her past, Millie Calloway accepts a job as a live-in housemaid for the wealthy Nina and Andrew Winchester. But what begins as a dream job quickly unravels into something far more dangerous—a sexy, seductive game of secrets, scandal, and power.",
    //         "poster_path": "/cWsBscZzwu5brg9YjNkGewRUvJX.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             9648,
    //             53
    //         ],
    //         "popularity": 86.601,
    //         "release_date": "2025-12-18",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 7.23,
    //         "vote_count": 1945
    //     },
    //     {
    //         "adult": false,
    //         "backdrop_path": "/a8uQvrplTkhGJQog6GZ6CqF8An6.jpg",
    //         "id": 1301421,
    //         "title": "The Sheep Detectives",
    //         "original_title": "The Sheep Detectives",
    //         "overview": "George is a shepherd who reads detective novels to his beloved sheep every night, assuming they can't possibly understand. But when a mysterious incident disrupts life on the farm, the sheep realize they must become the detectives. As they follow the clues and investigate human suspects, they prove that even sheep can be brilliant crime-solvers.",
    //         "poster_path": "/hTirV44jiLh6NqdiB6jtxPsDIoG.jpg",
    //         "media_type": "movie",
    //         "original_language": "en",
    //         "genre_ids": [
    //             9648,
    //             35,
    //             10751
    //         ],
    //         "popularity": 18.9611,
    //         "release_date": "2026-05-02",
    //         "softcore": false,
    //         "video": false,
    //         "vote_average": 0,
    //         "vote_count": 0
    //     }
    // ]

   } catch (error) {
    console.log("Something went wrong while fetching trending movies")
    return null
    
   }
  }
  const {data:movies, isError, isLoading} = useQuery(
    {
      queryKey:["Trending"],
      queryFn:fetchTrendingMovies,
       initialData: initialTrending ?? undefined,
    staleTime: 1000 * 60,   //60 sec
    refetchOnWindowFocus: false,
    retry:1
    }
  )
  return (
    <section className="px-6 md:px-16 mt-10">
      <div className="flex">
   

      {/* <h2 className="text-2xl font-bold  text-white mb-4">
        🔥 Trending Movies -
      </h2> */}
         <h1 className="text-lg bg-red-600 px-3 py-1 rounded-full font-semibold">
          🎬 <span className="text-white"> Trending Now </span>
        </h1>
        <span className="font-extrabold mt-1">----</span>
<ChevronRight className="w-6 h-6 mt-1.5" />
 
            {isLoading && <Loader2 className=" text-white animate-spin m-1" />}
 
      </div>


      <div className="relative">
  <div className="flex gap-4 overflow-x-auto scrollbar-hide overflow-y-hidden px-2 py-4 scroll-smooth scrollbar-hide">

    { movies && movies?.length !== 0 ?( movies?.map((movie: any) => (
      <div
        key={movie.id}
        onClick={() => router.push(`/movie-details/${movie.id}`)}
        className="flex-shrink-0 w-[160px] md:w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110"
      >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-lg"
              alt={movie.title}
            />
            <p className="text-sm mt-2 text-gray-300">
              {movie.title}
            </p>
          </div>
        ))
      ):(
        !isLoading &&  <div className="flex bg-gray-600/90 p-4 rounded-3xl justify-center items-center min-w-full">
            <h1 className="text-white text-3xl font-medium">
              No trending movies available
            </h1>
          </div>
      )
        }
      </div>
      </div>
    </section>
  );
}