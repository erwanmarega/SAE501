import React from "react";
import Logo from "./ui/logo";
import ThemeToggle from "./ui/theme-toggle";

const Header = () => {
  return (
    <div className="flex w-full h-16 items-center">
      <div>
        <h1>Bienvenue Erwan </h1>
      </div>
      <div>
        <Logo />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
