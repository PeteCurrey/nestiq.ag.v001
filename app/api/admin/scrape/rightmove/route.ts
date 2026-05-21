// app/api/admin/scrape/rightmove/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { importFromRightmove } from '@/lib/scrapers/import'
import { createJob, updateJob, getJob } from '@/lib/scrapers/jobs'
import { randomUUID } from 'crypto'

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization')
  return auth === `Bearer ${process.env.ADMIN_SECRET}`
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { rightmoveBranchId } = await req.json()
  if (!rightmoveBranchId) {
    return NextResponse.json({ error: 'rightmoveBranchId required' }, { status: 400 })
  }

  const jobId = randomUUID()
  // Initialise job record
  createJob(jobId)

  // Run import in background, capture progress
  ;(async () => {
    try {
      const progress = await importFromRightmove(rightmoveBranchId, (p) => {
        updateJob(jobId, { progress: p, log: [] })
      })
      updateJob(jobId, { status: 'complete', progress, log: [] })
    } catch (e) {
      const existing = getJob(jobId)
      updateJob(jobId, { status: 'error', log: existing?.log ?? [], progress: existing?.progress ?? { total: 0, processed: 0, imported: 0, skipped: 0, errors: 0, currentSlug: '' } })
    }
  })()

  return NextResponse.json({ jobId })
}

// Optionally allow GET to retrieve status (but dedicated status route exists)
export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get('jobId')
  if (!jobId) {
    return NextResponse.json({ error: 'jobId required' }, { status: 400 })
  }
  const job = getJob(jobId)
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 })
  }
  return NextResponse.json(job)
}
