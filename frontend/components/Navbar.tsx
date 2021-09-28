import Link from "next/link";
import Image from "next/image";
import Wallet from "./Wallet";

const Navbar = () => {
  return (
    <nav className="bg-transparent p-4">
      <div className="mx-auto flex items-center">
        <div className="flex-1">
          <Link href="/">
            <a className="pl-28 flex items-center py-2 px-3 text-gray-700">
              <Image src="/stitches.svg" width="35px" height="35px" />
              <span className="font-semibold pl-2 text-xl">INFLOW</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-3 pr-28">
          <Link href="/add-course">
            <a className="py-2 px-3 text-gray-700 font-medium">Add Course</a>
          </Link>
          <Wallet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
