import React from "react";

interface inputProps {
  handleClick(): void;
  handleChange(e: any): void;
}

export const EmailInput = ({ handleClick, handleChange }: inputProps) => {
  return (
    <div className="z-6 mx-auto space-y-4 flex flex-col md:flex-row justify-center items-center md:space-y-0 w-11/12 mt-4">
      <input
        className="text-xl md:text-2xl font-mono outline-none px-2 py-1 w-5/12 rounded-lg mr-4 border-2 border-[#343650] text-black"
        name="email"
        type="email"
        placeholder="Enter Your Email"
        onChange={handleChange}
        min={0}
        required
      />

      <button
        type="submit"
        onClick={handleClick}
        className="bg-rose-300 text-xl font-semibold font-redhat px-4 py-2 md:text-xl rounded-xl text-rose-500 hover:bg-rose-500 hover:text-rose-100 transition duration-300 ease-in"
      >
        Subscribe
      </button>
    </div>
  );
};
