"use client";

import { useState } from "react";

type Theme = "emerald" | "royal" | "sunset";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("emerald");

  const themeConfig: Record<
    Theme,
    {
      pageBg: string;
      glowPrimary: string;
      glowSecondary: string;
      mainBorder: string;
      mainBg: string;
      headerAccent: string;
    }
  > = {
    emerald: {
      pageBg: "bg-gradient-to-br from-slate-950 via-emerald-950 to-black",
      glowPrimary: "bg-emerald-500/20",
      glowSecondary: "bg-teal-400/10",
      mainBorder: "border-emerald-500/40",
      mainBg: "bg-gradient-to-b from-black/70 via-black/75 to-emerald-950/60",
      headerAccent: "text-emerald-400/70",
    },
    royal: {
      pageBg: "bg-gradient-to-br from-slate-950 via-violet-900 to-black",
      glowPrimary: "bg-fuchsia-500/20",
      glowSecondary: "bg-indigo-500/15",
      mainBorder: "border-violet-400/50",
      mainBg: "bg-gradient-to-b from-black/70 via-slate-900 to-violet-950/60",
      headerAccent: "text-violet-300/80",
    },
    sunset: {
      pageBg: "bg-gradient-to-br from-slate-950 via-rose-900 to-black",
      glowPrimary: "bg-orange-400/25",
      glowSecondary: "bg-rose-500/15",
      mainBorder: "border-orange-400/60",
      mainBg: "bg-gradient-to-b from-black/70 via-slate-900 to-rose-950/60",
      headerAccent: "text-orange-200/80",
    },
  };

  const currentTheme = themeConfig[theme];

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${currentTheme.pageBg} text-foreground`}
    >
      <div className="dynamic-wallpaper" />
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -left-32 top-10 h-64 w-64 rounded-full ${currentTheme.glowPrimary} blur-3xl`}
        />
        <div
          className={`absolute bottom-0 right-0 h-80 w-80 rounded-full ${currentTheme.glowSecondary} blur-3xl`}
        />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      <main
        className={`relative z-10 w-full max-w-2xl rounded-[2rem] border ${currentTheme.mainBorder} ${currentTheme.mainBg} p-4 shadow-[0_0_45px_rgba(16,185,129,0.55)] backdrop-blur-xl sm:p-8`}
      >
        <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <p
              className={`text-xs uppercase tracking-[0.25em] ${currentTheme.headerAccent}`}
            >
              Slot Machine
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-emerald-100 sm:text-4xl">
              Neon Slots
            </h1>
            <p className="mt-2 text-sm text-emerald-100/70">
              Spin the reels, manage your credits, and chase the jackpot.
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full border border-emerald-500/40 bg-black/60 px-3 py-1 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200/80">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            Live Mode
          </div>
        </header>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-emerald-100/80 sm:justify-between">
          <span className="text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
            Theme
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setTheme("emerald")}
              className={`rounded-full border px-3 py-1 text-[11px] ${
                theme === "emerald"
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-50"
                  : "border-emerald-500/40 bg-black/40 text-emerald-200/80"
              }`}
            >
              Neon
            </button>
            <button
              type="button"
              onClick={() => setTheme("royal")}
              className={`rounded-full border px-3 py-1 text-[11px] ${
                theme === "royal"
                  ? "border-violet-400 bg-violet-500/20 text-violet-50"
                  : "border-violet-400/40 bg-black/40 text-violet-200/80"
              }`}
            >
              Royal
            </button>
            <button
              type="button"
              onClick={() => setTheme("sunset")}
              className={`rounded-full border px-3 py-1 text-[11px] ${
                theme === "sunset"
                  ? "border-orange-400 bg-orange-500/20 text-orange-50"
                  : "border-orange-400/40 bg-black/40 text-orange-200/80"
              }`}
            >
              Sunset
            </button>
          </div>
        </div>

        <SlotMachine />

        <footer className="mt-6 flex items-center justify-between text-[11px] text-emerald-100/60">
          <p>Built with Next.js and Tailwind CSS.</p>
          <p className="font-medium text-emerald-300/80">Play responsibly.</p>
        </footer>
      </main>
    </div>
  );
}

