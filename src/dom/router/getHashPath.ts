export default function getHashPath(base: string, location: Location): string {
  let path = location.hash || "#"
  // Remove leading # from path
  path = path.slice(1)
  // remove base from start of path
  if (path.startsWith(base)) {
    path = path.slice(base.length)
  }
  // remove query string
  if (path.includes("?")) {
    path = path.split("?")[0]
  }
  // make sure path starts with /
  if (!path.startsWith("/")) {
    path = `/${path}`
  }
  // remove trailing / from path
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1)
  }
  return path
}
