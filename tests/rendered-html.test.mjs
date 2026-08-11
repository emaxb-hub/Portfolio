import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const request = new Request("http://localhost/", {
    headers: { accept: "text/html" },
  });
  const env = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  if (typeof worker?.fetch === "function") {
    return worker.fetch(request, env, context);
  }

  if (typeof worker === "function") {
    return worker(request, context);
  }

  throw new TypeError("Built server entry does not expose a render handler.");
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
  assert.match(html, /Hi,.*Emaan.*here\./s);
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
  assert.match(portfolio, /MarqueeText/);
  assert.match(portfolio, /function TextEffectWithCustomVariants/);
  assert.match(portfolio, /function TextEffectWithCustomDelay/);
  assert.match(portfolio, /className="text-effect-word"/);
  assert.match(portfolio, /className="text-effect-word text-effect-char"/);
  assert.match(portfolio, /className="text-effect-token"/);
  assert.match(portfolio, /text-effect-variants/);
  assert.match(portfolio, /text-effect-delay/);
  assert.match(portfolio, /function useInView/);
  assert.match(portfolio, /new IntersectionObserver/);
  assert.match(portfolio, /threshold: amount/);
  assert.match(portfolio, /useInView<HTMLSpanElement>\(0\.2\)/);
  assert.match(portfolio, /Number\(delay\)/);
  assert.doesNotMatch(portfolio, /className="hero-wallpaper"|className="hero-wallpaper-video"/);
  assert.match(portfolio, /function CanvasLineArt/);
  assert.match(portfolio, /new Path2D/);
  assert.match(portfolio, /persistentLineArt/);
  assert.match(portfolio, /lineDashOffset/);
  assert.match(portfolio, /lineDash/);
  assert.match(portfolio, /context\.clip\(\)/);
  assert.match(portfolio, /className="hero-intro-copy pet-walk-surface"/);
  assert.match(portfolio, /function CursorStarTrail/);
  assert.match(portfolio, /className="cursor-star-trail"/);
  assert.match(portfolio, /className="cursor-star"/);
  assert.match(portfolio, /elastic\.out\(1, 0\.45\)/);
  assert.match(portfolio, /selector: "#about"/);
  assert.match(portfolio, /selector: "#skills"/);
  assert.match(portfolio, /selector: "#experience"/);
  assert.match(portfolio, /selector: "#leadership"/);
  assert.match(portfolio, /selector: "#contact"/);
  assert.match(portfolio, /color: "orange"/);
  assert.doesNotMatch(portfolio, /intro-wallpaper\.mp4/);
  assert.doesNotMatch(portfolio, /intro-wallpaper\.jpg|intro-wallpaper-image|intro-wallpaper-shade/);
  assert.doesNotMatch(portfolio, /HeroRibbons|hero-ribbon|createHeroRibbonPath|ribbonTimelines|ribbonsAlive/);
  assert.match(portfolio, /className=\{classes\}/);
  assert.match(portfolio, /className="marquee-track"/);
  assert.match(portfolio, /className="marquee-group"/);
  assert.match(portfolio, /className="quote-marquee heading-xl"/);
  assert.match(portfolio, /isLinkedInLink\(project\.details\)/);
  assert.match(portfolio, />Details<\/span>/);
  assert.doesNotMatch(portfolio, /project-back-kicker|>Project detail<|className="project-back"[\s\S]*<h3>\{project\.title\}/);
  assert.match(portfolio, /xPercent:\s*-50/);
  assert.match(portfolio, /repeat:\s*-1/);
  assert.doesNotMatch(portfolio, /RollingWheel|AmbientBackdrop/);
  assert.doesNotMatch(portfolio, /className="ambient-backdrop"|className="ambient-ribbons"/);
  assert.doesNotMatch(portfolio, /rolling-wheel|quote-wheel|about-wheel|quote-stage/);
  assert.match(portfolio, /0\.62/);
  assert.match(portfolio, /timeScale\(1\)/);
  assert.match(portfolio, /elastic\.out\(1, 0\.82\)/);
  assert.match(portfolio, /duration: 1\.6/);
  assert.match(portfolio, /stagger: 0\.14/);
  assert.match(portfolio, /const fallbackProjectIndex = Math\.floor\(galleryItems\.length \/ 2\)/);
  assert.match(portfolio, /item\.toggleAttribute\("data-project-focus", index === fallbackProjectIndex\)/);
  assert.doesNotMatch(portfolio, /setProjectFocus|focusedProjectIndex|projectScrollTrigger|projectTimeline/);
  assert.doesNotMatch(portfolio, /randomThemeColor|effect\.closest\("\.section-heading, \.contact-panel"\)|toggleActions: "play none none reset"/);
  assert.match(portfolio, /filter\(\(item\) => !item\.matches\("\.section-heading, \.contact-panel"\)\)/);
  assert.match(portfolio, /seamlessLoop\.play\(\)/);
  assert.doesNotMatch(portfolio, /aboutTrigger|aboutPausedByHover|pauseAbout|resumeAbout/);
  assert.doesNotMatch(portfolio, /duration:\s*16/);
  assert.doesNotMatch(portfolio, /aria-hidden="true">\{quote\}/);
  assert.match(portfolio, /buildSeamlessLoop/);
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
  assert.match(portfolio, /className="about-card pet-walk-surface"/);
  assert.doesNotMatch(portfolio, /about-grid|info-card/);
  assert.match(portfolio, /className="hero-intro"/);
  assert.match(portfolio, /\.hero-intro-block/);
  assert.match(portfolio, /hero-intro-lead/);
  assert.match(portfolio, /Hi, <span className="intro-accent-word">Emaan<\/span> here\./);
  assert.match(portfolio, /className="hero-intro-block hero-intro-lead"/);
  assert.match(portfolio, /TextEffectWithCustomVariants text="Front-end development, UI\/UX design, game development, and full-stack\. Learning AI and computer vision\."/);
  assert.match(portfolio, /heading: "What can I build\?"/);
  assert.match(portfolio, /heading: "AI tools I use"/);
  assert.match(portfolio, /"Codex", "Procloud", "Antigravity"/);
  assert.match(portfolio, /rating: 4/);
  assert.match(portfolio, /rating: 5/);
  assert.match(portfolio, /rating: 3/);
  assert.match(portfolio, /"VS Code"/);
  assert.match(portfolio, /"Eclipse"/);
  assert.match(portfolio, /"Figma"/);
  assert.match(portfolio, /\{ name: "Assembly", rating: 2 \}/);
  assert.match(portfolio, /\{ name: "Java", rating: 2 \}/);
  assert.match(portfolio, /"Node\.js", "Express\.js", "React", "Flask"/);
  assert.match(portfolio, /const skillGroups =/);
  assert.match(portfolio, /title: "Languages"/);
  assert.match(portfolio, /title: "Tools"/);
  assert.match(portfolio, /title: "Libraries & Frameworks"/);
  assert.match(portfolio, /className="skills-explorer/);
  assert.match(portfolio, /className="skills-explorer-tab pet-walk-surface"/);
  assert.match(portfolio, /className="skills-detail-panel pet-walk-surface"/);
  assert.match(portfolio, /function activateSkillGroup/);
  assert.match(portfolio, /scheduleSkillGroupClear/);
  assert.match(portfolio, /window\.setTimeout/);
  assert.match(portfolio, /onPointerEnter=\{\(\) => activateSkillGroup/);
  assert.doesNotMatch(portfolio, /TextEffectWithCustomVariants text="Projects as a techy bento board\."/);
  assert.match(portfolio, /className="about-heading-effect"/);
  assert.match(portfolio, /TextEffectWithCustomVariants text="Let's build something visually sharp and technically alive\."/);
  assert.doesNotMatch(portfolio, /className="water-field"/);
  assert.doesNotMatch(portfolio, /waterCanvasRef/);
  assert.match(portfolio, /getContext\("2d"\)/);
  assert.doesNotMatch(portfolio, /createRadialGradient/);
  assert.doesNotMatch(portfolio, /movePointer|stopWater|drawLiquid/);
  assert.match(portfolio, /pointermove/);
  assert.match(portfolio, /context\.stroke\(shapes\[index\]\)/);
  assert.match(portfolio, /strokeStyle/);
  assert.doesNotMatch(portfolio, /ribbon-field|neon-ribbon|ribbon-hero-a|ambient-smoke/);
  assert.match(portfolio, /id="gallery-8"/);
  assert.match(portfolio, /\.add\(flip\)/);
  assert.match(portfolio, /end: "\+=420%"/);
  assert.doesNotMatch(portfolio, /projects-blank-screen|blankScreen/);
  assert.doesNotMatch(portfolio, /projectPanel/);
  assert.doesNotMatch(portfolio, /post-project-blank|rolling-container|rolling-line|rollingLines/);
  assert.match(portfolio, /autoAlpha: 0/);
  assert.match(portfolio, /className="Horizontal"/);
  assert.match(portfolio, /const isLinkedInLink/);
  assert.match(portfolio, /className="magnetic-btn project-details"/);
  assert.match(portfolio, />Details<\/span>/);
  assert.match(portfolio, /className="experience-explorer reveal-row"/);
  assert.doesNotMatch(portfolio, /section-wave|experience-blob\.svg|wave-contact\.svg|wave-leadership/);
  assert.doesNotMatch(portfolio, /skills-scrapbook|scrapbook-space-invaders/);
  assert.match(portfolio, /className="experience-note"/);
  assert.match(portfolio, /className="experience-entry pet-walk-surface"/);
  assert.match(portfolio, /Tech Avenue Private Limited/);
  assert.match(portfolio, /NADRA Technologies Limited/);
  assert.match(portfolio, /logo-tech-avenue\.png/);
  assert.match(portfolio, /logo-nadra-ntl\.png/);
  assert.match(portfolio, /className="leadership-explorer reveal-row"/);
  assert.match(portfolio, /className="leadership-note"/);
  assert.match(portfolio, /className="experience-entry leadership-entry pet-walk-surface"/);
  assert.match(portfolio, /activeLeadership/);
  assert.match(portfolio, /logo-fast-outreach\.png/);
  assert.match(portfolio, /logo-nascon\.png/);
  assert.match(portfolio, /className="org-logo/);
  assert.doesNotMatch(portfolio, /createScreenTransitions|screenTransitionCtx|screenTransitionCleanup/);
  assert.match(portfolio, /className="gallery-section projects-section"/);
  assert.doesNotMatch(portfolio, /project-heading|Projects as a techy bento board/);
  assert.match(portfolio, /pin: galleryWrap/);
  assert.match(portfolio, /invalidateOnRefresh: true/);
  assert.doesNotMatch(portfolio, /<span>0\{|<span>0\{index/);
  assert.match(css, /height:\s*100svh/);
  assert.match(css, /align-items:\s*center/);
  assert.match(css, /color:\s*var\(--text\)/);
  assert.match(css, /\.hero-intro/);
  assert.match(css, /\.persistent-line-art/);
  assert.match(css, /\.cursor-star-trail/);
  assert.match(css, /\.cursor-star/);
  assert.match(css, /\.hero-intro-copy/);
  assert.doesNotMatch(css, /\.section-line-art-vignette/);
  assert.match(css, /--yellow:\s*#ffe600/i);
  assert.match(css, /--red:\s*#ff2d2d/i);
  assert.match(css, /--orange:\s*#ff7900/i);
  assert.match(css, /\.hero-intro-copy\s*\{[\s\S]*background:\s*#000/);
  assert.match(css, /\.contact-panel\s*\{[\s\S]*background:\s*transparent/);
  assert.match(css, /\.nav\s*\{\s*position:\s*absolute;/);
  assert.match(css, /min-height:\s*100svh/);
  assert.match(css, /\.hero-intro-block > span:not\(\.text-effect\)/);
  assert.match(css, /\.text-effect-word/);
  assert.match(css, /\.hero-intro-lead/);
  assert.match(css, /\.skills-section \.section-heading h2/);
  assert.match(css, /\.skills-explorer/);
  assert.match(css, /\.skills-explorer-tab/);
  assert.match(css, /\.skills-detail-panel/);
  assert.match(css, /--primary:\s*#39ff14/i);
  assert.match(css, /--blue:\s*#00d9ff/i);
  assert.match(css, /--purple:\s*#a855f7/i);
  assert.match(css, /\.about-card-gallery/);
  assert.match(css, /\.about-card/);
  assert.match(css, /\.org-logo/);
  assert.match(css, /@keyframes logo-sheen/);
  assert.match(css, /\.leadership-list/);
  assert.match(css, /\.leadership-explorer/);
  assert.match(css, /\.leadership-note/);
  assert.doesNotMatch(css, /\.section-wave|hue-rotate\(150deg\)/);
  assert.doesNotMatch(css, /\.skills-scrapbook|\.skills-scrapbook-track|\.skills-scrapbook-item/);
  assert.match(css, /\.magnetic-btn/);
  assert.match(css, /\.magnetic-label/);
  assert.match(css, /\.hero-action-stack/);
  assert.match(css, /linear-gradient\(114deg, #39ff14/);
  assert.doesNotMatch(css, /\.about-grid|\.info-card|\.about-actions|\.drag-proxy/);
  assert.doesNotMatch(css, /\.water-field/);
  assert.doesNotMatch(css, /\.ambient-backdrop|\.ambient-smoke|\.ambient-ribbons/);
  assert.doesNotMatch(css, /@keyframes smokeDrift|@keyframes ribbonDrift/);
  assert.doesNotMatch(css, /\.rolling-wheel|\.quote-stage|\.about-wheel/);
  assert.doesNotMatch(css, /\.hero-wallpaper|\.hero-wallpaper-video|\.hero-wallpaper-shade/);
  assert.doesNotMatch(css, /\.intro-wallpaper|intro-wallpaper-image|intro-wallpaper-shade/);
  assert.match(css, /pointer-events:\s*none/);
  assert.doesNotMatch(css, /\.hero-ribbons|\.hero-ribbon/);
  assert.match(css, /\.marquee/);
  assert.match(css, /\.marquee-track/);
  assert.match(css, /\.quote-marquee/);
  assert.doesNotMatch(css, /\.about-marquee/);
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
  assert.doesNotMatch(css, /\.gallery__item\s*\{[^}]*border:\s*1px solid rgba\(var\(--tile-rgb\)/);
  assert.match(css, /background:\s*#000/i);
  assert.match(css, /--accent:\s*#06b6d4/i);
  assert.match(css, /--font-signature/);
  const cssWithoutPetSprite = css.replace(/background-image:\s*url\("\/pet-spritesheet\.png"\);/i, "");
  assert.doesNotMatch(cssWithoutPetSprite, /background-image/i);
  assert.match(css, /\.robot-pet__sprite/);
  assert.match(css, /background-size:\s*600%\s+400%/);
  assert.match(portfolio, /Interactive bunny pet/);
  assert.match(portfolio, /className="pet-controls hero-action-stack"/);
  assert.match(portfolio, /className="nav"/);
  assert.match(portfolio, /className="magnetic-btn project-details"/);
  assert.match(portfolio, /event\.key === "ArrowUp"/);
  assert.doesNotMatch(portfolio, /ArrowDown|window\.scrollBy/);
  assert.match(portfolio, /pet-wall-hitbox left-wall/);
  assert.match(portfolio, /pet-wall-hitbox right-wall/);
  assert.match(portfolio, /pet-wall-hitbox ceiling/);
  assert.match(portfolio, /pet-walk-surface/);
  assert.match(portfolio, /platformId/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(packageJson, /"gsap":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
