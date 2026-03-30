import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative justify-center items-center flex h-[90vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

     <div className="relative h-[90vh] w-full">
  <Image
    src="/image/MovieRec_Background.jpg"
    alt="Featured Movie"
    fill
    className="object-cover z-0"
    priority
  />
</div>

      <div className="absolute z-30">
        <h1 className="text-4xl text-white bg-red-600 rounded-2xl p-3 my-4 font-bold">Don't know what to watch? </h1>
        <h1 className="text-4xl text-white bg-blue-600 rounded-2xl p-3 font-bold">Start exploring movies here...</h1>
        {/* <p className="max-w-xl mt-2 text-lg">
          A great show everyone's talking about.
        </p> */}
       
      </div>
    </div>
  );
}
