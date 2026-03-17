import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  CloudRain,
  Route,
  Sparkles,
  Gauge,
  Navigation,
  Bot,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Moon,
  Building2,
  Waves,
  CheckCircle2,
  Radar,
  Timer,
  MapPinned,
  ArrowUpRight,
  Shield,
  Map,
  ScanLine,
  Cpu,
  PanelTop,
  Orbit,
  LayoutPanelTop,
  PanelsTopLeft,
  CircleHelp,
} from "lucide-react";

const scenarios = [
  {
    id: "commute",
    title: "晚高峰高架通勤",
    subtitle: "拥堵、加塞与施工切换都比较典型的一段城市路线。",
    weather: "多云",
    time: "夜间",
    road: "城市高架",
    goal: "减轻反复跟车压力",
    intro:
      "这是一段非常适合体现智能驾驶辅助价值的路线。系统可以在重复跟车、速度微调与车道保持上持续分担压力，并在道路边界变复杂时更自然地把控制权交还给你。",
    art: "flow",
    events: [
      { t: "18:02", title: "辅助驾驶已开启", systemMode: "Pilot Assist On", confidence: 86, tag: "平稳起步", buddy: "我已经和系统同步完成。这一段路结构比较清晰，跟车节奏和速度微调会是本次最主要的辅助价值来源。", delta: { assistMinutes: 2, reliefOps: 3, scenes: ["高架直行"] } },
      { t: "18:05", title: "进入拥堵跟车区间", systemMode: "Adaptive Follow", confidence: 88, tag: "减压区间", buddy: "前方车流开始变密。这类区间最容易让人感到疲惫，而系统现在正在替你分担大量细碎的跟车与起停调整。", delta: { assistMinutes: 4, reliefOps: 7, scenes: ["晚高峰拥堵"] } },
      { t: "18:08", title: "检测到加塞车辆", systemMode: "Responsive Slowdown", confidence: 81, tag: "动态响应", buddy: "左前方车辆正在并入。系统现在提前留出了空间，所以这次减速会显得更平顺，而不是临时应对。", delta: { assistMinutes: 2, reliefOps: 5, scenes: ["车辆加塞"] } },
      { t: "18:11", title: "施工区域临近", systemMode: "Boundary Watch", confidence: 63, tag: "复杂边界", buddy: "前方锥桶和导流线会让道路边界不再稳定。这时系统会变得更保守，接下来更值得关注的是控制切换的时机。", delta: { assistMinutes: 1, reliefOps: 2, scenes: ["施工干扰"] } },
      { t: "18:12", title: "系统提示接管", systemMode: "Takeover Requested", confidence: 42, tag: "协同切换", buddy: "这一段更适合由你重新掌控。前面那部分最消耗精力的拥堵区间，系统已经替你承担了相当多的重复负担。", delta: { assistMinutes: 0, reliefOps: 2, scenes: ["接管节点"] } },
      { t: "18:15", title: "人工接管完成", systemMode: "Manual Control", confidence: 76, tag: "平稳过渡", buddy: "这次切换非常自然。真正让系统显得可靠的，往往就是这种你和它能够顺滑分工的时刻。", delta: { assistMinutes: 0, reliefOps: 1, scenes: ["平稳接管"] } },
      { t: "18:20", title: "重新进入清晰路段", systemMode: "Lane Support Ready", confidence: 84, tag: "恢复支持", buddy: "道路边界重新清晰了。像这种规则明确的高架路段，系统最适合做一层安静、持续、减压的辅助。", delta: { assistMinutes: 3, reliefOps: 4, scenes: ["恢复辅助"] } },
    ],
  },
  {
    id: "rain",
    title: "雨夜快速路",
    subtitle: "更能体现天气变化下系统状态和陪伴解释的价值。",
    weather: "小雨",
    time: "夜间",
    road: "城市快速路",
    goal: "在复杂天气中保持安心感",
    intro:
      "雨天会让智能驾驶的体验更依赖解释层。因为系统状态会随着标线清晰度和路面反光变化而波动，用户越容易理解这种变化，整体体验就越平稳。",
    art: "rain",
    events: [
      { t: "20:06", title: "天气联动支持已启动", systemMode: "Weather Adaptive", confidence: 78, tag: "天气接入", buddy: "我已经识别到当前雨势。系统仍能提供辅助，但我会更关注状态波动，让整个过程更容易理解。", delta: { assistMinutes: 2, reliefOps: 2, scenes: ["雨夜通勤"] } },
      { t: "20:08", title: "车道线质量下降", systemMode: "Lane Confidence Reduced", confidence: 56, tag: "视觉变化", buddy: "路面反光正在影响边界识别。现在系统依然在工作，但更值得依赖的是它提供的辅助，而不是把它看成完全接手。", delta: { assistMinutes: 1, reliefOps: 1, scenes: ["标线模糊"] } },
      { t: "20:10", title: "道路清晰度恢复", systemMode: "Stable Assist", confidence: 82, tag: "状态回升", buddy: "前方边界重新变清楚了。现在的平顺感提升，正是因为系统稳定性回来了，而这种变化也值得被用户感知到。", delta: { assistMinutes: 4, reliefOps: 5, scenes: ["状态恢复"] } },
    ],
  },
  {
    id: "first",
    title: "初次体验教学",
    subtitle: "一段更轻松、更适合建立第一印象的路线。",
    weather: "晴天",
    time: "白天",
    road: "环路",
    goal: "让第一次体验更自然",
    intro:
      "第一次好的体验应该是温和的支持。这段路线会把重点放在最容易感受到价值的时刻，让智能驾驶从抽象技术变成具体帮助。",
    art: "first",
    events: [
      { t: "14:03", title: "首次开启辅助功能", systemMode: "Assist Intro", confidence: 83, tag: "首次同步", buddy: "现在不用急着理解全部功能。今天这段路，我会把重点放在那些真正让驾驶变轻松的辅助时刻。", delta: { assistMinutes: 3, reliefOps: 4, scenes: ["首次开启"] } },
      { t: "14:06", title: "连续跟车状态稳定", systemMode: "Adaptive Cruise Active", confidence: 87, tag: "轻松节奏", buddy: "你现在感受到的顺畅，通常来自系统在背后处理了大量重复性的速度细调。这也是许多人第一次觉得它有价值的瞬间。", delta: { assistMinutes: 4, reliefOps: 6, scenes: ["稳定跟车"] } },
      { t: "14:10", title: "本次体验结束", systemMode: "Trip Complete", confidence: 90, tag: "首次完成", buddy: "一次好的初体验，不是记住多少术语，而是清楚感受到哪一部分驾驶因为系统存在而变得更轻松。", delta: { assistMinutes: 0, reliefOps: 3, scenes: ["首次完成"] } },
    ],
  },
];

