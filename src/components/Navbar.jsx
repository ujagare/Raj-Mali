import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  "Home",
  "About Raj",
  "Coaching",
  "Facilitation",
  "Writing",
  "Workshops",
  "Play Pics",
  "RED M ",
  "Contact",
];

const linkTarget = {
  Home: "home",
  Coaching: "work-with-me",
};

const redMLink = "RED M ";
const redMUrl = "https://www.redmconsulting.com";

function getLinkHref(link) {
  if (link === redMLink) {
    return redMUrl;
  }

  if (link === "Facilitation") {
    return "/facilitation";
  }

  if (link === "About Raj") {
    return "/about";
  }

  if (link === "Contact") {
    return "/contact";
  }

  const hash = linkTarget[link] || link.toLowerCase().replaceAll(" ", "-");
  return window.location.pathname === "/" ? `#${hash}` : `/#${hash}`;
}

function getLinkClassName(link, className = "") {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isActive =
    (link === "About Raj" && currentPath === "/about") ||
    (link === "Facilitation" && currentPath === "/facilitation") ||
    (link === "Contact" && currentPath === "/contact");

  return `${className} nav-link ${
    link === redMLink ? "!text-red-600 hover:!text-red-700" : ""
  } ${isActive ? "text-navy after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-[#b8792a]" : ""}`.trim();
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-pearl/90 backdrop-blur-xl">
      <nav className="site-shell flex h-20 items-center justify-between gap-8 lg:h-[86px]">
        <a
          href={window.location.pathname === "/" ? "#home" : "/#home"}
          className="flex items-center gap-3"
          aria-label="Raj Mali home"
        >
          <span className="grid size-12 place-items-center rounded-full border border-navy/70 font-serif text-lg font-semibold text-navy">
            RM
          </span>
          <span className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-ink">
            Raj Mali
          </span>
        </a>

        <div className="hidden flex-1 items-center justify-center gap-4 xl:flex 2xl:gap-6">
          {links.map((link) => (
            <a
              key={link}
              href={getLinkHref(link)}
              className={getLinkClassName(link, "relative")}
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href={window.location.pathname === "/" ? "#cta" : "/#cta"}
          className="primary-button hidden px-6 py-3.5 lg:inline-flex"
        >
          Work With Me
        </a>

        <button
          type="button"
          className="grid size-11 place-items-center rounded border border-ink/10 text-ink xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-ink/10 bg-pearl xl:hidden"
          >
            <div className="site-shell grid gap-4 py-6">
              {links.map((link) => (
                <a
                  key={link}
                  href={getLinkHref(link)}
                  className={getLinkClassName(link, "relative py-2")}
                  onClick={() => setOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a
                href={window.location.pathname === "/" ? "#cta" : "/#cta"}
                className="primary-button mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                Work With Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
