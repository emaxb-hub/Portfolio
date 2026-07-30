"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const profile = {
  name: "Emaan Bilal",
  role: "Frontend Developer | Game Developer",
  location: "Rawalpindi / Islamabad, Pakistan",
  github: "https://github.com/emaxb-hub",
  linkedin: "https://www.linkedin.com/in/emaan-b-883b0a268/",
  emails: ["emaxbilaleo@gmail.com", "i240502@isb.nu.edu.pk"],
};

const about = [
  "I learn best by building from curiosity, turning ideas into working things while I study the concepts behind them.",
  "AI tools help me think through what is possible, then I keep refining until the logic, structure, and decisions make sense.",
  "I am growing across frontend development, game development, backend systems, AI, databases, and computer vision.",
];

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "C++",
  "Python",
  "Assembly",
  "Java",
  "SQL",
  "SFML",
  "JavaFX",
  "Swing",
  "JDBC",
];

const projects = [
  {
    category: "Web Development",
    title: "WarehouseWare",
    subtitle: "Warehouse Management Inventory System",
    stack: "Java, JavaFX/Swing, JDBC, SQL",
  },
  {
    category: "AI Projects",
    title: "Kaam Compiler",
    subtitle: "Academic task compiler and planner",
    stack: "OCR, Flask, AI classification, task boards",
  },
  {
    category: "Game Development",
    title: "Space Invaders Clone",
    subtitle: "Classic arcade game remake",
    stack: "C++ / OOP",
  },
  {
    category: "Game Development",
    title: "Xonix",
    subtitle: "Territory-capture inspired game",
    stack: "C++ / SFML",
  },
  {
    category: "Web Development",
    title: "Ghardari",
    subtitle: "Women-focused community and advice platform",
    stack: "Full-stack concept",
  },
  {
    category: "AI Projects",
    title: "CityMind AI",
    subtitle: "AI-assisted city decision support",
    stack: "Python, AI, ML, graph routing",
  },
  {
    category: "Game Development",
    title: "Super Mario Clone",
    subtitle: "Low-level game programming project",
    stack: "Assembly Language",
  },
  {
    category: "Game Development",
    title: "Buzz Bomber",
    subtitle: "Arcade-style SFML game",
    stack: "C++ / SFML",
  },
];

const experience = [
  {
    title: "Tech Avenue Private Limited",
    role: "Intern",
    description:
      "Built front-end development skills in a company environment, developed responsive interfaces, and connected screens with back-end services.",
  },
  {
    title: "NADRA Technologies Limited",
    role: "Development Intern",
    description:
      "Learning and working with back-end systems using Java and MySQL while strengthening database and server-side development skills.",
  },
];

const leadership = [
  "FAST Outreach and Engagement Society - Head Decor",
  "NASCON, FAST-NUCES - Management Team",
];

const quote =
  "I imagine, learn, and build.";

const introBlocks = [
  {
    text: <>Hi, <span>Emaan</span> here.</>,
  },
  {
    text: (
      <>
        I am an undergraduate Computer Science student at <span>FAST-NUCES</span>.
        Art has been part of who I am since childhood, from painting to creating
        things visually.
      </>
    ),
  },
  {
    text: (
      <>
        Computer science gave that creativity a new direction. <span>Front-end
        development</span>, <span>interactive interfaces</span>, and <span>game
        development</span> became spaces where I could transform ideas into
        experiences.
      </>
    ),
  },
  {
    text: (
      <>
        I am also learning <span>back-end development</span>, <span>artificial
        intelligence</span>, and <span>database design</span>, while exploring
        <span> computer vision</span> with growing curiosity.
      </>
    ),
  },
];

