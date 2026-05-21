import { ImportProgress } from './import'

export interface Job {
  id: string
  status: 'running' | 'complete' | 'error'
  progress: ImportProgress
  log: string[]
  startedAt: string
  endedAt?: string
}

const jobs = new Map<string, Job>()

export function createJob(id: string): Job {
  const job: Job = {
    id,
    status: 'running',
    progress: {
      total: 0,
      processed: 0,
      imported: 0,
      skipped: 0,
      errors: 0,
      currentSlug: '',
    },
    log: [],
    startedAt: new Date().toISOString(),
  }
  jobs.set(id, job)
  return job
}

export function updateJob(id: string, updates: Partial<Job>) {
  const job = jobs.get(id)
  if (job) {
    jobs.set(id, { ...job, ...updates })
  }
}

export function getJob(id: string): Job | undefined {
  return jobs.get(id)
}
