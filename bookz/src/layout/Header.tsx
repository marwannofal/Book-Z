import { lalezar } from "@/utils/font";
import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/icons/layout/logo.svg";

interface HeaderProps {
  parentClass: string;
}

const Header: React.FC<HeaderProps> = ({ parentClass }) => {
  const pagesButtons = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Books",
      route: "/books",
    },
    {
      title: "Profile",
      route: "/profile",
    },
    {
      title: "About",
      route: "/about",
    },
  ];
  return (
    <header className={`${parentClass}`}>
      {/* <div>for head translation or something like that </div> */}
      <nav className="container mx-auto py-3 flex justify-between items-center lg:max-w-screen-dt ">
        <div className="flex flex-row items-center justify-center gap-8">
          <Link
            className="flex items-center justify-center px-2 md:px-0"
            href="/"
          >
            <Image
              src={MainLogo}
              alt="Book-Z logo"
              className={`h-7 w-7 md:h-8 md:w-8 `}
            />
            <div
              className={`mt-2 text-3xl md:text-4xl pl-1 ${lalezar.className}`}
            >
              Book-Z
            </div>
          </Link>
          <div className="hidden flex-row lg:flex justify-center items-center">
            {pagesButtons.map((_b, _index) => (
              <div
                key={`${_index}-${_b.title}`}
                className="group/main inline-block relative"
              >
                <Link
                  href={_b.route}
                  className="transition duration-1000 font-semibold border-b-2 border-transparent py-4 px-4 inline-flex items-center group-hover/main:font-bold group-hover/main:border-blue-1"
                >
                  {_b.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
