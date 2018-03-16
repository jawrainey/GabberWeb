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
  // users.me
  async getSelf () {
    return this.endpoint('get', 'auth/me')
  }
  
  // users.register
  async register (fullname, email, password) {
    let { meta, data } = await this.endpoint('post', 'auth/register', {
      fullname, email, password
    })
    return this.processAuth(meta, data)
  }
  
  // users.login
  async login (email, password) {
    let { meta, data } = await this.endpoint('post', 'auth/login', {
      email, password
    })
    return this.processAuth(meta, data)
  }
  
  // (not a real endpoint)
  async logout () {
    // Unstore the keys
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    
    // Remove our bearer header
    delete this.agent.defaults.headers['Authorization']
    
    // Return a success
    return this.makeEnvelope(true)
  }
  
  // users.forgot
  async sendReset (email) {
    return this.endpoint('post', 'auth/forgot', { email })
  }
  
  // users.resetPassword
  async resetPassword (token, password) {
    let { meta, data } = await this.endpoint('post', 'auth/reset', {
      token, password
    })
    return this.processAuth(meta, data)
  }
  
  /*
   * Projects Management
   */
  
  // projects.index
  async listProjects () {
    return this.endpoint('get', 'projects')
  }
  
  // projects.create
  async createProject (title, description, topics, privacy) {
    return this.endpoint('post', 'projects', {
      title, description, topics, privacy
    })
  }
  
  // projects.show
  async getProject (id) {
    return this.endpoint('get', `projects/${id}`)
  }
  
  // projects.update
  async editProject (id, title, description, topics, privacy) {
    return this.endpoint('put', `projects/${id}`, {
      title, description, privacy, topics
    })
  }
  
  // projects.destroy
  async deleteProject (id) {
    return this.endpoint('delete', `projects/${id}`)
  }
  
  /*
   * Project Membership
   */
  
  // projects.members.invites.create
  async inviteToProject (pId, fullname, email) {
    return this.endpoint('post', `projects/${pId}/membership/invites`, {
      fullname, email
    })
  }
  
  // projects.members.invites.destroy
  async removeFromProject (pId, mId) {
    return this.endpoint('delete', `projects/${pId}/membership/invites/${mId}`)
  }
  
  // projects.members.join
  async joinProject (id) {
    return this.endpoint('post', `projects/${id}/membership`)
  }
  
  // projects.members.leave
  async leaveProject (id) {
    return this.endpoint('delete', `projects/${id}/membership`)
  }
  
  /*
   * Sessions
   */
  
  // projects.sessions.index
  async getProjectSessions (pId) {
    return this.endpoint('get', `projects/${pId}/sessions`)
  }
  
  // GET: projects.sessions.show
  async getSession (sId, pId) {
    return this.endpoint('get', `projects/${pId}/sessions/${sId}`)
  }
  
  /*
   * Annotations
   */
  
  // projects.sessions.annotations.index
  async getSessionAnnotations (sId, pId) {
    return this.endpoint('get', `projects/${pId}/sessions/${sId}/annotations`)
  }
  
  // project.sessions.annotations.destroy
  async deleteAnnotation (pId, sId, aId) {
    return this.endpoint('delete', `projects/${pId}/sessions/${sId}/annotations/${aId}`)
  }
  
  // projects.sessions.annotations.create
  async createAnnotation (content, start, end, sId, pId) {
    return this.endpoint(
      'post',
      `projects/${pId}/sessions/${sId}/annotations`,
      { content, start_interval: Math.floor(start), end_interval: Math.ceil(end) }
    )
  }
  
  /*
   * Comments
   */
  
  // projects.sessions.annotations.comments.index
  async getChildComments (pId, sId, aId, cId) {
    // return this.endpoint('get', `projects/${projectId}/sessions/${sessionId}/annotations/${annotationId}`)
    this.notImplemented()
  }
  
  // projects.sessions.annotations.comments.create
  async createComment (pId, sId, aId, content, parentId = null) {
    return this.endpoint(
      'post',
      `/projects/${pId}/sessions/${sId}/annotations/${aId}/comments`,
      { content, parent_id: parentId }
    )
  }
  
  // project.sessions.annotations.comments.destroy
  async deleteComment (pId, sId, aId, cId) {
    return this.endpoint(
      'delete',
      `/projects/${pId}/sessions/${sId}/annotations/${aId}/comments/${cId}`
    )
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
