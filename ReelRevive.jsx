import { useState, useEffect, useRef } from "react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";

const engData = [
  { w: "W1", v: 45 }, { w: "W2", v: 52 }, { w: "W3", v: 48 },
  { w: "W4", v: 67 }, { w: "W5", v: 81 }, { w: "W6", v: 74 },
  { w: "W7", v: 95 }, { w: "W8", v: 112 }, { w: "W9", v: 138 },
  { w: "W10", v: 167 }, { w: "W11", v: 198 }, { w: "W12", v: 240 },
];

const platData = [
  { name: "Instagram", value: 45 },
  { name: "TikTok", value: 35 },
  { name: "YouTube", value: 20 },
];

const PLAT_COLORS = ["#e1306c", "#69c9d0", "#ff4444"];

const features = [
  { icon: "🪝", title: "AI Hook Generator", desc: "Detects weak openings and crafts scroll-stopping hooks optimized for each platform's algorithm." },
  { icon: "📈", title: "Viral Trend Detection", desc: "Real-time scanning of trending sounds, formats, and topics across all major platforms." },
  { icon: "✍️", title: "Caption Rewriter", desc: "Transforms bland captions into engaging copy with strategic CTAs and keyword optimization." },
  { icon: "🖼️", title: "Thumbnail AI", desc: "Generates high-CTR thumbnails using face detection, contrast analysis, and A/B testing data." },
  { icon: "🔮", title: "Engagement Predictor", desc: "Forecasts likes, shares, saves, and reach before you publish using behavioral models." },
  { icon: "#️⃣", title: "Smart Hashtags", desc: "Generates geo-targeted, niche-specific hashtag sets with growth probability scores." },
  { icon: "🌐", title: "Multi-Platform Optimizer", desc: "Automatically adapts content ratios, durations, and formats for each platform's specs." },
  { icon: "✂️", title: "Auto Clip Remixing", desc: "AI-powered re-editing that applies trending pacing, transitions, and cut styles to old footage." },
];

const testimonials = [
  {
    stars: 5,
    quote: "I uploaded a reel sitting at 340 views for 6 months. ReelRevive rebuilt the hook, swapped the audio, and reposted it. Within 72 hours it hit 1.2 million views. I literally cried.",
    name: "Amara Kimani",
    role: "Lifestyle Creator · 240K followers",
    initials: "AK",
    color: "#7c3aed",
    stat: "📈 +940% reach increase on revived content",
  },
  {
    stars: 5,
    quote: "As a social media manager handling 8 brands, ReelRevive cut my content repurposing time from 3 days to 2 hours. The AI captions alone are worth 10x the subscription.",
    name: "Marcus Osei",
    role: "Social Media Manager · Nairobi",
    initials: "MO",
    color: "#0369a1",
    stat: "⏱️ Saves 11+ hours per week per brand",
  },
  {
    stars: 5,
    quote: "Our agency revived 40 old reels for a client and 6 went viral. That campaign alone brought us 3 new retainer clients worth $24K/year.",
    name: "Fatima Ndiaye",
    role: "Creative Director · Pulse Agency",
    initials: "FN",
    color: "#b45309",
    stat: "💼 6 out of 40 archived reels went viral",
  },
];

const pricing = [
  {
    name: "Starter",
    desc: "Perfect for solo creators",
    price: "$19",
    features: ["10 reel revivals/month", "AI hook generator", "Caption rewriter", "2 platform connections", "Basic analytics", "Email support"],
    featured: false,
    btnLabel: "Get Started",
  },
  {
    name: "Creator Pro",
    desc: "For serious creators and influencers",
    price: "$59",
    features: ["Unlimited revivals", "All AI tools included", "Thumbnail AI generator", "All platform connections", "Engagement predictor", "Smart scheduling", "Priority support"],
    featured: true,
    btnLabel: "Start Free Trial",
  },
  {
    name: "Agency Unlimited",
    desc: "Built for teams at scale",
    price: "$199",
    features: ["Everything in Pro", "Up to 20 brand accounts", "Team collaboration tools", "White-label reports", "API access", "Dedicated account manager"],
    featured: false,
    btnLabel: "Contact Sales",
  },
];

