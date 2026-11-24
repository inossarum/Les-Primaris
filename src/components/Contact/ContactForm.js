import React from "react";
import {useRef} from "react";
import {init} from "@emailjs/browser";
import emailjs from "@emailjs/browser";

init(process.env.REACT_APP_ID);

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMess = document.querySelector(".form-message");

    emailjs
      .sendForm(
        "service_ymr202l",
        "template_3o6t3w9",
        form.current,
        process.env.REACT_APP_ID
      )
      .then(
        () => {
          form.current.reset();
          formMess.innerHTML =
            "<p className='success'> Votre message a été envoyé avec succès.</p>";

          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        },
        (error) => {
          console.error("Contact email failed:", error?.status || "unknown");
          formMess.innerHTML =
            "<p className='error'> Echec de l'envoi, veuillez réessayer. </p>";

          setTimeout(() => {
            formMess.innerHTML = "";
          }, 2500);
        }
      );
  };

  return (
    <>
      <div className="form-container">
        <div className="form-title-container">
          <h5>
            La faction Primaris peut sembler complexe d'un oeil extérieur.
            Beaucoup de choses sont encore en développement et cela restera
            ainsi tant que Star Citizen ne sera pas sorti. Si vous avez des
            interrogations, des demandes particulières ou des informations à
            nous transmettre, vous pouvez nous contacter en remplissant le
            formulaire ci-après. Les responsables de la faction vous répondront
            dès qu'ils le pourront.
          </h5>
        </div>
        <form ref={form} onSubmit={sendEmail} className="form-content">
          <ul className="individual-infos">
            <li>
              <label>Pseudo</label>
              <input
                type="text"
                name="fromName"
                required
                autoComplete="off"
                id="fromName"
                placeholder="Votre Pseudo..."
              />
            </li>
          </ul>

          <ul className="individual-infos">
            <li>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                id="email"
                placeholder="Votre Email"
              />
            </li>
            <li>
              <label>Message</label>
              <textarea
                name="message"
                id="mess"
                placeholder="Veuillez entrer votre message ici..."
              />
            </li>
            <input type="submit" value="Envoyer" className="submit-btn" />
          </ul>
        </form>
        <div className="form-message"></div>
      </div>
      <div className="social-network-container">
        <h3 className="social-network-container-title">
          Nos plateformes sociales & commerciales
        </h3>
        <ul>
          <li>
            <a
              href="https://www.guilded.gg/i/knDWL0DE"
              target="_blank"
              rel="noreferrer"
              title="guilded"
            >
              <img
                src="../assets/img/icons/guilded.webp"
                alt="icone de guilded"
              />
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/AXbKNPepk5"
              target="_blank"
              rel="noreferrer"
              title="discord"
            >
              <img
                src="../assets/img/icons/discord.webp"
                alt="icone de discord"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/1189118481266881"
              target="_blank"
              rel="noreferrer"
              title="facebook"
            >
              <img
                src="../assets/img/icons/facebook.webp"
                alt="icone de facebook"
              />
            </a>
          </li>

          <li>
            <a
              href="https://www.instagram.com/les_primaris/"
              target="_blank"
              rel="noreferrer"
              title="instagram"
            >
              <img
                src="../assets/img/icons/instagram.webp"
                alt="icone d'instagram"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@dyosorkan"
              target="_blank"
              rel="noreferrer"
              title="youtube"
            >
              <img
                src="../assets/img/icons/youtube.webp"
                alt="icone de youtube"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitch.tv/dyosorkan"
              target="_blank"
              rel="noreferrer"
              title="twitch"
            >
              <img
                src="../assets/img/icons/twitch.webp"
                alt="icone de twitch"
              />
            </a>
          </li>
        </ul>

        <ul>
          <li>
            <a
              href="https://twitter.com/LPrimaris"
              target="_blank"
              rel="noreferrer"
              title="twitter"
            >
              <img
                src="../assets/img/icons/twitter.webp"
                alt="icone de twitter"
              />
            </a>
          </li>
          <li>
            <a
              href="https://robertsspaceindustries.com/orgs/EMGP"
              target="_blank"
              rel="noreferrer"
              title="RSI EMGP"
            >
              <img src="../assets/img/icons/rsiemgp.webp" alt="icone de RSI" />
            </a>
          </li>
          <li>
            <a
              href="https://robertsspaceindustries.com/orgs/EXPS"
              target="_blank"
              rel="noreferrer"
              title="RSI EXPS"
            >
              <img src="../assets/img/icons/rsiexps.webp" alt="icone de RSI" />
            </a>
          </li>

          <li>
            <a
              href="https://www.redbubble.com/fr/people/LesPrimaris/shop"
              target="_blank"
              rel="noreferrer"
              title="red bubble"
            >
              <img
                src="../assets/img/icons/redbubble.webp"
                alt="icone de red bubble"
              />
            </a>
          </li>
          <li>
            <a
              href="https://steamcommunity.com/groups/LesPrimaris"
              target="_blank"
              rel="noreferrer"
              title="steam"
            >
              <img src="../assets/img/icons/steam.webp" alt="icone de steam" />
            </a>
          </li>
          <li>
            <a
              href="https://robertsspaceindustries.com/spectrum/community/EMGP"
              target="_blank"
              rel="noreferrer"
              title="spectrum"
            >
              <img
                src="../assets/img/icons/spectrum.webp"
                alt="icone de spectrum"
              />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ContactForm;