const bubbles = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  size: 42 + (i % 5) * 16,
  left: `${4 + i * 6}%`,
  top: `${8 + ((i * 11) % 76)}%`,
  duration: 8 + (i % 5),
  delay: i * 0.45,
}));

function GlassCard({ title, subtitle, icon: Icon, children, className = "" }) {
  return (
    <div className={`rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_18px_80px_rgba(6,15,30,0.34)] backdrop-blur-3xl ${className}`}>
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div>
            {subtitle ? <div className="text-xs uppercase tracking-[0.2em] text-cyan-50/38">{subtitle}</div> : null}
            {title ? <div className="mt-2 text-lg font-medium text-white">{title}</div> : null}
          </div>
          {Icon ? <Icon className="h-5 w-5 text-cyan-200" /> : null}
        </div>
      )}
      <div className={title || subtitle ? "mt-5" : ""}>{children}</div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_14px_50px_rgba(7,16,30,0.3)] backdrop-blur-3xl">
      <div className="flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-50/42">{label}</div>
        <Icon className="h-4 w-4 text-cyan-200" />
      </div>
      <div className="mt-3 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs leading-5 text-cyan-50/52">{sub}</div>
    </div>
  );
}

function DriverViewAnimated({ currentEvent, scenario, isPlaying }) {
  const confidence = currentEvent?.confidence ?? 0;
  const rain = scenario.art === "rain";
  const first = scenario.art === "first";

  return (
    <div className="relative h-[380px] overflow-hidden rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(154,228,255,0.16),transparent_26%),linear-gradient(180deg,rgba(10,22,40,0.99),rgba(6,15,28,0.94))] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_90px_rgba(5,12,24,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(122,220,255,0.08),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(83,160,255,0.07),transparent_28%)]" />

      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-6 py-5 text-xs text-cyan-100/72">
        <div className="flex items-center gap-2"><Cpu className="h-4 w-4" />DriveBuddy 仪表视角</div>
        <div>{currentEvent?.t || "准备中"}</div>
      </div>

      <div className="absolute left-1/2 top-[76px] -translate-x-1/2 text-center">
        <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-100/42">系统稳定度</div>
        <div className="mt-2 text-5xl font-semibold text-white drop-shadow-[0_0_18px_rgba(135,224,255,0.18)]">
          {confidence || "--"}
          <span className="ml-1 text-lg text-cyan-100/48">%</span>
        </div>
        <div className="mx-auto mt-3 h-[3px] w-28 overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,rgba(150,235,255,0.95),rgba(109,187,255,0.9))] shadow-[0_0_18px_rgba(127,214,255,0.38)]"
            animate={{ width: `${confidence || 0}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      </div>

      <div className="absolute inset-x-10 bottom-8 top-[146px] overflow-hidden rounded-[36px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        <div className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_72%)]" />
        <motion.div
          className="absolute inset-x-12 bottom-0 h-20 bg-[radial-gradient(ellipse_at_bottom,rgba(113,201,255,0.14),transparent_60%)]"
          animate={{ opacity: isPlaying ? [0.4, 1, 0.4] : 0.5 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-x-8 bottom-22 h-[2px] bg-gradient-to-r from-transparent via-cyan-100/70 to-transparent shadow-[0_0_12px_rgba(150,230,255,0.3)]"
          animate={{ y: isPlaying ? [0, 18, 0] : 0, opacity: isPlaying ? [0.9, 0.35, 0.9] : 0.8 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-x-16 bottom-30 h-[2px] bg-gradient-to-r from-transparent via-cyan-100/24 to-transparent"
          animate={{ y: isPlaying ? [0, 14, 0] : 0, opacity: isPlaying ? [0.45, 0.15, 0.45] : 0.35 }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
        />

        {rain && Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 h-24 w-px bg-cyan-100/16"
            style={{ left: `${10 + i * 4.8}%`, transform: "rotate(18deg)" }}
            animate={{ y: isPlaying ? [-18, 26] : 0, opacity: isPlaying ? [0.1, 0.35, 0.1] : 0.15 }}
            transition={{ duration: 0.9 + (i % 4) * 0.15, repeat: Infinity, delay: i * 0.05, ease: "linear" }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 bottom-16 h-12 w-16 -translate-x-1/2 rounded-t-[24px] rounded-b-[14px] border border-cyan-100/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_0_20px_rgba(142,229,255,0.08)] backdrop-blur-xl"
          animate={{ x: isPlaying ? [0, first ? 0 : -14, first ? 0 : 8, 0] : 0, y: currentEvent?.tag === "动态响应" ? [0, 4, 0] : 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {currentEvent?.tag === "复杂边界" && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-18 h-8 w-[6px] rounded-full bg-orange-300/70 shadow-[0_0_10px_rgba(251,191,36,0.35)]"
                style={{ left: `${18 + i * 9}%` }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </>
        )}

        <div className="absolute left-5 top-5 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 text-sm text-cyan-50/80 shadow-[0_8px_28px_rgba(7,16,30,0.18)]">{scenario.road}</div>
        <div className="absolute right-5 top-5 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 text-sm text-cyan-50/80 shadow-[0_8px_28px_rgba(7,16,30,0.18)]">{scenario.weather}</div>
        <div className="absolute left-5 bottom-5 flex items-center gap-2 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 text-sm text-cyan-50/80 shadow-[0_8px_28px_rgba(7,16,30,0.18)]"><Orbit className="h-4 w-4 text-cyan-200" />{currentEvent?.systemMode || "等待开始"}</div>
        <div className="absolute right-5 bottom-5 flex items-center gap-2 rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-4 py-3 text-sm text-cyan-50/80 shadow-[0_8px_28px_rgba(7,16,30,0.18)]"><PanelTop className="h-4 w-4 text-cyan-200" />{currentEvent?.tag || "准备中"}</div>
      </div>
    </div>
  );
}

function HomeHeader({ stats, scenario }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-cyan-50/88 backdrop-blur-xl"><Sparkles className="h-4 w-4 text-cyan-200" />DriveBuddy</div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white lg:text-6xl">让智能驾驶，<span className="bg-gradient-to-r from-cyan-100 via-sky-200 to-blue-300 bg-clip-text text-transparent">更近一步</span></h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-cyan-50/64 lg:text-base">看懂系统的每一次思考，听懂它的每一个决定。然后，把这一切，用最舒服的方式告诉你。</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-cyan-50/76">状态感知型陪伴</div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-cyan-50/76">实时系统翻译</div>
          <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-cyan-50/76">旅程总结与成长</div>
        </div>
      </div>

      <div className="grid w-full max-w-xl grid-cols-2 gap-3">
        <MetricCard icon={Shield} label="人车默契值" value={`${stats.syncValue}%`} sub="会随着旅程推进而动态变化" />
        <MetricCard icon={Gauge} label="辅助时长" value={`${stats.assistMinutes} min`} sub="本次路程中累计产生的支持" />
        <MetricCard icon={Sparkles} label="减负动作" value={stats.reliefOps} sub="高频且细碎的操作已有部分被吸收" />
        <MetricCard icon={MapPinned} label="点亮场景" value={stats.sceneCount} sub={`当前旅程 · ${scenario.title}`} />
      </div>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = useState("commute");
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [page, setPage] = useState("sim");

  const scenario = useMemo(() => scenarios.find((s) => s.id === selectedId) || scenarios[0], [selectedId]);
  const currentEvent = step >= 0 ? scenario.events[Math.min(step, scenario.events.length - 1)] : null;

  useEffect(() => {
    if (!playing) return;
    if (step >= scenario.events.length - 1) {
      const timer = setTimeout(() => {
        setPlaying(false);
        setCompleted(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setStep((prev) => prev + 1), 2400);
    return () => clearTimeout(timer);
  }, [playing, step, scenario.events.length]);

  useEffect(() => {
    setStep(-1);
    setPlaying(false);
    setCompleted(false);
  }, [selectedId]);

  const stats = useMemo(() => {
    const visibleEvents = step >= 0 ? scenario.events.slice(0, step + 1) : [];
    const total = visibleEvents.reduce(
      (acc, ev) => {
        acc.assistMinutes += ev.delta.assistMinutes;
        acc.reliefOps += ev.delta.reliefOps;
        ev.delta.scenes.forEach((s) => acc.sceneSet.add(s));
        return acc;
      },
      { assistMinutes: 0, reliefOps: 0, sceneSet: new Set() }
    );
    return {
      assistMinutes: total.assistMinutes,
      reliefOps: total.reliefOps,
      sceneCount: total.sceneSet.size,
      syncValue: Math.min(42 + step * 7 + total.sceneSet.size * 3, 96),
      sceneList: Array.from(total.sceneSet),
    };
  }, [step, scenario]);

  const togglePlay = () => {
    if (step < 0) {
      setStep(0);
      setPlaying(true);
      setCompleted(false);
      return;
    }
    setPlaying((p) => !p);
  };

  const resetDemo = () => {
    setStep(-1);
    setPlaying(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(169,233,255,0.14),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(74,154,255,0.14),transparent_18%),linear-gradient(135deg,#040812_0%,#08111c_40%,#0b1524_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bubbles.map((b) => (
          <motion.div
            key={b.id}
            className="absolute rounded-full border border-cyan-100/8 bg-white/[0.03] backdrop-blur-xl"
            style={{ width: b.size, height: b.size, left: b.left, top: b.top }}
            animate={{ y: [0, -18, 0], opacity: [0.1, 0.24, 0.1], scale: [1, 1.06, 1] }}
            transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:44px_44px] opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1640px] px-6 py-8 lg:px-10">
        <HomeHeader stats={stats} scenario={scenario} />

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            ["sim", "场景体验页", PanelsTopLeft],
            ["func", "功能页", LayoutPanelTop],
            ["about", "产品介绍页", CircleHelp],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`rounded-full border px-4 py-2 text-sm transition ${page === id ? "border-cyan-100/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(93,179,255,0.08))] text-white shadow-[0_12px_30px_rgba(85,178,255,0.08)]" : "border-white/10 bg-white/[0.04] text-cyan-50/76"}`}
            >
              <span className="flex items-center gap-2"><Icon className="h-4 w-4" />{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          {page === "sim" && (
            <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
              <GlassCard title="场景体验" subtitle="模拟区" icon={Map}>
                <div className="space-y-3">
                  {scenarios.map((item) => {
                    const active = item.id === selectedId;
                    return (
                      <button key={item.id} onClick={() => setSelectedId(item.id)} className={`w-full rounded-[24px] border p-4 text-left transition-all duration-300 ${active ? "border-cyan-100/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(93,179,255,0.08))] shadow-[0_12px_30px_rgba(85,178,255,0.08)]" : "border-white/8 bg-white/[0.025] hover:border-cyan-100/14 hover:bg-white/[0.05]"}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium text-white">{item.title}</div>
                            <div className="mt-1 text-xs leading-5 text-cyan-50/50">{item.subtitle}</div>
                          </div>
                          <ChevronRight className={`h-4 w-4 ${active ? "text-cyan-200" : "text-cyan-50/28"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard title="主视角模拟" subtitle="仪表盘动画" icon={Cpu}>
                <DriverViewAnimated currentEvent={currentEvent} scenario={scenario} isPlaying={playing} />
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-cyan-50/35">天气</div><div className="mt-1 flex items-center gap-2 font-medium"><CloudRain className="h-4 w-4 text-cyan-200" />{scenario.weather}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-cyan-50/35">时间</div><div className="mt-1 flex items-center gap-2 font-medium"><Moon className="h-4 w-4 text-cyan-200" />{scenario.time}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-cyan-50/35">道路</div><div className="mt-1 flex items-center gap-2 font-medium"><Route className="h-4 w-4 text-cyan-200" />{scenario.road}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-cyan-50/35">目标</div><div className="mt-1 flex items-center gap-2 font-medium"><Waves className="h-4 w-4 text-cyan-200" />{scenario.goal}</div></div>
                </div>
                <div className="mt-5 flex gap-3">
                  <button onClick={togglePlay} className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#e8fbff_0%,#9edeff_40%,#79c2ff_100%)] px-4 py-3 text-sm font-medium text-slate-950 shadow-[0_10px_30px_rgba(115,205,255,0.2)] transition hover:scale-[1.01]">
                    <span className="flex items-center justify-center gap-2">{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}{step < 0 ? "开始旅程" : playing ? "暂停" : "继续"}</span>
                  </button>
                  <button onClick={resetDemo} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-cyan-50/80 hover:bg-white/[0.08]"><span className="flex items-center gap-2"><RotateCcw className="h-4 w-4" />重置</span></button>
                </div>
              </GlassCard>
            </div>
          )}

          {page === "func" && (
            <div className="grid gap-6 xl:grid-cols-2">
              <GlassCard title="当前旅程" subtitle="功能区" icon={Orbit}>
                <div className="text-xl font-semibold text-white">{scenario.title}</div>
                <p className="mt-2 text-sm leading-6 text-cyan-50/60">{scenario.intro}</p>
              </GlassCard>

              <GlassCard title="车辆状态流" subtitle="功能区" icon={Cpu}>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-xs text-cyan-50/35">当前模式</div><div className="mt-2 flex items-center gap-2 text-sm font-medium text-white"><Car className="h-4 w-4 text-cyan-200" />{currentEvent?.systemMode || "等待开始"}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-xs text-cyan-50/35">系统稳定度</div><div className="mt-2 flex items-center gap-2 text-sm font-medium text-white"><Radar className="h-4 w-4 text-cyan-200" />{currentEvent ? `${currentEvent.confidence}%` : "--"}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-xs text-cyan-50/35">道路标签</div><div className="mt-2 flex items-center gap-2 text-sm font-medium text-white"><Building2 className="h-4 w-4 text-cyan-200" />{scenario.road}</div></div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]"><div className="text-xs text-cyan-50/35">辅助累计</div><div className="mt-2 flex items-center gap-2 text-sm font-medium text-white"><Timer className="h-4 w-4 text-cyan-200" />{stats.assistMinutes} min</div></div>
                </div>
              </GlassCard>

              <GlassCard title="旅程时间线" subtitle="功能区" icon={Navigation}>
                <div className="space-y-3">
                  {scenario.events.map((ev, idx) => {
                    const active = idx === step;
                    const passed = idx < step;
                    return (
                      <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[24px] border p-4 transition-all duration-300 ${active ? "border-cyan-100/18 bg-[linear-gradient(135deg,rgba(160,236,255,0.09),rgba(90,174,255,0.06))] shadow-[0_0_30px_rgba(126,217,255,0.12)]" : passed ? "border-emerald-200/16 bg-emerald-200/8" : "border-white/8 bg-white/[0.03]"}`}>
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-white">{passed ? <CheckCircle2 className="h-4 w-4 text-emerald-200" /> : <Navigation className="h-4 w-4 text-cyan-200" />}{ev.title}</div>
                            <div className="mt-1 text-xs text-cyan-50/42">{ev.t} · {ev.systemMode}</div>
                          </div>
                          <div className={`rounded-full px-3 py-1 text-xs ${active ? "bg-cyan-100/10 text-cyan-100" : "bg-white/[0.05] text-cyan-50/50"}`}>{ev.tag}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassCard>

              <GlassCard title="陪伴解释" subtitle="功能区" icon={Bot}>
                <AnimatePresence mode="wait">
                  <motion.div key={currentEvent?.title || "placeholder"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="relative overflow-hidden rounded-[30px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(151,229,255,0.08),transparent_28%),linear-gradient(135deg,rgba(9,20,37,0.98),rgba(9,31,57,0.84))] p-5 shadow-[0_16px_44px_rgba(6,15,30,0.24)]">
                    <div className="absolute right-3 top-3 rounded-full bg-cyan-100/10 px-3 py-1 text-[11px] text-cyan-100">{currentEvent?.tag || "准备中"}</div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-100/16 to-blue-200/10"><Bot className="h-5 w-5 text-cyan-200" /></div>
                      <div><div className="text-sm font-medium text-white">DriveBuddy</div><div className="text-xs text-cyan-50/44">实时读取系统状态的温和解释层</div></div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-cyan-50/80">{currentEvent?.buddy || "DriveBuddy 会在后台持续感知系统状态，再把那些原本只属于车辆机器语言的信息，转成更自然、更即时的陪伴式表达。"}</p>
                  </motion.div>
                </AnimatePresence>
              </GlassCard>

              <AnimatePresence>
                {completed && (
                  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="xl:col-span-2">
                    <GlassCard title="智能驾驶辅助记录" subtitle="功能区" icon={ScanLine}>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_10px_30px_rgba(7,16,30,0.18)]"><div className="text-xs text-cyan-50/35">稳定辅助</div><div className="mt-2 text-3xl font-semibold text-white">{stats.assistMinutes} min</div><div className="mt-2 text-sm leading-6 text-cyan-50/56">系统持续覆盖了最容易产生疲劳的那一段重复操作。</div></div>
                        <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_10px_30px_rgba(7,16,30,0.18)]"><div className="text-xs text-cyan-50/35">减负动作</div><div className="mt-2 text-3xl font-semibold text-white">{stats.reliefOps}</div><div className="mt-2 text-sm leading-6 text-cyan-50/56">一些高频、细碎、容易让人疲惫的小决策已被系统吸收。</div></div>
                        <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-5 shadow-[0_10px_30px_rgba(7,16,30,0.18)]"><div className="text-xs text-cyan-50/35">点亮场景</div><div className="mt-2 text-3xl font-semibold text-white">{stats.sceneCount}</div><div className="mt-2 text-sm leading-6 text-cyan-50/56">这次旅程中的真实片段正在沉淀为长期的人车协同记忆。</div></div>
                      </div>
                      <div className="mt-5 rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(9,18,30,0.55),rgba(255,255,255,0.03))] p-5"><div className="flex items-center gap-2 text-sm font-medium text-white"><ScanLine className="h-4 w-4 text-cyan-200" />DriveBuddy Insight</div><p className="mt-3 text-sm leading-7 text-cyan-50/72">这段路之所以显得更轻松，不是因为系统替你做了全部，而是因为它先吸收了最重复、最琐碎、最消耗注意力的那一部分工作。真正的价值，往往就来自这些安静但持续的支持。</p></div>
                      <div className="mt-5 flex flex-wrap gap-2">{stats.sceneList.map((scene, idx) => <div key={idx} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs text-cyan-50/78">已加入协同地图 · {scene}</div>)}</div>
                    </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {page === "about" && (
            <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <GlassCard title="产品细节" subtitle="介绍页" icon={ArrowUpRight}>
                <div className="space-y-3 text-sm leading-7 text-cyan-50/70">
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]">产品以三页式结构展开，而不是把所有功能压在同一个页面里。场景体验页负责沉浸式模拟，功能页负责看清状态与记录，产品介绍页负责建立整体理解。</div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]">模拟区采用司机主视角的仪表盘式视觉，并加入真实运动感的动画元素，例如流动路面、发光车道线、车辆位移、雨线下落与施工提示闪烁，让系统状态更像真实发生，而不是静态展示。</div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]">DriveBuddy 不直接控制车辆，而是作为人与系统之间的解释层与陪伴层，让用户既能感受到辅助价值，也能更自然地理解系统边界与协同时机。</div>
                </div>
              </GlassCard>

              <GlassCard title="产品定位" subtitle="介绍页" icon={CircleHelp}>
                <div className="space-y-4 text-sm leading-7 text-cyan-50/72">
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]">看懂系统的每一次思考，听懂它的每一个决定。然后，把这一切，用最舒服的方式告诉你。</div>
                  <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-[0_8px_26px_rgba(7,16,30,0.16)]">它更像一个始终安静在线的副驾驶搭子，在该解释时解释，在该提示时提示，在旅程结束后把那些真正被系统分担掉的压力变成清晰可感的记录。</div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
