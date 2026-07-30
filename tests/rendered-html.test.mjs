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
  assert.doesNotMatch(html, /Blank section for next content/);
  assert.doesNotMatch(html, /Restlessly experimenting|Constantly creating/);
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
  assert.match(portfolio, /gsap\.registerPlugin\(ScrollTrigger, Flip\)/);
  assert.doesNotMatch(portfolio, /SplitText|SplitText\.create\("\.Horizontal__text"/);
  assert.match(portfolio, /HeroRibbons/);
  assert.match(portfolio, /MarqueeText/);
  assert.match(portfolio, /className="hero-ribbons"/);
  assert.match(portfolio, /className="hero-ribbon-svg"/);
  assert.match(portfolio, /hero-ribbon hero-ribbon-lime/);
  assert.match(portfolio, /hero-ribbon hero-ribbon-pink/);
  assert.match(portfolio, /className=\{classes\}/);
  assert.match(portfolio, /className="marquee-track"/);
  assert.match(portfolio, /className="marquee-group"/);
  assert.match(portfolio, /className="quote-marquee heading-xl"/);
  assert.match(portfolio, /className="about-marquee"/);
  assert.match(portfolio, /xPercent:\s*-50/);
  assert.match(portfolio, /repeat:\s*-1/);
  assert.match(portfolio, /createHeroRibbonPath/);
  assert.match(portfolio, /topToBottom/);
  assert.match(portfolio, /controlOne/);
  assert.match(portfolio, /controlTwo/);
  assert.match(portfolio, /getTotalLength\(\)/);
  assert.match(portfolio, /strokeDashoffset:\s*length/);
  assert.match(portfolio, /strokeDashoffset:\s*0/);
  assert.match(portfolio, /ribbonTimelines/);
  assert.match(portfolio, /ribbonsAlive/);
  assert.doesNotMatch(portfolio, /strokeDashoffset:\s*-900/);
  assert.doesNotMatch(portfolio, /x:\s*"random\(-24, 24\)"/);
  assert.doesNotMatch(portfolio, /y:\s*"random\(-18, 18\)"/);
  assert.doesNotMatch(portfolio, /RollingWheel|AmbientBackdrop/);
  assert.doesNotMatch(portfolio, /className="ambient-backdrop"|className="ambient-ribbons"/);
  assert.doesNotMatch(portfolio, /rolling-wheel|quote-wheel|about-wheel|quote-stage/);
  assert.match(portfolio, /0\.62/);
  assert.match(portfolio, /scrub:\s*1\.35/);
  assert.doesNotMatch(portfolio, /duration:\s*16/);
  assert.doesNotMatch(portfolio, /aria-hidden="true">\{quote\}/);
  assert.match(portfolio, /buildSeamlessLoop/);
  assert.match(portfolio, /renderAboutCards\(self\.progress\)/);
  assert.match(portfolio, /pointerenter/);
  assert.match(portfolio, /liftCard/);
  assert.doesNotMatch(portfolio, /Draggable|dragProxy|about-next|about-prev|about-actions/);
  assert.match(portfolio, /className="magnetic-btn"/);
  assert.match(portfolio, /className="magnetic-label"/);
  assert.match(portfolio, /magneticButtons/);
  assert.match(portfolio, /pointermove/);
  assert.match(portfolio, /elastic\.out\(1, 0\.45\)/);
  assert.match(portfolio, /className="about-card-gallery reveal-row"/);
  assert.match(portfolio, /className="about-cards"/);
  assert.match(portfolio, /className="about-card"/);
  assert.doesNotMatch(portfolio, /about-grid|info-card/);
  assert.match(portfolio, /className="hero-intro"/);
  assert.match(portfolio, /\.hero-intro-block/);
  assert.doesNotMatch(portfolio, /className="water-field"/);
  assert.doesNotMatch(portfolio, /waterCanvasRef/);
  assert.doesNotMatch(portfolio, /getContext\("2d"\)/);
  assert.doesNotMatch(portfolio, /createRadialGradient/);
  assert.doesNotMatch(portfolio, /movePointer|stopWater|drawLiquid/);
  assert.match(portfolio, /pointermove/);
  assert.doesNotMatch(portfolio, /ctx2d\.stroke\(/);
  assert.doesNotMatch(portfolio, /strokeStyle/);
  assert.doesNotMatch(portfolio, /ribbon-field|neon-ribbon|ribbon-hero-a|ambient-smoke/);
  assert.match(portfolio, /id="gallery-8"/);
  assert.doesNotMatch(portfolio, /post-project-blank|rolling-container|rolling-line|rollingLines/);
  assert.match(portfolio, /autoAlpha: 0/);
  assert.match(portfolio, /className="Horizontal"/);
  assert.match(css, /height:\s*78vh/);
  assert.match(css, /align-items:\s*center/);
  assert.match(css, /color:\s*var\(--text\)/);
  assert.match(css, /\.hero-intro/);
  assert.match(css, /\.hero-intro-block span/);
  assert.match(css, /--primary:\s*#39ff14/i);
  assert.match(css, /--blue:\s*#00d9ff/i);
  assert.match(css, /--purple:\s*#a855f7/i);
  assert.match(css, /\.about-card-gallery/);
  assert.match(css, /\.about-card/);
  assert.match(css, /\.magnetic-btn/);
  assert.match(css, /\.magnetic-label/);
  assert.match(css, /linear-gradient\(114deg, #39ff14/);
  assert.doesNotMatch(css, /\.about-grid|\.info-card|\.about-actions|\.drag-proxy/);
  assert.doesNotMatch(css, /\.water-field/);
  assert.doesNotMatch(css, /\.ambient-backdrop|\.ambient-smoke|\.ambient-ribbons/);
  assert.doesNotMatch(css, /@keyframes smokeDrift|@keyframes ribbonDrift/);
  assert.doesNotMatch(css, /\.rolling-wheel|\.quote-stage|\.about-wheel/);
  assert.match(css, /\.hero-ribbons/);
  assert.match(css, /\.hero-ribbon-svg/);
  assert.match(css, /\.hero-ribbon/);
  assert.match(css, /vector-effect:\s*non-scaling-stroke/);
  assert.match(css, /will-change:\s*strokeDashoffset|will-change:\s*stroke-dashoffset/);
  assert.match(css, /\.marquee/);
  assert.match(css, /\.marquee-track/);
  assert.match(css, /\.quote-marquee/);
  assert.match(css, /\.about-marquee/);
  assert.match(css, /\.about-card::before/);
  assert.match(css, /clip-path:\s*polygon/);
  assert.match(css, /#fb7185/);
  assert.match(css, /mask-composite:\s*exclude/);
  assert.doesNotMatch(css, /\.ribbon-field|\.ribbon-hero-a|\.neon-ribbon/);
  assert.match(css, /--tile-rgb/);
  assert.doesNotMatch(css, /\.post-project-blank|\.rolling-container|\.rolling-line|\.rolling-char/);
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
  assert.match(css, /prefers-reduced-motion/);
  assert.match(packageJson, /"gsap":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
