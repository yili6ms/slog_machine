/* eslint-disable react/jsx-no-undef */
"use client";

import { useState } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-950 via-emerald-900 to-black text-foreground">
      <main className="w-full max-w-xl rounded-3xl border border-emerald-500/40 bg-black/60 p-6 shadow-[0_0_40px_rgba(16,185,129,0.45)] backdrop-blur">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-wide text-emerald-300 drop-shadow">
            Neon Slots
          </h1>
          <p className="mt-1 text-sm text-emerald-100/70">
            Click spin and try to hit three in a row!
          </p>
        </header>

        <SlotMachine />

        <footer className="mt-6 text-center text-xs text-emerald-100/60">
          Built with Next.js and Tailwind CSS.
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
    setCredits((prev) => prev - bet);
    setMessage("Spinning...");

    const spinDuration = 900;
    const interval = 80;

    const spinInterval = setInterval(() => {
      setReels([getRandomSymbol(), getRandomSymbol(), getRandomSymbol()]);
    }, interval);

    setTimeout(() => {
      clearInterval(spinInterval);
      const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
      setReels(finalReels);

      const multiplier = getPayoutMultiplier(finalReels);
      if (multiplier > 0) {
        const winnings = bet * multiplier;
        setCredits((prev) => prev + winnings);
        if (multiplier >= 10) {
          setMessage(`JACKPOT! You won ${winnings} credits!`);
        } else if (multiplier >= 5) {
          setMessage(`Big win! You won ${winnings} credits!`);
        } else {
          setMessage(`Nice! You won ${winnings} credits.`);
        }
      } else {
        setMessage("No win this time. Try again!");
      }

      setIsSpinning(false);
    }, spinDuration);
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
      <div className="flex items-center justify-between rounded-2xl border border-emerald-500/40 bg-emerald-900/30 px-4 py-3 text-sm">
        <div>
          <p className="text-emerald-200/90">Credits</p>
          <p className="text-xl font-semibold text-emerald-300">{credits}</p>
        </div>
        <div>
          <p className="text-emerald-200/90">Bet</p>
          <div className="flex items-center gap-2">
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
          className="rounded-full border border-emerald-500/60 px-4 py-1.5 text-xs font-medium text-emerald-100 transition hover:bg-emerald-600/30"
        >
          Reset
        </button>
      </div>

      <div className="relative rounded-3xl border border-emerald-500/60 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 p-4 shadow-inner">
        <div className="mb-4 flex items-center justify-between text-xs text-emerald-100/70">
          <span>3 reels • Match to win</span>
          <span>7️⃣ jackpot • 🍀 big win</span>
        </div>

        <div className="relative mx-auto flex max-w-sm items-center justify-between rounded-2xl bg-black/70 px-4 py-5">
          {reels.map((symbol, index) => (
            <div
              key={`${symbol}-${index}`}
              className="flex h-20 w-24 items-center justify-center rounded-xl border border-emerald-500/50 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-5xl shadow-[0_0_25px_rgba(16,185,129,0.5)]"
            >
              <span className={isSpinning ? "animate-pulse" : ""}>{symbol}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-emerald-100/80">
          {message}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleSpin}
          disabled={!canSpin}
          className="flex w-40 items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold tracking-wide text-emerald-950 shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-emerald-900/60 disabled:text-emerald-500"
        >
          {isSpinning ? "Spinning..." : "Spin"}
        </button>
      </div>
    </div>
  );
}
