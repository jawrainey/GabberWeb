/**
 * An interface for interacting with the Gabber api
 */
export default class ApiInterface {
  /** Creates a new Api */
  constructor (base = '') {
    this.base = base.replace(/\/$/, '')
  }
  /** Installs the api onto Vue */
  install (Vue) {
    Vue.prototype.$api = this
  }
  /** Throws a 'Not Implemented' error */
  notImplemented () {
    throw new Error('Not Implemented')
  }
  /** Creates a response envelope */
  makeEnvelope (success, payload = null, messages = []) {
    return {
      meta: { success, messages },
      data: payload
    }
  }
  
  /*
   * Auth Endpoints
   */
  // GET: /auth/me () -> User
  async getSelf () {
    this.notImplemented()
  }
  
  // POST: /auth/register  (fullname, email, password) -> User
  async register (fullname, email, password) {
    this.notImplemented()
  }
  
  // POST: /auth/login (email, password) -> User
  async login (email, password) {
    this.notImplemented()
  }
  
  // POST: /auth/logout () -> void
  async logout () {
    this.notImplemented()
  }
  
  // POST: /auth/forgot (email) -> void
  async sendReset (email) {
    this.notImplemented()
  }
  
  // POST: /auth/reset (token, password) -> User
  async resetPassword (token, password) {
    this.notImplemented()
  }
  
  /*
   * Projects Management
   */
  
  // GET: /projects () -> Project[]
  async listAllProjects () {
    this.notImplemented()
  }
  
  // GET: /projects/:id () -> Project
  async getProject (id) {
    this.notImplemented()
  }
  
  // POST: /projects/ (...Project) -> Project
  async createProject (title, description, tags, privacy) {
    this.notImplemented()
  }
  
  // PUT: /projects/id/ (...Project) -> Project
  async editProject (id, title, description, tags, privacy, topics) {
    this.notImplemented()
  }
  
  // DEL:  /projects/:id () -> Boolean
  async deleteProject (id) {
    this.notImplemented()
  }
  
  /*
   * Project Membership
   */
  
  // POST: /projects/:id/membership/ (id) -> Boolean
  async joinProject (id) {
    this.notImplemented()
  }
  
  // DEL: /projects/:id/membership/ (id) -> Boolean
  async leaveProject (id) {
    this.notImplemented()
  }
  
  // POST: /project/:id/membership/invites/
  async inviteToProject (projectId, fullname, email) {
    this.notImplemented()
  }
  
  // DELETE: /project/:id/membership/invites/
  async removeFromProject (projectId, memberId) {
    this.notImplemented()
  }
  
  /*
   * Sessions
   */
  
  // GET: /projects/:id/sessions () -> Session[]
  async getProjectSessions (projectId) {
    this.notImplemented()
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
  
  // POST: /projects/:id1/
  
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
  
  // DELETE: /projects/:id1/sessions/:id2/annotations/:id3/comments/:id4
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
