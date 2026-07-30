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

const aboutMarquee =
  "Artist brain. Developer hands. Builder energy.";

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

function HeroRibbons() {
  return (
    <div className="hero-ribbons" aria-hidden="true">
      <svg className="hero-ribbon-svg" viewBox="0 0 1440 980" preserveAspectRatio="none">
        <path
          className="hero-ribbon hero-ribbon-lime"
        />
        <path
          className="hero-ribbon hero-ribbon-green"
        />
        <path
          className="hero-ribbon hero-ribbon-blue"
        />
        <path
          className="hero-ribbon hero-ribbon-purple"
        />
        <path
          className="hero-ribbon hero-ribbon-pink"
        />
      </svg>
    </div>
  );
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min);

function createHeroRibbonPath(index = 0) {
  const route = (index + Math.floor(Math.random() * 4)) % 4;

  if (route === 0) {
    const yStart = randomBetween(115, 175);
    const yEnd = randomBetween(120, 190);
    const controlOne = { x: randomBetween(300, 520), y: randomBetween(155, 245) };
    const controlTwo = { x: randomBetween(920, 1160), y: randomBetween(145, 235) };
    return `M -42 ${yStart}
      C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, 1482 ${yEnd}`;
  }

  if (route === 1) {
    const yStart = randomBetween(805, 875);
    const yEnd = randomBetween(795, 875);
    const controlOne = { x: randomBetween(920, 1160), y: randomBetween(735, 825) };
    const controlTwo = { x: randomBetween(300, 520), y: randomBetween(745, 835) };
    return `M 1482 ${yStart}
      C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, -42 ${yEnd}`;
  }

  const leftSide = route === 2;
  const xBase = leftSide ? randomBetween(80, 170) : randomBetween(1270, 1360);
  const controlOne = {
    x: leftSide ? randomBetween(120, 230) : randomBetween(1210, 1320),
    y: randomBetween(220, 360),
  };
  const controlTwo = {
    x: leftSide ? randomBetween(110, 220) : randomBetween(1220, 1330),
    y: randomBetween(650, 800),
  };
  const endX = xBase + randomBetween(-28, 28);

  return `M ${xBase} -42
    C ${controlOne.x} ${controlOne.y}, ${controlTwo.x} ${controlTwo.y}, ${endX} 1014`;
}

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

