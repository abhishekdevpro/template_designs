import React from "react";
import Link from "next/link";
import template1 from "./templateimages/template1.png";
import template2 from "./templateimages/template2.png";
import template3 from "./templateimages/template3.png";
import template4 from "./templateimages/template4.png";
import template5 from "./templateimages/template5.png";
import template6 from "./templateimages/template6.png";
import template7 from "./templateimages/template7.png";
import template8 from "./templateimages/template8.png";
import template9 from "./templateimages/template9.png";
import template10 from "./templateimages/template10.png";

import Image from "next/image";

const Templatelistpage = () => {
  const boxes = [
    <Link href="" key="box1">
      <div className="bg-[#002a48] shadow-indigo-900 shadow-xl rounded-lg text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template1}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box2">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template2}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box3">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template3}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box4">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template4}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box5">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template5}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box6">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template6}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box7">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template7}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box8">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template8}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box9">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template9}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
    <Link href="" key="box10">
      <div className="bg-[#002a48] rounded-lg shadow-xl shadow-indigo-900 text-center text-white cursor-pointer text-3xl font-semibold box-hover-effect">
        <Image
          src={template10}
          style={{ height: "300px", width: "240px" }}
          alt="logo"
        />
      </div>
    </Link>,
  ];

  return (
    <div className="p-2 md:p-6 flex flex-wrap justify-center gap-16 mt-10">
      {boxes.map((box, index) => box)}
    </div>
  );
};

export default Templatelistpage;
