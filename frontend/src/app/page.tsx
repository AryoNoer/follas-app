"use client";

import Image from "next/image";
import Button from "./components/Button";
import { ArrowRightIcon } from "@heroicons/react/16/solid";

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
          <Button 
                text="Lanjut" 
                className="w-52 flex items-center justify-center font-medium text-lg rounded-2xl" 
                onClick={() => window.location.href = "/welcome"}
            >
                <ArrowRightIcon className="w-6 h-6 ml-2"/>
            </Button>
      </div>

      <div>
        <p className="font-light text-white text-[10px] md:text-base">
        Dengan menekan opsi diatas berarti kamu setuju dengan <span className="font-bold">Ketentuan Layanan</span> dan <span className="font-bold">Kebijakan Privasi</span> Follas
        </p>
      </div>
    </main>
  );
}
