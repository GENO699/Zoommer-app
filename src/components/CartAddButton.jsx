// CartAddButton.jsx
import React from "react";
import { BsCart2 } from "react-icons/bs";

function CartAddButton({ product }) {
  return (
    <div>
      <button className="w-[100px] h-[40px] flex justify-center items-center gap-2 text-[13px] bg-orange-400 rounded-md font-semibold dark:bg-slate-700">
        <BsCart2 /> დამატება
      </button>
    </div>
  );
}

export default CartAddButton;
