import { NavLink } from "react-router-dom";

import { EXTRA_LINKS, SIDEBAR_LINKS, SITE_NAME } from "../constants";
import { github, linkedin } from "../assets/icons";

// navbar
const Navbar = () => {
  return (
    <header className="header gap-5">
      {/* brand logo */}
      <NavLink
        to="/"
        className="size-10 min-w-10 shrink-0 aspect-square rounded-lg bg-white items-center justify-center flex font-bold shadow-md hover:scale-105 transition-transform"
        title={SITE_NAME}
      >
        <p className="blue-gradient_text font-extrabold text-lg">
          {SITE_NAME.split(" ")[0][0] + "" + SITE_NAME.split(" ")[1][0]}
        </p>
      </NavLink>

      {/* nav links */}
      <nav className="flex text-base sm:text-lg gap-4 sm:gap-7 font-medium items-center justify-center">
        {SIDEBAR_LINKS.map((link) => (
          // each nav link
          <NavLink
            to={link.route}
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-slate-700 hover:text-blue-500 transition-colors"
            }
            title={link.label}
            key={`Link_${link.label}`}
          >
            {link.label}
          </NavLink>
        ))}

        {/* LinkedIn */}
        <a
          href={EXTRA_LINKS.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          title="LinkedIn Profile"
          className="hover:opacity-80 transition-opacity"
        >
          <img src={linkedin} alt="LinkedIn" className="w-5 h-5 object-contain rounded-xs" />
        </a>

        {/* GitHub */}
        <a
          href={EXTRA_LINKS.source_code}
          target="_blank"
          rel="noreferrer noopener"
          title="GitHub Profile"
          className="hover:opacity-80 transition-opacity"
        >
          <img src={github} alt="GitHub" className="w-5 h-5 object-contain" />
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
