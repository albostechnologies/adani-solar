"use client";

import { PROCESS_STAGES, PROCESS_STAGE_LABELS, stageIndex } from "@/lib/processStages";

function progressPercent(currentIdx: number) {
  if (PROCESS_STAGES.length === 0) return 0;
  const idx = Math.min(Math.max(currentIdx, 0), PROCESS_STAGES.length - 1);
  return Math.round(((idx + 1) / PROCESS_STAGES.length) * 100);
}

export function ProcessProgress({ currentStage }: { currentStage: string }) {
  const currentIdx = Math.max(0, stageIndex(currentStage));
  const completedRatio = currentIdx / (PROCESS_STAGES.length - 1);
  const percent = progressPercent(currentIdx);

  return (
    <section aria-label="Application progress">
      {/* Desktop: horizontal track */}
      <div className="hidden md:block">
        <div className="relative px-6 pt-2 pb-16">
          <div className="absolute left-6 right-6 top-[13px] h-px bg-border" aria-hidden />
          <div
            className="absolute left-6 top-[13px] h-px bg-solar-green"
            style={{ width: `calc((100% - 3rem) * ${completedRatio})` }}
            aria-hidden
          />
          <ol className="relative flex justify-between">
            {PROCESS_STAGES.map((key, index) => {
              const completed = index <= currentIdx;
              const current = index === currentIdx;
              const state = current ? "current" : completed ? "completed" : "upcoming";
              return (
                <li key={key} className="flex flex-col items-center w-24">
                  <span
                    className={`relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                      completed
                        ? "border-solar-green bg-solar-green"
                        : "border-border bg-white"
                    } ${current ? "ring-4 ring-solar-green/20" : ""}`}
                    aria-hidden
                  />
                  <span className="absolute top-7 w-28 text-center text-[11px] leading-snug text-muted-foreground">
                    <span className={current ? "font-semibold text-foreground" : ""}>
                      {PROCESS_STAGE_LABELS[key]}
                    </span>
                    <span className="sr-only"> — {state}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Mobile: vertical line */}
      <ol className="md:hidden space-y-0">
        {PROCESS_STAGES.map((key, index) => {
          const completed = index <= currentIdx;
          const current = index === currentIdx;
          const last = index === PROCESS_STAGES.length - 1;
          const state = current ? "current" : completed ? "completed" : "upcoming";
          return (
            <li key={key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`relative z-10 mt-0.5 flex h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                    completed ? "border-solar-green bg-solar-green" : "border-border bg-white"
                  } ${current ? "ring-4 ring-solar-green/20" : ""}`}
                  aria-hidden
                />
                {!last && (
                  <span
                    className={`w-px flex-1 min-h-[22px] ${index < currentIdx ? "bg-solar-green" : "bg-border"}`}
                    aria-hidden
                  />
                )}
              </div>
              <p className={`pb-5 text-sm ${current ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {PROCESS_STAGE_LABELS[key]}
                <span className="sr-only"> — {state}</span>
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 md:mt-0" aria-label={`Progress ${percent} percent`}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Overall progress</p>
          <p className="text-sm font-semibold text-foreground tabular-nums">{percent}%</p>
        </div>
        <div className="h-2.5 w-full rounded-full bg-border/80 overflow-hidden">
          <div
            className="h-full rounded-full bg-solar-green transition-[width] duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Step {currentIdx + 1} of {PROCESS_STAGES.length}: {PROCESS_STAGE_LABELS[PROCESS_STAGES[currentIdx]]}
        </p>
      </div>
    </section>
  );
}
