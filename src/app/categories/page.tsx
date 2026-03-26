'use client'
import { useEffect, useState } from "react";
import { useDebounceValue } from 'usehooks-ts'

import { SortDropdown } from "./SortDropdown";
import FilterSidebar from "./FilterSideBar";
import MoviesRow from "../MoviesRow/page";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ExpectedResponse } from "@/types/ExpectedResponse";
import MoviesGrid from "../MoviesGrid/page";


export default function CategoryPage() {
  const [page ,setPage] = useState<number>(1)
  const [filters, setFilters] = useState<payLoad>({
    genres: [],
    rating: 0,
    yearFrom: "",
    yearTo: "",
    sortBy:"",
    page:page
  });
 
  const [sort, setSort] = useState("popularity");  
  const debouncedFilters = useDebounceValue<payLoad>(filters, 1000)
  async function getMovies(){
    const res:ExpectedResponse<any>= await axios.post(`/api/movie-filter`,debouncedFilters[0]) 
    return res.data.data
  }

  
 type ErrorType={
  message:string
 }
 type payLoad={
  genres:string[],
  rating:number,
  yearFrom:string,
  yearTo:string,
  sortBy:string,
  page:number
}
const {isLoading, isError , data:movies} =useQuery<
ExpectedResponse<any> ,AxiosError<ErrorType> ,payLoad
>({
  queryKey:['categories',debouncedFilters],
  queryFn: getMovies,
  enabled: !!debouncedFilters
})

useEffect(()=>{
setPage(1)
},[filters])


const movie = [
  {
        id: 76341,
        title: "Mad Max: Fury Road",
        genre: "Action",
        poster: "/hA2ple9q4qnwxp3hKVNhroipsir.jpg",
        rating: 7.629,
        overview:
          "An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken, and most everyone is crazed fighting for the necessities of life. Within this world exist two rebels on the run who just might be able to restore order.",
        reason: "Based on your interest in high-octane action",
      },
      {
        id: 245891,
        title: "John Wick",
        genre: "Action",
        poster: "/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg",
        rating: 7.454,
        overview:
          "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
        reason: "Recommended for fans of intense action sequences",
      },
      {
        id: 155,
        title: "The Dark Knight",
        genre: "Action",
        poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        rating: 8.527,
        overview:
          "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
        reason: "Suggested because of its gripping storyline and action",
      },
      {
        id: 353081,
        title: "Mission: Impossible - Fallout",
        genre: "Action",
        poster: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
        rating: 7.448,
        overview:
          "When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.",
        reason: "Similar in tone to action-packed movies you'll enjoy",
      },
      {
        id: 562,
        title: "Die Hard",
        genre: "Action",
        poster: "/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg",
        rating: 7.805,
        overview:
          "NYPD cop John McClane's plan to reconcile with his estranged wife is thrown for a serious loop when, minutes after he arrives at her office's Christmas Party, the entire building is overtaken by a group of terrorists. With little help from the LAPD, wisecracking McClane sets out to single-handedly rescue the hostages and bring the bad guys down.",
        reason: "Classic action movie that never gets old",
      },
      {
        id: 110492,
        title: "Peacemaker",
        genre: "Action",
        poster: "/eYzbGcYnOUlvj2fa76pTgIXogd7.jpg",
        rating: 8.2,
        overview:
          "The continuing story of Peacemaker, a vainglorious superhero/supervillain who believes in peace at any cost — no matter how many people he has to kill. After a miraculous recovery from his duel with Bloodsport, Peacemaker soon discovers that his freedom comes at a price.",
        reason: "Recommended for fans of action-packed superhero series",
      },
      {
        id: 18785,
        title: "The Hangover",
        genre: "Comedy",
        poster: "/A0uS9rHR56FeBtpjVki16M5xxSW.jpg",
        rating: 7.329,
        overview:
          "When three friends finally come to after a raucous night of bachelor-party revelry, they find a baby in the closet and a tiger in the bathroom. But they can't seem to locate their best friend, Doug – who's supposed to be tying the knot. Launching a frantic search for Doug, the trio perseveres through a nasty hangover to try to make it to the church on time.",
        reason: "Laughter guaranteed with this hilarious comedy",
      },
      {
        id: 8363,
        title: "Superbad",
        genre: "Comedy",
        poster: "/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
        rating: 7.259,
        overview:
          "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
        reason: "Suggested because of its relatable coming-of-age humor",
      },
      {
        id: 55721,
        title: "Bridesmaids",
        genre: "Comedy",
        poster: "/gJtA7hYsBMQ7EM3sPBMUdBfU7a0.jpg",
        rating: 6.506,
        overview:
          "Annie's life is a mess. But when she finds out her lifetime best friend is engaged, she simply must serve as Lillian's maid of honor. Though lovelorn and broke, Annie bluffs her way through the expensive and bizarre rituals. With one chance to get it perfect, she’ll show Lillian and her bridesmaids just how far you’ll go for someone you love.",
        reason: "Recommended for fans of female-led comedies",
      },
      {
        id: 6957,
        title: "The 40 Year Old Virgin",
        genre: "Comedy",
        poster: "/mVeoqL37gzhMXQVpONi9DGOQ3tZ.jpg",
        rating: 6.416,
        overview:
          "Andy Stitzer has a pleasant life with a nice apartment and a job stamping invoices at an electronics store. But at age 40, there's one thing Andy hasn't done, and it's really bothering his sex-obsessed male co-workers: Andy is still a virgin. Determined to help Andy get laid, the guys make it their mission to de-virginize him. But it all seems hopeless until Andy meets small business owner Trish, a single mom.",
        reason: "Classic comedy that never gets old",
      },
      {
        id: 61662,
        title: "Schitt's Creek",
        genre: "Comedy",
        poster: "/iRfSzrPS5VYWQv7KVSEg2BZZL6C.jpg",
        rating: 7.768,
        overview:
          "Formerly filthy rich video store magnate Johnny Rose, his soap star wife Moira, and their two kids, über-hipster son David and socialite daughter Alexis, suddenly find themselves broke and forced to live in Schitt's Creek, a small depressing town they once bought as a joke.",
        reason: "Heartwarming comedy series that will leave you smiling",
      },
      {
        id: 8592,
        title: "Parks and Recreation",
        genre: "Comedy",
        poster: "/5IOj62y2Eb2ngyYmEn1IJ7bFhzH.jpg",
        rating: 8.035,
        overview:
          "In an attempt to beautify her town — and advance her career — Leslie Knope, a mid-level bureaucrat in the Parks and Recreation Department of Pawnee, Indiana, takes on bureaucrats, cranky neighbors, and single-issue fanatics whose weapons are lawsuits, the jumble of city codes, and the democratic process she loves so much.",
        reason: "Similar in tone to feel-good comedies you'll love",
      }
]
  return (
    <div className="flex ml-20 text-white gap-6 p-6">
      <div className="h-60 border">

      <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      
      <div className="flex-1">
        
        <div className="flex justify-end mb-4">
          <SortDropdown sort={sort} setSort={setSort} />
        </div>

        
        <div>
         <MoviesGrid movies={movies} />
        </div>
      </div>
    </div>
  );
}