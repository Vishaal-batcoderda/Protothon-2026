import { useEffect, useState } from "react";

export default function Countdown() {

  const targetDate = new Date("2026-03-10T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);

  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const box =
    "bg-white border border-gray-300 rounded-xl shadow-sm p-4 text-center";

  return (

    <div className="w-full">

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

        <div className={box}>
          <p className="text-3xl font-bold text-black">{days}</p>
          <p className="text-xs text-gray-500 tracking-wider">DAYS</p>
        </div>

        <div className={box}>
          <p className="text-3xl font-bold text-black">{hours}</p>
          <p className="text-xs text-gray-500 tracking-wider">HOURS</p>
        </div>

        <div className={box}>
          <p className="text-3xl font-bold text-black">{minutes}</p>
          <p className="text-xs text-gray-500 tracking-wider">MINUTES</p>
        </div>

        <div className={box}>
          <p className="text-3xl font-bold text-black">{seconds}</p>
          <p className="text-xs text-gray-500 tracking-wider">SECONDS</p>
        </div>

      </div>

    </div>

  );
}
