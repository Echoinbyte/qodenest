import Image from "next/image";
import React from "react";
import QUANBAS_LOGO from "../../public/images/QUANBAS.png";

function Logo() {
  return (
    <div className="flex items-center ">
      <Image src={QUANBAS_LOGO} alt="QUANBAS_LOGO" width={50} height={50} />
    </div>
  );
}

export default Logo;