function getRandomSymbol() {
  const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣", "🍀"];
  const index = Math.floor(Math.random() * symbols.length);
  return symbols[index];
}

function getPayoutMultiplier(symbols: string[]) {
  const [a, b, c] = symbols;

  if (a === b && b === c) {
    if (a === "7️⃣") return 10;
    if (a === "🍀") return 5;
    return 3;
  }

  if (a === b || a === c || b === c) {
    return 2;
  }

  return 0;
}

function SlotMachine() {
  const [resultType, setResultType] = useState<"none" | "jackpot" | "big" | "win" | "loss">("none");
  const [reels, setReels] = useState<string[]>(["🍒", "🍋", "🔔"]);
  const [credits, setCredits] = useState<number>(100);
  const [bet, setBet] = useState<number>(5);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState<string>("Welcome! Place your bet and spin.");

  const canSpin = !isSpinning && credits >= bet && bet > 0;

  const handleSpin = () => {
    if (!canSpin) {
      if (credits < bet) {
        setMessage("Not enough credits. Lower your bet or reset.");
      }
      return;
    }

    setIsSpinning(true);
    setResultType("none");
    setCredits((prev) => prev - bet);
    setMessage("Spinning...");

    // Staggered spin: each column has its own velocity and stop time.
    const intervals = [70, 90, 110];
    const durations = [700, 950, 1200];

    // Start all reels spinning with different speeds.
    const spinIntervals = intervals.map((delay, columnIndex) =>
      setInterval(() => {
        setReels((prev) => {
          const next = [...prev];
          next[columnIndex] = getRandomSymbol();
          return next;
        });
      }, delay),
    );

    // Precompute the final stop symbols for all reels.
    const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    durations.forEach((duration, columnIndex) => {
      setTimeout(() => {
        clearInterval(spinIntervals[columnIndex]);
        setReels((prev) => {
          const next = [...prev];
          next[columnIndex] = finalReels[columnIndex];
          return next;
        });

        // When the last reel stops, compute the result.
        if (columnIndex === durations.length - 1) {
          const multiplier = getPayoutMultiplier(finalReels);
          if (multiplier > 0) {
            const winnings = bet * multiplier;
            setCredits((prev) => prev + winnings);

            if (multiplier >= 10) {
              setResultType("jackpot");
              setMessage(`JACKPOT! You won ${winnings} credits!`);
            } else if (multiplier >= 5) {
              setResultType("big");
              setMessage(`Big win! You won ${winnings} credits!`);
            } else {
              setResultType("win");
              setMessage(`Nice! You won ${winnings} credits.`);
            }
          } else {
            setResultType("loss");
            setMessage("No win this time. Try again!");
          }

          setIsSpinning(false);
        }
      }, duration);
    });
  };

  const handleReset = () => {
    setCredits(100);
    setBet(5);
    setReels(["🍒", "🍋", "🔔"]);
    setMessage("Credits reset. Good luck!");
  };

  const updateBet = (value: number) => {
    const clamped = Math.max(1, Math.min(50, Math.floor(value)));
    setBet(clamped);
  };

  return (
    <div className="space-y-6">
      {/* top stats bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-900/40 via-emerald-900/30 to-teal-900/40 px-4 py-3 text-xs sm:text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/70 text-2xl shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-transform duration-200 hover:scale-110">
            🎰
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
              Balance
            </p>
            <p className="text-xl font-semibold text-emerald-200">{credits} credits</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-emerald-500/50 bg-black/60 px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-300/80">
              Bet
            </p>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateBet(bet - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700/70 text-xs text-emerald-50 transition hover:bg-emerald-500"
              >
                -
              </button>
              <span className="w-10 text-center text-lg font-semibold text-emerald-100">
                {bet}
              </span>
              <button
                type="button"
                onClick={() => updateBet(bet + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700/70 text-xs text-emerald-50 transition hover:bg-emerald-500"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="h-10 rounded-xl border border-emerald-500/60 bg-black/70 px-4 text-xs font-medium uppercase tracking-[0.16em] text-emerald-100 transition hover:bg-emerald-600/30"
          >
            Reset
          </button>
        </div>
      </div>

      {/* slot machine body */}
      <div
        className={`relative rounded-[1.75rem] border border-emerald-500/60 bg-gradient-to-b from-emerald-900 via-emerald-950 to-black p-4 shadow-[0_0_35px_rgba(16,185,129,0.5)] sm:p-5 ${
          resultType === "loss" ? "machine-shake" : ""
        }`}
      >
        {/* top light bar */}
        <div className="mb-4 flex items-center justify-between gap-4 text-xs text-emerald-100/70">
          <div className="flex items-center gap-2">
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
              <span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,113,133,0.9)]" />
            </span>
            <span>3 reels - match symbols to win</span>
          </div>
          <span className="hidden text-right text-xs sm:block">
            Three 7s = jackpot, clovers pay high.
          </span>
        </div>

        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          {resultType === "jackpot" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="win-glow win-glow--jackpot" />
              <div className="firework firework--jackpot" style={{ top: "8%", left: "8%" }} />
              <div className="firework firework--jackpot firework--delay-1" style={{ top: "12%", right: "10%" }} />
              <div className="firework firework--jackpot firework--delay-2" style={{ bottom: "6%", left: "18%" }} />
            </div>
          ) : resultType === "big" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="win-glow win-glow--big" />
              <div className="firework firework--big" style={{ top: "10%", left: "12%" }} />
              <div className="firework firework--big firework--delay-1" style={{ bottom: "10%", right: "14%" }} />
            </div>
          ) : resultType === "win" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
              <div className="win-glow win-glow--win" />
              <div className="firework firework--win" style={{ top: "14%", left: "50%" }} />
            </div>
          ) : null}
          {/* reels */}
          <div className="relative mx-auto flex w-full max-w-sm flex-1 items-center justify-between rounded-[1.4rem] border border-emerald-500/60 bg-black/80 px-4 py-5 shadow-inner">
            {reels.map((symbol, index) => (
              <div
                key={`${symbol}-${index}`}
                className="flex h-24 w-24 items-center justify-center rounded-2xl border border-emerald-400/70 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-5xl shadow-[0_0_30px_rgba(16,185,129,0.7)] sm:h-28 sm:w-28"
              >
                <span className={isSpinning ? "reel-spin" : ""}>{symbol}</span>
              </div>
            ))}

            {/* center highlight */}
            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-400/70 to-transparent opacity-60" />
          </div>

          {/* decorative lever */}
          <div className="hidden flex-col items-center gap-3 pr-1 sm:flex">
            <div className="h-20 w-2 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-700 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_18px_rgba(16,185,129,0.9)]" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 text-sm text-emerald-100/85 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={`message-pop rounded-xl border px-3 py-2 text-xs sm:text-sm ${
              message.includes("JACKPOT")
                ? "border-emerald-400 bg-emerald-900/70 text-emerald-100"
                : message.includes("win")
                  ? "border-emerald-400/70 bg-emerald-950/80 text-emerald-100"
                  : "border-emerald-500/40 bg-black/60 text-emerald-100/80"
            }`}
          >
            {message}
          </p>
          <p className="text-[11px] text-emerald-200/70">
            Tip: raise your bet for bigger payouts, but watch your balance.
          </p>
        </div>
      </div>

      {/* spin button */}
      <div className="flex items-center justify-center pt-1">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-emerald-500/40 blur-xl" />
          <button
            type="button"
            onClick={handleSpin}
            disabled={!canSpin}
            className={`relative flex w-44 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 px-8 py-3 text-sm font-semibold tracking-wide text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-emerald-900 disabled:via-emerald-900 disabled:to-emerald-900 disabled:text-emerald-500 ${isSpinning ? "spin-button-pressing" : ""}`}
          >
            {isSpinning ? "Spinning..." : "Spin"}
          </button>
        </div>
      </div>
    </div>
  );
}


