import { useRouter } from "next/navigation"

export default function NotAuthPage({message}:{
    message:React.ReactNode}){
    const router = useRouter()
    return (
        <div 
        className="flex items-center justify-center md:h-[50%] md:w-[70%] my-2 bg-gray-900 rounded-4xl px-1">
            <div className="w-full max-w-md rounded-xl shadow-lg p-6 text-center">
              <div className="mx-auto flex h-12 w-15 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3z"
                  />
                </svg>
              </div>


              <div className="mt-6 items-center justify-center flex flex-col gap-3">
              
              <h2 className="mt-2 text-xl font-semibold text-white">
               {message ||"Error"}
              </h2>
              </div>
            </div>
          </div>
    )
}