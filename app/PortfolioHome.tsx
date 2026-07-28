"use client";

import { useEffect, useRef } from "react";
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

const intro =
  "Hi, Emaan here. I am an undergraduate Computer Science student at FAST-NUCES. Art has been part of me since childhood, from painting to creating things visually. Computer science gave that creativity a new direction: front-end development, interactive interfaces, and game development became places where I could turn ideas into experiences.";

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

export default function PortfolioHome() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
            { x: "-32vw", duration: 1.15, ease: "expo.inOut" },
            "+=0.15",
          )
          .to(
            ".name-right",
            { x: "32vw", duration: 1.15, ease: "expo.inOut" },
            "<",
          )
          .to(
            ".split-panel-left",
            { xPercent: -102, duration: 1.05, ease: "expo.inOut" },
            "<",
          )
          .to(
            ".split-panel-right",
            { xPercent: 102, duration: 1.05, ease: "expo.inOut" },
            "<",
          )
          .fromTo(
            ".hello-panel",
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.9,
              transformOrigin: "50% 50%",
              ease: "expo.inOut",
            },
            "-=0.6",
          )
          .from(
            ".hello-content > *",
            { y: 20, opacity: 0, duration: 0.72, stagger: 0.08 },
            "-=0.25",
          );

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
          }).add(flip);

          return () => gsap.set(galleryItems, { clearProps: "all" });
        }, root);
      };

      createTween();
      window.addEventListener("resize", createTween);

      return () => {
        window.removeEventListener("resize", createTween);
        flipCtx?.revert();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <section className="hero" id="home" aria-label="Intro">
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
          <span className="name-word name-left">EMAAN</span>
          <span className="name-word name-right">BILAL</span>
        </h1>
        <p className="hero-meta">
          {profile.role} / {profile.location}
        </p>

        <div className="hello-panel" aria-label="Welcome">
          <div className="hello-content">
            <span className="hello-tag">hello</span>
            <h2>Welcome to Emaan's interactive portfolio.</h2>
            <p>{intro}</p>
            <div className="hero-actions">
              <a href="#projects">View Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
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
