export function navigateTo(href) {
  const targetUrl = new URL(href, window.location.href);
  const nextPath = `${targetUrl.pathname}${targetUrl.hash}`;

  window.history.pushState({}, "", nextPath);
  window.dispatchEvent(new Event("raj:navigate"));

  window.setTimeout(() => {
    if (targetUrl.hash) {
      document
        .querySelector(targetUrl.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, 80);
}

export function handleInternalLinkClick(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const link = event.target.closest("a[href]");
  if (!link) {
    return;
  }

  const href = link.getAttribute("href");
  if (
    !href ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    link.target === "_blank" ||
    link.hasAttribute("download")
  ) {
    return;
  }

  const targetUrl = new URL(href, window.location.href);
  if (targetUrl.origin !== window.location.origin) {
    return;
  }

  event.preventDefault();
  navigateTo(`${targetUrl.pathname}${targetUrl.hash}`);
}
