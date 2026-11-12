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
  <div className="info-box hover:-translate-y-0.5">
    {/* info text */}
    <p className="font-medium sm:text-xl text-center leading-relaxed">{text}</p>

    {/* info right arrow */}
    <Link
      to={link}
      className="neo-brutalism-white neo-btn group cursor-pointer"
      title={btnText}
    >
      <span className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 font-medium">
        {btnText}
      </span>
      <img
        src={arrow}
        alt="Arrow"
        className="w-4 h-4 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
      />
    </Link>
  </div>
);

// render content (based upon current user cursor location)
const renderContent: Record<HomeStage, ReactNode> = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lg">
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
