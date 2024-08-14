import { Inter } from "next/font/google";
import Head from "next/head";
import Landing from "../components/home/landing/Landing";
import Tabs from "@/components/home/Tabs";
import Cards from "@/components/home/Cards";
import Categories from "@/components/home/categories";
import ImageGallery from "@/components/cards/imageGallery";
import useScrollFadeIn from "@/hooks/useScrollFadeIn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useScrollFadeIn();

  return (
    <div>
      <Head>
        <title>Book-Z</title>
        <meta name="description" content="Home description" />
      </Head>
      <div className="md:text-xs relative md:h-[550px]">
        <Landing />
      </div>
      <div className="px-4 lg:px-0 mt-10 lg:mt-14 flex justify-center flex-col m-2">
        {/* <Tabs /> */}
        <ImageGallery />
        <Categories />
        <Cards />
      </div>
    </div>
  );
}
