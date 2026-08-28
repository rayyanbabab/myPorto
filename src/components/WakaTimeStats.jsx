/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// ─── WakaTime Configuration ──────────────────────────────────────────────────
const WAKATIME_USER_ID = "155b008b-613b-4038-94f0-db6a83a98c03";
const WAKATIME_CHARTS = [
  "https://wakatime.com/share/@155b008b-613b-4038-94f0-db6a83a98c03/696858a9-275b-4c2c-8f4b-162e92cfa85e.svg",
  "https://wakatime.com/share/@155b008b-613b-4038-94f0-db6a83a98c03/cc90d8ac-b625-4f9a-9176-fbbd407ea27e.svg",
];
const WAKATIME_PROFILE_URL = `https://wakatime.com/@${WAKATIME_USER_ID}`;
// ─────────────────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, icon, isLight }) => (
  <div
    className={`flex flex-col gap-1 rounded-2xl px-5 py-4 border transition-all duration-300
      ${isLight
        ? "bg-white/70 border-gray-200 hover:border-indigo-300 hover:shadow-md"
        : "bg-white/5 border-white/10 hover:border-white/25"
      }`}
  >
    <span className={`text-xs font-semibold uppercase tracking-widest ${isLight ? "text-gray-400" : "text-gray-500"}`}>
      {icon} {label}
    </span>
    <span className={`text-lg font-bold tabular-nums mt-0.5 ${isLight ? "text-gray-900" : "text-white"}`}>
      {value}
    </span>
  </div>
);

const LangBar = ({ lang, percent, color, isLight }) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center justify-between">
      <span className={`text-xs font-semibold ${isLight ? "text-gray-700" : "text-gray-300"}`}>{lang}</span>
      <span className={`text-xs tabular-nums ${isLight ? "text-gray-500" : "text-gray-400"}`}>{percent}%</span>
    </div>
    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? "bg-gray-200" : "bg-white/10"}`}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${percent}%`, background: color }}
      />
    </div>
  </div>
);

const LANG_COLORS = [
  "#6366f1", "#8b5cf6", "#a78bfa", "#60a5fa",
  "#34d399", "#f472b6", "#fb923c", "#facc15",
];

const WakaTimeStats = () => {
  const { t } = useLanguage();
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateTheme = () =>
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const url = `https://wakatime.com/api/v1/users/${WAKATIME_USER_ID}/stats/last_7_days?is_including_today=true`;
    setLoading(true);
    setError(false);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error("not ok");
        return r.json();
      })
      .then((json) => {
        setStats(json.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const languages = (stats?.languages || []).slice(0, 6);

  return (
    <section
      id="wakatime"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[80px]"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full border mb-4
              ${isLight ? "border-indigo-300 bg-indigo-50 text-indigo-600" : "border-white/15 bg-white/5 text-gray-400"}`}
          >
            ⏱ {t.wakatime.badge}
          </span>
          <h2
            className={`text-3xl sm:text-4xl font-bold tracking-tight ${isLight ? "text-gray-900" : "text-white"}`}
          >
            {t.wakatime.title}
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-xl mx-auto ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            {t.wakatime.subtitle}
          </p>
        </div>

        {/* Main Card */}
        <div
          className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300
            ${isLight ? "bg-white/80 border-gray-200 shadow-xl" : "bg-white/4 border-white/10"}`}
        >
          {/* Top bar */}
          <div
            className={`flex items-center justify-between px-6 py-4 border-b
              ${isLight ? "border-gray-100 bg-gray-50/60" : "border-white/8 bg-white/3"}`}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
                <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
              </div>
              <span className={`text-sm font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                Coding Activity &middot; {t.wakatime.last7Days}
              </span>
            </div>
            <a
              href={WAKATIME_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors
                ${isLight
                  ? "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  : "border-white/15 text-gray-400 hover:text-white hover:border-white/30"}`}
            >
              {t.wakatime.viewProfile} &rarr;
            </a>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 flex flex-col gap-8">
            {/* Stat Cards from API if available */}
            {stats && !loading && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard
                    label={t.wakatime.dailyAvg}
                    value={stats.human_readable_daily_average_including_other_language || "—"}
                    icon="📅"
                    isLight={isLight}
                  />
                  <StatCard
                    label={t.wakatime.totalWeek}
                    value={stats.human_readable_total_including_other_language || "—"}
                    icon="📊"
                    isLight={isLight}
                  />
                  <StatCard
                    label={t.wakatime.bestDay}
                    value={stats.best_day?.text || "—"}
                    icon="🏆"
                    isLight={isLight}
                  />
                </div>

                {/* Languages Progress Bars */}
                {languages.length > 0 && (
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                      {t.wakatime.topLanguages}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      {languages.map((lang, i) => (
                        <LangBar
                          key={lang.name}
                          lang={lang.name}
                          percent={Math.round(lang.percent)}
                          color={LANG_COLORS[i % LANG_COLORS.length]}
                          isLight={isLight}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Embedded WakaTime Activity Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {WAKATIME_CHARTS.map((chartUrl, index) => (
                <div
                  key={index}
                  className={`w-full rounded-2xl overflow-hidden p-3 sm:p-5 border transition-all duration-300 flex items-center justify-center ${
                    isLight
                      ? "bg-white/60 border-gray-200 hover:shadow-md"
                      : "bg-white/2 border-white/5 hover:border-white/15"
                  }`}
                >
                  <figure className="w-full flex items-center justify-center">
                    <embed
                      src={chartUrl}
                      type="image/svg+xml"
                      className="w-full min-h-[260px] sm:min-h-[280px]"
                    />
                  </figure>
                </div>
              ))}
            </div>



            {/* Bottom Editors / Tags if available */}
            {stats?.editors && stats.editors.length > 0 && (
              <div className={`flex flex-wrap gap-2 pt-4 border-t ${isLight ? "border-gray-100" : "border-white/8"}`}>
                <span className={`text-xs font-semibold uppercase tracking-widest mr-2 self-center ${isLight ? "text-gray-400" : "text-gray-500"}`}>
                  {t.wakatime.editors}:
                </span>
                {stats.editors.slice(0, 4).map((ed) => (
                  <span
                    key={ed.name}
                    className={`text-xs px-3 py-1 rounded-full border
                      ${isLight ? "border-gray-200 text-gray-600 bg-gray-50" : "border-white/10 text-gray-400 bg-white/5"}`}
                  >
                    {ed.name} <span className="opacity-60">· {Math.round(ed.percent)}%</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WakaTimeStats;


