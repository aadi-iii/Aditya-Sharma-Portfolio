import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { arrow } from "../assets/icons";
import { SITE_NAME } from "../constants";

type InfoBoxProps = {
  text: string;
  link: string;
  btnText: string;
};

type HomeStage = 1 | 2 | 3 | 4;

type HomeInfoProps = {
  currentStage: HomeStage;
};

// info box
const InfoBox = ({ text, link, btnText }: InfoBoxProps) => (
  <div className="info-box">
    {/* info text */}
    <p className="font-medium sm:text-xl text-center">{text}</p>

    {/* info right arrow */}
    <Link to={link} className="neo-brutalism-white neo-btn" title={btnText}>
      {btnText}
      <img src={arrow} alt="Arrow" className="w-4 h-4 object-contain" />
    </Link>
  </div>
);

// render content (based upon current user cursor location)
const renderContent: Record<HomeStage, ReactNode> = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I am <span className="font-semibold">{SITE_NAME.split(" ")[0]}</span> 👋
      <br />
      Aspiring Full-Stack Web Developer &amp; CSE Student from India.
    </h1>
  ),
  2: (
    <InfoBox
      text="CSE student at Amity University building digital experiences through code & creativity."
      link="/about"
      btnText="Learn more"
    />
  ),
  3: (
    <InfoBox
      text="Developed full-stack web platforms, interactive dashboards, and IoT prototypes. Curious about my work?"
      link="/projects"
      btnText="Visit my portfolio"
    />
  ),
  4: (
    <InfoBox
      text="Looking for an energetic developer or have a project in mind? Let's connect!"
      link="/contact"
      btnText="Let's talk"
    />
  ),
};

// home info
const HomeInfo = ({ currentStage }: HomeInfoProps) => {
  return renderContent[currentStage] || null;
};

export default HomeInfo;
