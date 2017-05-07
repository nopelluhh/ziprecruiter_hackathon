export default class JobController {
  constructor(fetcher, $state, $sce) {
    this.fetcher = fetcher
    this.status = {
      challenges: 0,
      subscribed: false,
      contacted: false
    }
    this.$sce = $sce
    this.skills = $state.params.job.required
    this.job = $state.params.job
    this.plus = $state.params.job.nicetohaves
    this.pong = 'ping'
    this.tagline = 'Hack the Planet!'
    this.activate()
    this.onAnswer = this.onAnswer.bind(this)
  }

  activate() {
    this.fetcher.get('challenge')
      .then(challenges => {
        this.challenges = challenges.filter(challenge => {
          return this.skills.includes(challenge.field) || this.plus.includes(challenge.field)
        })
      })
  }

  onAnswer(answer) {
    if (answer.correct) {
      this.status.challenges++
    }
  }
}

JobController.$inject = ['fetcher', '$state', '$sce']
