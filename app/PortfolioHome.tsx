"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const profile = {
  name: "Emaan Bilal",
  role: "Frontend Developer | Game Developer",
  location: "Rawalpindi / Islamabad, Pakistan",
  github: "https://github.com/emaxb-hub",
  linkedin: "https://www.linkedin.com/in/emaan-b-883b0a268/",
  emails: ["emaxbilaleo@gmail.com", "i240502@isb.nu.edu.pk"],
};

type AboutCard = {
  heading: string;
  body: string;
  items?: string[];
};

const about: AboutCard[] = [
  {
    heading: "What can I build?",
    body: "Front-end development, UI/UX design in Figma, full-stack applications, and game development.",
  },
  {
    heading: "Artist brain, developer hands",
    body: "I learn best by building from curiosity, turning ideas into working things while I study the concepts behind them.",
  },
  {
    heading: "AI tools I use",
    body: "AI tools help me think through what is possible, then I keep refining until the logic, structure, and decisions make sense.",
    items: ["Codex", "Procloud", "Antigravity"],
  },
  {
    heading: "Builder energy",
    body: "I am growing across front-end development, game development, full-stack systems, AI, databases, and computer vision.",
  },
];

type SkillItem = {
  name: string;
  rating?: number;
};

const skillLanguages: SkillItem[] = [
  { name: "HTML", rating: 4 },
  { name: "CSS", rating: 4 },
  { name: "JavaScript", rating: 4 },
  { name: "C++", rating: 5 },
  { name: "Python", rating: 3 },
  { name: "Assembly", rating: 2 },
  { name: "Java", rating: 2 },
];

const skillGroups = [
  {
    id: "languages",
    title: "Languages",
    description: "The languages I use to shape interfaces, gameplay, and systems.",
    accent: "#39ff14",
    items: skillLanguages,
  },
  {
    id: "tools",
    title: "Tools",
    description: "The tools that help me prototype, debug, design, and ship ideas.",
    accent: "#00d9ff",
    items: ["IntelliJ IDEA", "Visual Studio", "VS Code", "Eclipse", "Postman", "TouchDesigner", "Figma"].map((name) => ({ name })),
  },
  {
    id: "libraries-frameworks",
    title: "Libraries & Frameworks",
    description: "The libraries and frameworks I reach for when an idea needs structure.",
    accent: "#a855f7",
    items: ["Node.js", "Express.js", "React", "Flask", "MongoDB", "Postgres", "SQL", "SFML", "JavaFX", "Swing", "JDBC"].map((name) => ({ name })),
  },
] as const;

type Project = {
  category: string;
  title: string;
  subtitle: string;
  stack: string;
  description: string;
  details?: string;
};

const projects: Project[] = [
  {
    category: "Web Development",
    title: "WarehouseWare",
    subtitle: "Warehouse Management Inventory System",
    stack: "Java, JavaFX/Swing, JDBC, SQL",
    description: "A full-stack inventory system for tracking stock, organizing records, auto-generating reports, and supporting automatic restocking.",
    details: "https://lnkd.in/p/dchShJ23",
  },
  {
    category: "AI Projects",
    title: "CityMind AI",
    subtitle: "AI-assisted city decision support",
    stack: "Python, AI, ML, graph routing",
    description: "An AI-assisted decision system exploring graph routing and machine learning for more informed city planning.",
  },
  {
    category: "Game Development",
    title: "Super Mario Clone",
    subtitle: "Low-level game programming project",
    stack: "Assembly Language",
    description: "A Super Mario clone built in Assembly, with sprites, formations, and levels constructed block by block.",
    details: "https://lnkd.in/p/dvhc-3Gf",
  },
  {
    category: "Web Development",
    title: "Ghardari",
    subtitle: "Women-focused community and advice platform",
    stack: "Full-stack, real-time web application",
    description: "A women-focused Facebook-like community for home-making support, covering rights, baby care, marriage, cooking, and sewing.",
  },
  {
    category: "Game Development",
    title: "Xonix",
    subtitle: "Territory-capture inspired game",
    stack: "C++ / SFML",
    description: "A simple PF game built around movement, boundaries, territory capture, and expanding playable space.",
  },
  {
    category: "AI Projects",
    title: "Kaam Compiler",
    subtitle: "OCR-powered academic task planner",
    stack: "OCR, Flask 2.5, AI classification, task boards",
    description: "An OCR and AI planner that reads assignment screenshots, extracts exam type, syllabus, and deadlines, then builds a to-do list.",
    details: "https://lnkd.in/p/dR6sqYHs",
  },
  {
    category: "Game Development",
    title: "Space Invaders Clone",
    subtitle: "Classic arcade game remake",
    stack: "C++ / OOP",
    description: "A classic PF arcade remake focused on game loops, collision logic, input handling, and object-oriented structure.",
    details: "https://lnkd.in/p/d5YFKV8M",
  },
  {
    category: "Game Development",
    title: "Buzz Bomber",
    subtitle: "Arcade-style SFML game",
    stack: "C++ / SFML",
    description: "A simple PF arcade game prototype built around real-time movement, projectile logic, and enemy behavior.",
  },
];

const experience = [
  {
    title: "Tech Avenue Private Limited",
    role: "Intern",
    accent: "#fb7185",
    logo: "/logo-tech-avenue.png",
    logoAlt: "Tech Avenue logo",
    description:
      "Built front-end development skills in a company environment, developed responsive interfaces, and connected screens with back-end services.",
  },
  {
    title: "NADRA Technologies Limited",
    role: "Development Intern",
    accent: "#a855f7",
    logo: "/logo-nadra-ntl.png",
    logoAlt: "NADRA Technologies Limited logo",
    description:
      "Learning and working with back-end systems using Java and MySQL while strengthening database and server-side development skills.",
  },
];

const leadership = [
  {
    title: "FAST Outreach and Engagement Society",
    role: "Head Decor",
    logo: "/logo-fast-outreach.png",
    logoAlt: "FAST Outreach and Engagement Society logo",
    description: "Decor direction, visual coordination, and event teamwork.",
  },
  {
    title: "NASCON, FAST-NUCES",
    role: "Management Team",
    logo: "/logo-nascon.png",
    logoAlt: "NASCON logo",
    description: "Management, coordination, and creative event support.",
  },
];

type PetMotion = "idle" | "walk" | "jump" | "fall" | "land";
type PetSurface = "floor" | "platform" | "left-wall" | "right-wall" | "ceiling" | "air";

const petSpriteStates: Record<PetMotion, { row: number; startFrame: number; frameMs: number; frames: number }> = {
  idle: { row: 0, startFrame: 0, frameMs: 220, frames: 1 },
  walk: { row: 2, startFrame: 0, frameMs: 125, frames: 3 },
  jump: { row: 2, startFrame: 3, frameMs: 150, frames: 1 },
  fall: { row: 2, startFrame: 4, frameMs: 140, frames: 1 },
  land: { row: 2, startFrame: 5, frameMs: 220, frames: 1 },
};

const quote =
  "I imagine, learn, and build.";

const isLinkedInLink = (url?: string) => /^(https:\/\/(www\.)?linkedin\.com\/|https:\/\/lnkd\.in\/)/i.test(url ?? "");

