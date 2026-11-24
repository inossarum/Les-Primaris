import {loadFull} from "tsparticles";
import Particles from "react-tsparticles";
import {useCallback} from "react";
import ContactForm from "./ContactForm";

const ParticulesContact = () => {
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
    <>
      <Particles
        id="tsparticles-contact"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0,
          },

          background: {color: "none"},
          fpsLimit: 100,
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
              quantity: 15,
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
      <div className="contact-title-container">
        <h2 className="contact-title">Nous contacter</h2>
      </div>
      <div className="contact-form-general-container">
        <ContactForm />
      </div>
      <div className="social-networks-container"></div>
    </>
  );
};

export default ParticulesContact;