const aiMessages = [
  { icon: "🪝", text: "Your current hook loses 72% of viewers in the first 3 seconds. Try opening with: \"I turned a 200-view flop into 2M views — here's exactly how.\"" },
  { icon: "✂️", text: "Add faster cuts at 00:08. Your pacing is 2.3 cuts/sec vs the trending 4.1 cuts/sec. This single change can boost watch time by 38%." },
  { icon: "📍", text: "\"Coastal grandmother\" aesthetic is rising +180% in Kenya this week — perfectly aligned with your lifestyle content. Apply now." },
];

const reels = [
  { title: "Morning Routine 2023", meta: "340K views · Instagram", score: 94, color: "from-purple-700 to-blue-600" },
  { title: "Productivity Hack Reel", meta: "218K views · TikTok", score: 88, color: "from-blue-800 to-blue-500" },
  { title: "Studio Setup Tour", meta: "174K views · YouTube", score: 76, color: "from-red-700 to-red-500" },
];

// Animated number counter
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// Fade-in on scroll
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ReelRevive() {
  const [chatInput, setChatInput] = useState("");
  const [activeNav, setActiveNav] = useState("Overview");
  const [scoreWidth, setScoreWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => setScoreWidth(87), 800);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#07060f", color: "#ede9fe", fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(7,6,15,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139,92,246,0.18)",
        padding: "0 2.5rem", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1.35rem", background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ReelRevive
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Features", "How It Works", "Dashboard", "Pricing"].map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase().replace(/\s/g, ""))}
              style={{ background: "none", border: "none", color: "rgba(237,233,254,0.6)", fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit" }}>
              {l}
            </button>
          ))}
        </div>
        <button style={{
          background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none",
          color: "#fff", padding: "0.55rem 1.4rem", borderRadius: "8px",
          fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
        }}>
          Start Free Trial
        </button>
      </nav>

      {/* HERO */}
      <section id="features-top" style={{ minHeight: "100vh", paddingTop: "80px", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.35),transparent)", top: -100, left: -150, filter: "blur(80px)", animation: "drift1 8s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(37,99,235,0.3),transparent)", bottom: -80, right: -100, filter: "blur(80px)", animation: "drift2 9s ease-in-out infinite alternate" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(139,92,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.05) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2.5rem", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", width: "100%" }}>
          {/* Left */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.78rem", color: "#c4b5fd", marginBottom: "1.5rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s ease infinite" }} />
              AI-Powered Content Revival Platform
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "3.6rem", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.4rem", color: "#ede9fe" }}>
              Turn Dead Content Into{" "}
              <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Viral Reels
              </span>
            </h1>
            <p style={{ color: "rgba(237,233,254,0.55)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2rem", fontWeight: 300 }}>
              Upload underperforming content and watch AI transform it into scroll-stopping reels that dominate feeds across Instagram, TikTok, and YouTube Shorts.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <button style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", padding: "0.85rem 2rem", borderRadius: 10, fontSize: "1rem", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
                🚀 Start Reviving
              </button>
              <button style={{ background: "transparent", border: "1px solid rgba(139,92,246,0.4)", color: "#c4b5fd", padding: "0.85rem 2rem", borderRadius: 10, fontSize: "1rem", cursor: "pointer", fontFamily: "inherit" }}>
                ▶ Watch Demo
              </button>
            </div>
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {[{ n: 12, s: "M+", l: "Reels Revived" }, { n: 340, s: "%", l: "Avg Reach Boost" }, { n: 89, s: "K", l: "Creators" }].map(({ n, s, l }) => (
                <div key={l}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: "1.8rem", fontWeight: 700, color: "#a78bfa" }}>
                    <Counter target={n} suffix={s} />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(237,233,254,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Dashboard mockup */}
          <div style={{ position: "relative" }}>
            {/* Float cards */}
            <div style={{ position: "absolute", top: -20, left: -30, background: "rgba(20,15,40,0.92)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 12, padding: "0.8rem 1.1rem", backdropFilter: "blur(12px)", zIndex: 2, animation: "floatA 4s ease-in-out infinite alternate" }}>
              <div style={{ fontSize: "0.6rem", color: "rgba(237,233,254,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Viral Score</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: "#a78bfa" }}>94</div>
              <div style={{ fontSize: "0.68rem", color: "#4ade80" }}>↑ +23 pts after AI</div>
            </div>
            <div style={{ position: "absolute", bottom: 30, right: -25, background: "rgba(20,15,40,0.92)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 12, padding: "0.8rem 1.1rem", backdropFilter: "blur(12px)", zIndex: 2, animation: "floatB 4s ease-in-out infinite alternate" }}>
              <div style={{ fontSize: "0.6rem", color: "rgba(237,233,254,0.45)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Reach Increase</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: 700, color: "#60a5fa" }}>+287%</div>
              <div style={{ fontSize: "0.68rem", color: "#4ade80" }}>↑ Post-optimization</div>
            </div>

            {/* Main mockup */}
            <div style={{ background: "rgba(12,10,25,0.97)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.7)" }}>
              <div style={{ background: "rgba(20,15,40,0.9)", padding: "0.9rem 1.2rem", borderBottom: "1px solid rgba(139,92,246,0.1)", display: "flex", gap: "0.4rem", alignItems: "center" }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28ca41", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                <span style={{ marginLeft: "auto", fontSize: "0.72rem", color: "rgba(237,233,254,0.4)" }}>ReelRevive Dashboard</span>
              </div>
              <div style={{ padding: "1.2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div style={{ background: "rgba(30,20,60,0.6)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "0.9rem" }}>
                  <div style={{ fontSize: "0.6rem", color: "rgba(237,233,254,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>Viral Score</div>
                  <div style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "Georgia,serif", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>87</div>
                  <div style={{ height: 5, background: "rgba(139,92,246,0.2)", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${scoreWidth}%`, background: "linear-gradient(90deg,#7c3aed,#60a5fa)", borderRadius: 3, transition: "width 1.5s ease" }} />
                  </div>
                </div>
                <div style={{ background: "rgba(30,20,60,0.6)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "0.9rem" }}>
                  <div style={{ fontSize: "0.6rem", color: "rgba(237,233,254,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Weekly Reach</div>
                  <ResponsiveContainer width="100%" height={55}>
                    <AreaChart data={engData.slice(-7)} margin={{ top: 2, right: 2, left: -30, bottom: 0 }}>
                      <defs>
                        <linearGradient id="miniGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#a78bfa" strokeWidth={2} fill="url(#miniGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ background: "rgba(30,20,60,0.6)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 10, padding: "0.9rem", gridColumn: "1/-1" }}>
                  <div style={{ fontSize: "0.6rem", color: "rgba(237,233,254,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>Trending Audio Matches</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {["💜 Espresso – Sabrina C.", "🔥 As It Was", "✨ Calm Down", "🎵 Trendy Beat #44"].map(t => (
                      <span key={t} style={{ fontSize: "0.65rem", background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)", color: "#93c5fd", padding: "0.2rem 0.55rem", borderRadius: 100 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "6rem 2.5rem", background: "linear-gradient(180deg,#07060f 0%,#0c0a1a 50%,#07060f 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>Core Features</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe", marginBottom: "1rem" }}>
                Everything Your Content Needs to{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Go Viral</span>
              </h2>
              <p style={{ color: "rgba(237,233,254,0.5)", fontSize: "1rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
                Eight AI-powered tools working in concert to transform underperforming content into engagement machines.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}>
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 60}>
                <div style={{
                  background: "rgba(15,10,30,0.75)", border: "1px solid rgba(139,92,246,0.14)",
                  borderRadius: 14, padding: "1.6rem", cursor: "default",
                  transition: "border-color 0.3s, transform 0.3s",
                  height: "100%",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(139,92,246,0.14)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(37,99,235,0.3))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", fontSize: "1.3rem" }}>{f.icon}</div>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.5rem", color: "#ede9fe" }}>{f.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "rgba(237,233,254,0.48)", lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howitworks" style={{ padding: "6rem 2.5rem", background: "#07060f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>Process</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe", marginBottom: "1rem" }}>
                Three Steps to{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Viral</span>
              </h2>
              <p style={{ color: "rgba(237,233,254,0.5)", fontSize: "1rem", lineHeight: 1.7 }}>From forgotten content to trending reels in minutes, not hours.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", position: "relative" }}>
            <div style={{ position: "absolute", top: 55, left: "calc(33% + 20px)", right: "calc(33% + 20px)", height: 1, background: "linear-gradient(90deg,#7c3aed,#2563eb)", zIndex: 0 }} />
            {[
              { n: "01", title: "Upload Old Content", desc: "Connect your Instagram, TikTok, or YouTube account, or drag and drop old videos. AI instantly scans your library for revival candidates." },
              { n: "02", title: "AI Rebuilds It", desc: "Our models detect weak hooks, rewrite scripts, match trending audio, optimize pacing, generate thumbnails, and predict engagement — automatically." },
              { n: "03", title: "Publish Viral Versions", desc: "Review AI-generated variants, pick your favorite, and publish directly to all platforms at the optimal time for maximum algorithmic reach." },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 150}>
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "Georgia,serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 0 30px rgba(124,58,237,0.5)",
                  }}>{s.n}</div>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.15rem", fontWeight: 600, marginBottom: "0.7rem", color: "#ede9fe" }}>{s.title}</h3>
                  <p style={{ fontSize: "0.84rem", color: "rgba(237,233,254,0.5)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="dashboard" style={{ padding: "6rem 2.5rem", background: "linear-gradient(180deg,#07060f,#0b0918,#07060f)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>Dashboard</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe", marginBottom: "1rem" }}>
                Command Your{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Content Empire</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ background: "rgba(10,8,22,0.97)", border: "1px solid rgba(139,92,246,0.18)", borderRadius: 20, overflow: "hidden" }}>
            {/* Top bar */}
            <div style={{ background: "rgba(15,10,30,0.9)", padding: "1rem 1.5rem", borderBottom: "1px solid rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "1rem", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ReelRevive</span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {["Overview", "Reels", "Analytics", "Schedule"].map(t => (
                  <button key={t} onClick={() => setActiveNav(t)} style={{
                    fontSize: "0.75rem", padding: "0.3rem 0.8rem", borderRadius: 6, cursor: "pointer", fontFamily: "inherit",
                    background: activeNav === t ? "rgba(139,92,246,0.2)" : "transparent",
                    color: activeNav === t ? "#c4b5fd" : "rgba(237,233,254,0.45)",
                    border: activeNav === t ? "1px solid rgba(139,92,246,0.3)" : "1px solid transparent",
                  }}>{t}</button>
                ))}
              </div>
              <span style={{ fontSize: "0.75rem", color: "rgba(237,233,254,0.35)" }}>@yourhandle</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "190px 1fr" }}>
              {/* Sidebar */}
              <div style={{ background: "rgba(8,6,18,0.8)", borderRight: "1px solid rgba(139,92,246,0.08)", padding: "1.2rem" }}>
                {[["📊", "Dashboard", true], ["🎬", "My Reels", false], ["🤖", "AI Studio", false], ["📅", "Schedule", false], ["📈", "Analytics", false], ["🎵", "Trending Audio", false], ["⚙️", "Settings", false]].map(([icon, label, active]) => (
                  <div key={label} style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    padding: "0.5rem 0.7rem", borderRadius: 8, marginBottom: "0.2rem",
                    background: active ? "rgba(139,92,246,0.15)" : "transparent",
                    color: active ? "#c4b5fd" : "rgba(237,233,254,0.4)",
                    fontSize: "0.8rem", cursor: "pointer",
                  }}>
                    <span>{icon}</span><span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Main */}
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {/* Metrics */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "0.8rem" }}>
                  {[
                    { l: "Total Reach", v: "2.4M", c: "↑ +34% this week", pos: true },
                    { l: "Avg Viral Score", v: "82", c: "↑ +12 pts", pos: true },
                    { l: "Reels Revived", v: "47", c: "↑ 8 this month", pos: true },
                    { l: "Revenue Impact", v: "$3.2K", c: "↓ -3% vs last mo", pos: false },
                  ].map(m => (
                    <div key={m.l} style={{ background: "rgba(20,14,42,0.8)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 10, padding: "0.9rem 1rem" }}>
                      <div style={{ fontSize: "0.62rem", color: "rgba(237,233,254,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.3rem" }}>{m.l}</div>
                      <div style={{ fontFamily: "Georgia,serif", fontSize: "1.5rem", fontWeight: 700, color: "#ede9fe" }}>{m.v}</div>
                      <div style={{ fontSize: "0.68rem", color: m.pos ? "#4ade80" : "#f87171", marginTop: "0.2rem" }}>{m.c}</div>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "rgba(15,10,30,0.7)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(237,233,254,0.55)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>Engagement Growth</div>
                    <ResponsiveContainer width="100%" height={130}>
                      <AreaChart data={engData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="w" tick={{ fill: "rgba(237,233,254,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "rgba(237,233,254,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ background: "#1a0f35", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, color: "#ede9fe", fontSize: 12 }} />
                        <Area type="monotone" dataKey="v" stroke="#a78bfa" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ background: "rgba(15,10,30,0.7)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(237,233,254,0.55)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>Platform Split</div>
                    <ResponsiveContainer width="100%" height={100}>
                      <PieChart>
                        <Pie data={platData} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={45}>
                          {platData.map((_, i) => <Cell key={i} fill={PLAT_COLORS[i]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: "#1a0f35", border: "1px solid rgba(139,92,246,0.3)", borderRadius: 8, color: "#ede9fe", fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem", marginTop: "0.5rem" }}>
                      {platData.map((p, i) => (
                        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.65rem", color: "rgba(237,233,254,0.55)" }}>
                          <span style={{ width: 8, height: 8, borderRadius: 2, background: PLAT_COLORS[i], display: "inline-block" }} />
                          {p.name} {p.value}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                  <div style={{ background: "rgba(15,10,30,0.7)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(237,233,254,0.55)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>Top Revived Reels</div>
                    {reels.map(r => (
                      <div key={r.title} style={{ display: "flex", alignItems: "center", gap: "0.7rem", padding: "0.45rem 0", borderBottom: "1px solid rgba(139,92,246,0.07)" }}>
                        <div style={{ width: 32, height: 32, borderRadius: 6, background: "linear-gradient(135deg,#7c3aed,#2563eb)", flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.72rem", fontWeight: 500, color: "#ede9fe" }}>{r.title}</div>
                          <div style={{ fontSize: "0.62rem", color: "rgba(237,233,254,0.4)" }}>{r.meta}</div>
                        </div>
                        <span style={{ fontFamily: "Georgia,serif", fontSize: "0.9rem", fontWeight: 700, color: "#a78bfa" }}>{r.score}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(15,10,30,0.7)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(237,233,254,0.55)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>AI Insights</div>
                    {aiMessages.map((m, i) => (
                      <div key={i} style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)", borderRadius: 8, padding: "0.55rem 0.75rem", marginBottom: "0.5rem", fontSize: "0.7rem", color: "rgba(237,233,254,0.75)", lineHeight: 1.5, display: "flex", gap: "0.4rem" }}>
                        <span style={{ flexShrink: 0 }}>{m.icon}</span>
                        <span>{m.text}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "rgba(15,10,30,0.7)", border: "1px solid rgba(139,92,246,0.12)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(237,233,254,0.55)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.8rem" }}>Posting Schedule</div>
                    {[
                      { time: "9:00 AM", color: "#e1306c", label: "Morning Routine v2" },
                      { time: "1:30 PM", color: "#69c9d0", label: "Productivity Tips" },
                      { time: "6:00 PM", color: "#ff4444", label: "Studio Tour Remix" },
                      { time: "8:45 PM", color: "#e1306c", label: "Behind the Scenes" },
                    ].map(s => (
                      <div key={s.time} style={{ display: "flex", alignItems: "center", gap: "0.6rem", padding: "0.38rem 0", borderBottom: "1px solid rgba(139,92,246,0.07)", fontSize: "0.7rem" }}>
                        <span style={{ color: "rgba(237,233,254,0.38)", width: 42, flexShrink: 0 }}>{s.time}</span>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                        <span style={{ color: "rgba(237,233,254,0.7)" }}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI ASSISTANT */}
      <section style={{ padding: "6rem 2.5rem", background: "#07060f" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>AI Assistant</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe", marginBottom: "1rem" }}>
                Your{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Content Coach</span>
              </h2>
              <p style={{ color: "rgba(237,233,254,0.5)", fontSize: "1rem", lineHeight: 1.7 }}>Real-time feedback powered by models trained on millions of viral videos.</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ background: "rgba(12,8,28,0.95)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: 20, padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}>🤖</div>
                <div>
                  <div style={{ fontFamily: "Georgia,serif", fontWeight: 600, fontSize: "1rem", color: "#ede9fe" }}>Revi — AI Assistant</div>
                  <div style={{ fontSize: "0.7rem", color: "#4ade80" }}>● Active · Analyzing your content</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.2rem" }}>
                {aiMessages.map((m, i) => (
                  <div key={i} style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: 12, padding: "0.85rem 1rem", fontSize: "0.86rem", color: "rgba(237,233,254,0.85)", lineHeight: 1.65, display: "flex", gap: "0.6rem" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>{m.icon}</span>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.8rem" }}>
                <input
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask Revi anything about your content…"
                  style={{ flex: 1, background: "rgba(20,14,42,0.7)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: 10, padding: "0.75rem 1rem", color: "#ede9fe", fontFamily: "inherit", fontSize: "0.86rem", outline: "none" }}
                />
                <button style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", padding: "0.75rem 1.4rem", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: "0.86rem" }}>
                  Send ↗
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "6rem 2.5rem", background: "linear-gradient(180deg,#07060f,#0b0918,#07060f)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>Testimonials</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe" }}>
                Creators Who{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Made the Switch</span>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 100}>
                <div style={{ background: "rgba(15,10,30,0.8)", border: "1px solid rgba(139,92,246,0.14)", borderRadius: 16, padding: "1.8rem", height: "100%" }}>
                  <div style={{ color: "#fbbf24", fontSize: "1rem", letterSpacing: 2, marginBottom: "1rem" }}>{"★".repeat(t.stars)}</div>
                  <p style={{ fontSize: "0.88rem", color: "rgba(237,233,254,0.65)", lineHeight: 1.75, marginBottom: "1.2rem" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.8rem" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}aa)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "0.88rem", color: "#fff" }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.88rem", color: "#ede9fe" }}>{t.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(237,233,254,0.4)" }}>{t.role}</div>
                    </div>
                  </div>
                  <div style={{ borderTop: "1px solid rgba(139,92,246,0.1)", paddingTop: "0.8rem", fontSize: "0.72rem", color: "#4ade80" }}>{t.stat}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "6rem 2.5rem", background: "#07060f" }}>
        <div style={{ maxWidth: 950, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <span style={{ display: "inline-block", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.72rem", color: "#c4b5fd", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>Pricing</span>
              <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.6rem", fontWeight: 700, color: "#ede9fe", marginBottom: "1rem" }}>
                Invest in{" "}
                <span style={{ background: "linear-gradient(135deg,#c4b5fd,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Virality</span>
              </h2>
              <p style={{ color: "rgba(237,233,254,0.5)", fontSize: "1rem", lineHeight: 1.7 }}>Start free, scale when you're ready. No hidden fees, no contracts.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {pricing.map((p, i) => (
              <FadeIn key={p.name} delay={i * 100}>
                <div style={{
                  background: p.featured ? "rgba(20,12,50,0.97)" : "rgba(15,10,30,0.8)",
                  border: p.featured ? "1px solid rgba(139,92,246,0.55)" : "1px solid rgba(139,92,246,0.14)",
                  borderRadius: 18, padding: "2rem", position: "relative", overflow: "hidden",
                  boxShadow: p.featured ? "0 0 60px rgba(124,58,237,0.2)" : "none",
                  height: "100%",
                }}>
                  {p.featured && (
                    <>
                      <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 200, height: 120, background: "radial-gradient(circle,rgba(124,58,237,0.4),transparent)" }} />
                      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#7c3aed,#2563eb)", color: "#fff", fontSize: "0.7rem", fontWeight: 600, padding: "0.35rem 1.2rem", borderRadius: 100, whiteSpace: "nowrap" }}>Most Popular</div>
                    </>
                  )}
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.3rem", color: p.featured ? "#c4b5fd" : "#ede9fe" }}>{p.name}</div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(237,233,254,0.4)", marginBottom: "1.5rem" }}>{p.desc}</div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem", background: p.featured ? "linear-gradient(135deg,#c4b5fd,#60a5fa)" : "none", WebkitBackgroundClip: p.featured ? "text" : "unset", WebkitTextFillColor: p.featured ? "transparent" : "#ede9fe" }}>
                      {p.price}<span style={{ fontSize: "0.9rem", WebkitTextFillColor: "rgba(237,233,254,0.4)", fontWeight: 400 }}>/mo</span>
                    </div>
                    <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                      {p.features.map(f => (
                        <li key={f} style={{ fontSize: "0.83rem", color: "rgba(237,233,254,0.65)", padding: "0.42rem 0", display: "flex", gap: "0.6rem", alignItems: "center", borderBottom: "1px solid rgba(139,92,246,0.07)" }}>
                          <span style={{ color: "#a78bfa", flexShrink: 0 }}>✦</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button style={{
                      width: "100%", padding: "0.85rem", borderRadius: 10,
                      fontFamily: "inherit", fontSize: "0.9rem", cursor: "pointer",
                      background: p.featured ? "linear-gradient(135deg,#7c3aed,#2563eb)" : "transparent",
                      border: p.featured ? "none" : "1px solid rgba(139,92,246,0.35)",
                      color: p.featured ? "#fff" : "#c4b5fd",
                      fontWeight: 500,
                    }}>{p.btnLabel}</button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "rgba(5,4,11,0.99)", borderTop: "1px solid rgba(139,92,246,0.12)", padding: "4rem 2.5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: "1.4rem", background: "linear-gradient(135deg,#a78bfa,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.8rem" }}>ReelRevive</div>
              <p style={{ fontSize: "0.82rem", color: "rgba(237,233,254,0.35)", lineHeight: 1.7 }}>Turn your dead content into viral reels with the power of AI. Built for creators who refuse to let good content go to waste.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Dashboard", "API", "Changelog"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "Georgia,serif", fontSize: "0.88rem", fontWeight: 600, marginBottom: "1rem", color: "rgba(237,233,254,0.7)" }}>{col.title}</h4>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ display: "block", fontSize: "0.8rem", color: "rgba(237,233,254,0.35)", textDecoration: "none", marginBottom: "0.5rem" }}>{l}</a>
                ))}
              </div>
            ))}
            <div>
              <h4 style={{ fontFamily: "Georgia,serif", fontSize: "0.88rem", fontWeight: 600, marginBottom: "0.7rem", color: "rgba(237,233,254,0.7)" }}>Stay Updated</h4>
              <p style={{ fontSize: "0.78rem", color: "rgba(237,233,254,0.35)", marginBottom: "0.8rem" }}>Get viral tips and product news weekly.</p>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input placeholder="Your email" style={{ flex: 1, background: "rgba(20,14,42,0.7)", border: "1px solid rgba(139,92,246,0.22)", borderRadius: 8, padding: "0.55rem 0.8rem", color: "#ede9fe", fontFamily: "inherit", fontSize: "0.8rem", outline: "none" }} />
                <button style={{ background: "linear-gradient(135deg,#7c3aed,#2563eb)", border: "none", color: "#fff", padding: "0.55rem 1rem", borderRadius: 8, cursor: "pointer", fontSize: "0.8rem", whiteSpace: "nowrap" }}>Join</button>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(139,92,246,0.1)", paddingTop: "2rem" }}>
            <div style={{ fontSize: "0.78rem", color: "rgba(237,233,254,0.25)" }}>© 2026 ReelRevive. All rights reserved.</div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {["𝕏", "in", "📸", "▶"].map(icon => (
                <a key={icon} href="#" style={{ width: 34, height: 34, border: "1px solid rgba(139,92,246,0.22)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(237,233,254,0.45)", textDecoration: "none", fontSize: "0.85rem" }}>{icon}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes drift1 { 0% { transform: translate(0,0); } 100% { transform: translate(30px,25px); } }
        @keyframes drift2 { 0% { transform: translate(0,0); } 100% { transform: translate(-25px,20px); } }
        @keyframes floatA { 0% { transform: translateY(0); } 100% { transform: translateY(-14px); } }
        @keyframes floatB { 0% { transform: translateY(0); } 100% { transform: translateY(-10px); } }
        @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.4; transform:scale(1.5); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07060f; }
        a:hover { color: #a78bfa !important; }
        input::placeholder { color: rgba(237,233,254,0.3); }
        button:hover { opacity: 0.88; }
        ::-webkit-scrollbar { width: 6px; } 
        ::-webkit-scrollbar-track { background: #07060f; }
        ::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
