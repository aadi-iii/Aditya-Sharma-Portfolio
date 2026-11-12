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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
          {/* map over projects */}
          {PROJECTS.map((project) => (
            <div
              key={`Project_${project.name}`}
              className="w-full flex flex-col justify-between p-6 rounded-2xl bg-white shadow-xs border border-slate-100 hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between">
                  {/* project 3d icon container */}
                  <div className="block-container w-14 h-14">
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
                        className="w-1/2 h-1/2 object-contain"
                      />
                    </div>
                  </div>

                  {/* category badge */}
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {project.category}
                  </span>
                </div>

                {/* project info */}
                <div className="mt-5 flex flex-col">
                  {/* project name */}
                  <h4 className="text-xl font-poppins font-semibold text-slate-800">
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
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
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
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors text-sm"
                  title={project.linkText || "View Project"}
                >
                  <span>{project.linkText || "Live Link"}</span>
                  <img
                    src={arrow}
                    alt="Arrow"
                    className="w-3.5 h-3.5 object-contain"
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
