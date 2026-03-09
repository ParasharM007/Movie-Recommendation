
'use client'
import { useRouter } from 'next/navigation'


const page = () => {
    const router = useRouter()
    console.log("In User profile ")
    
  return (
    <div>Profile page :-
        
        <div className='text-white ml-20 m-5 p-5 cursor-pointer ' 
        onClick={()=>router.replace(`UserProfile/get-genres`)}>Favourite genres</div>
        <div className='text-white ml-20 m-5 p-5 cursor-pointer '
        onClick={()=>router.replace(`/UserProfile/watch-list`)}
        >Watchlist</div>
        
    `</div>
  )
}

export default page