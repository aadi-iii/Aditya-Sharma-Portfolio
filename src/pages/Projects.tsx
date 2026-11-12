import { Link } from "react-router-dom";

// components
import { Cta, PageTitle } from "../components";

// constants
import { PROJECTS, SITE_NAME } from "../constants";

// icons
import { arrow } from "../assets/icons";

// projects
const Projects = () => {
  return (
    <>
      {/* update site title */}
      <PageTitle title={`${SITE_NAME} | Projects`} />

      {/* projects section */}
      <section className="max-container">
        {/* projects head */}
        <h1 className="head-text">
          My{" "}
          <span className="blue-gradient_text font-semibold drop-shadow-sm">
            Projects
          </span>
        </h1>

        {/* projects text */}
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Here are some of the key web applications, full-stack platforms,
            interactive dashboards, and hardware prototypes I have built. From
            full-stack architectures with Firebase and FastAPI to intuitive
            JavaScript interfaces, explore my work below:
          </p>
        </div>

        {/* projects list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 my-16">
          {/* map over projects */}
          {PROJECTS.map((project) => (
            <div
              key={`Project_${project.name}`}
              className="group relative w-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1.5 active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* project 3d icon container */}
                  <div className="block-container w-14 h-14 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    {/* project icon bg */}
                    <div className={`btn-back rounded-xl ${project.theme}`} />

                    {/* project icon */}
                    <div
                      className="btn-front rounded-xl flex justify-center items-center"
                      title={project.name}
                    >
                      <img
                        src={project.iconUrl}
                        alt={project.name}
                        className="w-1/2 h-1/2 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* category badge */}
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 transition-colors duration-200 group-hover:bg-blue-50 group-hover:text-blue-700">
                    {project.category}
                  </span>
                </div>

                {/* project info */}
                <div className="mt-5 flex flex-col">
                  {/* project name */}
                  <h4 className="text-xl font-poppins font-semibold text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
                    {project.name}
                  </h4>

                  {/* project description */}
                  <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* tech badges */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100/70 hover:bg-blue-100 hover:border-blue-200 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 cursor-default select-none"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* project link */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between font-poppins">
                <Link
                  to={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 text-sm transition-colors duration-200"
                  title={project.linkText || "View Project"}
                >
                  <span className="relative">
                    {project.linkText || "Live Link"}
                  </span>
                  <img
                    src={arrow}
                    alt="Arrow"
                    className="w-3.5 h-3.5 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* horizontal separator */}
        <hr className="border-slate-200" />

        {/* call-to-action */}
        <Cta />
      </section>
    </>
  );
};

export default Projects;
