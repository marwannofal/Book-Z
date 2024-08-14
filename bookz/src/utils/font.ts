import { Manrope, Poppins, Lalezar, Rubik } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
const lalezar = Lalezar({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lalezar",
});
const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export { manrope, poppins, lalezar, rubik };
