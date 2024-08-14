import { poppins, rubik } from "@/utils/font";
import { useEffect, useState } from "react";

const TITLES = [
  "Discover New Worlds: Exchange Books with Fellow Readers.",
  "Expand Your Library: Join Our Book Exchange Community Today.",
  "Connect Through Stories: Swap Books with Other Enthusiasts.",
  "Share the Joy of Reading: Trade Books and Discover Hidden Gems.",
  "Build Your Bookshelf: Exchange Books and Connect with Bibliophiles.",
  "Unlock New Adventures: Trade Books and Explore Diverse Narratives.",
  "Join the Literary Exchange: Connect with Readers and Swap Stories.",
  "Dive into New Narratives: Swap Books and Expand Your Horizons.",
  "Exchange Books, Share Stories: Connect with Fellow Book Lovers.",
  "Trade Tales: Join Our Book Exchange Community and Dive into New Worlds.",
];

const Title = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextCharIndex = typedText.length;
      if (nextCharIndex < TITLES[titleIndex].length) {
        setTypedText(
          (prevTypedText) => prevTypedText + TITLES[titleIndex][nextCharIndex]
        );
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setFadeIn(false);
          setTimeout(() => {
            setTitleIndex((prevIndex) => (prevIndex + 1) % TITLES.length);
            setTypedText("");
            setFadeIn(true);
          }, 1000); // Adjust delay before next text appears
        }, 4000); // Adjust duration before fade-out
      }
    }, 100); // Adjust typing speed (milliseconds per character)

    return () => clearInterval(interval);
  }, [titleIndex, typedText]);

  return (
    <div
      className={`mt-2 md:mt-7 mb-7 font-bold ltr:${poppins.className} rtl:${rubik.className} lg:max-w-[50%] md:max-w-[50%]`}
    >
      <h2 className={`text-left text-lg lg:text-4xl text-white`}>
        Hello There
      </h2>
      <div className="h-6">
        <p
          className={`text-left my-6 text-sm lg:text-2xl md: text-white ltr:tracking-widest md:tracking-[2.5px] ${
            fadeIn ? "animate-fadeIn" : "animate-fadeOut"
          }`}
        >
          {typedText}
          <span className="typing-cursor animate-blink">|</span>
        </p>
      </div>
    </div>
  );
};

export default Title;
