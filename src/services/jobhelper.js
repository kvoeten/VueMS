import jobs from '@/jobs'

export default {
  get (id) {
    let result = jobs[0]
    jobs.forEach(job => {
      if (job.id === id) result = job
    })
    return result
  },
  categories () {
    return [
      'Any',
      'Angelic Buster',
      'Aran',
      'Ark',
      'Battle Mage',
      'Beast Tamer',
      'Beginner',
      'Blaster',
      'Bowman',
      'Cadena',
      'Demon Avenger',
      'Demon Slayer',
      'Dual Blade',
      'Evan',
      'Hayato',
      'Hoyoung',
      'Illium',
      'Jett',
      'Kaiser',
      'Kanna',
      'Kinesis',
      'Luminous',
      'Magician',
      'Mechanic',
      'Mercedes',
      'Mihile',
      'Pathfinder',
      'Phantom',
      'Pirate',
      'Shade',
      'Thief',
      'Warrior',
      'Wild Hunter',
      'Xenon',
      'Zero'
    ]
  }
}
