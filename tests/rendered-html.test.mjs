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
  assert.match(html, /EMAAN/);
  assert.match(html, /BILAL/);
  assert.match(html, /Scrubbed bento project gallery/);
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
  assert.match(portfolio, /id="gallery-8"/);
  assert.match(portfolio, /hello/);
  assert.match(css, /--primary:\s*#a3e635/i);
  assert.match(css, /--accent:\s*#06b6d4/i);
  assert.match(packageJson, /"gsap":/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
