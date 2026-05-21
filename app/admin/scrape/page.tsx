"use client";
// app/admin/scrape/page.tsx

import { useState, useEffect } from 'react';

interface JobStatus {
  id: string;
  status: string;
  progress: {
    total: number;
    processed: number;
    imported: number;
    skipped: number;
    errors: number;
    currentSlug: string;
  };
  log: string[];
  startedAt: string;
  endedAt?: string;
}

export default function ScrapePage() {
  const [branchId, setBranchId] = useState('');
  const [jobId, setJobId] = useState<string | null>(null);
  const [job, setJob] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startScrape = async () => {
    setError(null);
    const resp = await fetch('/api/admin/scrape/rightmove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({ rightmoveBranchId: branchId }),
    });
    const data = await resp.json();
    if (!resp.ok) {
      setError(data.error || 'Failed to start scrape');
    } else {
      setJobId(data.jobId);
    }
  };

  // Poll job status every 3 seconds
  useEffect(() => {
    if (!jobId) return;
    let cancelled = false;
    const poll = async () => {
      const resp = await fetch(`/api/admin/scrape/rightmove?jobId=${jobId}`);
      const data = await resp.json();
      if (!cancelled) setJob(data);
    };
    poll();
    const interval = setInterval(poll, 3000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [jobId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 text-white">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Rightmove Demo Scraper</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Rightmove Branch ID (e.g. 54521)"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full rounded px-3 py-2 bg-white/20 placeholder-gray-200 focus:outline-none"
          />
          <button
            onClick={startScrape}
            disabled={!branchId}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded transition-all"
          >
            Start Scrape
          </button>
          {error && <p className="text-red-300">{error}</p>}
          {jobId && (
            <div className="mt-4 p-4 bg-white/5 rounded">
              <p className="font-mono">Job ID: {jobId}</p>
              {job && (
                <div className="mt-2 text-sm">
                  <p>Status: {job.status}</p>
                  <p>Processed: {job.progress.processed} / {job.progress.total}</p>
                  <p>Imported: {job.progress.imported}</p>
                  <p>Skipped: {job.progress.skipped}</p>
                  <p>Errors: {job.progress.errors}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
