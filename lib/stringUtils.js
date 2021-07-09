export function formatUrl(url) {
  const host = new URL(url).hostname;
  if (host.startsWith("www.")) return host.slice(4);
  return host;
}

export function makeTitleCase(input) {
  return input
    .split(" ")
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function formatCopyright(input) {
  return input.replace('[YEAR]', new Date().getFullYear())
}
