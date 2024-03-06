import ButtonLogout from "./ButtonLogout";
import Logo from "./Logo";
import NavMyLibraryLinks from "./NavMyLibraryLinks";

import NavMylibraryDropdown from "./NavMylibraryDropdown";

export default function NavMyLibrary() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 text-sm px-2">
      <div className="w-full max-w-4xl relative flex sm:justify-center justify-end items-center ">
        <Logo />
        <NavMyLibraryLinks />
        <div className="absolute right-4 hidden sm:block">
          <ButtonLogout />
        </div>
        <NavMylibraryDropdown />
      </div>
    </nav>
  );
}
