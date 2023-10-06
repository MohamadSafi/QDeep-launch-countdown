"use client";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { TimerContainer } from "@/components/TimerContainer";
import Image from "next/image";
import { EmailInput } from "@/components/EmailInput";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    // Set the target date to December 1, 2023
    const targetDate = new Date("2023-12-01T00:00:00").getTime();

    const updateTime = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        // Handle the case when the countdown is over
        clearInterval(updateTime);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const newMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
      }
    }, 1000);

    return () => {
      clearInterval(updateTime);
    };
  }, []);

  const handleClick = async () => {
    // Validate the email address using a simple regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Use your chosen library to write the email to a Google Sheet
    // try {
    //   // Import and initialize the library here
    //   const { GoogleSpreadsheet } = require("google-spreadsheet");
    //   const doc = new GoogleSpreadsheet("YOUR_SPREADSHEET_ID");

    //   // Authenticate with Google Sheets (You need to set up credentials)
    //   await doc.useServiceAccountAuth({
    //     client_email: "YOUR_CLIENT_EMAIL",
    //     private_key: "YOUR_PRIVATE_KEY",
    //   });

    //   // Load the sheet
    //   await doc.loadInfo();
    //   const sheet = doc.sheetsByIndex[0]; // Assuming you want to write to the first sheet

    //   // Add a new row with the email address
    //   await sheet.addRow({ Email: email });

    //   alert("Thank you for subscribing!");
    // } catch (error) {
    //   console.error("Error writing to Google Sheet:", error);
    //   alert("An error occurred while subscribing. Please try again later.");
    // }
  };

  const handleChange = (e: any) => {
    let Email = e.target.value;
    setEmail(Email);
  };
  return (
    <main className="overflow-hidden">
      <ParticleBackground />
      <div className="hidden md:absolute md:flex lg:absolute lg:flex xl:absolute xl:flex 2xl:flex 2xl:absolute ml-4">
        <Footer />
      </div>
      <div className="flex flex-col align-middle mt-12">
        <div className="flex flex-col sm:hidden md:hidden lg:hidden xl:hidden justify-center gap-8">
          <div className="flex justify-center w-40 xl:w-52 self-center">
            <div className="w-7/12 self-center drop-shadow-2xl shadow-black">
              <Image
                src={"/assets/QDeepLogo.svg"}
                alt="QDeep Logo"
                layout="responsive"
                width={80}
                height={80}
              />
            </div>
          </div>
          <div className="flex justify-center mx-4 j">
            <p className="text-md font-mono text-[#9F2323] font-bold w-11/12">
              At QDeep, we are shaping computings future with quantum
              technology. Our innovative traffic optimization tool, powered by
              quantum computing, enhances traffic flow. Stay tuned for updates
              as we redefine transportation efficiency.
            </p>
          </div>
        </div>
        <div className="hidden sm:flex-row sm:flex md:flex-row md:flex lg:flex-row lg:flex xl:flex-row xl:flex justify-center gap-8">
          <div className="mx-4 stroke-black stroke-2 drop-shadow-lg shadow-black">
            <p className="text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-mono text-red-600 w-96 font-[1000] stroke-black stroke-2 drop-shadow-lg shadow-black">
              At QDeep, we are shaping computings future with quantum
              technology. Our innovative traffic optimization tool, powered by
              quantum computing, enhances traffic flow.
            </p>
            <p className="text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-mono text-red-600 w-96 font-[1000] stroke-black stroke-2">
              Stay tuned for updates as we redefine transportation efficiency.
            </p>
          </div>
          <div className="flex justify-center w-40 xl:w-52 self-center">
            <div className="w-7/12 self-center">
              <Image
                src={"/assets/QDeepLogo.svg"}
                alt="QDeep Logo"
                layout="responsive"
                width={80}
                height={80}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <TimerContainer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          ></TimerContainer>
        </div>
        <div className="w-screen text-center mt-6">
          <p className="text-center font-mono text-xl font-[1000] text-red-600 stroke-black	">
            Enter your Email to subscribe our newsletter
          </p>
          <EmailInput handleClick={handleClick} handleChange={handleChange} />
        </div>
        <div className="flex justify-center md:hidden lg:hidden xl:hidden 2xl:hidden">
          <Footer />
        </div>
      </div>
    </main>
  );
}
