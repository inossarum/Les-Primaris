import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import {useCallback} from "react";

const MilitaryParticules = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div>
      <Particles
        id="ts-military-particles"
        init={particlesInit}
        loaded={particlesLoaded}
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
              value: ["#829dff", "#3a92ff", "#3d64ff", "#0033ff"],
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
      <div className="title-container">
        <div className="logo-container">
          <img
            src="../assets/img/exercitusPrimaris.webp"
            alt="blason de l'Exercitus Primaris"
          />
        </div>
        <h1>Bienvenue dans l'Exercitus Primaris</h1>
        <div className="btn-container">
          <a href="#whoAreWe">
            <i className="fa-sharp fa-solid fa-arrow-down"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MilitaryParticules;
