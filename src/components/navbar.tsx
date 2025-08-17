import { Link } from "@heroui/link";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full p-3 sm:p-6">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-5 items-center justify-between">
        <h1 className="text-lg font-semibold">OneTap</h1>
        <div className="flex gap-4">
          <Link
            href="/profile"
            underline={location.pathname === "/profile" ? "always" : "hover"}
          >
            Profiles
          </Link>
          <Link
            href="/list"
            underline={location.pathname === "/list" ? "always" : "hover"}
          >
            Lists
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
