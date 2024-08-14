import AddBookCard from "@/components/cards/addBookCard";
import Link from "next/link";
import Image from "next/image";
import MainLogo from "@/icons/layout/logo.svg";
import { lalezar } from "@/utils/font";
import InstagramLogo from "@/icons/layout/instagram.svg";
import FacebookLogo from "@/icons/layout/facebook.svg";
import TwitterLogo from "@/icons/layout/twitter.svg";

const Footer = () => {
  return (
    <footer className="pb-20 bg-select-border-gray w-full">
      <div className="flex justify-center bg-white">
        <div className="m-3 md:flex flex-col w-full lg:max-w-screen-dt">
          <div className="m-2 mx-4 ">
            {/* <p className="text-base font-bold my-4">Welcome to Book-Z!</p> */}
            <p className="font-normal text-base">
              Discover a world of books at Book-Z. Whether you're looking to
              swap your old favorites or find new reads, our platform connects
              book lovers with a passion for sharing. Easily manage your
              collection and explore recommendations tailored to your interests.
              {/*  Add books to your favorites for quick access anytime. */}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full">
        <AddBookCard />
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="flex justify-between md:flex-row pt-10 md:pt-12 w-full lg:max-w-screen-dt">
          <div className="px-4 md:ltr:pr-24 md:rtl:pl-24">
            <Link
              href="/"
              className="flex justify-start items-center gap-x-3 max-w-40"
            >
              <Image
                src={MainLogo}
                alt={"Book-Z logo"}
                className={`h-7 w-7 md:h-8 md:w-8`}
              />
              <span className={`mt-2 text-4xl ${lalezar.className}`}>
                {"Book-Z"}
              </span>
            </Link>
            <div className="text-base text-grey-15">
              &copy;{`${new Date().getFullYear()} Book-Z`}
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="text-base font-extrabold md:pb-2.5">Book-Z</div>
            <div className="flex flex-col text-sm font-normal md:flex-row divide-x-0 md:divide-x divide-grey-16 ">
              {[
                { title: "About Us ", link: "/about" },
                { title: "Contact Us", link: "/contact-us" },
                { title: "Privacy", link: "/privacy" },
                { title: "Terms of Use", link: "/terms" },
              ].map((_l, _i) => (
                <Link
                  key={_i}
                  href={_l.link}
                  className={
                    _i === 0
                      ? "pb-2 md:pb-0 md:ltr:pr-2 md:rtl:pl-2"
                      : "md:px-2 py-2 md:py-0"
                  }
                >
                  {_l.title}
                </Link>
              ))}
            </div>
            <div className="text-base font-extrabold pt-1 md:pt-7 md:pb-5">
              Follow Us
            </div>
            <div className="flex justify-start space-x-4 lg:pt-0 lg:col-end-13">
              {[
                {
                  logo: InstagramLogo,
                  link: "https://www.instagram.com",
                },
                { logo: TwitterLogo, link: "https://x.com/" },
                {
                  logo: FacebookLogo,
                  link: "https://web.facebook.com",
                },
              ].map((_l, _i) => (
                <Link key={_i} href={_l.link}>
                  <Image
                    src={_l.logo}
                    alt={"Social Logo"}
                    className={`h-6 w-6`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
