"use client";

import { useState, useTransition } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { updateReadiness, type ReadinessInput } from "@/lib/buyer/actions";

const POSITIONS = [
  { value: "cash_buyer", label: "Cash buyer", note: "No mortgage needed" },
  { value: "chain_free", label: "Chain free", note: "Nothing to sell first" },
  { value: "first_time_buyer", label: "First-time buyer", note: "No chain below you" },
  { value: "renting", label: "Currently renting", note: "Notice period applies" },
  { value: "selling_first", label: "Selling first", note: "Sale not yet agreed" },
  { value: "in_chain", label: "In a chain", note: "Sale agreed, chain above or below" },
  { value: "investor", label: "Investor", note: "Buying to let" },
] as const;

const MORTGAGE = [
  { value: "cash_no_mortgage", label: "No mortgage required" },
  { value: "offer_issued", label: "Formal mortgage offer issued" },
  { value: "agreement_in_principle", label: "Agreement in principle" },
  { value: "researching", label: "Speaking to lenders" },
  { value: "not_started", label: "Not started yet" },
] as const;

const TIMESCALES = ["As soon as possible", "1–3 months", "3–6 months", "6–12 months", "Just looking"];

function band(score: number) {
  if (score >= 75) return { label: "Strong", tone: "text-forest", bg: "bg-emerald" };
  if (score >= 45) return { label: "Moderate", tone: "text-warning", bg: "bg-warning" };
  return { label: "Early", tone: "text-muted", bg: "bg-subtle" };
}

export function ReadinessForm({
  initial,
  score,
  idVerified,
}: {
  initial: ReadinessInput;
  score: number;
  idVerified: boolean;
}) {
  const [form, setForm] = useState<ReadinessInput>(initial);
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const b = band(score);

  function set<K extends keyof ReadinessInput>(key: K, value: ReadinessInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await updateReadiness(form);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } catch (err) {
        setError(err instanceof Error ? err.message : "That didn't save. Try again.");
      }
    });
  }

  return (
    <div className="space-y-8">
      {/* Score */}
      <div className="bg-white border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-display-md font-display text-obsidian tabular-nums">{score}</span>
          <span className="text-body-lg text-muted">/ 100</span>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-widest ${b.tone}`}>
              {b.label} position
            </span>
            {idVerified && (
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-forest">
                <ShieldCheck className="w-3.5 h-3.5" /> ID verified
              </span>
            )}
          </div>
          <div className="h-1.5 bg-warm overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
            <div className={`h-full ${b.bg} transition-all duration-700`} style={{ width: `${score}%` }} />
          </div>
          <p className="text-body-sm text-muted leading-relaxed">
            Evidence counts for more than intention. A mortgage agreement in principle moves
            this further than a filled-in budget, because it is what an agent can rely on.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-8">
        <Fieldset legend="Where you stand">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POSITIONS.map((p) => (
              <Radio
                key={p.value}
                name="buyer_position"
                value={p.value}
                checked={form.buyer_position === p.value}
                onChange={() => set("buyer_position", p.value)}
                label={p.label}
                note={p.note}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Mortgage">
          <div className="space-y-3">
            {MORTGAGE.map((m) => (
              <Radio
                key={m.value}
                name="mortgage_status"
                value={m.value}
                checked={form.mortgage_status === m.value}
                onChange={() => set("mortgage_status", m.value)}
                label={m.label}
              />
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Budget and requirements">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Minimum budget" id="budget_min">
              <NumberInput id="budget_min" value={form.budget_min} onChange={(v) => set("budget_min", v)} placeholder="200000" />
            </Field>
            <Field label="Maximum budget" id="budget_max">
              <NumberInput id="budget_max" value={form.budget_max} onChange={(v) => set("budget_max", v)} placeholder="350000" />
            </Field>
            <Field label="Deposit available" id="deposit_available">
              <NumberInput id="deposit_available" value={form.deposit_available} onChange={(v) => set("deposit_available", v)} placeholder="45000" />
            </Field>
            <Field label="Minimum bedrooms" id="min_bedrooms">
              <NumberInput id="min_bedrooms" value={form.min_bedrooms} onChange={(v) => set("min_bedrooms", v)} placeholder="3" />
            </Field>
            <Field label="Moving timescale" id="moving_timescale">
              <select
                id="moving_timescale"
                value={form.moving_timescale ?? ""}
                onChange={(e) => set("moving_timescale", e.target.value || null)}
                className="w-full bg-warm border-none px-4 py-3 text-body-sm focus:ring-2 focus:ring-forest"
              >
                <option value="">Select…</option>
                {TIMESCALES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Contact number" id="phone">
              <input
                id="phone"
                type="tel"
                value={form.phone ?? ""}
                onChange={(e) => set("phone", e.target.value || null)}
                placeholder="07700 900000"
                className="w-full bg-warm border-none px-4 py-3 text-body-sm focus:ring-2 focus:ring-forest"
              />
            </Field>
          </div>
        </Fieldset>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="px-10 py-4 bg-forest text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald transition-colors disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save my position"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-forest">
              <Check className="w-4 h-4" /> Saved
            </span>
          )}
          {error && <span className="text-[11px] text-error">{error}</span>}
        </div>
      </form>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="bg-white border border-border p-6">
      <legend className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted px-2">
        {legend}
      </legend>
      <div className="pt-4">{children}</div>
    </fieldset>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

function NumberInput({
  id, value, onChange, placeholder,
}: {
  id: string; value: number | null | undefined;
  onChange: (v: number | null) => void; placeholder: string;
}) {
  return (
    <input
      id={id}
      type="number"
      inputMode="numeric"
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
      className="w-full bg-warm border-none px-4 py-3 text-body-sm tabular-nums focus:ring-2 focus:ring-forest"
    />
  );
}

function Radio({
  name, value, checked, onChange, label, note,
}: {
  name: string; value: string; checked: boolean;
  onChange: () => void; label: string; note?: string;
}) {
  return (
    <label
      className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
        checked ? "border-forest bg-emerald/5" : "border-border hover:border-forest/40"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-[color:var(--color-forest)]"
      />
      <span>
        <span className="block text-body-sm font-medium text-obsidian">{label}</span>
        {note && <span className="block text-[11px] text-muted mt-0.5">{note}</span>}
      </span>
    </label>
  );
}