export default function PortfolioHome() {
  const rootRef = useRef<HTMLElement | null>(null);
  const waterCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stopWater = () => {};

    const canvas = waterCanvasRef.current;
    const ctx2d = canvas?.getContext("2d");

    if (canvas && ctx2d) {
      const pointer = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
      const cursor = { x: pointer.x, y: pointer.y };
      let width = 0;
      let height = 0;
      let frameId = 0;

      const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
        width = rect.width;
        height = rect.height;
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      const movePointer = (event: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
      };

      const drawLiquid = (time = 0) => {
        cursor.x += (pointer.x - cursor.x) * 0.08;
        cursor.y += (pointer.y - cursor.y) * 0.08;

        ctx2d.clearRect(0, 0, width, height);
        ctx2d.globalCompositeOperation = "screen";

        const colours = [
          { color: "57, 255, 20", drift: 0, scale: 1.15 },
          { color: "0, 217, 255", drift: 2.1, scale: 0.9 },
          { color: "168, 85, 247", drift: 4.2, scale: 1.02 },
        ];

        colours.forEach((layer, index) => {
          const x = cursor.x + Math.sin(time * 0.0007 + layer.drift) * width * 0.13;
          const y = cursor.y + Math.cos(time * 0.0006 + layer.drift) * height * 0.12;
          const radius = Math.max(width, height) * (0.22 + index * 0.035) * layer.scale;
          const gradient = ctx2d.createRadialGradient(x, y, 0, x, y, radius);

          gradient.addColorStop(0, `rgba(${layer.color}, 0.22)`);
          gradient.addColorStop(0.48, `rgba(${layer.color}, 0.09)`);
          gradient.addColorStop(1, `rgba(${layer.color}, 0)`);

          ctx2d.fillStyle = gradient;
          ctx2d.beginPath();
          ctx2d.ellipse(x, y, radius * 1.65, radius * 0.78, Math.sin(time * 0.00045 + index), 0, Math.PI * 2);
          ctx2d.fill();
        });

        for (let ring = 0; ring < 5; ring += 1) {
          const hue = ring % 3 === 0 ? "57, 255, 20" : ring % 3 === 1 ? "0, 217, 255" : "168, 85, 247";
          const radius = 78 + ring * 54 + Math.sin(time * 0.001 + ring) * 14;

          ctx2d.beginPath();
          for (let step = 0; step <= 150; step += 1) {
            const angle = (step / 150) * Math.PI * 2;
            const wobble = Math.sin(angle * 5 + time * 0.002 + ring) * 10;
            const px = cursor.x + Math.cos(angle) * (radius + wobble) * 1.55;
            const py = cursor.y + Math.sin(angle) * (radius + wobble) * 0.74;

            if (step === 0) {
              ctx2d.moveTo(px, py);
            } else {
              ctx2d.lineTo(px, py);
            }
          }

          ctx2d.closePath();
          ctx2d.strokeStyle = `rgba(${hue}, ${0.16 - ring * 0.018})`;
          ctx2d.lineWidth = 1.4;
          ctx2d.stroke();
        }

        if (!reduceMotion) {
          frameId = requestAnimationFrame(drawLiquid);
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      window.addEventListener("pointermove", movePointer, { passive: true });
      drawLiquid();

      stopWater = () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener("pointermove", movePointer);
      };
    }

    const ctx = gsap.context(() => {
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
          .to(".hero-intro", { autoAlpha: 1, y: 0, duration: 0.8 }, "-=0.25")
          .from(
            ".hero-intro-block",
            {
              y: 22,
              opacity: 0,
              filter: "blur(8px)",
              duration: 0.7,
              stagger: 0.13,
              ease: "power3.out",
            },
            "-=0.25",
          );

        const wrapper = root.querySelector<HTMLElement>(".Horizontal");
        const text = root.querySelector<HTMLElement>(".Horizontal__text");

        if (wrapper && text) {
          const split = SplitText.create(".Horizontal__text", {
            type: "chars, words",
          });

          gsap.to(text, {
            xPercent: -50,
            duration: 16,
            ease: "none",
            repeat: -1,
            scrollTrigger: {
              trigger: wrapper,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });

          split.chars.forEach((char) => {
            gsap.from(char, {
              yPercent: "random(-200, 200)",
              rotation: "random(-20, 20)",
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: wrapper,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }

        gsap.utils.toArray<HTMLElement>(".reveal-row").forEach((item) => {
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
      }

      let flipCtx: gsap.Context | undefined;

      const createTween = () => {
        const galleryElement = root.querySelector<HTMLElement>("#gallery-8");
        if (!galleryElement) return;

        const galleryItems = galleryElement.querySelectorAll<HTMLElement>(".gallery__item");
        flipCtx?.revert();
        galleryElement.classList.remove("gallery--final");

        flipCtx = gsap.context(() => {
          galleryElement.classList.add("gallery--final");
          const flipState = Flip.getState(galleryItems);
          galleryElement.classList.remove("gallery--final");

          const flip = Flip.to(flipState, {
            simple: true,
            ease: "expoScale(1, 5)",
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: galleryElement,
              start: "center center",
              end: "+=115%",
              scrub: true,
              pin: galleryElement.parentNode as Element,
            },
          })
            .add(flip)
            .to(galleryElement, { autoAlpha: 0, duration: 0.22, ease: "none" });

          return () => gsap.set([galleryElement, ...galleryItems], { clearProps: "all" });
        }, root);
      };

      createTween();
      window.addEventListener("resize", createTween);

      return () => {
        window.removeEventListener("resize", createTween);
        flipCtx?.revert();
      };
    }, root);

    return () => {
      stopWater();
      ctx.revert();
    };
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <section className="hero" id="home" aria-label="Intro">
        <canvas className="water-field" ref={waterCanvasRef} aria-hidden="true" />

        <div className="split-panel split-panel-left" />
        <div className="split-panel split-panel-right" />

        <nav className="nav" aria-label="Main navigation">
          {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>

        <p className="hero-kicker">Creative CS student building interactive tech</p>
        <h1 className="hero-name" aria-label={profile.name}>
          <span className="name-word name-left">Emaan</span>
          <span className="name-word name-right">Bilal</span>
        </h1>
        <p className="hero-meta">
          {profile.role} / {profile.location}
        </p>

        <div className="hero-intro" aria-label="Introduction">
          {introBlocks.map((block, index) => (
            <p className="hero-intro-block" key={index}>
              {block.text}
            </p>
          ))}
        </div>
      </section>

      <section className="Horizontal" aria-label="Portfolio quote">
        <div className="Horizontal__text heading-xl">
          <span>{quote}</span>
          <span aria-hidden="true">{quote}</span>
          <span aria-hidden="true">{quote}</span>
          <span aria-hidden="true">{quote}</span>
        </div>
      </section>

      <section className="gallery-section" id="projects" aria-label="Scrubbed bento project gallery">
        <div className="section-heading reveal-row">
          <p>Scroll-scrubbed gallery</p>
          <h2>Projects as a techy bento board.</h2>
        </div>

        <div className="gallery-wrap">
          <div className="gallery gallery--bento" id="gallery-8">
            {projects.map((project, index) => (
              <article className="gallery__item" key={project.title}>
                <span>0{index + 1}</span>
                <p>{project.category}</p>
                <h3>{project.title}</h3>
                <small>{project.subtitle}</small>
                <em>{project.stack}</em>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="post-project-blank" aria-label="Blank section for next content" />

      <section className="section about-section" id="about">
        <div className="section-heading reveal-row">
          <p>About</p>
          <h2>Artist brain, developer hands, builder energy.</h2>
        </div>
        <div className="about-grid">
          {about.map((line, index) => (
            <article className="info-card reveal-row" key={line}>
              <span>0{index + 1}</span>
              <p>{line}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading reveal-row">
          <p>Skills</p>
          <h2>Frontend, games, systems, and AI-assisted workflows.</h2>
        </div>
        <div className="skill-cloud reveal-row">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="section-heading reveal-row">
          <p>Experience</p>
          <h2>Professional practice with real systems.</h2>
        </div>
        <div className="timeline">
          {experience.map((item) => (
            <article className="timeline-item reveal-row" key={item.title}>
              <div>
                <span>{item.role}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section leadership-section" id="leadership">
        <div className="section-heading reveal-row">
          <p>Leadership</p>
          <h2>Organizing, decor direction, and event teamwork.</h2>
        </div>
        <div className="leadership-list reveal-row">
          {leadership.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-panel reveal-row">
          <p>Contact</p>
          <h2>Let&apos;s build something visually sharp and technically alive.</h2>
          <div className="contact-links">
            <a href={`mailto:${profile.emails[0]}`}>{profile.emails[0]}</a>
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
          </div>
        </div>
      </section>
    </main>
  );
}
