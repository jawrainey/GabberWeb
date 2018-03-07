import ApiInterface from './ApiInterface'
import { make, makeList, model, CURRENT_USER_ID } from './generator'
import { store } from '../store'

const MOCK = {
  SPEED: 300,
  LOGGED_IN: true
}

const isEmail = /.+@.+\..+/

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
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  async register (fullname, email, password) {
    return isEmail.test(email)
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  async login (email, password) {
    return isEmail.test(email)
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  async logout () {
    return this.mock()
  }
  async sendReset (email) {
    return this.mock(true)
  }
  async resetPassword (token, password) {
    return token !== 'fail'
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  
  /*
   * Projects Management
   */
  async listAllProjects () {
    return this.mock({
      personal: store.getters.currentUser
        ? makeList(2, make.project, 'private') : [],
      public: makeList({ from: 3, to: 8 }, make.project)
    })
  }
  // async listPublicProjects () {
  //   return this.mock(makeList(5, make.project))
  // }
  async joinProject (slug) {
    return this.mock(true)
  }
  async createProject (title, description, tags, privacy) {
    return this.mock(
      model('Project', CURRENT_USER_ID, { title, description, privacy })
    )
  }
  async editProject (title, description, tags, privacy) {
    return this.mock(
      model('Project', CURRENT_USER_ID, { title, description, privacy })
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
