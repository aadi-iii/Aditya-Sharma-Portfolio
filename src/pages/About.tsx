import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

// components
import { Cta, PageTitle } from "../components";

// constants
import { SKILLS, EXPERIENCES, SITE_NAME, EXTRA_LINKS } from "../constants";

import "react-vertical-timeline-component/style.min.css";

// about
const About = () => {
  return (
    <>
      {/* update site title */}
      <PageTitle title={`${SITE_NAME} | About me`} />

      {/* about section */}
      <section className="max-container">
        {/* about head */}
        <h1 className="head-text">
          Hello, I&apos;m{" "}
          <span className="blue-gradient_text font-semibold drop-shadow-sm">
            {SITE_NAME}
          </span>
        </h1>

        {/* professional title & tagline */}
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-lg font-semibold text-blue-600">
            {EXTRA_LINKS.title}
          </p>
          <p className="text-slate-600 italic font-medium">
            &ldquo;{EXTRA_LINKS.tagline}&rdquo;
          </p>
        </div>

        {/* quick info pills & resume link */}
        <div className="mt-4 flex flex-wrap gap-3 items-center text-sm">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-200 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-100/60 hover:shadow-xs transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default select-none">
            📍 {EXTRA_LINKS.location}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-100/60 hover:shadow-xs transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default select-none">
            🎓 Amity University (2024–2027)
          </span>
          <a
            href={EXTRA_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-50 text-pink-700 font-medium border border-pink-200 hover:bg-pink-100 hover:border-pink-300 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            📸 Instagram
          </a>
          <a
            href={EXTRA_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-600/20 active:translate-y-0 active:scale-[0.99] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          >
            📄 View Resume
          </a>
        </div>

        {/* about bio paragraphs */}
        <div className="mt-6 flex flex-col gap-4 text-slate-600 leading-relaxed text-base">
          <p>
            I&apos;m Aditya Sharma, a Computer Science Engineering student at
            Amity University with a passion for web development and building
            practical digital solutions.
          </p>
          <p>
            I enjoy transforming ideas into interactive, user-friendly web
            applications. My experience includes frontend development,
            JavaScript, API integration, and working with modern technologies
            like FastAPI and Firebase.
          </p>
          <p>
            I&apos;ve developed multiple projects independently and collaborated
            on technical projects, continuously exploring new technologies and
            improving my development skills.
          </p>
          <p>
            I&apos;m currently focused on expanding my full-stack development
            knowledge, creating meaningful digital experiences, and exploring
            opportunities to grow as a developer.
          </p>
        </div>

        {/* about skills */}
        <div className="py-12 flex flex-col">
          {/* skills head */}
          <h3 className="subhead-text">My Skills</h3>
          <p className="mt-2 text-slate-500">
            Technologies, programming languages, and tools I work with:
          </p>

          {/* skills list */}
          <div className="mt-12 flex flex-wrap gap-8 sm:gap-10">
            {/* map over each skill */}
            {SKILLS.map((skill) => (
              <div
                className="group flex flex-col items-center gap-2 cursor-pointer"
                key={`skill_${skill.name}`}
              >
                <div className="block-container w-20 h-20 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                  {/* bg btn */}
                  <div className="btn-back rounded-xl" />
                  {/* skill icon */}
                  <div
                    className="btn-front rounded-xl flex justify-center items-center"
                    title={`${skill.name} (${skill.type})`}
                  >
                    <img
                      src={skill.imageUrl}
                      alt={skill.name}
                      className="w-1/2 h-1/2 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors duration-300 text-center max-w-[80px] truncate select-none">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* work experience & education */}
        <div className="py-12">
          {/* experience head */}
          <h3 className="subhead-text">Experience &amp; Education</h3>

          {/* experience text */}
          <div className="mt-3 flex flex-col gap-2 text-slate-500">
            <p>
              My academic journey at Amity University, hands-on internship at
              EWB Edutech, and technical engineering milestones:
            </p>
          </div>

          {/* experience list */}
          <div className="mt-12 flex">
            <VerticalTimeline>
              {/* map over each experience */}
              {EXPERIENCES.map((experience) => (
                <VerticalTimelineElement
                  key={`Experience_${experience.title}`}
                  date={experience.date}
                  icon={
                    <div className="flex justify-center items-center w-full h-full transition-transform duration-300 hover:scale-110">
                      {/* experience icon */}
                      <img
                        src={experience.icon}
                        alt={experience.company_name}
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                  }
                  iconStyle={{
                    background: experience.iconBg,
                  }}
                  contentStyle={{
                    borderBottom: "8px",
                    borderStyle: "solid",
                    borderBottomColor: experience.iconBg,
                    boxShadow: "none",
                  }}
                >
                  {/* experience info */}
                  <div>
                    {/* experience title */}
                    <h3 className="text-black text-xl font-poppins font-semibold">
                      {experience.title}
                    </h3>

                    {/* experience company name */}
                    <p
                      className="text-black-500 font-medium font-base"
                      style={{ margin: 0 }}
                    >
                      {experience.company_name}
                    </p>
                  </div>

                  {/* experience points */}
                  <ul className="my-5 list-disc ml-5 space-y-2">
                    {/* map over each experience point */}
                    {experience.points.map((point, i) => (
                      <li
                        key={`Experience_${experience.title}_point_${i + 1}`}
                        className="text-black-500/70 font-normal pl-1 text-sm leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </div>

        {/* horizontal separator */}
        <hr className="border-slate-200" />

        {/* call-to-action */}
        <Cta />
      </section>
    </>
  );
};

export default About;
