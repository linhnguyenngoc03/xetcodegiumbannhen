import Link from "next/link";
import React from "react";

const StyledLink = ({ children, href, style }: any) => {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        ...style
      }}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
