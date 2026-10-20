import { useEffect, useRef, useState } from "react"
import {
  ArrowUpRight,
  Bell,
  Blocks,
  CalendarDays,
  Calculator,
  CircleSlash2,
  ClipboardCheck,
  CloudUpload,
  Container,
  CreditCard,
  Download,
  FileText,
  GitCommitHorizontal,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MousePointer2,
  Phone,
  Radio,
  ReceiptText,
  Rocket,
  Sparkles,
  Tv,
  Workflow,
  X,
} from "lucide-react"
import {
  aiTools,
  cloudGroups,
  education,
  experience,
  facts,
  integrations,
  pipeline,
  products,
  profile,
  skillGroups,
  ticker,
} from "./data"
import { aiIcons, techIcons } from "./techIcons"

const navLinks = [
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Work"],
  ["education", "Education"],
  ["contact", "Contact"],
]

function useInView() {
  const [node, setNode] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!node || shown) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true)
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [node, shown])

  return [setNode, shown]
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const [ref, shown] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const nodes = [...document.querySelectorAll("main section[id]")]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: "-42% 0px -48% 0px", threshold: [0.15, 0.4, 0.7] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? "is-solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="wrap nav-bar">
        <a className="logo" href="#home" onClick={close}>
          Vivek<span>.</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "page" : undefined}>
              {label}
            </a>
          ))}
          <a className="btn btn-fill" href={profile.resume} target="_blank" rel="noreferrer">
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </nav>
        <button
          className="nav-toggle"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="nav-panel" aria-label="Mobile">
          {navLinks.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={close}>
              {label}
            </a>
          ))}
          <a className="btn btn-fill" href={profile.resume} target="_blank" rel="noreferrer" onClick={close}>
            <Download size={16} aria-hidden="true" />
            Resume
          </a>
        </nav>
      )}
    </header>
  )
}

const roles = ["MERN stack developer", "Node.js and React", "Python (Django)"]

function TypedRole() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [text, setText] = useState(reduce ? roles.join(" · ") : "")
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const word = roles[index]
    const finished = deleting ? text.length === 0 : text === word
    const delay = finished ? (deleting ? 240 : 1300) : deleting ? 36 : 72
    const timer = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text.length === 0) {
        setDeleting(false)
        setIndex((value) => (value + 1) % roles.length)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [text, deleting, index, reduce])

  return (
    <p className="typed" aria-label="MERN stack developer, Node.js and React, Python with Django">
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true" />
    </p>
  )
}

