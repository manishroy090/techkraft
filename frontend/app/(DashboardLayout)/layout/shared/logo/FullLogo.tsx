"use client";

import Image from "next/image";

const FullLogo = () => {
  return (
    <>
      {/* Dark Logo */}
      <Image
        src="/hrm_image/newlogo.svg"
        alt="logo"
        width={204}
        height={10}
        className="block dark:hidden rtl:scale-x-[-1]"
      />
      {/* Light Logo */}
      <Image
        src="/hrm_image/newlogo.svg"
        alt="logo"
        width={204}
        height={10}
        className="hidden dark:block rtl:scale-x-[-1]"
      />
    </>
  );
};

export default FullLogo;
