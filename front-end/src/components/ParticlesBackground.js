import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: false,

        background: {
          color: "transparent",
        },

        particles: {
          number: {
            value: 35,
          },

          color: {
            value: "#ffffff",
          },

          opacity: {
            value: 0.25,
          },

          size: {
            value: { min: 2, max: 5 },
          },

          move: {
            enable: true,
            speed: 0.6,
          },

          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.15,
            width: 1,
          },
        },

        detectRetina: true,
      }}
    />
  );
}
