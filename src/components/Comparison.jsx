/* eslint-disable no-unused-vars */
import React from "react";
import compareimg from "../images/compare-card.svg";

function Comparison() {
  return (
    <div>
      <button className="w-[45px] h-[40px] bg-gray-200 flex justify-center items-center rounded-md dark:bg-slate-700  ">
        <img className="dark:text-white" src={compareimg} alt="compare image" />
      </button>
    </div>
  );
}

export default Comparison;
