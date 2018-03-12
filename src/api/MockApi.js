import ApiInterface from './ApiInterface'
import { make, makeList, CURRENT_USER_ID, hasher } from './generator'
import { store } from '../store'

// Constants for mocking
const MOCK = {
  SPEED: 300,
  LOGGED_IN: true
}

// Auto incrementing ids for mocking
const mockIds = {
  project: 10,
  comment: 100
}

// A very basic regex for emails
const isEmail = /.+@.+\..+/

/** An implementation of ApiInterface that mocks all responses */
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
        ? makeList(2, make.project, 'private')
        : [],
      public: makeList({ from: 3, to: 8 }, make.project)
    })
  }
  async getProject (id) {
    return id < 100
      ? this.mock(make.project(id, id % 2 ? 'public' : 'private'))
      : this.mock(null, false)
  }
  async joinProject (id) {
    let project = make.project(id)
    project.members.push(make.membership(CURRENT_USER_ID, 'user'))
    return this.mock(project)
  }
  async createProject (title, description, tags, privacy) {
    let id = mockIds.project++
    return this.editProject(id, title, description, tags, privacy)
  }
  async editProject (id, title, description, tags, privacy) {
    if (title === 'fail') return this.mock(null, false)
    
    let creator = make.user(CURRENT_USER_ID)
    return this.mock(Object.assign(
      make.project(id, privacy),
      { title, description, creator }
    ))
  }
  async deleteProject (id) {
    return this.mock(null)
  }
  
  /*
   * Sessions
   */
  async getProjectSessions (projectId) {
    return this.mock(
      makeList(7, make.session, projectId, CURRENT_USER_ID)
    )
  }
  async getSession (sessionId, projectId) {
    let id = hasher.decode(sessionId)[0]
    return id
      ? this.mock(make.session(id, projectId, CURRENT_USER_ID))
      : this.mock(null, false)
  }
  async getSessionAnnotations (sessionId, projectId) {
    return this.mock(
      makeList(5, make.detailedAnnotation, sessionId)
    )
  }
  
  /*
   * Comments
   */
  async getChildComments (projectId, sessionId, annotationId, commentId) {
    const from = mockIds.comment
    const pageSize = { from, to: from + 5 }
    mockIds.comment += 5
    return this.mock(
      makeList(pageSize, make.comment, annotationId, commentId)
    )
  }
  async createComment (projectId, sessionId, annotationId, content, parentId = null) {
    if (content === 'fail') return this.mock(null, false)
    let id = mockIds.comment++
    return this.mock({
      ...make.comment(id, annotationId, parentId, CURRENT_USER_ID),
      content
    })
  }
  async deleteComment (projectId, sessionId, annotationId, commentId) {
    return this.mock(null)
  }
}
