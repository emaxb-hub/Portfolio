import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders Emaan Bilal's portfolio shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Emaan Bilal \| Frontend &amp; Game Developer<\/title>/i);
  assert.match(html, /Emaan/);
  assert.match(html, /Bilal/);
  assert.match(
    html,
    /I imagine, learn, and build\./,
  );
  assert.match(html, /Hi, <span>Emaan<\/span> here\./);
  assert.match(html, /FAST-NUCES/);
  assert.match(html, /computer vision/);
  assert.match(html, /Scrubbed bento project gallery/);
  assert.match(html, /Blank section for next content/);
  assert.match(html, /Kaam Compiler/);
  assert.match(html, /Tech Avenue Private Limited/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("uses the Cyber Lime portfolio implementation", async () => {
  const [page, portfolio, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioHome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<PortfolioHome \/>/);
  assert.match(portfolio, /gsap\.registerPlugin\(ScrollTrigger, Flip, SplitText\)/);
  assert.match(portfolio, /SplitText\.create\("\.Horizontal__text"/);
  assert.match(portfolio, /className="hero-intro"/);
  assert.match(portfolio, /\.hero-intro-block/);
  assert.match(portfolio, /className="ribbon-field"/);
  assert.match(portfolio, /\.neon-ribbon/);
  assert.match(portfolio, /ribbon-hero-a/);
  assert.match(portfolio, /id="gallery-8"/);
  assert.match(portfolio, /post-project-blank/);
  assert.match(portfolio, /autoAlpha: 0/);
  assert.match(portfolio, /className="Horizontal"/);
  assert.match(css, /\.hero-intro/);
  assert.match(css, /\.hero-intro-block span/);
  assert.match(css, /--primary:\s*#39ff14/i);
  assert.match(css, /--blue:\s*#00d9ff/i);
  assert.match(css, /--purple:\s*#a855f7/i);
  assert.match(css, /\.ribbon-field/);
  assert.match(css, /\.ribbon-hero-a/);
  assert.match(css, /\.neon-ribbon/);
  assert.match(css, /--tile-rgb/);
  assert.match(css, /\.post-project-blank/);
  assert.doesNotMatch(css, /\.gallery--bento::before/);
  assert.match(css, /\.gallery__item::before/);
  assert.match(css, /\.gallery__item::after/);
  assert.match(css, /\.gallery--bento \.gallery__item:nth-child\(1\)::before/);
  assert.match(css, /\.gallery--bento \.gallery__item:nth-child\(5\)::after/);
  assert.match(css, /box-shadow:\s*0 0 14px rgba\(var\(--tile-rgb\), 0\.5\)/);
  assert.doesNotMatch(css, /border:\s*1px solid rgba\(var\(--tile-rgb\)/);
  assert.match(css, /background:\s*#000/i);
  assert.match(css, /--accent:\s*#06b6d4/i);
  assert.match(css, /--font-signature/);
  assert.doesNotMatch(css, /background-image|radial-gradient/i);
  assert.match(packageJson, /"gsap":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
