"use client";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { TimerContainer } from "@/components/TimerContainer";
import Image from "next/image";

export default function Home() {
  const [newTime, setNewTime] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const timeToDays = 40 * 60 * 60 * 24 * 1000;

  let countDownDate = new Date().getTime() + timeToDays;

  useEffect(() => {
    var updateTime = setInterval(() => {
      var now = new Date().getTime();

      var difference = countDownDate - now;
      var newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
      var newHours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var newMinutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      var newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(newDays);
      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    });

    return () => {
      clearInterval(updateTime);
    };
  }, []);
  return (
    <main className="relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute">
        <Footer />
      </div>
      <div className="flex flex-col align-middle mt-8">
        <div className="flex justify-center w-40 xl:w-60 self-center">
          <div className="w-9/12 self-center">
            <Image
              src={"/assets/QDeepLogo.svg"}
              alt="QDeep Logo"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="text-center text-[#9F2323] text-xl font-bold">Text</p>
        <p className="text-center">Text</p>
        <div className="flex justify-center">
          <TimerContainer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          ></TimerContainer>
        </div>
      </div>
    </main>
  );
}
