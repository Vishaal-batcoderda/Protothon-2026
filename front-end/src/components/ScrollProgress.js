import { useEffect, useState } from "react";

export default function ScrollProgress() {

  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.scrollY / totalHeight) * 100;

      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{ width: `${scroll}%` }}
      className="
      fixed top-0 left-0
      h-1
      bg-white
      z-[999]"
    />
  );
}
