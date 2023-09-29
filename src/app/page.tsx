import ParticleBackground from "@/components/ParticleBackground";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <ParticleBackground />

      <div className="flex-col">
        <div className="w-40 self-center">
          <Image
            src={"/assets/Logo.svg"}
            alt="QDeep Logo"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
      </div>
    </main>
  );
}