function MarqueeText({
  text,
  className = "",
  duration = 36,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const classes = ["marquee", className].filter(Boolean).join(" ");
  const repeats = Array.from({ length: 4 }, (_, index) => index);

  return (
    <div className={classes} data-duration={duration} aria-label={text}>
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            {repeats.map((index) => (
              <span key={`${group}-${index}`}>{text}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function useInView<T extends Element>(amount = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let latestEntry: IntersectionObserverEntry | undefined;
    const visibilityRoot = node.closest(".hero") ?? node.parentElement ?? node;

    const isVisuallyAvailable = () => {
      if (!latestEntry?.isIntersecting) return false;

      let current: Element | null = node;
      while (current) {
        const styles = window.getComputedStyle(current);
        if (styles.display === "none" || styles.visibility === "hidden" || styles.opacity === "0") {
          return false;
        }
        current = current.parentElement;
      }

      return true;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        latestEntry = entry;
        if (isVisuallyAvailable()) {
          setInView(true);
          intersectionObserver.disconnect();
          mutationObserver.disconnect();
        }
      },
      { threshold: amount },
    );

    const mutationObserver = new MutationObserver(() => {
      if (isVisuallyAvailable()) {
        setInView(true);
        intersectionObserver.disconnect();
        mutationObserver.disconnect();
      }
    });

    intersectionObserver.observe(node);
    mutationObserver.observe(visibilityRoot, {
      attributes: true,
      attributeFilter: ["class", "style"],
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [amount]);

  return [ref, inView] as const;
}

type LineArtColor = "purple" | "pink" | "blue" | "cyan" | "green" | "yellow" | "red" | "orange";

type LineArtPath = {
  color: LineArtColor;
  d: string;
};

type LineArtSection = {
  selector: string;
  paths: LineArtPath[];
};

const lineArtColorValues: Record<LineArtColor, string> = {
  purple: "#a855f7",
  pink: "#fb7185",
  blue: "#00d9ff",
  cyan: "#00d9ff",
  green: "#39ff14",
  yellow: "#ffe600",
  red: "#ff2d2d",
  orange: "#ff7900",
};

function CanvasLineArt({ sections }: { sections: LineArtSection[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 4.8 * 1000;
    const stagger = 0.12 * 1000;
    const dashLength = 1000;
    const startedAt = new Map<string, number>();
    const targets = new Map<string, HTMLElement>();
    const pathShapes = new Map<string, Path2D[]>();
    let frame: number | undefined;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    sections.forEach((section) => {
      const target = document.querySelector<HTMLElement>(section.selector);
      if (target) {
        targets.set(section.selector, target);
        pathShapes.set(section.selector, section.paths.map((path) => new Path2D(path.d)));
      }
    });

    const isVisible = (target: HTMLElement) => {
      let current: HTMLElement | null = target;
      while (current) {
        const styles = window.getComputedStyle(current);
        if (styles.display === "none" || styles.visibility === "hidden" || styles.opacity === "0") return false;
        current = current.parentElement;
      }
      return true;
    };

    const scheduleDraw = () => {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(draw);
    };

    const startSection = (selector: string) => {
      const target = targets.get(selector);
      if (!target || !isVisible(target) || startedAt.has(selector)) return;
      startedAt.set(selector, performance.now());
      scheduleDraw();
    };

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      draw(performance.now());
    };

    const draw = (now: number) => {
      frame = undefined;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      let animating = false;

      sections.forEach((section) => {
        const sectionStart = startedAt.get(section.selector);
        const target = targets.get(section.selector);
        const shapes = pathShapes.get(section.selector);
        if (sectionStart === undefined || !target || !shapes) return;

        const rect = target.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= height) return;

        section.paths.forEach((path, index) => {
          const elapsed = now - sectionStart - (reduceMotion ? 0 : index * stagger);
          const progress = reduceMotion ? 1 : Math.max(0, Math.min(1, elapsed / duration));
          if (progress < 1) animating = true;

          context.save();
          context.beginPath();
          context.rect(rect.left, rect.top, rect.width, rect.height);
          context.clip();
          context.translate(rect.left, rect.top);
          context.scale(rect.width / 100, rect.height / 100);
          context.globalAlpha = 0.78;
          context.strokeStyle = lineArtColorValues[path.color];
          context.lineWidth = 1.05;
          context.lineCap = "round";
          context.lineJoin = "round";
          context.shadowColor = lineArtColorValues[path.color];
          context.shadowBlur = 1.8;
          context.setLineDash([dashLength, dashLength]);
          context.lineDashOffset = dashLength * (1 - progress);
          context.stroke(shapes[index]);
          context.restore();
        });
      });

      if (animating) scheduleDraw();
    };

    const observers: IntersectionObserver[] = [];
    const mutations: MutationObserver[] = [];
    sections.forEach((section) => {
      const target = targets.get(section.selector);
      if (!target) return;

      const intersection = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && isVisible(target)) startSection(section.selector);
        },
        { threshold: 0.12 },
      );
      intersection.observe(target);
      observers.push(intersection);

      const mutation = new MutationObserver(() => {
        if (isVisible(target)) startSection(section.selector);
      });
      mutation.observe(target, { attributes: true, attributeFilter: ["class", "style"] });
      mutations.push(mutation);
    });

    const onScroll = () => scheduleDraw();
    const onResize = () => resize();
    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      observers.forEach((observer) => observer.disconnect());
      mutations.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sections]);

  return <canvas className="persistent-line-art" ref={canvasRef} aria-hidden="true" />;
}

const cursorStarColors = ["#39ff14", "#00d9ff", "#a855f7", "#fb7185", "#ffe600", "#ff7900"];

function CursorStarTrail() {
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const trail = trailRef.current;
    const surface = trail?.parentElement;
    if (!trail || !surface) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const stars = Array.from(trail.querySelectorAll<SVGSVGElement>(".cursor-star"));
    let index = 0;
    let lastX = -Infinity;
    let lastY = -Infinity;
    const gap = 68;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      const bounds = surface.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const insideHero = x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height;

      if (!insideHero) {
        lastX = -Infinity;
        lastY = -Infinity;
        return;
      }

      const travel = Math.hypot(x - lastX, y - lastY);
      if (travel < gap) return;

      const star = stars[index % stars.length];
      index += 1;
      lastX = x;
      lastY = y;

      gsap.killTweensOf(star);
      gsap.set(star, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        rotation: gsap.utils.random(-24, 24),
        scale: 0.18,
        opacity: 0,
      });

      gsap.timeline()
        .to(star, {
          opacity: 1,
          scale: gsap.utils.random(0.7, 1.05),
          rotation: `+=${gsap.utils.random(-70, 70)}`,
          duration: 0.24,
          ease: "elastic.out(1, 0.45)",
        })
        .to(
          star,
          {
            x: x + gsap.utils.random(-34, 34),
            y: y + gsap.utils.random(48, 96),
            rotation: `+=${gsap.utils.random(-180, 180)}`,
            scale: 0.15,
            opacity: 0,
            duration: 0.9,
            ease: "back.in(0.6)",
          },
          0.08,
        );
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      gsap.killTweensOf(stars);
    };
  }, []);

  return (
    <div className="cursor-star-trail" ref={trailRef} aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <svg
          className="cursor-star"
          key={index}
          viewBox="0 0 100 100"
          fill={cursorStarColors[index % cursorStarColors.length]}
        >
          <path d="M 50 3 L 61 36 L 96 36 L 68 56 L 79 90 L 50 70 L 21 90 L 32 56 L 4 36 L 39 36 Z" />
        </svg>
      ))}
    </div>
  );
}

const themeEffectColors = ["#39ff14", "#a855f7", "#00d9ff", "#fb7185", "#a3e635"];

const aboutLineArt: LineArtPath[] = [
  { color: "yellow", d: "M -2 30 C 14 18, 26 21, 38 29 C 50 38, 62 38, 73 28 C 85 16, 93 10, 103 10" },
  { color: "green", d: "M 1 103 C 2 84, 10 77, 13 62 C 17 47, 17 34, 26 24 C 35 13, 39 6, 48 5 C 60 4, 66 23, 77 28 C 88 34, 96 25, 103 3" },
];

