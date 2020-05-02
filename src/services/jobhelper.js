import jobs from '@/jobs'

export default {
  get (id) {
    jobs.forEach(job => {
      if (job.id === id) return job
    })
    return jobs[0]
  }
}