export default function PortfolioHome() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip);

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let aboutCleanup = () => {};
      let aboutHoverCleanup = () => {};
      let magneticCleanup = () => {};
      let ribbonsAlive = true;
      const ribbonTimelines = new Set<gsap.core.Timeline>();

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

        const heroRibbonPaths = gsap.utils.toArray<SVGPathElement>(".hero-ribbon", root);

        const paintRibbon = (path: SVGPathElement, index: number, delay = index * 0.8) => {
          path.setAttribute("d", createHeroRibbonPath(index));
          const length = path.getTotalLength();
          const timeline = gsap.timeline({ delay });
          ribbonTimelines.add(timeline);

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });

          timeline
            .to(path, { opacity: 0.78, duration: 0.45, ease: "power2.out" })
            .to(path, {
              strokeDashoffset: 0,
              duration: gsap.utils.random(4, 8),
              ease: "power1.inOut",
            })
            .to({}, { duration: gsap.utils.random(1.2, 2.2) })
            .to(path, { opacity: 0, duration: 0.85, ease: "power2.inOut" });

          timeline.eventCallback("onComplete", () => {
            ribbonTimelines.delete(timeline);
            if (ribbonsAlive) {
              paintRibbon(path, index, gsap.utils.random(0.3, 1.1));
            }
          });
        };

        if (reduceMotion) {
          heroRibbonPaths.forEach((path) => {
            path.setAttribute("d", createHeroRibbonPath(index));
            gsap.set(path, { opacity: 0.48 });
          });
        } else {
          heroRibbonPaths.forEach((path, index) => paintRibbon(path, index));
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

          gsap.set(aboutCards, { xPercent: 260, opacity: 0, scale: 0.72, rotationY: -12 });

          const spacing = 0.3;
          const animateCard = (element: HTMLElement) => {
            const tl = gsap.timeline();

            tl.fromTo(
              element,
              { scale: 0.72, opacity: 0, rotationY: -12 },
              {
                scale: 1,
                opacity: 1,
                rotationY: 0,
                zIndex: 100,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                immediateRender: false,
              },
            ).fromTo(
              element,
              { xPercent: 260 },
              { xPercent: -260, duration: 1, ease: "none", immediateRender: false },
              0,
            );

            return tl;
          };

          const buildSeamlessLoop = (
            items: HTMLElement[],
            spacingValue: number,
            animateFunc: (element: HTMLElement) => gsap.core.Timeline,
          ) => {
            const overlap = Math.ceil(1 / spacingValue);
            const startTime = items.length * spacingValue + 0.5;
            const loopTime = (items.length + overlap) * spacingValue + 1;
            const rawSequence = gsap.timeline({ paused: true });
            const seamlessLoop = gsap.timeline({ paused: true, repeat: -1 });
            const totalItems = items.length + overlap * 2;

            for (let i = 0; i < totalItems; i += 1) {
              const index = i % items.length;
              const time = i * spacingValue;

              rawSequence.add(animateFunc(items[index]), time);
              if (i <= items.length) {
                seamlessLoop.add(`label${i}`, time);
              }
            }

            rawSequence.time(startTime);
            seamlessLoop
              .to(rawSequence, {
                time: loopTime,
                duration: loopTime - startTime,
                ease: "none",
              })
              .fromTo(
                rawSequence,
                { time: overlap * spacingValue + 1 },
                {
                  time: startTime,
                  duration: startTime - (overlap * spacingValue + 1),
                  immediateRender: false,
                  ease: "none",
                },
              );

            return seamlessLoop;
          };

          const seamlessLoop = buildSeamlessLoop(aboutCards, spacing, animateCard);
          const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());
          const renderAboutCards = (progress: number) => {
            seamlessLoop.time(wrapTime(progress * seamlessLoop.duration() * 0.62));
          };

          renderAboutCards(0);

          const aboutTrigger = ScrollTrigger.create({
            trigger: aboutStage,
            start: "top 72%",
            end: "bottom top",
            scrub: 1.35,
            onUpdate(self) {
              renderAboutCards(self.progress);
            },
          });

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
            aboutTrigger.kill();
            seamlessLoop.kill();
            aboutHoverCleanup();
            aboutHoverCleanup = () => {};
          };
        }
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
      aboutCleanup();
      aboutHoverCleanup();
      magneticCleanup();
      ribbonsAlive = false;
      ribbonTimelines.forEach((timeline) => timeline.kill());
      ribbonTimelines.clear();
      window.removeEventListener("resize", createTween);
      flipCtx?.revert();
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main className="portfolio" ref={rootRef}>
      <section className="hero" id="home" aria-label="Intro">
        <HeroRibbons />

        <div className="split-panel split-panel-left" />
        <div className="split-panel split-panel-right" />

        <nav className="nav" aria-label="Main navigation">
          {["About", "Projects", "Skills", "Experience", "Contact"].map((item) => (
            <a className="magnetic-btn" href={`#${item.toLowerCase()}`} key={item}>
              <span className="magnetic-label">{item}</span>
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
        <MarqueeText text={quote} className="quote-marquee heading-xl" duration={34} />
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

        <MarqueeText text={aboutMarquee} className="about-marquee" duration={44} />

        <div className="about-card-gallery reveal-row" aria-label="Infinite about cards">
          <ul className="about-cards">
            {about.map((line, index) => (
              <li className="about-card" key={line}>
                <span>0{index + 1}</span>
                <p>{line}</p>
              </li>
            ))}
          </ul>
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
    </main>
  );
}
