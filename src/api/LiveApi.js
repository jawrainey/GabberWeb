import ApiInterface from './ApiInterface'
import axios from 'axios'

const ACCESS_TOKEN_KEY = 'gabber.access_token'
const REFRESH_TOKEN_KEY = 'gabber.refresh_token'

/**
 * An interface for interacting with the Gabber api
 */
export default class LiveApi extends ApiInterface {
  constructor (base = '') {
    super(base)
    this.agent = axios.create({
      baseURL: this.base
    })
    this.checkAndSetTokens()
  }
  setTokens (access, refresh) {
    this.agent.defaults.headers['Authorization'] = `Bearer ${access}`
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }
  checkAndSetTokens () {
    let access = localStorage.getItem(ACCESS_TOKEN_KEY)
    // let refresh = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (access) {
      this.agent.defaults.headers['Authorization'] = `Bearer ${access}`
    }
  }
  async endpoint (method, url, body = {}, query = {}) {
    try {
      url = url.replace(/\/?$/, '/')
      let res = await this.agent.request({
        method, url, params: query, data: body
      })
      let envelope = res.data
      return this.makeEnvelope(
        true,
        envelope.data,
        envelope.meta.messages
      )
    } catch (error) {
      if (error.response) {
        let envelope = error.response.data || {}
        console.log(envelope)
        return this.makeEnvelope(
          false,
          null,
          envelope.meta && envelope.meta.messages
        )
      } else {
        return this.makeEnvelope(false, null, 'Something went wrong')
      }
    }
  }
  makeEnvelope (...args) {
    let envelope = super.makeEnvelope(...args)
    // TODO: Translate the messages ...
    return envelope
  }
  processAuth (meta, data) {
    if (meta.success) {
      let tokens = data.tokens
      this.setTokens(tokens.access, tokens.refresh)
      data = data.user
    }
    return { meta, data }
  }
  
  /*
   * Auth Endpoints
   */
  // GET: /auth/me () -> User
  async getSelf () {
    return this.endpoint('get', '/auth/me')
  }
  
  // POST: /auth/register  (fullname, email, password) -> User
  async register (fullname, email, password) {
    let { meta, data } = await this.endpoint('post', '/auth/register', {
      fullname, email, password
    })
    return this.processAuth(meta, data)
  }
  
  // POST: /auth/login (email, password) -> User
  async login (email, password) {
    let { meta, data } = await this.endpoint('post', '/auth/login', {
      email, password
    })
    return this.processAuth(meta, data)
  }
  
  // POST: /auth/logout () -> void
  async logout () {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    return this.makeEnvelope(true)
  }
  
  // POST: /auth/forgot (email) -> void
  async sendReset (email) {
    return this.endpoint('post', '/auth/forgot', { email })
  }
  
  // POST: /auth/reset (token, password) -> User
  async resetPassword (token, password) {
    let { meta, data } = await this.endpoint('post', '/auth/reset', {
      token, password
    })
    return this.processAuth(meta, data)
  }
  
  /*
   * Projects Management
   */
  
  // GET: /projects () -> Project[]
  async listAllProjects () {
    return this.endpoint('get', '/projects')
  }
  
  // GET: /projects/:id () -> Project
  async getProject (id) {
    return this.endpoint('get', `/projects/${id}`)
  }
  
  // POST: /projects/ (...Project) -> Project
  async createProject (title, description, topics, privacy) {
    return this.endpoint('post', '/projects', {
      title, description, topics, privacy
    })
  }
  
  // PUT: /projects/:id/ (...Project) -> Project
  async editProject (id, title, description, topics, privacy) {
    return this.endpoint('put', `/projects/${id}`, {
      title, description, privacy, topics
    })
  }
  
  // DEL:  /projects/:id () -> Boolean
  async deleteProject (id) {
    return this.endpoint('delete', `/projects/${id}`)
  }
  
  /*
   * Project Membership
   */
  
  // POST: /projects/:id/membership/ (id) -> Boolean
  async joinProject (id) {
    // return this.endpoint('post', `/projects/${id}/membership`)
    this.notImplemented()
  }
  
  // DEL: /projects/:id/membership/ (id) -> Boolean
  async leaveProject (id) {
    // return this.endpoint('delete', `/projects/${id}/membership`)
    this.notImplemented()
  }
  
  // POST: /project/:id/membership/invites/
  async inviteToProject (projectId, fullname, email) {
    // return this.endpoint('post', `/projects/${projectId}/membership/invites`, {
    //   fullname, email
    // })
    this.notImplemented()
  }
  
  // DELETE: /projects/:id/membership/invites/:id2
  async removeFromProject (projectId, memberId) {
    // return this.endpoint('delete', `/projects/${projectId}/membership/invites/${memberId}`)
    this.notImplemented()
  }
  
  /*
   * Sessions
   */
  
  // GET: /projects/:id/sessions () -> Session[]
  async getProjectSessions (projectId) {
    return this.endpoint('get', `/projects/${projectId}/sessions`)
  }
  
  // GET: /projects/:proj_id/sessions/:session_id () -> Session
  async getSession (sessionId, projectId) {
    this.notImplemented()
  }
  
  /*
   * Annotations
   */
  
  // GET: /projects/:proj_id/sessions/:sess_id/annotations -> Annotation[]
  async getSessionAnnotations (sessionId, projectId) {
    this.notImplemented()
  }
  
  // DEL: /projects/:id1/sessions/:id2/annotations/:id3
  async deleteAnnotation (projectId, sessionId, annotationId) {
    this.notImplemented()
  }
  
  /*
   * Comments
   */
  
  // GET: /projects/:id1/sessions/:id2/annotations/:id3/comments/:id4 -> Comment[]
  async getChildComments (projectId, sessionId, annotationId, commentId) {
    this.notImplemented()
  }
  
  // POST: /projects/:id1/sessions/:id2/annotations/:id3/comments
  async createComment (projectId, sessionId, annotationId, content, parentId = null) {
    this.notImplemented()
  }
  
  // DEL: /projects/:id1/sessions/:id2/annotations/:id3/comments/:id4
  async deleteComment (projectId, sessionId, annotationId, commentId) {
    this.notImplemented()
  }
  
  /*
   * Playlists
   */
  
  // GET:  /users/:id/playlists () -> Playlist[]
  // POST: /users/:id/playlists (title) -> Playlist
  // GET:  /users/:id/playlists/:id/regions () -> Region[]
  // POST: /users/:id/playlists/:id/regions (region_id) -> boolean
  // DEL:  /users/:id/playlists/:id/regions (region_id) -> boolean
  // POST: /users/:id/playlists/:id/region/:id/note (note) -> Note
}
