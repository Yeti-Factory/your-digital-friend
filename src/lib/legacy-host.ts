const LEGACY_HOSTNAMES = new Set(["friend-app.lovable.app"]);

export const NEW_APP_ORIGIN = "https://doggy-friend.yeti-lab.fr";

export function isLegacyLovableHost(hostname: string) {
  return LEGACY_HOSTNAMES.has(hostname.toLowerCase());
}

export function buildNewAppUrl(
  location: Pick<Location, "pathname" | "search" | "hash">,
) {
  return new URL(
    `${location.pathname}${location.search}${location.hash}`,
    NEW_APP_ORIGIN,
  ).toString();
}
