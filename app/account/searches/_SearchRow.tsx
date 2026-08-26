"use client";

import { useState, useTransition } from "react";
import { Bell, BellOff, Trash2 } from "lucide-react";
import { updateSearchAlert, deleteSavedSearch } from "@/lib/buyer/actions";

const FREQUENCIES = [
  { value: "instant", label: "Instantly" },
  { value: "daily", label: "Daily digest" },
  { value: "weekly", label: "Weekly digest" },
] as const;

export function SearchRow({
  id,
  name,
  summary,
  alertEnabled,
  alertFrequency,
  lastAlertedAt,
}: {
  id: string;
  name: string;
  summary: string;
  alertEnabled: boolean;
  alertFrequency: "instant" | "daily" | "weekly";
  lastAlertedAt: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const [enabled, setEnabled] = useState(alertEnabled);
  const [frequency, setFrequency] = useState(alertFrequency);
  const [removed, setRemoved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (removed) return null;

  function run(fn: () => Promise<unknown>, rollback: () => void) {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
      } catch (e) {
        rollback();
        setError(e instanceof Error ? e.message : "That didn't save. Try again.");
      }
    });
  }

  return (
    <div className="bg-white border border-border/60 p-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-body-lg font-display text-obsidian truncate">{name}</h2>
        <p className="text-body-sm text-muted truncate">{summary}</p>
        {lastAlertedAt && (
          <p className="text-[10px] uppercase tracking-widest text-subtle mt-1">
            Last alerted {new Date(lastAlertedAt).toLocaleDateString("en-GB")}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <label className="flex items-center gap-2">
          <span className="sr-only">Alert frequency for {name}</span>
          <select
            value={frequency}
            disabled={pending || !enabled}
            onChange={(e) => {
              const next = e.target.value as typeof frequency;
              const prev = frequency;
              setFrequency(next);
              run(() => updateSearchAlert(id, enabled, next), () => setFrequency(prev));
            }}
            className="bg-warm border-none px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-muted focus:ring-2 focus:ring-forest disabled:opacity-40"
          >
            {FREQUENCIES.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => {
            const next = !enabled;
            setEnabled(next);
            run(() => updateSearchAlert(id, next, frequency), () => setEnabled(!next));
          }}
          disabled={pending}
          aria-pressed={enabled}
          className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors disabled:opacity-50 ${
            enabled ? "bg-forest text-white" : "bg-warm text-muted hover:text-obsidian"
          }`}
        >
          {enabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
          {enabled ? "Alerts on" : "Alerts off"}
        </button>

        <button
          onClick={() => {
            setRemoved(true);
            run(() => deleteSavedSearch(id), () => setRemoved(false));
          }}
          disabled={pending}
          aria-label={`Delete saved search ${name}`}
          className="text-muted hover:text-error transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {error && <p className="text-[11px] text-error w-full">{error}</p>}
    </div>
  );
}