function Constellation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const ctx = canvas.getContext("2d")
    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00028,
      vy: (Math.random() - 0.5) * 0.00028,
    }))
    let frame = 0
    let width = 0
    let height = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      dots.forEach((dot) => {
        dot.x += dot.vx
        dot.y += dot.vy
        if (dot.x < 0 || dot.x > 1) dot.vx *= -1
        if (dot.y < 0 || dot.y > 1) dot.vy *= -1
      })
      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const dx = (dots[i].x - dots[j].x) * width
          const dy = (dots[i].y - dots[j].y) * height
          const dist = Math.hypot(dx, dy)
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 200, 87, ${(1 - dist / 150) * 0.38})`
            ctx.beginPath()
            ctx.moveTo(dots[i].x * width, dots[i].y * height)
            ctx.lineTo(dots[j].x * width, dots[j].y * height)
            ctx.stroke()
          }
        }
      }
      dots.forEach((dot) => {
        ctx.fillStyle = "rgba(255, 200, 87, 0.9)"
        ctx.beginPath()
        ctx.arc(dot.x * width, dot.y * height, 1.7, 0, Math.PI * 2)
        ctx.fill()
      })
      frame = requestAnimationFrame(draw)
    }

    resize()
    frame = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation" aria-hidden="true" />
}


function CountUp({ value, suffix = "" }) {
  const [count, setCount] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? value : 0,
  )

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined
    const started = performance.now()
    let frame = 0
    const tick = (now) => {
      const progress = Math.min(1, (now - started) / 1200)
      const eased = 1 - (1 - progress) ** 3
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export function Hero() {
  const reduceMotion = useRef(false)
  const [shift, setShift] = useState({ x: 0, y: 0 })

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const onMove = (event) => {
    if (reduceMotion.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    setShift({ x: x * 18, y: y * 12 })
  }

  return (
    <section
      className="hero"
      id="home"
      onMouseMove={onMove}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
    >
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" />
            Open to senior MERN stack roles
          </p>
          <h1>
            Vivek <em>Mistry</em>
          </h1>
          <TypedRole />
          <p className="promise">Full stack products, built end to end.</p>
          <p className="hero-lead">
            I build web products in Surat with Node.js, React, and MongoDB, and reach for Python and
            Django when a project calls for it. Nine years on the web, five of them on the MERN stack.
          </p>
          <div className="hero-actions">
            <a className="btn btn-fill" href="#contact">
              Hire me <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <a className="btn btn-line" href={profile.resume} target="_blank" rel="noreferrer">
              <Download size={18} aria-hidden="true" />
              Download resume
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>
                <CountUp value={9} suffix="+" />
              </strong>
              <span>Years experience</span>
            </li>
            <li>
              <strong>
                <CountUp value={5} suffix="+" />
              </strong>
              <span>Years on MERN</span>
            </li>
            <li>
              <strong>
                <CountUp value={7} />
              </strong>
              <span>Roles since 2017</span>
            </li>
          </ul>
        </div>
        <div
          className="photo-parallax"
          style={{ transform: `translate3d(${shift.x}px, ${shift.y}px, 0)` }}
        >
          <div className="photo-float">
            <div className="photo-stage">
              <div className="orbit-wrap">
                <svg className="orbit" viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path id="orbit-path" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
                  </defs>
                  <text>
                  <textPath href="#orbit-path" startOffset="0%" textLength="548" lengthAdjust="spacing">
                    MERN STACK · NODE · REACT · MONGODB · SURAT ·
                  </textPath>
                  </text>
                </svg>
              </div>
              <figure className="hero-photo">
              <img
                src="/images/vivek-portrait.jpg"
                width="864"
                height="864"
                alt="Vivek Mistry smiling, in a yellow kurta"
                fetchPriority="high"
              />
            </figure>
            <span className="photo-chip">Surat, Gujarat</span>
            <span className="ship-stamp">MERN + Django</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Marquee() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener("change", apply)
    return () => media.removeEventListener("change", apply)
  }, [])

  const row = reduceMotion ? ticker : [...ticker, ...ticker]
  return (
    <div className="marquee">
      <p className="sr-only">Technologies: {ticker.join(", ")}.</p>
      <div className="marquee-track" aria-hidden="true">
        {row.map((item, index) => (
          <span className="mq-item" key={`${item}-${index}`}>
            {item}
            <span className="mq-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

const integrationIcons = {
  payments: CreditCard,
  calendar: CalendarDays,
  bell: Bell,
  google: Globe,
  pdf: FileText,
  mail: Mail,
  accounting: Calculator,
  realtime: Radio,
  signage: Tv,
}

const productIcons = {
  school: GraduationCap,
  blocks: Blocks,
  tv: Tv,
  receipt: ReceiptText,
  clipboard: ClipboardCheck,
}

export function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">About</p>
            <h2>Nine years on the web, five of them on MERN.</h2>
          </div>
          <p>
            Full stack developer from Surat. I work across the database, the API, and the interface,
            and I connect the services in between.
          </p>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <p className="pull">Backend, frontend, and the integrations that hold them together.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="about-copy">
              <p>
                I have been building web products since 2017. Since 2021 my work has centred on the MERN
                stack (MongoDB, Express.js, React, and Node.js), with Next.js and Tailwind CSS on the frontend,
                Python and Django alongside it, and PHP with CodeIgniter and Laravel in my toolkit.
              </p>
              <p>
                I am looking for a senior MERN stack role in an organization that gives me room to keep
                learning, and a team that works together toward its growth.
              </p>
            </div>
            <ul className="facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal className="sub-head">
          <h3>Integrations in my toolkit</h3>
          <p>Services I know how to connect to the apps I build, from payments to digital signage.</p>
        </Reveal>
        <div className="int-grid">
          {integrations.map((item, index) => {
            const Icon = integrationIcons[item.icon]
            return (
              <Reveal as="article" className="int-card" delay={(index % 4) * 70} key={item.title}>
                <span className="int-icon">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Experience</p>
            <h2>From web developer to senior MERN developer.</h2>
          </div>
          <p>Seven roles since May 2017, most recently freelancing on lernen-hub.</p>
        </Reveal>
        <ol className="timeline">
          {experience.map((job, index) => (
            <Reveal
              as="li"
              className={`tl-item ${job.current ? "is-current" : ""}`}
              delay={Math.min(index, 3) * 60}
              key={`${job.company}-${job.dates}`}
            >
              <div className="tl-when">
                <time>{job.dates}</time>
                <span className="tl-length">{job.length}</span>
              </div>
              <span className="tl-dot" aria-hidden="true" />
              <article className="tl-card">
                <h3>{job.role}</h3>
                <p className="company">
                  {job.company}
                  {job.place ? ` · ${job.place}` : ""}
                </p>
                {job.points.length > 0 && (
                  <ul>
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section skills" id="skills">
      <Constellation />
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Skills</p>
            <h2>What I work with.</h2>
          </div>
          <p>Node.js and React at the centre, with Next.js, Tailwind CSS, Python, several databases, and the tools around them.</p>
        </Reveal>
        <div className="tile-grid">
          {techIcons.map((icon) => (
            <article className="skill-tile" key={icon.name} style={{ "--brand": icon.color }}>
              <svg className="tech-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d={icon.path} />
              </svg>
              <strong>{icon.name}</strong>
            </article>
          ))}
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <Reveal as="article" className="skill-card" delay={index * 60} key={group.title}>
              <h3>{group.title}</h3>
              <div className="pills">
                {group.items.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const pipelineIcons = {
  commit: GitCommitHorizontal,
  pipeline: Workflow,
  container: Container,
  deploy: CloudUpload,
}

export function Delivery() {
  return (
    <section className="section" id="delivery">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Cloud & DevOps</p>
            <h2>From commit to production.</h2>
          </div>
          <p>
            Working knowledge of AWS Lambda, managing Azure cloud, and the concepts behind containers,
            pipelines, and automated deployment.
          </p>
        </Reveal>
        <div className="delivery-grid">
          <div className="cloud-groups">
            {cloudGroups.map((group, index) => (
              <Reveal as="article" className="cloud-card" delay={index * 80} key={group.title}>
                <h3>{group.title}</h3>
                <div className="pills">
                  {group.items.map((item) => (
                    <span className="pill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="pipeline-wrap">
            <ol className="pipeline" aria-label="Delivery pipeline">
              {pipeline.map((stage, index) => {
                const Icon = pipelineIcons[stage.icon]
                return (
                  <li className="stage" style={{ "--i": index }} key={stage.title}>
                    <span className="stage-icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <h4>{stage.title}</h4>
                      <p>{stage.text}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function AiGlyph({ tool, size = 20 }) {
  if (aiIcons[tool.icon]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={aiIcons[tool.icon]} />
      </svg>
    )
  }
  const Icon = { cursor: MousePointer2, grok: CircleSlash2, antigravity: Rocket }[tool.icon] || Sparkles
  return <Icon size={size} aria-hidden="true" />
}

export function AiWorkflow() {
  return (
    <section className="section ai" id="ai">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">AI in the workflow</p>
            <h2>AI tools that sit beside my editor.</h2>
          </div>
          <p>The AI tools I work with while building, from writing and reviewing code to thinking a problem through.</p>
        </Reveal>
        <div className="ai-layout">
          <ul className="ai-list">
            {aiTools.map((tool, index) => (
              <Reveal as="li" className="ai-item" delay={index * 60} key={tool.name}>
                <span className="ai-icon" style={{ "--tool": tool.color }}>
                  <AiGlyph tool={tool} />
                </span>
                <strong>{tool.name}</strong>
              </Reveal>
            ))}
          </ul>
          <Reveal className="ai-stage" delay={120}>
            <div className="ai-orbit" aria-hidden="true">
              <span className="ai-track" />
              <span className="ai-track ai-track-b" />
              <div className="ai-hub">
                <Sparkles size={22} />
                <span>Dev workflow</span>
              </div>
              <div className="ai-ring">
                {aiTools.map((tool, index) => (
                  <div className="ai-node" style={{ "--i": index, "--tool": tool.color }} key={tool.name}>
                    <div className="ai-up">
                      <div className="ai-counter">
                        <span className="ai-chip">
                          <AiGlyph tool={tool} size={18} />
                          {tool.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Work</p>
            <h2>Products I work on.</h2>
          </div>
          <p>Live products from my work history. Each card links to the official website.</p>
        </Reveal>
        <div className="feature-grid">
          {products.map((item, index) => {
            const Icon = productIcons[item.icon]
            return (
              <Reveal
                as="article"
                className={`feature-card ${index > 2 ? "wide" : ""}`}
                delay={(index % 3) * 70}
                key={item.name}
              >
                <div>
                  <span className="feature-icon">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <p className="stack">{item.kind}</p>
                  <h3>{item.name}</h3>
                </div>
                <p className="feature-text">{item.text}</p>
                <ul className="feature-tags">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a
                  className="feature-link"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Visit the ${item.name} website, opens in a new tab`}
                >
                  {item.domain}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section className="section education" id="education">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <p className="kicker">Education</p>
            <h2>Where I studied.</h2>
          </div>
          <p>Two degrees at Uka Tarsadia University in Bardoli, Gujarat.</p>
        </Reveal>
        <div className="edu-grid">
          {education.map((item, index) => (
            <Reveal as="article" className="edu-card" delay={index * 80} key={item.degree}>
              <b>{item.year}</b>
              <div>
                <h3>{item.degree}</h3>
                <p>{item.school}</p>
                <small>
                  {item.place} · {item.score}
                </small>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" })
  const [status, setStatus] = useState("idle")
  const [error, setError] = useState("")

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${form.name || "a visitor"}`)}&body=${encodeURIComponent(
    `${form.message}\n\n— ${form.name}\n${form.email}${form.company ? `\n${form.company}` : ""}`,
  )}`

  const onSubmit = async (event) => {
    event.preventDefault()
    if (form["bot-field"]) {
      setStatus("sent")
      return
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Add your name, email, and a short note.")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("That email does not look quite right.")
      return
    }
    setError("")
    setStatus("sending")
    const body = new URLSearchParams({
      "form-name": "contact",
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.message,
    }).toString()

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      })
      const text = await response.text()
      if (!response.ok || text.includes('id="root"')) {
        setStatus("local")
        return
      }
      setStatus("sent")
      const { default: confetti } = await import("canvas-confetti")
      confetti({
        particleCount: 90,
        spread: 68,
        origin: { y: 0.72 },
        colors: ["#ef9f1a", "#ffc857", "#1a1612", "#fffaf3"],
      })
    } catch {
      setStatus("local")
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <Reveal>
          <p className="kicker">Contact</p>
          <h2>Tell me what you need built.</h2>
          <p className="hero-lead" style={{ color: "var(--ink-soft)", marginTop: "1rem" }}>
            Available for senior MERN stack developer roles.
          </p>
          <ul className="contact-links">
            <li>
              <a href={profile.phoneHref}>
                <Phone size={18} aria-hidden="true" /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> {profile.email}
              </a>
            </li>
            <li>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", fontWeight: 600 }}>
                <MapPin size={18} aria-hidden="true" /> {profile.location}
              </span>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={80}>
          {status === "sent" ? (
            <div className="form success">
              <h3>Message received.</h3>
              <p>I will reply at {form.email}.</p>
            </div>
          ) : (
            <form className="form" name="contact" method="POST" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="contact" />
              <p className="hp">
                <label>
                  Don’t fill this out <input name="bot-field" tabIndex={-1} autoComplete="off" onChange={onChange} />
                </label>
              </p>
              <label className="field">
                <span>Name</span>
                <input name="name" autoComplete="name" value={form.name} onChange={onChange} required />
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required />
              </label>
              <label className="field">
                <span>Company</span>
                <input name="company" autoComplete="organization" value={form.company} onChange={onChange} />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" value={form.message} onChange={onChange} required maxLength={2000} />
              </label>
              {error && <p className="form-error">{error}</p>}
              {status === "local" && (
                <p className="form-note">
                  Netlify will collect this form after the site is deployed. Until then,{" "}
                  <a href={mailto}>email it directly</a>.
                </p>
              )}
              <button className="btn btn-dark" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-bar">
        <p>© 2026 Vivek Mistry · Surat</p>
        <nav aria-label="Footer">
          <a href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  )
}