const skillsLineArt: LineArtPath[] = [
  { color: "cyan", d: "M 0 -2 C 9 5, 9 14, 5 20 C 1 26, 4 34, 14 38 C 23 42, 23 51, 17 57 C 10 63, 12 72, 20 76 C 27 80, 29 88, 30 102" },
  { color: "purple", d: "M 100 -2 C 90 7, 90 15, 95 23 C 100 30, 96 38, 87 42 C 79 46, 78 55, 84 62 C 91 69, 91 77, 85 84 C 80 90, 80 97, 81 103" },
];

const experienceLineArt: LineArtPath[] = [
  { color: "red", d: "M 16 103 C 15 87, 15 77, 23 69 C 32 60, 44 66, 49 54 C 54 42, 50 27, 59 21 C 72 13, 88 9, 102 12" },
  { color: "green", d: "M -3 60 C 12 73, 26 76, 39 69 C 51 63, 61 51, 62 37 C 63 22, 61 9, 65 -2" },
];

const leadershipLineArt: LineArtPath[] = [
  { color: "pink", d: "M -2 12 C 13 3, 28 4, 39 12 C 50 20, 60 20, 72 12 C 84 4, 95 4, 103 12" },
  { color: "purple", d: "M 0 -1 C 13 11, 12 24, 4 33 C -2 40, 5 49, 14 54 C 23 60, 22 70, 14 77 C 7 84, 3 94, 0 102" },
  { color: "green", d: "M -2 88 C 10 80, 20 82, 30 91 C 40 100, 51 98, 61 90 C 72 80, 85 79, 103 91" },
  { color: "yellow", d: "M 102 0 C 91 9, 90 20, 97 30 C 103 40, 98 48, 90 54 C 82 62, 84 73, 94 81 C 101 87, 102 95, 98 102" },
  { color: "orange", d: "M 42 -2 C 49 8, 48 18, 57 26 C 66 34, 75 33, 83 27 C 91 21, 97 22, 103 29" },
];

const contactLineArt: LineArtPath[] = [
  { color: "pink", d: "M -2 10 C 13 2, 29 1, 42 8 C 55 15, 65 17, 77 10 C 88 4, 96 4, 103 9" },
  { color: "purple", d: "M 0 3 C 12 13, 12 25, 5 34 C -1 42, 6 51, 14 57 C 22 63, 21 73, 13 81 C 7 87, 3 96, 0 102" },
  { color: "blue", d: "M 102 0 C 90 10, 90 22, 97 32 C 104 42, 98 51, 90 58 C 82 65, 84 76, 94 83 C 101 89, 102 97, 98 103" },
  { color: "green", d: "M -2 78 C 10 70, 22 73, 32 82 C 42 91, 52 91, 62 84 C 73 76, 85 75, 103 86" },
  { color: "orange", d: "M 22 103 C 29 91, 40 88, 51 94 C 61 100, 74 101, 84 94 C 93 88, 99 89, 103 94" },
];

const heroLineArt: LineArtPath[] = [
  { color: "purple", d: "M 0 0 C 8 5, 15 12, 16 22 C 17 31, 9 39, 17 46 C 26 54, 19 61, 25 70 C 31 79, 37 78, 40 87 C 42 94, 47 97, 54 100" },
  { color: "pink", d: "M 39 -2 C 47 8, 55 13, 66 11 C 77 9, 86 2, 102 -2" },
  { color: "green", d: "M 34 102 C 38 91, 46 87, 56 93 C 65 99, 71 92, 79 84 C 87 76, 96 83, 102 98" },
  { color: "cyan", d: "M -2 43 C 7 48, 14 44, 18 37 C 22 30, 17 25, 7 23 C 3 22, 0 21, -2 19" },
  { color: "pink", d: "M -2 77 C 8 84, 17 81, 23 74 C 28 68, 30 63, 36 60 C 40 58, 44 59, 48 62" },
  { color: "yellow", d: "M -2 88 C 8 80, 17 83, 24 91 C 31 99, 39 97, 48 91 C 55 86, 63 86, 70 90" },
  { color: "red", d: "M 103 10 C 96 18, 96 28, 101 37 C 106 46, 99 55, 96 63 C 92 72, 99 81, 104 88" },
];

const persistentLineArt: LineArtSection[] = [
  { selector: ".hero-intro-line-anchor", paths: heroLineArt },
  { selector: "#about", paths: aboutLineArt },
  { selector: "#skills", paths: skillsLineArt },
  { selector: "#experience", paths: experienceLineArt },
  { selector: "#leadership", paths: leadershipLineArt },
  { selector: "#contact", paths: contactLineArt },
];

function TextEffectWithCustomVariants({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const words = text.trim().split(/\s+/);
  const [effectRef, inView] = useInView<HTMLSpanElement>(0.2);

  useEffect(() => {
    const effect = effectRef.current;
    if (!effect) return;

    const animatedWords = effect.querySelectorAll<HTMLElement>(".text-effect-word");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(animatedWords, { y: 0, rotation: 0, scale: 1, opacity: 1, color: "#f8fafc", filter: "none" });
        return;
      }

      if (!inView) {
        gsap.set(animatedWords, {
          y: () => gsap.utils.random(-90, 90),
          rotation: () => gsap.utils.random(-60, 60),
          scale: 0.25,
          opacity: 0,
          color: () => themeEffectColors[Math.floor(Math.random() * themeEffectColors.length)],
          filter: "blur(8px)",
        });
        return;
      }

      gsap.fromTo(
        animatedWords,
        {
          y: () => gsap.utils.random(-90, 90),
          rotation: () => gsap.utils.random(-60, 60),
          scale: 0.25,
          opacity: 0,
          color: () => themeEffectColors[Math.floor(Math.random() * themeEffectColors.length)],
          filter: "blur(8px)",
        },
        {
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          color: "#f8fafc",
          filter: "blur(0px)",
          duration: 1.6,
          stagger: 0.14,
          ease: "elastic.out(1, 0.82)",
        },
      );
    }, effect);

    return () => context.revert();
  }, [effectRef, inView]);

  return (
    <span
      ref={effectRef}
      className={`text-effect text-effect-variants ${className}`.trim()}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span className="text-effect-word" key={`${word}-${index}`}>
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}

