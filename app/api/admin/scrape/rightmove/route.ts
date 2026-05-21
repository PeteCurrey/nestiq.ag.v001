// app/api/admin/scrape/rightmove/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { importFromRightmove } from '@/lib/scrapers/import'



export async function POST(req: NextRequest) {
  const { rightmoveBranchId } = await req.json()

  if (!rightmoveBranchId) {
    return NextResponse.json(
      { error: 'rightmoveBranchId required' },
      { status: 400 }
    )
  }

  const result = await importFromRightmove(rightmoveBranchId)
  return NextResponse.json(result)
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
