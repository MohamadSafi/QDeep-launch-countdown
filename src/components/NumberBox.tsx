import React from "react";

interface numProp {
  num: string | number;
  unit: string;
  flip: boolean;
}

export const NumberBox = ({ num, unit, flip }: numProp) => {
  return (
    <div className="flex flex-col items-center mt-4 px-2">
      <div className=" relative bg-transparent flex flex-col items-center justify-center rounded-lg w-24 h-24 lg:w-24 lg:h-24 xl:w-32 xl:h-32 text-2xl md:text-4xl mt-4 ">
        <div className="rounded-t-lg rounded-b-lg bg-[#343650] w-full h-full"></div>

        <div className="text-5xl absolute text-[#9F2323] z-10 font-bold font-redhat md:text-7xl font-mono ">
          {num}
        </div>

        <div className=" rounded-b-lg rounded-t-lg bg-[#2c2e3f] w-full h-full"></div>

        <div
          className={`absolute w-full h-1/2 top-0 rounded-t-lg z-5 ${
            flip ? "animate-flip bg-[#343650]" : "bg-transparent"
          }`}
        ></div>
        {/* Two Small Dots */}
        <div className="absolute -right-1 top-[60px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]"></div>
        <div className="absolute -left-1 top-[60px] rounded-full w-[12px] h-[12px] bg-[#1e1f29]"></div>
      </div>
      <p className="text-lg mt-3 font-semibold md:text-2xl ">{unit}</p>
    </div>
  );
};
