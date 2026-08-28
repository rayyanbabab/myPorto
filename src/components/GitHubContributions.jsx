/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "../../constant";
import { useLanguage } from "../context/LanguageContext";

const GitHubContributions = () => {
  const { t } = useLanguage();
  const [themeMode, setThemeMode] = useState("dark");
  const isLight = themeMode === "light";

  const [contribDays, setContribDays] = useState(null);
  const [allContributions, setAllContributions] = useState(null);
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [totalsMap, setTotalsMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setThemeMode(document.documentElement.getAttribute("data-theme") || "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const username = (GITHUB_USERNAME || "").trim();
  const profileUrl = (GITHUB_PROFILE_URL || (username ? `https://github.com/${username}` : "")).trim();

  const chartUrl = useMemo(() => {
    if (!username) return "";
    return `https://ghchart.rshah.org/${encodeURIComponent(username)}`;
  }, [username]);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(false);

    const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        
        const years = data.total ? Object.keys(data.total).sort().reverse() : [];
        setAvailableYears(years);
        setTotalsMap(data.total || {});
        if (years.length > 0) {
          setSelectedYear(years[0]);
        }

        const days = Array.isArray(data?.contributions)
          ? data.contributions
          : Array.isArray(data?.contributions?.days)
            ? data.contributions.days
            : Array.isArray(data?.days)
              ? data.days
              : null;
        if (!days) throw new Error("Unexpected payload");
        
        const sortedDays = [...days].sort((a, b) => new Date(a.date) - new Date(b.date));
        setAllContributions(sortedDays);
      })
      .catch(() => {
        if (cancelled) return;
        setLoadError(true);
        setContribDays(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  useEffect(() => {
    if (!allContributions || !selectedYear) return;
    const filtered = allContributions.filter(d => d.date.startsWith(selectedYear));
    setContribDays(filtered);
  }, [allContributions, selectedYear]);

  const calendar = useMemo(() => {
    if (!Array.isArray(contribDays) || contribDays.length === 0) return null;

    const normalized = contribDays
      .map((d) => {
        const date = d?.date || d?.day || d?.created_at;
        const count = typeof d?.count === "number" ? d.count : typeof d?.contributionCount === "number" ? d.contributionCount : d?.contributions;
        return {
          date: typeof date === "string" ? date.slice(0, 10) : null,
          count: typeof count === "number" ? count : 0,
        };
      })
      .filter((d) => Boolean(d.date));

    if (normalized.length === 0) return null;

    const byDate = new Map(normalized.map((d) => [d.date, d.count]));
    const dates = normalized.map((d) => d.date).sort();
    const minDate = new Date(`${dates[0]}T00:00:00`);
    const maxDate = new Date(`${dates[dates.length - 1]}T00:00:00`);

    const start = new Date(minDate);
    start.setDate(start.getDate() - start.getDay());
    const end = new Date(maxDate);
    end.setDate(end.getDate() + (6 - end.getDay()));

    const weeks = [];
    const monthMarkers = [];
    let cursor = new Date(start);
    let currentWeek = [];
    let lastMonth = null;
    let weekIndex = 0;

    while (cursor <= end) {
      const year = cursor.getFullYear();
      const month = String(cursor.getMonth() + 1).padStart(2, "0");
      const day = String(cursor.getDate()).padStart(2, "0");
      const key = `${year}-${month}-${day}`;
      const count = byDate.get(key) || 0;
      const inRange = cursor >= minDate && cursor <= maxDate;

      if (cursor.getDay() === 0 && inRange) {
        const monthIndex = cursor.getMonth();
        if (monthIndex !== lastMonth) {
          const monthLabel = cursor.toLocaleString("en-US", { month: "short" });
          monthMarkers.push({ index: weekIndex, label: monthLabel });
          lastMonth = monthIndex;
        }
      }

      currentWeek.push({
        date: key,
        count,
        inRange,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
        weekIndex += 1;
      }

      cursor.setDate(cursor.getDate() + 1);
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return {
      weeks,
      monthMarkers,
    };
  }, [contribDays]);

  const getLevel = (count) => {
    if (!count || count <= 0) return 0;
    if (count <= 3) return 1;
    if (count <= 7) return 2;
    if (count <= 15) return 3;
    return 4;
  };

  return (
    <section
      id="github"
      className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden font-sans"
    >
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 transition-colors duration-700 ${isLight ? "bg-white" : "bg-[#050505]"}`} />
        <div className={`absolute top-0 -left-20 w-[500px] h-[500px] rounded-full mix-blend-normal filter blur-[100px] opacity-30 ${isLight ? "bg-gray-300" : "bg-emerald-900/30"}`} />
        <div className={`absolute bottom-0 -right-20 w-[400px] h-[400px] rounded-full mix-blend-normal filter blur-[100px] opacity-30 ${isLight ? "bg-gray-200" : "bg-green-900/20"}`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 font-heading">
            <span
              className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500"
                  : "bg-gradient-to-r from-white via-gray-200 to-gray-500"
              }`}
            >
              {t.github.title}
            </span>
          </h1>
          <div className={`h-1 w-24 rounded-full ${isLight ? "bg-black" : "bg-white"} mx-auto`} />
        </div>

        <div
          className={`mx-auto max-w-5xl rounded-3xl border backdrop-blur-md overflow-hidden ${
            isLight ? "bg-white/70 border-gray-200" : "bg-white/5 border-white/10"
          }`}
        >
          <div className="px-6 sm:px-10 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${isLight ? "text-black" : "text-white"}`}>
                  {username ? `@${username}` : "GitHub"}
                </h2>
                <p className={`${isLight ? "text-gray-600" : "text-gray-400"} text-sm`}>
                  {t.github.badge}
                </p>
              </div>
            </div>

            {chartUrl ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0">
                  <div className="mb-4">
                    <p className={`text-sm ${isLight ? "text-gray-700" : "text-gray-300"}`}>
                      {totalsMap[selectedYear] ?? 0} {t.github.totalContributions} ({selectedYear})
                    </p>
                  </div>
                
                {calendar && !loadError ? (
                  <div
                    className={`rounded-2xl border overflow-hidden ${
                      isLight ? "bg-white/60 border-gray-200" : "bg-black/20 border-white/10"
                    }`}
                    style={{
                      "--cell": "11px",
                      "--gap": "3px",
                    }}
                  >
                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[860px] px-5 sm:px-6 py-5 sm:py-6">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 shrink-0 text-[11px] ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                            <span className="sr-only">Weekdays</span>
                          </div>
                          <div className="relative flex-1 h-4">
                            {calendar.monthMarkers.map((m) => (
                              <span
                                key={`${m.label}-${m.index}`}
                                className={`absolute top-0 text-[11px] ${isLight ? "text-gray-500" : "text-gray-500"}`}
                                style={{ left: `calc(${m.index} * (var(--cell) + var(--gap)))` }}
                              >
                                {m.label}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className={`w-10 shrink-0 grid grid-rows-7 gap-[var(--gap)] text-[11px] ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                            <span className="row-start-2">Mon</span>
                            <span className="row-start-4">Wed</span>
                            <span className="row-start-6">Fri</span>
                          </div>

                          <div className="flex gap-[var(--gap)]">
                            {calendar.weeks.map((week, wi) => (
                              <div key={wi} className="flex flex-col gap-[var(--gap)]">
                                {week.map((day) => {
                                  const level = getLevel(day.count);
                                  const base = day.inRange ? "" : "opacity-30";
                                  const color = isLight
                                    ? [
                                        "bg-gray-200/70",
                                        "bg-emerald-200",
                                        "bg-emerald-300",
                                        "bg-emerald-500",
                                        "bg-emerald-700",
                                      ][level]
                                    : [
                                        "bg-white/10",
                                        "bg-emerald-950/60",
                                        "bg-emerald-900",
                                        "bg-emerald-700",
                                        "bg-emerald-500",
                                      ][level];

                                  return (
                                    <div
                                      key={day.date}
                                      className={`h-[var(--cell)] w-[var(--cell)] rounded-[3px] ${color} ${base}`}
                                      aria-label={`${day.date}: ${day.count} contributions`}
                                      title={`${day.date}: ${day.count} contributions`}
                                    />
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {loading ? (
                  <div
                    className={`rounded-2xl border overflow-hidden animate-pulse ${
                      isLight ? "bg-white/60 border-gray-200" : "bg-black/20 border-white/10"
                    }`}
                  >
                    <div className="w-full overflow-x-auto">
                      <div className="min-w-[860px] px-5 sm:px-6 py-5 sm:py-6">
                        <div className={`h-4 w-56 rounded ${isLight ? "bg-gray-200" : "bg-white/10"}`} />
                        <div className="mt-4 flex gap-3">
                          <div className={`w-10 h-[110px] rounded ${isLight ? "bg-gray-200" : "bg-white/10"}`} />
                          <div className={`h-[110px] w-[780px] rounded ${isLight ? "bg-gray-200" : "bg-white/10"}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {!calendar || loadError ? (
                  <div className="w-full overflow-x-auto">
                    <div className="min-w-[720px]">
                      <img
                        src={chartUrl}
                        alt={`GitHub contribution graph for ${username}`}
                        className={`w-full h-auto ${isLight ? "contrast-95 saturate-90" : "contrast-90 saturate-90 brightness-95"}`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : null}

                <div className="mt-4 flex items-center justify-between">
                  <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-500"}`}>
                    Data source: GitHub API
                  </p>
                  {profileUrl && (
                    <a
                      href={profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xs font-semibold hover:underline ${isLight ? "text-black" : "text-white"}`}
                    >
                      {t.github.viewProfile} →
                    </a>
                  )}
                </div>
                </div>

                {!loading && availableYears.length > 0 && (
                  <div className="flex lg:flex-col gap-2 overflow-x-auto shrink-0 pb-2 lg:pb-0">
                    {availableYears.map((year) => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left lg:text-center ${
                          selectedYear === year
                            ? "bg-blue-600 text-white"
                            : isLight
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`rounded-2xl border p-6 text-center ${
                  isLight ? "bg-gray-50 border-gray-200 text-gray-700" : "bg-black/20 border-white/10 text-gray-300"
                }`}
              >
                <p className="text-sm">
                  Set <span className="font-bold">GITHUB_USERNAME</span> in <span className="font-bold">constant/index.js</span> to show GitHub contribution graph.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubContributions;
