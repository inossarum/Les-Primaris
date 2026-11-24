import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import {useCallback} from "react";

const Particules = () => {
  const particlesInit = useCallback((engine) => loadFull(engine), []);

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0,
          },

          background: {color: "none"},
          fpsLimit: 120,
          interactivity: {
            detectsOn: "window",
            events: {
              resize: true,
            },
          },
          emitters: {
            direction: "top",
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.1,
            },
            rate: {
              delay: 0.2,
              quantity: 10,
            },
            size: {
              width: 100,
              height: 0,
            },
            position: {
              y: 100,
              x: 50,
            },
          },
          particles: {
            color: {
              value: ["#ffed9d", "#ffda34", "#ff9334", "#ff7700"],
            },
            size: {
              value: {min: 1, max: 3},
            },
            stroke: {
              opacity: 0,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "destroy",
                top: "none",
              },
              gravity: {
                enable: true,
                acceleration: -0.5,
              },
              random: false,
              speed: {min: 10, max: 30},
              straight: false,
            },
            opacity: {
              value: 1,
            },

            shape: {
              type: "circle",
            },
          },

          detectRetina: true,
        }}
      />
      <div id="civilian-particules-background"></div>
      <div className="title-container">
        <div className="logo-container">
          <img
            src="../assets/img/phoenix.webp"
            alt="phoenix de la faction Primaris"
          />
        </div>
        <h1>Bienvenue dans la faction Primaris</h1>
        <div className="btn-container">
          <a href="#whoAreWe">
            <i className="fa-sharp fa-solid fa-arrow-down"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Particules;
