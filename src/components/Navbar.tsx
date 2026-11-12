import { NavLink } from "react-router-dom";

import { EXTRA_LINKS, SIDEBAR_LINKS, SITE_NAME } from "../constants";
import { github, linkedin, instagram } from "../assets/icons";

// navbar
const Navbar = () => {
  return (
    <header className="header gap-5">
      {/* brand logo */}
      <NavLink
        to="/"
        className="size-10 min-w-10 shrink-0 aspect-square rounded-xl bg-white items-center justify-center flex font-bold shadow-md hover:shadow-lg hover:shadow-blue-500/15 hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        title={SITE_NAME}
      >
        <p className="blue-gradient_text font-extrabold text-lg select-none">
          {SITE_NAME.split(" ")[0][0] + "" + SITE_NAME.split(" ")[1][0]}
        </p>
      </NavLink>

      {/* nav links & social icons */}
      <nav className="flex text-base sm:text-lg gap-4 sm:gap-7 font-medium items-center justify-center">
        {SIDEBAR_LINKS.map((link) => (
          <NavLink
            to={link.route}
            className={({ isActive }) =>
              `relative py-1 text-sm sm:text-base font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group ${
                isActive ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`
            }
            title={link.label}
            key={`Link_${link.label}`}
          >
            {({ isActive }) => (
              <>
                <span>{link.label}</span>
                {/* Subtle animated underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}

        {/* Social Media Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2 ml-1">
          {/* LinkedIn */}
          <a
            href={EXTRA_LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            title="LinkedIn Profile"
            className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-white/80 hover:shadow-xs hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group"
          >
            <img
              src={linkedin}
              alt="LinkedIn"
              className="w-5 h-5 object-contain rounded-xs transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3"
            />
          </a>

          {/* Instagram */}
          <a
            href={EXTRA_LINKS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            title="Instagram Profile"
            className="p-1.5 rounded-lg hover:bg-white/80 hover:shadow-xs hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group"
          >
            <img
              src={instagram}
              alt="Instagram"
              className="w-5 h-5 object-contain rounded-xs transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-3"
            />
          </a>

          {/* GitHub */}
          <a
            href={EXTRA_LINKS.source_code}
            target="_blank"
            rel="noreferrer noopener"
            title="GitHub Profile"
            className="p-1.5 rounded-lg hover:bg-white/80 hover:shadow-xs hover:scale-110 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group"
          >
            <img
              src={github}
              alt="GitHub"
              className="w-5 h-5 object-contain transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
