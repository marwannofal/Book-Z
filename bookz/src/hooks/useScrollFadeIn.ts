import { useEffect } from "react";

const useScrollFadeIn = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    const options = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach((element) => observer.observe(element));
  }, []);
};

export default useScrollFadeIn;
