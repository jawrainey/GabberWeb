import ApiInterface from './ApiInterface'
import axios from 'axios'

const ACCESS_TOKEN_KEY = 'gabber.access_token'
const REFRESH_TOKEN_KEY = 'gabber.refresh_token'

/**
 * The live implementation of ApiInterface using an axios agent
 */
export default class LiveApi extends ApiInterface {
  constructor (base = '') {
    super(base)
    this.agent = axios.create({
      baseURL: this.base
    })
    this.checkAndSetTokens()
  }
  
  /*
   * Api Utilities
   */
  
  /** Set the tokens on our agent & store them in localStorage */
  setTokens (access, refresh) {
    this.agent.defaults.headers['Authorization'] = `Bearer ${access}`
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
  }
  
  /** Check if tokens are stored and if so apply them to our agent */
  checkAndSetTokens () {
    let access = localStorage.getItem(ACCESS_TOKEN_KEY)
    // let refresh = localStorage.getItem(REFRESH_TOKEN_KEY)
    if (access) {
      this.agent.defaults.headers['Authorization'] = `Bearer ${access}`
    }
  }
  
  /** Make an api call & format the response in { meta, data} (never throws) */
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
        return this.makeEnvelope(false, null, [ 'Something went wrong' ])
      }
    }
  }
  
  /** Override the making of an envelope to localise error strings (wip) */
  makeEnvelope (...args) {
    let envelope = super.makeEnvelope(...args)
    // TODO: Translate the messages ...
    return envelope
  }
  
  /** Process an auth response, storing jwt tokens and returning the new user */
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
    return this.endpoint('post', 'auth/register', {
      fullname, email, password
    })
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
  
  // users.verify
  async verify (token) {
    let { meta, data } = await this.endpoint('post', `auth/verify/${token}`)
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
  
  // project.invites.show
  async getInvite (token) {
    return this.endpoint('get', `projects/invites/${token}`)
  }
  
  // project.invites.accept
  async acceptInvite (token, fullname, password) {
    return this.endpoint('put', `projects/invites/${token}`, { fullname, password })
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
  
  // projects.sessions.annotations.comments.replies
  async getChildComments (pId, sId, aId, cId) {
    return this.endpoint('get', `projects/${pId}/sessions/${sId}/annotations/${aId}/comments/${cId}/replies`)
    // this.notImplemented()
  }
  
  // projects.sessions.annotations.comments.create
  async createComment (pId, sId, aId, content, parentId = null) {
    let url = `/projects/${pId}/sessions/${sId}/annotations/${aId}/comments/`
    if (parentId !== null) url += `${parentId}`
    return this.endpoint('post', url, { content, parent_id: parentId })
  }
  
  // project.sessions.annotations.comments.destroy
  async deleteComment (pId, sId, aId, cId) {
    return this.endpoint(
      'delete',
      `/projects/${pId}/sessions/${sId}/annotations/${aId}/comments/${cId}`
    )
  }
  
  /*
   * Consent
   */
  
  // consent.show
  async getConsent (token) {
    return this.endpoint('get', `consent/${token}`)
  }
  
  // consent.create
  async sendConsent (token, consent) {
    return this.endpoint('put', `consent/${token}`, { consent })
  }
}