function TextEffectWithCustomDelay({
  text,
  className = "",
  delay = 0.1,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const segments = text.split(/(\s+)/);
  const [effectRef, inView] = useInView<HTMLSpanElement>(0.2);

  useEffect(() => {
    const effect = effectRef.current;
    if (!effect) return;

    const chars = effect.querySelectorAll<HTMLElement>(".text-effect-char");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(chars, { y: 0, rotationX: 0, opacity: 1, filter: "none" });
        return;
      }

      if (!inView) {
        gsap.set(chars, { y: 10, rotationX: 90, opacity: 0, filter: "blur(8px)" });
        return;
      }

      gsap.fromTo(
        chars,
        { y: 10, rotationX: 90, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          rotationX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.2,
          delay: Number(delay) || 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }, effect);

    return () => context.revert();
  }, [delay, effectRef, inView]);

  return (
    <span
      ref={effectRef}
      className={`text-effect text-effect-delay ${className}`.trim()}
      data-delay={delay}
      aria-label={text}
    >
      <span aria-hidden="true">
        {segments.map((segment, segmentIndex) =>
          /^\s+$/.test(segment) ? (
            <span className="text-effect-space" key={`space-${segmentIndex}`}>
              {segment}
            </span>
          ) : (
            <span className="text-effect-token" key={`token-${segmentIndex}`}>
              {Array.from(segment).map((char, charIndex) => (
                <span className="text-effect-word text-effect-char" key={`${char}-${charIndex}`}>
                  {char}
                </span>
              ))}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export default function PortfolioHome() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeSkillGroup, setActiveSkillGroup] = useState<string | null>(null);
  const skillHoverResetRef = useRef<number | undefined>(undefined);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [activeLeadership, setActiveLeadership] = useState<string | null>(null);

  function activateSkillGroup(groupId: string) {
    if (skillHoverResetRef.current !== undefined) {
      window.clearTimeout(skillHoverResetRef.current);
      skillHoverResetRef.current = undefined;
    }
    setActiveSkillGroup(groupId);
  }

  function scheduleSkillGroupClear() {
    if (skillHoverResetRef.current !== undefined) window.clearTimeout(skillHoverResetRef.current);
    skillHoverResetRef.current = window.setTimeout(() => {
      skillHoverResetRef.current = undefined;
      setActiveSkillGroup(null);
    }, 160);
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let aboutCleanup = () => {};
      let aboutHoverCleanup = () => {};
      let magneticCleanup = () => {};
      let projectFlipCleanup = () => {};
      let refreshGalleryTween: (() => void) | undefined;

      const pet = root.querySelector<HTMLButtonElement>(".robot-pet");
      const spawnButton = root.querySelector<HTMLButtonElement>(".pet-spawn-control");
      const removeButton = root.querySelector<HTMLButtonElement>(".pet-remove-control");
      let petCleanup = () => {};

      if (pet && spawnButton && removeButton) {
        const keys = { left: false, right: false };
        const state = {
          x: 14,
          y: 14,
          vx: 0,
          vy: 0,
          width: 0,
          height: 0,
          grounded: false,
          surface: "air" as PetSurface,
          platformId: "",
        };
        type PetPlatform = { id: string; left: number; right: number; top: number };
        let platforms: PetPlatform[] = [];
        let platformRefreshFrame = 0;
        let active = false;
        let animationFrame = 0;
        let lastTime = performance.now();
        let frameElapsed = 0;
        let currentMotion: PetMotion = "idle";
        let currentFrame = 0;
        let landUntil = 0;

        const setSprite = (motion: PetMotion, frame: number) => {
          if (motion !== currentMotion) {
            currentMotion = motion;
            currentFrame = 0;
            frameElapsed = 0;
            pet.dataset.motion = motion;
            pet.style.setProperty("--sprite-row", String(petSpriteStates[motion].row));
          }

          const frameCount = petSpriteStates[motion].frames;
          const nextFrame = frame % frameCount;
          currentFrame = nextFrame;
          pet.style.setProperty("--sprite-frame", String(petSpriteStates[motion].startFrame + nextFrame));
        };

        const measurePet = () => {
          const rect = pet.getBoundingClientRect();
          state.width = rect.width || 86;
          state.height = rect.height || state.width;
          state.x = gsap.utils.clamp(14, Math.max(14, window.innerWidth - state.width - 14), state.x);
          if (state.surface === "floor" && state.grounded) {
            state.y = window.innerHeight - state.height - 24;
          } else if (state.surface === "left-wall") {
            state.x = 14;
          } else if (state.surface === "right-wall") {
            state.x = window.innerWidth - state.width - 14;
          } else if (state.surface === "ceiling") {
            state.y = 14;
          }
        };

        const refreshPlatforms = () => {
          platformRefreshFrame = 0;
          platforms = Array.from(root.querySelectorAll<HTMLElement>(".pet-walk-surface"))
            .map((element, index) => {
              const rect = element.getBoundingClientRect();
              const styles = window.getComputedStyle(element);
              return {
                id: element.dataset.petSurfaceId || `pet-surface-${index}`,
                left: rect.left,
                right: rect.right,
                top: rect.top,
                visible: styles.display !== "none" && styles.visibility !== "hidden" && Number(styles.opacity) > 0.01,
              };
            })
            .filter((platform) => platform.visible && platform.right > 0 && platform.left < window.innerWidth && platform.top > 10 && platform.top < window.innerHeight - 24)
            .map(({ visible: _visible, ...platform }) => platform);
        };

        const schedulePlatformRefresh = () => {
          if (platformRefreshFrame) return;
          platformRefreshFrame = window.requestAnimationFrame(refreshPlatforms);
        };

        const getPlatform = (id: string) => platforms.find((platform) => platform.id === id);

        const overlapsPlatform = (platform: PetPlatform, x: number) =>
          x + state.width * 0.68 > platform.left && x + state.width * 0.32 < platform.right;

        const updateControlState = () => {
          spawnButton.hidden = active;
          removeButton.hidden = !active;
        };

        const jump = () => {
          if (!active) return;

          if (state.surface === "left-wall") {
            state.vx = 12.4;
            state.vy = -12.4;
          } else if (state.surface === "right-wall") {
            state.vx = -12.4;
            state.vy = -12.4;
          } else if (state.surface === "ceiling") {
            state.vy = 12.4;
          } else if (state.grounded) {
            state.vy = -12.4;
          } else {
            return;
          }

          state.grounded = false;
          state.surface = "air";
          landUntil = 0;
        };

        const handleKeyDown = (event: KeyboardEvent) => {
          if (!active) return;
          const target = event.target as HTMLElement | null;
          if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
          if (target?.closest(".pet-control")) return;

          if (event.key === "ArrowLeft") {
            keys.left = true;
            event.preventDefault();
          } else if (event.key === "ArrowRight") {
            keys.right = true;
            event.preventDefault();
          } else if (event.key === " " || event.key === "ArrowUp" || event.key === "Enter") {
            jump();
            event.preventDefault();
          }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
          if (event.key === "ArrowLeft") keys.left = false;
          if (event.key === "ArrowRight") keys.right = false;
        };

        const resetKeys = () => {
          keys.left = false;
          keys.right = false;
        };

        const handlePetPointerDown = (event: PointerEvent) => {
          event.preventDefault();
          jump();
        };

        const spawnPet = () => {
          if (active) return;
          active = true;
          pet.hidden = false;
          measurePet();
          state.x = 14;
          state.y = 14;
          state.vx = 0;
          state.vy = 0;
          state.grounded = false;
          state.surface = "air";
          state.platformId = "";
          pet.dataset.facing = "right";
          refreshPlatforms();
          setSprite("fall", 0);
          gsap.set(pet, { x: state.x, y: state.y });
          updateControlState();
          lastTime = performance.now();
          frameElapsed = 0;
          animationFrame = window.requestAnimationFrame(tick);
        };

        const removePet = () => {
          active = false;
          window.cancelAnimationFrame(animationFrame);
          animationFrame = 0;
          resetKeys();
          pet.hidden = true;
          state.surface = "air";
          state.grounded = false;
          state.platformId = "";
          gsap.set(pet, { x: 0, y: 0 });
          updateControlState();
        };

        const setPetPosition = gsap.quickSetter(pet, "x", "px");
        const setPetY = gsap.quickSetter(pet, "y", "px");

        const tick = (time: number) => {
          if (!active) {
            animationFrame = 0;
            return;
          }

          const elapsed = Math.min(time - lastTime, 42);
          const delta = elapsed / 16.67;
          lastTime = time;
          frameElapsed += elapsed;

          const floorSurface = window.innerHeight - 24;
          const leftEdge = 14;
          const rightEdge = window.innerWidth - state.width - 14;
          const movingLeft = keys.left && !keys.right;
          const movingRight = keys.right && !keys.left;

          if (state.surface === "left-wall" || state.surface === "right-wall") {
            state.x = state.surface === "left-wall" ? leftEdge : rightEdge;
            const climbingWall = (state.surface === "left-wall" && movingLeft) || (state.surface === "right-wall" && movingRight);
            if (climbingWall) state.y -= 4 * delta;
            state.y = gsap.utils.clamp(14, floorSurface - state.height, state.y);
            if (climbingWall && state.y <= 14) {
              state.y = 14;
              state.surface = "ceiling";
            }
          } else if (state.surface === "ceiling") {
            state.y = 14;
            state.x += (movingRight ? 4 : movingLeft ? -4 : 0) * delta;
            state.x = gsap.utils.clamp(leftEdge, rightEdge, state.x);
            if (movingLeft && state.x <= leftEdge) {
              state.x = leftEdge;
              state.surface = "left-wall";
            } else if (movingRight && state.x >= rightEdge) {
              state.x = rightEdge;
              state.surface = "right-wall";
            }
          } else {
            const intendedVelocity = movingRight ? 4 : movingLeft ? -4 : 0;
            state.vx = intendedVelocity;
            state.x += state.vx * delta;
            state.x = gsap.utils.clamp(leftEdge, rightEdge, state.x);

            if (state.grounded && state.surface === "platform") {
              const platform = getPlatform(state.platformId);
              if (platform && overlapsPlatform(platform, state.x)) {
                state.y = platform.top - state.height;
              } else {
                state.grounded = false;
                state.surface = "air";
                state.platformId = "";
                state.vy = 0;
              }
            }

            if (state.grounded && state.surface === "floor") {
              state.y = floorSurface - state.height;
            }

            if (!state.grounded) {
              const previousBottom = state.y + state.height;
              state.vy = Math.min(state.vy + 0.52 * delta, 11.5);
              const nextY = state.y + state.vy * delta;
              const nextBottom = nextY + state.height;
              const landingPlatform = state.vy >= 0
                ? platforms
                  .filter((platform) => overlapsPlatform(platform, state.x) && previousBottom <= platform.top + 4 && nextBottom >= platform.top)
                  .sort((first, second) => first.top - second.top)[0]
                : undefined;

              if (landingPlatform) {
                state.y = landingPlatform.top - state.height;
                state.vy = 0;
                state.grounded = true;
                state.surface = "platform";
                state.platformId = landingPlatform.id;
                landUntil = time + 220;
              } else if (nextBottom >= floorSurface) {
                state.y = floorSurface - state.height;
                state.vy = 0;
                state.grounded = true;
                state.surface = "floor";
                state.platformId = "";
                landUntil = time + 220;
              } else if (state.y <= 14 && state.vy < 0) {
                state.y = 14;
                state.vy = 0;
                state.grounded = true;
                state.surface = "ceiling";
                state.platformId = "";
              } else {
                state.y = nextY;
              }
            }

            if (state.grounded && state.surface === "floor" && state.x <= leftEdge && movingLeft) {
              state.surface = "left-wall";
              state.platformId = "";
            } else if (state.grounded && state.surface === "floor" && state.x >= rightEdge && movingRight) {
              state.surface = "right-wall";
              state.platformId = "";
            }
          }

          const movingOnWall = (state.surface === "left-wall" && movingLeft) || (state.surface === "right-wall" && movingRight);
          const movingOnCeiling = state.surface === "ceiling" && (movingLeft || movingRight);
          const movingOnFloor = state.surface === "floor" && (movingLeft || movingRight);
          const movingOnPlatform = state.surface === "platform" && (movingLeft || movingRight);
          const landing = (state.surface === "floor" || state.surface === "platform") && time < landUntil && !movingOnFloor && !movingOnPlatform;
          const motion: PetMotion = state.surface === "air"
            ? state.vy < 0 ? "jump" : "fall"
            : landing ? "land" : movingOnWall || movingOnCeiling || movingOnFloor || movingOnPlatform ? "walk" : "idle";
          const motionState = petSpriteStates[motion];
          if (!reduceMotion && frameElapsed >= motionState.frameMs) {
            frameElapsed = 0;
            setSprite(motion, currentFrame + 1);
          } else if (motion !== currentMotion) {
            setSprite(motion, 0);
          }

          if (movingLeft) pet.dataset.facing = "left";
          if (movingRight) pet.dataset.facing = "right";
          setPetPosition(state.x);
          setPetY(state.y);
          animationFrame = window.requestAnimationFrame(tick);
        };

        pet.hidden = true;
        setSprite("idle", 0);
        window.addEventListener("resize", measurePet);
        window.addEventListener("resize", schedulePlatformRefresh);
        window.addEventListener("scroll", schedulePlatformRefresh, { passive: true });
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", resetKeys);
        pet.addEventListener("pointerdown", handlePetPointerDown);
        spawnButton.addEventListener("click", spawnPet);
        removeButton.addEventListener("click", removePet);
        refreshPlatforms();
        updateControlState();

        petCleanup = () => {
          window.cancelAnimationFrame(animationFrame);
          window.removeEventListener("resize", measurePet);
          window.removeEventListener("resize", schedulePlatformRefresh);
          window.removeEventListener("scroll", schedulePlatformRefresh);
          if (platformRefreshFrame) window.cancelAnimationFrame(platformRefreshFrame);
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
          window.removeEventListener("blur", resetKeys);
          pet.removeEventListener("pointerdown", handlePetPointerDown);
          spawnButton.removeEventListener("click", spawnPet);
          removeButton.removeEventListener("click", removePet);
          gsap.killTweensOf(pet);
        };
      }

      if (!reduceMotion) {
        const introTl = gsap.timeline({ defaults: { ease: "power4.out" } });

        introTl
          .from(".name-word", {
            yPercent: 110,
            opacity: 0,
            duration: 1.05,
            stagger: 0.14,
          })
          .from(
            ".hero-kicker, .hero-meta",
            { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 },
            "-=0.45",
          )
          .to(
            ".name-left",
            { x: "-62vw", opacity: 0, duration: 1.45, ease: "expo.inOut" },
            "+=0.15",
          )
          .to(
            ".name-right",
            { x: "62vw", opacity: 0, duration: 1.45, ease: "expo.inOut" },
            "<",
          )
          .to(".hero-kicker, .hero-meta", { opacity: 0, duration: 0.55 }, "<")
          .to(
            ".split-panel-left",
            { xPercent: -102, duration: 1.25, ease: "expo.inOut" },
            "<",
          )
          .to(
            ".split-panel-right",
            { xPercent: 102, duration: 1.25, ease: "expo.inOut" },
            "<",
          )
          .to(".hero-intro, .hero-intro-line-anchor", { autoAlpha: 1, y: 0, duration: 0.8 }, "<")
          .addLabel("introReveal", "<")
          .to(".hero .nav, .hero .hero-action-stack", { autoAlpha: 1, duration: 0.45 }, "<0.18")
          .set(".hero .nav, .hero .hero-action-stack", { pointerEvents: "auto" }, "<")
          .from(
            ".hero-intro-block",
            {
              x: -72,
              opacity: 0,
              duration: 1.05,
              stagger: 0,
              ease: "power3.out",
            },
              "introReveal",
          );

        gsap.utils.toArray<HTMLElement>(".marquee", root).forEach((marquee) => {
          const track = marquee.querySelector<HTMLElement>(".marquee-track");
          if (!track) return;

          gsap.fromTo(track, {
            xPercent: 0,
          }, {
            xPercent: -50,
            duration: Number(marquee.dataset.duration) || 36,
            repeat: -1,
            ease: "none",
          });
        });

        gsap.utils
          .toArray<HTMLElement>(".reveal-row")
          .filter((item) => !item.matches(".section-heading, .contact-panel"))
          .forEach((item) => {
          gsap.from(item, {
            y: 42,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%",
            },
          });
          });

        gsap.utils.toArray<HTMLElement>(".org-logo", root).forEach((logo, index) => {
          gsap.from(logo, {
            y: 18,
            opacity: 0,
            rotationY: index % 2 === 0 ? -24 : 24,
            duration: 0.9,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logo,
              start: "top 88%",
              once: true,
            },
          });

          gsap.to(logo, {
            y: -5,
            rotationY: index % 2 === 0 ? 3 : -3,
            duration: 3.4 + index * 0.18,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 0.9 + index * 0.16,
          });
        });

        const magneticButtons = gsap.utils.toArray<HTMLElement>(".magnetic-btn", root);
        const magneticCleanups: Array<() => void> = [];

        magneticButtons.forEach((button) => {
          const label = button.querySelector<HTMLElement>(".magnetic-label");

          const moveButton = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            const mappedX = gsap.utils.mapRange(
              rect.left,
              rect.right,
              -rect.width / 2,
              rect.width / 2,
              event.clientX,
            );
            const mappedY = gsap.utils.mapRange(
              rect.top,
              rect.bottom,
              -rect.height / 2,
              rect.height / 2,
              event.clientY,
            );

            gsap.to(button, {
              x: mappedX * 0.34,
              y: mappedY * 0.34,
              duration: 0.34,
              ease: "power2.out",
              overwrite: "auto",
            });

            if (label) {
              gsap.to(label, {
                x: mappedX * 0.18,
                y: mappedY * 0.18,
                duration: 0.34,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          };

          const resetButton = () => {
            gsap.to(button, {
              x: 0,
              y: 0,
              duration: 0.62,
              ease: "elastic.out(1, 0.45)",
              overwrite: "auto",
            });

            if (label) {
              gsap.to(label, {
                x: 0,
                y: 0,
                duration: 0.62,
                ease: "elastic.out(1, 0.45)",
                overwrite: "auto",
              });
            }
          };

          button.addEventListener("pointermove", moveButton);
          button.addEventListener("pointerleave", resetButton);
          magneticCleanups.push(() => {
            button.removeEventListener("pointermove", moveButton);
            button.removeEventListener("pointerleave", resetButton);
          });
        });

        magneticCleanup = () => magneticCleanups.forEach((cleanup) => cleanup());

        const projectFlipCleanups: Array<() => void> = [];

        gsap.utils.toArray<HTMLElement>(".gallery__item", root).forEach((item, index) => {
          const card = item.querySelector<HTMLElement>(".project-flip-card");
          const front = item.querySelector<HTMLElement>(".project-front");
          const back = item.querySelector<HTMLElement>(".project-back");
          if (!card || !front || !back) return;

          gsap.set(card, { transformPerspective: 900, transformStyle: "preserve-3d", rotationY: 0 });

          const setFlipped = (flipped: boolean) => {
            const nextState = String(flipped);
            if (item.dataset.flipped === nextState) return;
            item.dataset.flipped = nextState;
            front.setAttribute("aria-hidden", String(flipped));
            back.setAttribute("aria-hidden", String(!flipped));

            front.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
              link.tabIndex = flipped ? -1 : 0;
            });
            back.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
              link.tabIndex = flipped ? 0 : -1;
            });

            gsap.set(item, { zIndex: flipped ? 30 : 1 });
            gsap.to(card, {
              rotationY: flipped ? 180 : 0,
              duration: 0.72,
              ease: "power3.inOut",
              overwrite: "auto",
            });
          };

          const handlePointerEnter = () => {
            setFlipped(true);
          };
          const handlePointerLeave = () => {
            setFlipped(false);
          };
          const handleFocusIn = () => {
            setFlipped(true);
          };
          const handleFocusOut = (event: FocusEvent) => {
            const nextTarget = event.relatedTarget as Node | null;
            if (!nextTarget || !item.contains(nextTarget)) {
              setFlipped(false);
            }
          };

          setFlipped(false);
          item.addEventListener("pointerenter", handlePointerEnter);
          item.addEventListener("pointerleave", handlePointerLeave);
          item.addEventListener("focusin", handleFocusIn);
          item.addEventListener("focusout", handleFocusOut);
          projectFlipCleanups.push(() => {
            item.removeEventListener("pointerenter", handlePointerEnter);
            item.removeEventListener("pointerleave", handlePointerLeave);
            item.removeEventListener("focusin", handleFocusIn);
            item.removeEventListener("focusout", handleFocusOut);
            gsap.killTweensOf(card);
          });
        });

        projectFlipCleanup = () => projectFlipCleanups.forEach((cleanup) => cleanup());

        const aboutStage = root.querySelector<HTMLElement>(".about-card-gallery");
        const aboutCards = gsap.utils.toArray<HTMLElement>(".about-cards li", root);

        if (aboutStage && aboutCards.length > 0) {
          gsap.from(aboutCards, {
            y: 28,
            filter: "blur(8px)",
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutStage,
              start: "top 78%",
            },
          });

          const buildSeamlessLoop = (items: HTMLElement[]) => {
            const transitionDuration = 1.15;
            const holdDuration = 2.5;
            const seamlessLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0 });

            gsap.set(items, {
              xPercent: 260,
              opacity: 0,
              scale: 0.78,
              rotationY: -12,
              zIndex: 1,
            });
            gsap.set(items[0], {
              xPercent: 0,
              opacity: 1,
              scale: 1,
              rotationY: 0,
              zIndex: 100,
            });

            items.forEach((card, index) => {
              const next = items[(index + 1) % items.length];

              seamlessLoop
                .to({}, { duration: holdDuration })
                .to(
                  card,
                  {
                    xPercent: -260,
                    opacity: 0,
                    scale: 0.78,
                    rotationY: 12,
                    duration: transitionDuration,
                    ease: "power2.inOut",
                  },
                )
                .fromTo(
                  next,
                  { xPercent: 260, opacity: 0, scale: 0.78, rotationY: -12 },
                  {
                    xPercent: 0,
                    opacity: 1,
                    scale: 1,
                    rotationY: 0,
                    zIndex: 100,
                    duration: transitionDuration,
                    ease: "power2.inOut",
                    immediateRender: false,
                  },
                  "<",
                )
                .set(card, { xPercent: 260, opacity: 0, scale: 0.78, rotationY: -12, zIndex: 1 });
            });

            return seamlessLoop;
          };

          const seamlessLoop = buildSeamlessLoop(aboutCards);
          seamlessLoop.timeScale(1);
          seamlessLoop.play();

          const aboutHoverCleanups: Array<() => void> = [];

          aboutCards.forEach((card) => {
            const liftCard = () => {
              gsap.to(card, {
                y: -10,
                duration: 0.36,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            const settleCard = () => {
              gsap.to(card, {
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.55)",
                overwrite: "auto",
              });
            };

            card.addEventListener("pointerenter", liftCard);
            card.addEventListener("pointerleave", settleCard);
            aboutHoverCleanups.push(() => {
              card.removeEventListener("pointerenter", liftCard);
              card.removeEventListener("pointerleave", settleCard);
            });
          });

          aboutHoverCleanup = () => aboutHoverCleanups.forEach((cleanup) => cleanup());

          aboutCleanup = () => {
            seamlessLoop.kill();
            aboutHoverCleanup();
            aboutHoverCleanup = () => {};
          };
        }
      }

      if (reduceMotion) {
        gsap.set(".hero-intro, .hero-intro-line-anchor", { autoAlpha: 1, y: 0 });
        gsap.set(".hero .nav, .hero .hero-action-stack", { autoAlpha: 1, pointerEvents: "auto" });
        gsap.set(".hero-intro-block", { opacity: 1, y: 0, filter: "none" });
        gsap.set(".text-effect-word", {
          y: 0,
          yPercent: 0,
          rotation: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          color: "#f8fafc",
          filter: "none",
        });
      }

        let flipCtx: gsap.Context | undefined;

        const createTween = () => {
          const galleryElement = root.querySelector<HTMLElement>("#gallery-8");
          if (!galleryElement) return;

        const galleryWrap = galleryElement.parentElement;
        if (!galleryWrap) return;

          const galleryItems = galleryElement.querySelectorAll<HTMLElement>(".gallery__item");
          const fallbackProjectIndex = Math.floor(galleryItems.length / 2);
          galleryItems.forEach((item, index) => {
            item.toggleAttribute("data-project-focus", index === fallbackProjectIndex);
          });
          flipCtx?.revert();
          galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
          gsap.set([galleryElement, ...galleryItems], { autoAlpha: 1 });

          galleryElement.classList.add("gallery--final");
          const flipState = Flip.getState(galleryItems);
          galleryElement.classList.remove("gallery--final");

          const flip = Flip.to(flipState, {
            simple: true,
            ease: "expoScale(1, 5)",
            duration: 1.6,
          });

            const tl = gsap.timeline({
              scrollTrigger: {
                id: "projects-focus-transition",
                trigger: galleryWrap,
                start: "top top",
                end: "+=420%",
                scrub: true,
                pin: galleryWrap,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

          tl
            .to({}, { duration: 0.25 })
            .add(flip)
            .to([galleryElement, ...galleryItems], {
              autoAlpha: 0,
              duration: 0.2,
              ease: "none",
              });

            return () => gsap.set([galleryElement, ...galleryItems], { clearProps: "all" });
        }, root);
      };

      refreshGalleryTween = createTween;

      createTween();

      if (!reduceMotion) {
        gsap.to(".hero-intro-copy", {
          yPercent: -6,
          rotateX: 1.2,
          transformPerspective: 1200,
          transformOrigin: "50% 50%",
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

        window.addEventListener("resize", createTween);

      return () => {
        petCleanup();
        aboutCleanup();
        aboutHoverCleanup();
        magneticCleanup();
          projectFlipCleanup();
          refreshGalleryTween = undefined;
          window.removeEventListener("resize", createTween);
          flipCtx?.revert();
        };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const note = rootRef.current?.querySelector<HTMLElement>(".experience-note");
    if (!note) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(note);
    gsap.to(note, {
      x: activeExperience ? 0 : -28,
      autoAlpha: activeExperience ? 1 : 0,
      duration: reducedMotion ? 0 : 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [activeExperience]);

  useEffect(() => {
    const note = rootRef.current?.querySelector<HTMLElement>(".leadership-note");
    if (!note) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(note);
    gsap.to(note, {
      x: activeLeadership ? 0 : -28,
      autoAlpha: activeLeadership ? 1 : 0,
      duration: reducedMotion ? 0 : 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [activeLeadership]);

  useEffect(() => {
    return () => {
      if (skillHoverResetRef.current !== undefined) window.clearTimeout(skillHoverResetRef.current);
    };
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <CanvasLineArt sections={persistentLineArt} />
      <section className="hero" id="home" aria-label="Intro">
        <nav className="nav" aria-label="Portfolio sections">
          <a className="magnetic-btn nav-link" href="#about"><span className="magnetic-label">About</span></a>
          <a className="magnetic-btn nav-link" href="#projects"><span className="magnetic-label">Projects</span></a>
          <a className="magnetic-btn nav-link" href="#skills"><span className="magnetic-label">Skills</span></a>
          <a className="magnetic-btn nav-link" href="#experience"><span className="magnetic-label">Experience</span></a>
          <a className="magnetic-btn nav-link" href="#contact"><span className="magnetic-label">Contact</span></a>
        </nav>

        <div className="pet-controls hero-action-stack" aria-label="Portfolio actions">
          <button className="magnetic-btn pet-control pet-spawn-control" type="button">
            <span className="magnetic-label">Pet</span>
          </button>
          <button className="magnetic-btn pet-control pet-remove-control" type="button" hidden>
            <span className="magnetic-label">No Pet</span>
          </button>
          <a className="pet-control simple-action icon-control" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M5.2 7.2A2.2 2.2 0 1 0 5.2 2.8a2.2 2.2 0 0 0 0 4.4ZM3.3 21.2h3.8V9H3.3v12.2ZM9.2 9v12.2H13v-6c0-1.6.3-3.1 2.2-3.1 1.9 0 1.9 1.8 1.9 3.2v5.9h3.8v-6.7c0-3.3-.7-5.8-4.6-5.8-1.9 0-3.2 1-3.7 1.9h-.1V9H9.2Z" />
            </svg>
          </a>
          <a className="pet-control simple-action icon-control" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
            <svg className="action-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M12 2.5a9.7 9.7 0 0 0-3.1 18.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1 1.6 1 .9 1.6 2.3 1.1 2.8.8.1-.6.3-1.1.6-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A9.7 9.7 0 0 0 12 2.5Z" />
            </svg>
          </a>
          <a className="pet-control simple-action cv-control" href="/emaan-bilal-cv.txt" download aria-label="Download CV" title="Download CV">
            <span>CV</span>
          </a>
        </div>

        <CursorStarTrail />

        <div className="split-panel split-panel-left" />
        <div className="split-panel split-panel-right" />

        <p className="hero-kicker">Creative CS student building interactive tech</p>
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="name-word name-left">Emaan</span>
          <span className="name-word name-right">Bilal</span>
        </h1>
        <p className="hero-meta">
          {profile.role} / {profile.location}
        </p>

        <div className="hero-intro-line-anchor" aria-hidden="true" />
        <div className="hero-intro" aria-label="Introduction">
          <div className="hero-intro-copy pet-walk-surface" data-pet-surface-id="intro-copy">
            <p className="hero-intro-block hero-intro-lead">
              <span className="text-backdrop">Hi, <span className="intro-accent-word">Emaan</span> here.</span>
            </p>
            <p className="hero-intro-block">
              <span className="text-backdrop">I am an undergraduate Computer Science student at <span className="intro-accent-word">FAST-NUCES.</span> Art has been part of who I am since childhood, from painting to creating things visually.</span>
            </p>
            <p className="hero-intro-block">
              <span className="text-backdrop">Computer science gave that creativity a new direction. <span className="intro-accent-word">Front-end development</span>, <span className="intro-accent-word">interactive interfaces</span>, and <span className="intro-accent-word">game development</span> became spaces where I could transform ideas into experiences.</span>
            </p>
            <p className="hero-intro-block">
              <span className="text-backdrop">I am also learning <span className="intro-accent-word">back-end development</span>, <span className="intro-accent-word">artificial intelligence</span>, and <span className="intro-accent-word">database design</span>, while exploring <span className="intro-accent-word">computer vision</span> with growing curiosity.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="Horizontal" aria-label="Portfolio quote">
        <CursorStarTrail />
        <MarqueeText text={quote} className="quote-marquee heading-xl" duration={34} />
      </section>

      <section className="gallery-section projects-section" id="projects" aria-label="Scrubbed bento project gallery">
        <div className="gallery-wrap">
          <div className="gallery gallery--bento" id="gallery-8">
            {projects.map((project) => (
              <article className="gallery__item pet-walk-surface" data-pet-surface-id={`project-${project.title}`} key={project.title}>
                <div className="project-flip-card">
                  <div className="project-face project-front">
                    <p>{project.category}</p>
                    <h3>{project.title}</h3>
                    <small>{project.subtitle}</small>
                    <em>{project.stack}</em>
                  </div>
                  <div className="project-face project-back" aria-hidden="true">
                    <p>{project.description}</p>
                    <em>{project.stack}</em>
                    {isLinkedInLink(project.details) && (
                      <a
                        className="magnetic-btn project-details"
                        href={project.details}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="magnetic-label">Details</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <CursorStarTrail />
        <div className="section-heading reveal-row">
          <p className="text-backdrop">About</p>
          <h2>
            <TextEffectWithCustomVariants
              text="Artist brain, developer hands, builder energy."
              className="about-heading-effect"
            />
          </h2>
        </div>

        <div className="about-card-gallery reveal-row" aria-label="Infinite about cards">
          <ul className="about-cards">
            {about.map((card) => (
              <li className="about-card pet-walk-surface" data-pet-surface-id={`about-${card.heading}`} key={card.heading}>
                <span className="about-card-heading">{card.heading}</span>
                <p>{card.body}</p>
                {card.items && (
                  <ul className="about-card-items">
                    {card.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <CursorStarTrail />
        <div className="section-heading reveal-row">
          <p className="text-backdrop">Skills</p>
          <h2>
            <TextEffectWithCustomVariants text="Front-end development, UI/UX design, game development, and full-stack. Learning AI and computer vision." className="text-backdrop" />
          </h2>
        </div>
        <div
          className="skills-explorer reveal-row"
          onPointerLeave={scheduleSkillGroupClear}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              scheduleSkillGroupClear();
            }
          }}
        >
          <div className="skills-explorer-tabs" role="tablist" aria-label="Skill categories">
            {skillGroups.map((group) => (
              <button
                className="skills-explorer-tab pet-walk-surface"
                data-pet-surface-id={`skill-${group.id}`}
                data-group={group.id}
                key={group.id}
                type="button"
                role="tab"
                aria-selected={activeSkillGroup === group.id}
                aria-controls="skills-detail-panel"
                onPointerEnter={() => activateSkillGroup(group.id)}
                onFocus={() => activateSkillGroup(group.id)}
                onClick={() => {
                  if (activeSkillGroup === group.id) {
                    setActiveSkillGroup(null);
                  } else {
                    activateSkillGroup(group.id);
                  }
                }}
              >
                {group.title}
              </button>
            ))}
          </div>

          <aside
            className="skills-detail-panel pet-walk-surface"
            data-pet-surface-id="skills-detail"
            id="skills-detail-panel"
            data-active-group={activeSkillGroup ?? ""}
            aria-live="polite"
            aria-hidden={!activeSkillGroup}
          >
            {(() => {
              const group = skillGroups.find((item) => item.id === activeSkillGroup);
              if (!group) return null;

              return (
                <>
                  <span className="skills-detail-kicker" style={{ color: group.accent }}>
                    {group.title}
                  </span>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        {item.rating && (
                          <span className="skill-rating" aria-label={`${item.rating} out of 5 stars`}>
                            {"★".repeat(item.rating)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              );
            })()}
          </aside>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <CursorStarTrail />
        <div className="section-heading reveal-row">
          <p className="text-backdrop">Experience</p>
          <h2>
            <TextEffectWithCustomVariants text="Professional practice with real systems." className="text-backdrop" />
          </h2>
        </div>
        <div
          className="experience-explorer reveal-row"
          onPointerLeave={() => setActiveExperience(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setActiveExperience(null);
            }
          }}
        >
          <aside
            className="experience-note"
            aria-live="polite"
            aria-hidden={!activeExperience}
          >
            {(() => {
              const item = experience.find((entry) => entry.title === activeExperience);
              if (!item) return null;

              return (
                <>
                  <span className="experience-note-kicker text-backdrop" style={{ color: item.accent }}>{item.role}</span>
                  <p><span className="text-backdrop">{item.description}</span></p>
                </>
              );
            })()}
          </aside>

          <div className="experience-list" role="tablist" aria-label="Experience history">
            {experience.map((item) => (
              <button
                className="experience-entry pet-walk-surface"
                data-pet-surface-id={`experience-${item.title}`}
                data-experience={item.title === "Tech Avenue Private Limited" ? "tech-avenue" : "nadra"}
                key={item.title}
                type="button"
                role="tab"
                aria-selected={activeExperience === item.title}
                onPointerEnter={() => setActiveExperience(item.title)}
                onFocus={() => setActiveExperience(item.title)}
                onClick={() => setActiveExperience((current) => (current === item.title ? null : item.title))}
              >
                <span className="org-logo experience-entry-logo" aria-hidden="true">
                  <img src={item.logo} alt="" />
                </span>
                <strong><span className="text-backdrop">{item.title}</span></strong>
                <span className="experience-entry-role"><span className="text-backdrop">{item.role}</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section leadership-section" id="leadership">
        <CursorStarTrail />
        <div className="section-heading reveal-row">
          <p className="text-backdrop">Leadership</p>
          <h2>
            <TextEffectWithCustomVariants text="Organizing, decor direction, and event teamwork." className="text-backdrop" />
          </h2>
        </div>
        <div
          className="leadership-explorer reveal-row"
          onPointerLeave={() => setActiveLeadership(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setActiveLeadership(null);
            }
          }}
        >
          <aside className="leadership-note" aria-live="polite" aria-hidden={!activeLeadership}>
            {(() => {
              const item = leadership.find((entry) => entry.title === activeLeadership);
              if (!item) return null;

              return (
                <>
                  <span className="experience-note-kicker text-backdrop">{item.role}</span>
                  <p><span className="text-backdrop">{item.description}</span></p>
                </>
              );
            })()}
          </aside>

          <div className="experience-list leadership-entry-list" role="tablist" aria-label="Leadership history">
            {leadership.map((item) => (
              <button
                className="experience-entry leadership-entry pet-walk-surface"
                data-pet-surface-id={`leadership-${item.title}`}
                key={item.title}
                type="button"
                role="tab"
                aria-selected={activeLeadership === item.title}
                onPointerEnter={() => setActiveLeadership(item.title)}
                onFocus={() => setActiveLeadership(item.title)}
                onClick={() => setActiveLeadership((current) => (current === item.title ? null : item.title))}
              >
                <span className="org-logo experience-entry-logo" aria-hidden="true">
                  <img src={item.logo} alt="" />
                </span>
                <strong><span className="text-backdrop">{item.title}</span></strong>
                <span className="experience-entry-role"><span className="text-backdrop">{item.role}</span></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <CursorStarTrail />
        <div className="contact-panel reveal-row pet-walk-surface" data-pet-surface-id="contact-panel">
          <p className="text-backdrop">Contact</p>
          <h2>
            <TextEffectWithCustomVariants text="Let's build something visually sharp and technically alive." className="text-backdrop" />
          </h2>
          <div className="contact-links">
            <a className="magnetic-btn" href={`mailto:${profile.emails[0]}`}>
              <span className="magnetic-label">{profile.emails[0]}</span>
            </a>
            <a className="magnetic-btn" href={profile.github}>
              <span className="magnetic-label">GitHub</span>
            </a>
            <a className="magnetic-btn" href={profile.linkedin}>
              <span className="magnetic-label">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      <div className="pet-surfaces" aria-hidden="true">
        <span className="pet-wall-hitbox left-wall" data-surface="left-wall" />
        <span className="pet-wall-hitbox right-wall" data-surface="right-wall" />
        <span className="pet-wall-hitbox ceiling" data-surface="ceiling" />
      </div>

      <button
        className="robot-pet"
        data-facing="right"
        data-motion="idle"
        hidden
        type="button"
        aria-label="Interactive bunny pet. Click to jump."
      >
        <span className="robot-pet__shadow" />
        <span className="robot-pet__sprite" aria-hidden="true" />
      </button>
    </main>
  );
}
