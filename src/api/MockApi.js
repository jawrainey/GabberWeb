import ApiInterface from './ApiInterface'
import { make, makeList, CURRENT_USER_ID, hasher } from './generator'
import { store } from '../store'

// Constants for mocking
const MOCK = {
  SPEED: 300,
  LOGGED_IN: true,
  FAIL_TOKEN: 'fail',
  LANGUAGES: [
    {
      'code': 'en',
      'endonym': 'English',
      'id': 1,
      'iso_name': 'English'
    },
    {
      'code': 'ar',
      'endonym': 'العربية',
      'id': 4,
      'iso_name': 'Arabic'
    }
  ]
}

// Auto incrementing ids for mocking
const mockIds = {
  project: 10,
  comment: 100,
  membership: 100,
  annotation: 100
}

// A very basic regex for emails
const isEmail = /.+@.+\..+/

/**
 * The mock implementation of ApiInterface
 */
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
  async getSupportedLanguages () {
    return this.mock(MOCK.LANGUAGES)
  }
  async register (fullname, email, password, lang) {
    return this.mock(null, isEmail.test(email))
  }
  async verify (token) {
    return token !== MOCK.FAIL_TOKEN
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
    return token !== MOCK.FAIL_TOKEN
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  
  /*
   * Projects Management
   */
  async listProjects () {
    let personal = !store.getters.currentUser
      ? [] : makeList(2, make.project, 'private')
    let allProjects = personal.concat(makeList({ from: 3, to: 8 }, make.project))
    return this.mock(allProjects)
  }
  async getProject (id) {
    return id < 100
      ? this.mock(make.project(id, id % 2 ? 'public' : 'private'))
      : this.mock(null, false)
  }
  async createProject (image, content, privacy) {
    let id = mockIds.project++
    return this.editProject(id, image, content, privacy)
  }
  async editProject (id, image, content, privacy) {
    let lang = MOCK.LANGUAGES[0].code
    if (content[lang].title === MOCK.FAIL_TOKEN) return this.mock(null, false)

    // Process new topics into models
    content[lang].topics = content[lang].topics.map((t, i) => {
      return {
        ...make.topic(i + 1, id),
        text: t.text,
        is_active: t.is_active === undefined ? 1 : t.is_active
      }
    })
    
    let creator = make.user(CURRENT_USER_ID)
    return this.mock(Object.assign(
      make.project(id, privacy),
      { image, content, creator }
    ))
  }
  async deleteProject (id) {
    return this.mock(null)
  }
  
  /*
   * Project Membership
   */
  async joinProject (id) {
    return this.mock({
      ...make.membership(CURRENT_USER_ID, 'participant'),
      project_id: id
    })
  }
  async leaveProject (id) {
    let project = make.project(id)
    project.members.filter(member => member.user_id !== CURRENT_USER_ID)
    return this.mock(project)
  }
  async inviteToProject (projectId, fullname, email, role) {
    return this.mock({
      ...make.membership(mockIds.membership++, 'participant'), fullname, role
    })
  }
  async editMembership (projectId, id, role) {
    let project = make.project(projectId)
    let member = project.members.find(m => m.user_id === id)
    return this.mock({
      ...make.membership(member.id, role)
    })
  }
  async removeFromProject (projectId, memberId) {
    return this.mock(null)
  }
  async getInvite (token) {
    return token !== MOCK.FAIL_TOKEN
      ? this.mock(make.invite(1))
      : this.mock(null, false)
  }
  async acceptInvite (token, fullname, password) {
    return password.length >= 8
      ? this.mock(make.user(CURRENT_USER_ID))
      : this.mock(null, false)
  }
  
  /*
   * Sessions
   */
  async getProjectSessions (projectId) {
    let range = { from: projectId * 7, to: (projectId * 7) + 7 }
    return this.mock(
      makeList(range, make.session, projectId, CURRENT_USER_ID)
    )
  }
  async getSession (sessionId, projectId) {
    let id = hasher.decode(sessionId)[0]
    return id
      ? this.mock(make.session(id, projectId, CURRENT_USER_ID))
      : this.mock(null, false)
  }

  async getSessionsRecommendations () {
    return this.mock([make.recommendation(1), make.recommendation(2), make.recommendation(3)])
  }

  /*
   * Annotations
   */
  async getSessionAnnotations (sessionId, projectId) {
    return this.mock(
      makeList(5, make.detailedAnnotation, sessionId)
    )
  }
  async deleteAnnotation (projectId, sessionId, annotationId) {
    return this.mock(null)
  }
  async createAnnotation (content, tags, start, end, sId, pId) {
    if (content === MOCK.FAIL_TOKEN) return this.mock(null, false)
    return this.mock({
      ...make.annotation(mockIds.annotation++, sId),
      content,
      tags,
      start_interval: start,
      end_interval: end
    })
  }
  
  /*
   * Comments
   */
  async getChildComments (projectId, sessionId, annotationId, commentId) {
    const from = mockIds.comment
    const pageSize = { from, to: from + 2 }
    mockIds.comment += 2
    return this.mock(
      makeList(pageSize, make.comment, annotationId, commentId)
    )
  }
  async createComment (projectId, sessionId, annotationId, content, parentId = null) {
    if (content === MOCK.FAIL_TOKEN) return this.mock(null, false)
    let id = mockIds.comment++
    return this.mock({
      ...make.comment(id, annotationId, parentId, CURRENT_USER_ID),
      content
    })
  }
  async deleteComment (projectId, sessionId, annotationId, commentId) {
    return this.mock(null)
  }
  
  /*
   * Consent
   */
  async getConsent (token) {
    return token !== MOCK.FAIL_TOKEN
      ? this.mock(make.consent(1))
      : this.mock(null, false)
  }
  async sendConsent (token, consent) {
    return this.mock(null)
  }

  /*
   * Misc
   */

  // misc.photos
  async getPhotos (query) {
    return this.mock({thumbnails: Array(5).fill('/static/img/logo.png')})
  }
}
