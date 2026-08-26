"use client";

import { useState, useTransition } from "react";
import { StickyNote, Trash2, FolderInput, Check } from "lucide-react";
import { unsaveProperty, updateSavedNote, moveToCollection } from "@/lib/buyer/actions";

type Collection = { id: string; name: string; is_default: boolean };

export function SavedControls({
  propertyId,
  notes,
  collectionId,
  collections,
}: {
  propertyId: string;
  notes: string | null;
  collectionId: string | null;
  collections: Collection[];
}) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(notes ?? "");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function run(fn: () => Promise<unknown>, onDone?: () => void) {
    setError(null);
    startTransition(async () => {
      try {
        await fn();
        onDone?.();
      } catch (e) {
        setError(e instanceof Error ? e.message : "That didn't save. Try again.");
      }
    });
  }

  return (
    <div className="bg-white border border-border/60 p-4 space-y-3">
      {editing ? (
        <div className="space-y-2">
          <label htmlFor={`note-${propertyId}`} className="sr-only">
            Your note about this property
          </label>
          <textarea
            id={`note-${propertyId}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="Damp in the back bedroom. Ask about the boiler age."
            className="w-full bg-warm border-none px-3 py-2 text-body-sm leading-relaxed focus:ring-2 focus:ring-forest resize-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() =>
                run(() => updateSavedNote(propertyId, draft), () => {
                  setEditing(false);
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                })
              }
              disabled={pending}
              className="px-4 py-2 bg-forest text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save note"}
            </button>
            <button
              onClick={() => {
                setDraft(notes ?? "");
                setEditing(false);
              }}
              className="px-4 py-2 text-muted text-[10px] font-bold uppercase tracking-widest hover:text-obsidian"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {notes ? (
            <p className="text-body-sm text-muted leading-relaxed italic">&ldquo;{notes}&rdquo;</p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-forest transition-colors"
            >
              <StickyNote className="w-3.5 h-3.5" />
              {notes ? "Edit note" : "Add note"}
            </button>

            {collections.length > 1 && (
              <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted">
                <FolderInput className="w-3.5 h-3.5" />
                <span className="sr-only">Move to shortlist</span>
                <select
                  value={collectionId ?? ""}
                  disabled={pending}
                  onChange={(e) =>
                    run(() => moveToCollection(propertyId, e.target.value || null))
                  }
                  className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest text-muted hover:text-forest focus:ring-1 focus:ring-forest cursor-pointer"
                >
                  <option value="">Unfiled</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <button
              onClick={() => run(() => unsaveProperty(propertyId))}
              disabled={pending}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted hover:text-error transition-colors ml-auto disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </>
      )}

      {saved && (
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-forest">
          <Check className="w-3.5 h-3.5" /> Note saved
        </p>
      )}
      {error && <p className="text-[11px] text-error">{error}</p>}
    </div>
  );
}
