import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const DIST = resolve(__dirname, "../../dist");
const hasBuild = existsSync(DIST);

describe.skipIf(!hasBuild)("PWA build artefacts (dist/)", () => {
  it("emits a manifest.webmanifest with the required fields", () => {
    const raw = readFileSync(resolve(DIST, "manifest.webmanifest"), "utf-8");
    const manifest = JSON.parse(raw);
    expect(manifest.name).toBe("Schatzsuche für Michel");
    expect(manifest.short_name).toBe("Schatzsuche");
    expect(manifest.display).toBe("standalone");
    expect(manifest.theme_color).toBe("#e8d5a0");
    expect(manifest.background_color).toBe("#e8d5a0");
    expect(Array.isArray(manifest.icons)).toBe(true);
    const sizes = manifest.icons.map((i: { sizes: string }) => i.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");
  });

  it("emits a service worker file", () => {
    const swPath = resolve(DIST, "sw.js");
    expect(existsSync(swPath)).toBe(true);
    expect(statSync(swPath).size).toBeGreaterThan(0);
  });

  it("emits the PNG icons referenced by the manifest", () => {
    expect(existsSync(resolve(DIST, "icon-192.png"))).toBe(true);
    expect(existsSync(resolve(DIST, "icon-512.png"))).toBe(true);
    expect(existsSync(resolve(DIST, "apple-touch-icon.png"))).toBe(true);
  });

  it("injects the manifest link and service-worker registration into index.html", () => {
    const html = readFileSync(resolve(DIST, "index.html"), "utf-8");
    expect(html).toContain('rel="manifest"');
    expect(html).toContain("registerSW.js");
    expect(html).toContain('apple-touch-icon');
  });
});
