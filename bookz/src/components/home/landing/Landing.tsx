import Image from "next/image";
import Title from "./Title";
import LoginSignUpButton from "./LoginSignUpButtons";

const LandingPage = () => {
  return (
    <>
      <div className="">
        <Image
          src="/assets/landindImg.jpg"
          alt="home image"
          fill
          className="object-cover filter brightness-50"
          quality={100}
          priority
        />
      </div>
      <div className="h-full flex items-start justify-center p-4 md:p-0 text-sm">
        <div className="h-full w-full z-10 lg:max-w-screen-dt">
          <div className="h-full md:flex  justify-between items-center mx-9">
            <Title />
            <LoginSignUpButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
