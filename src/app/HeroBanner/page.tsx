import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative h-[90vh] w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20" />

     <div className="relative h-[90vh] w-full">
  <Image
    src="/image/MovieRec_Background.jpg"
    alt="Featured Movie"
    fill
    className="object-cover"
    priority
  />
</div>

      <div className="absolute bottom-12 left-8 z-30">
        <h1 className="text-4xl font-bold">Featured Title</h1>
        <p className="max-w-xl mt-2 text-lg">
          A great show everyone's talking about.
        </p>
        <button className="mt-4 px-6 py-2 bg-red-600 font-semibold rounded-md">
          Play
        </button>
      </div>
    </div>
  );
}
