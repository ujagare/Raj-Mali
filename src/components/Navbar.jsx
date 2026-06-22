import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  "Home",
  "About Raj",
  "Testimonials",
  "Facilitation",
  "Writing",
  "Workshops",
  "Play Pics",
  "RED M ",
  "Contact",
];

const linkTarget = {
  Home: "/",
  "About Raj": "/about",
  Testimonials: "/testimonials",
  Facilitation: "/facilitation",
  Writing: "/writing",
  Workshops: "/workshops",
  "Play Pics": "/play-pics",
  Contact: "/contact",
};

const redMLink = "RED M ";
const redMUrl = "https://www.redmconsulting.com";

function getLinkHref(link) {
  if (link === redMLink) {
    return redMUrl;
  }

  return linkTarget[link] || "/";
}

function getLinkClassName(link, className = "") {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isActive =
    (link === "About Raj" && currentPath === "/about") ||
    (link === "Testimonials" && currentPath === "/testimonials") ||
    (link === "Facilitation" && currentPath === "/facilitation") ||
    (link === "Writing" && currentPath === "/writing") ||
    (link === "Workshops" && currentPath === "/workshops") ||
    (link === "Play Pics" && currentPath === "/play-pics") ||
    (link === "Contact" && currentPath === "/contact");

  return `${className} nav-link ${
    link === redMLink ? "!text-red-600 hover:!text-red-700" : ""
  } ${isActive ? "text-navy after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-[#b8792a]" : ""}`.trim();
}

function getMobileLinkClassName(link) {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
  const isActive =
    (link === "Home" && currentPath === "/") ||
    (link === "About Raj" && currentPath === "/about") ||
    (link === "Testimonials" && currentPath === "/testimonials") ||
    (link === "Facilitation" && currentPath === "/facilitation") ||
    (link === "Writing" && currentPath === "/writing") ||
    (link === "Workshops" && currentPath === "/workshops") ||
    (link === "Play Pics" && currentPath === "/play-pics") ||
    (link === "Contact" && currentPath === "/contact");

  return `mobile-menu-link ${link === redMLink ? "is-redm" : ""} ${isActive ? "is-active" : ""}`.trim();
}

function handleInternalNavigation(event, href) {
  if (!href.startsWith("/") && !href.startsWith("#")) {
    return;
  }

  const currentUrl = new URL(window.location.href);
  const targetUrl = new URL(href, window.location.href);
  if (targetUrl.origin !== window.location.origin) {
    return;
  }

  const currentPath = currentUrl.pathname.replace(/\/$/, "") || "/";
  const targetPath = targetUrl.pathname.replace(/\/$/, "") || "/";
  const isSamePage = currentPath === targetPath;
  const isHashNavigation = Boolean(targetUrl.hash);

  if (!isSamePage && (isHashNavigation || targetPath !== currentPath)) {
    return;
  }

  event.preventDefault();
  window.history.pushState({}, "", `${targetUrl.pathname}${targetUrl.hash}`);
  window.dispatchEvent(new Event("raj:navigate"));

  if (targetUrl.hash) {
    window.setTimeout(() => {
      document
        .querySelector(targetUrl.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/5 bg-pearl/90 backdrop-blur-xl">
        <nav className="site-shell flex h-20 items-center justify-between gap-8 lg:h-[86px]">
          <a
            href="/"
            className="flex items-center gap-3"
            onClick={(event) => handleInternalNavigation(event, "/")}
            aria-label="Raj Mali home"
          >
            <span className="grid size-12 place-items-center rounded-full border border-navy/70 font-serif text-lg font-semibold text-navy">
              RM
            </span>
            <span className="font-serif text-2xl font-semibold uppercase tracking-[0.12em] text-ink">
              Raj Mali
            </span>
          </a>

          <div className="hidden flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-6">
            {links.map((link) => (
              <a
                key={link}
                href={getLinkHref(link)}
                className={getLinkClassName(link, "relative")}
                onClick={(event) => handleInternalNavigation(event, getLinkHref(link))}
              >
                {link}
              </a>
            ))}
          </div>

          <a
            href="/contact#contact-form"
            className="primary-button hidden px-6 py-3.5 xl:inline-flex"
            onClick={(event) => handleInternalNavigation(event, "/contact#contact-form")}
          >
            Work With Me
          </a>

          <button
            type="button"
            className="mobile-menu-trigger xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu-layer xl:hidden">
            <motion.button
              type="button"
              className="mobile-menu-backdrop"
              aria-label="Close navigation menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.aside
              className="mobile-menu-panel"
              initial={{ x: "-105%" }}
              animate={{ x: 0 }}
              exit={{ x: "-105%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-menu-panel-top">
                <a
                  href="/"
                  className="mobile-menu-brand"
                  onClick={(event) => {
                    handleInternalNavigation(event, "/");
                    setOpen(false);
                  }}
                >
                  <span>RM</span>
                  <strong>Raj Mali</strong>
                </a>
                <button
                  type="button"
                  className="mobile-menu-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="mobile-menu-intro">
                <p>Coach. Facilitator. Mentor.</p>
                <h2>Navigate with clarity.</h2>
              </div>

              <nav className="mobile-menu-nav" aria-label="Mobile navigation">
                {links.map((link, index) => (
                  <motion.a
                    key={link}
                    href={getLinkHref(link)}
                    className={getMobileLinkClassName(link)}
                    onClick={(event) => {
                      handleInternalNavigation(event, getLinkHref(link));
                      setOpen(false);
                    }}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + index * 0.035, duration: 0.28 }}
                  >
                    <span>{link}</span>
                    <ArrowRight size={15} />
                  </motion.a>
                ))}
              </nav>

              <a
                href="/contact#contact-form"
                className="mobile-menu-cta"
                onClick={(event) => {
                  handleInternalNavigation(event, "/contact#contact-form");
                  setOpen(false);
                }}
              >
                Work With Me <ArrowRight size={16} />
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
