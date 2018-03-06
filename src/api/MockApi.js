import ApiInterface from './ApiInterface'

const MOCK = {
  SPEED: 300,
  LOGGED_IN: true
}

export default class MockApi extends ApiInterface {
  /*
   * Mock Utils
   */
  async mockConnection () {
    await new Promise(resolve => setTimeout(resolve, MOCK.SPEED))
  }
  async mock (payload = null, success = true) {
    await this.mockConnection()
    return this.makeEnvelope(success, payload)
  }
  
  /*
   * Auth Endpoints
   */
  async getSelf () {
    return MOCK.LOGGED_IN
      ? this.mock(make.user(99))
      : this.mock(null, false)
  }
  async register (fullname, email, password) {
    return this.mock(make.user(99))
  }
  async login (email, password) {
    return email.match(/.+@.+\..+/)
      ? this.mock(make.user(99))
      : this.mock(null, false)
  }
  async logout () {
    return this.mock()
  }
  async sendReset (email) {
    return this.mock(true)
  }
  
  /*
   * Projects Management
   */
  async listAllProjects () {
    return this.mock(makeList(5, make.project))
  }
  async listPublicProjects () {
    return this.mock(makeList(5, make.project, 'public'))
  }
  async joinProject (slug) {
    return this.mock(true)
  }
  async createProject (title, description, tags, privacy) {
    return this.mock(
      model('Project', 99, { title, description, privacy })
    )
  }
  async editProject (title, description, tags, privacy) {
    return this.mock(
      model('Project', 99, { title, description, privacy })
    )
  }
  
  /*
   * Projects Relations
   */
  async getProjectTags (projectId) {
    return this.mock(
      makeList(7, make.tag)
    )
  }
  async getProjectRegions (projectId) {
    // -> Region[]
    this.notImplemented()
  }
  
  /*
   * Sessions
   */
  async getProjectSessions (projectId) {
    // -> Session[]
    this.notImplemented()
  }
  async projectBySlug (slug) {
    // -> Project
    this.notImplemented()
  }
}

const make = {
  user (id) {
    return model('User', id, {
      fullname: 'Geoff Testington',
      email: 'geoff@example.com'
    })
  },
  project (id, privacy = 'public') {
    return model('Project', id, {
      slug: `project-${id}`,
      title: `Project ${id}`,
      description: 'Aenean lacinia bibendum nulla sed consectetur',
      privacy
    })
  },
  tag (id) {
    return model('Tag', id, { name: `Tag ${id}` })
  },
  session (id, projectId, creatorId) {
    return model('Session', id, {
      project: projectId,
      creator: creatorId
    })
  },
  playlist (id, creatorId) {
    return model('Playlist', id, { name: `Playlist ${id}` })
  }
}

function makeList (count, maker, ...args) {
  let items = []
  for (let i = 1; i <= count; i++) {
    items.push(maker(i, ...args))
  }
  return items
}

function model (type, id, obj) {
  return Object.assign({
    _modeltype: type,
    id: parseInt(id),
    created_on: new Date('2018-02-05T03:24:42'),
    updated_on: new Date('2018-02-11T03:24:42')
  }, obj)
}
