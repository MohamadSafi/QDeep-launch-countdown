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
    <main className="relative overflow-hidden">
      <ParticleBackground />
      <div className="absolute">
        <Footer />
      </div>
      <div className="flex flex-col align-middle mt-8">
        <div className="flex justify-center w-40 xl:w-60 self-center">
          <div className="w-7/12 self-center">
            <Image
              src={"/assets/QDeepLogo.svg"}
              alt="QDeep Logo"
              layout="responsive"
              width={100}
              height={100}
            />
          </div>
        </div>
        <p className="text-center text-[#9F2323] text-xl font-bold">QDeep</p>
        <p className="text-center">We are lunching soon</p>
        <div className="flex justify-center">
          <TimerContainer
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          ></TimerContainer>
        </div>
        <div className="w-screen text-center mt-6">
          <p className="text-center">
            Enter your Email to subscribe our newsletter
          </p>
          <EmailInput handleClick={handleClick} handleChange={handleChange} />
        </div>
      </div>
    </main>
  );
}
