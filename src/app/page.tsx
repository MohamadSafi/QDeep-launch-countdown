"use client";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";
import { TimerContainer } from "@/components/TimerContainer";
import Image from "next/image";
import { EmailInput } from "@/components/EmailInput";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

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
    try {
      const serviceAccountAuth = new JWT({
        email: "bott-138@motaz-users.iam.gserviceaccount.com",
        key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC555W8BcfLJXxz\n5ysKdnxj1ZWh/PZZcceot+wQAW8V6Ux1qur0J2AUb6ZSMsNeRpndI5xsfQf+lvEV\nvfl3CzgO//ecCpJ61bD/Z8N9mgpiVcnsSexQpZlVYMjBaUc+9CrjRx75NYHRnPp5\n8jsPFuPxBbizP2typfZgaMPU6lE0/bXkVE8caLO6c21Oi6fUcPx7BzHNZA/BofWm\nrtqierL+4AoASHv1mmhUVCMW1Xgc8tPegCADnb1rOoXnZrnFCqkecjz3anwRJOT4\n+rWJkf9hUkfr9AFCKKqBbodDJS6RcZTFzCe1lUMLdvvzG7wuEat3vurFLHluev+X\nqVST4UddAgMBAAECggEAG20980MkDoW9hmj2ueCwqdbvMDqeiqQlaXAXCOZ5QdGN\nSPfaGYK8o080icB4/83pMc2o7H2Gwin5L/S62vQCBX6AhJovsaUYq5mepwdknEzd\nUTm3vk8sH8M7YwN58iD6OdU6jdg1ypu+/WI+EdQV9W9baECFROEUx/T03VLjf65l\nOAcEauMmwlVHEpR2AEvObsEFrppllEqH1D9oSdMtWqmTGkDAQN2LjnBwOvWSbH0w\nPVPtmmhSf6fINV9TJWe39pLvzU1rllSmjeJrzn1B3EctxvHmtrjbiL0nSyXsxtGK\nRLTALfjo6IbMiEwaSBfFK4OCNjgEufyIURYumXEP2QKBgQDd2iOMoQN9aJuTp3Eq\nH5/R7nIEs5AN000HCDJnI1xynKlLDc2hfqUzfwOKGUN8Yeq4NKe+hUi6KhiSjw16\nMs111zIkdO2wSZJXyK09IUYhPtmMJ6g4G1mQ4fuRYv+4/6uYHQqRBvccwBvC3toX\nD6nFOW5BgGvtAYgtrJ+crGAZKQKBgQDWhPi3Qh33FhcREP2ujmka9z8pGXtbh+3J\nnd1BxesxP+h5AzsCqsCV1scf0Hp7PhH8DKc1SavTq0xUqE1EWCHTltEKgO7E9+S2\nffDLrGnbYU6nQcyV9imBfWGhX2i7mfWreVrrlNwfTlzUc1asHDNE8A0BoTQzpdxW\n7daDcYFfFQKBgDBSqnmgPMVdOr3/s9uMBeDRQk6Z2h/YzadhdrEWd7WTQCDUAd1S\nW6OK3/d9p0B5h4nWFk+ecofyUWXi+PmMBUrMs+RS/87tR44NbQaqr77gFLy9ipum\nAW1Ye9ZgLPlb30GD2eBbFwpRIfrhVbm+NKl75/MmiNuYANSKDD4xIcF5AoGAY9Zs\n/rU5xvYz9BBpUGUdC5zIe3NNkxLXGz9qayMWy8wHgNJ9E0eu682SzP61EkiYDCtD\nYqyP2KpfkwLlOwqda6FEVtQcy/TnL/u7Jr9uYNiPx437DkwLkyVsW7NQxgbobE7F\nfuC/9Z393C51xxI01j+2feyto9/shVSZwoEACeUCgYAqfkee6y9NOytG2WVgfv1L\n0JEyMGCXehajqr/8oVvUxMOGPt96c3T+Yy0eObzoK4GTwairYH13xSOLGhfko3SV\nT8rY+pvaYgJh+g7WYgmAWCr0TQ98duiirSEGePvd9X12VV83WVfRjl+S33zP7102\n7tGnY9laYGoSmp8fYllQpw==\n-----END PRIVATE KEY-----\n",
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
      console.log("auth done");

      const doc = new GoogleSpreadsheet(
        "1J-p4RTXUL7i2vZFtF9Zacq1PoyWrWqRqji5EjQgEB6c",
        serviceAccountAuth
      );

      // Authenticate with Google Sheets (You need to set up credentials)

      // Load the sheet
      await doc.loadInfo();
      const sheet = doc.sheetsByIndex[0]; // Assuming you want to write to the first sheet

      // Add a new row with the email address
      await sheet.addRow({ Email: email });

      alert("Thank you for subscribing!");
    } catch (error) {
      console.error("Error writing to Google Sheet:", error);
      alert("An error occurred while subscribing. Please try again later.");
    }
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
