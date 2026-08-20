import { describe, expect, it } from "vitest";
import {
  buildNewAppUrl,
  isLegacyLovableHost,
  NEW_APP_ORIGIN,
} from "@/lib/legacy-host";

describe("legacy Lovable redirection", () => {
  it("only activates on the former public Lovable hostname", () => {
    expect(isLegacyLovableHost("friend-app.lovable.app")).toBe(true);
    expect(isLegacyLovableHost("FRIEND-APP.LOVABLE.APP")).toBe(true);
    expect(isLegacyLovableHost("doggy-friend.yeti-lab.fr")).toBe(false);
  });

  it("preserves the current path, query and hash on Yeti-Lab", () => {
    expect(
      buildNewAppUrl({ pathname: "/install", search: "?from=qr", hash: "#app" }),
    ).toBe(`${NEW_APP_ORIGIN}/install?from=qr#app`);
  });
});
