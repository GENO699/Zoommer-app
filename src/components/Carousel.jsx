"use client";

import { Carousel } from "flowbite-react";
import Image from "../images/5fa86f4b-8f11-43f2-bc69-5f8bb109af34_Thumb.webp";
import ImageTwo from "../images/80bfcfa9-91a7-4da9-905d-83b74250e530_Thumb.webp";
import ImageThree from "../images/5557ec49-4355-4839-8a07-4c6bfbb3c802_Thumb.webp";
import ImageFour from "../images/200657ab-e908-44ef-9885-5f61538e6d77_Thumb.webp";
import ImageFive from "../images/892f85c3-80d6-458a-b9d4-e650578d0b6e_Thumb.webp";
import ImageSix from "../images/2e86b1ec-05a2-4a30-879c-44a3bb7b70ff_Thumb.webp";
import ImageSeven from "../images/438302c8-fc9d-4510-8920-07794c69db73_Thumb.webp";
import ImageEight from "../images/735bcea9-90f6-49d3-8937-4e694b66cb68_Thumb.webp";
import ImageNine from "../images/f9cd3a0a-ed1e-452d-98f8-f421125312af_Thumb.webp";

function Slider() {
  return (
    <div className="h-56 sm:h-64 xl:h-80 rounded-md 2xl:h-96 mt-2 ">
      <Carousel>
        <img src={Image} className="rounded-xl" alt="..." />
        <img src={ImageTwo} className="rounded-xl" alt="..." />
        <img src={ImageThree} className="rounded-xl" alt="..." />
        <img src={ImageFour} className="rounded-xl" alt="..." />
        <img src={ImageFive} className="rounded-xl" alt="..." />
        <img src={ImageSix} className="rounded-xl" alt="..." />
        <img src={ImageSeven} className="rounded-xl" alt="..." />
        <img src={ImageEight} className="rounded-xl" alt="..." />
        <img src={ImageNine} className="rounded-xl" alt="..." />
      </Carousel>
    </div>
  );
}
export default Slider;
