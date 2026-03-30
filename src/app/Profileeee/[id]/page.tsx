'use client'
import { useParams } from 'next/navigation'


const page = () => {
    const { id } = useParams()
  return (
    <div className='text-white'>Welcome, {id}</div>
  )
}

export default page