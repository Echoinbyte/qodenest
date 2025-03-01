import Image from "next/image";
import React from "react";
import QUANBAS_LOGO from "../../public/images/QUANBAS.png";
import Link from "next/link";

function Logo() {
  return (
    <div className="flex items-center ">
      <Link href={'/'}>
        <Image
          src={QUANBAS_LOGO}
          alt="QUANBAS_LOGO"
          width={50}
          height={50}
          priority={false}
        />
      </Link>
    </div>
  );
}

export default Logo;
