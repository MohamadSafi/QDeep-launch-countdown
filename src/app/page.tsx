import { Footer } from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { TimerContainer } from "@/components/TimerContainer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <ParticleBackground />

      <div className="flex flex-col align-middle mt-8">
        <div className="w-1/12 self-center">
          <Image
            src={"/assets/Logo.svg"}
            alt="QDeep Logo"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <p className="text-center text-[#9F2323] text-xl font-bold">Text</p>
        <p className="text-center">Text</p>
        <div className="flex justify-center">
          <TimerContainer
            days={10}
            hours={20}
            minutes={2}
            seconds={2}
          ></TimerContainer>
        </div>
      </div>
    </main>
  );
}
