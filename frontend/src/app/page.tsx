import Image from "next/image";

export default function Home() {
  
  return (
    <main className="flex h-screen flex-col space-y-16 items-center justify-center p-8 bg-[#506C2F]">
      <div>
        <Image
          src="/follas-logo.svg"
          alt="follas-logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="text-3xl text-white font-medium">
        <h1>Selamat Datang Di <span className="text-5xl">Follas Coffee!</span></h1>
      </div>

      {/* button lanjut */}
      <div>
        
      </div>
    </main>
  );
}
