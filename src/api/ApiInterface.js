/**
 * The interface for interacting with the Gabber Api
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
  /** Remove encoding type [data:image/png;base64] */
  removeBase64 (image) {
    return image.split(',')[1]
  }

  /*
   * Auth Endpoints
   */
  // users.me -> User
  async getSelf () {
    this.notImplemented()
  }

  // help.languages -> Dict
  async getSupportedLanguages () {
    return this.notImplemented()
  }

  // users.register -> Boolean
  async register (fullname, email, password, lang) {
    this.notImplemented()
  }
  
  // users.verify -> Boolean
  async verify (token) {
    this.notImplemented()
  }
  
  // users.login -> UserAuth
  async login (email, password) {
    this.notImplemented()
  }
  
  // (not a real endpoint) -> Void
  async logout () {
    this.notImplemented()
  }
  
  // users.forgot -> Boolean
  async sendReset (email) {
    this.notImplemented()
  }
  
  // users.resetPassword -> UserAuth
  async resetPassword (token, password) {
    this.notImplemented()
  }
  
  /*
   * Projects Management
   */
  
  // projects.index -> Project[]
  async listProjects () {
    this.notImplemented()
  }
  
  // projects.create -> Project
  async getProject (id) {
    this.notImplemented()
  }
  
  // projects.create -> Project
  async createProject (image, title, description, tags, privacy, organisation) {
    this.notImplemented()
  }
  
  // projects.update -> Project
  async editProject (id, image, title, description, topics, privacy, organisation) {
    this.notImplemented()
  }
  
  // projects.destroy -> Boolean
  async deleteProject (id) {
    this.notImplemented()
  }
  
  /*
   * Project Membership
   */
  
  // projects.join -> Void
  async joinProject (id) {
    this.notImplemented()
  }
  
  // projects.leave -> Void
  async leaveProject (id) {
    this.notImplemented()
  }
  
  // projects.invites.create -> Membership
  async inviteToProject (projectId, fullname, email, role) {
    this.notImplemented()
  }

  // projects.invites.edit -> Membership
  async editMembership (projectId, id, role) {
    this.notImplemented()
  }

  // projects.invites.destroy -> Void
  async removeFromProject (projectId, memberId) {
    this.notImplemented()
  }
  
  // project.invites.show -> { User, Project }
  async getInvite (token) {
    this.notImplemented()
  }
  
  // project.invites.accept -> UserAuth
  async acceptInvite (token, fullname, password) {
    this.notImplemented()
  }
  
  /*
   * Sessions
   */
  
  // projects.sessions.index -> Session[]
  async getProjectSessions (projectId) {
    this.notImplemented()
  }
  
  // projects.sessions.show -> Session
  async getSession (sessionId, projectId) {
    this.notImplemented()
  }
  
  /*
   * Annotations
   */
  
  // projects.sessions.annotations.index -> Annotation[]
  async getSessionAnnotations (sessionId, projectId) {
    this.notImplemented()
  }
  
  // projects.sessions.annotations.destroy -> Void
  async deleteAnnotation (projectId, sessionId, annotationId) {
    this.notImplemented()
  }
  
  // projects.sessions.annotations.create -> Annotation
  async createAnnotation (content, tags, start, end, sId, pId) {
    this.notImplemented()
  }
  
  /*
   * Comments
   */
  
  // projects.sessions.annotations.comments.replies -> Comment[]
  async getChildComments (projectId, sessionId, annotationId, commentId) {
    this.notImplemented()
  }
  
  // projects.sessions.annotations.comments.create -> Comment
  async createComment (projectId, sessionId, annotationId, content, parentId = null) {
    this.notImplemented()
  }
  
  // projects.sessions.annotations.comments.destroy -> Void
  async deleteComment (projectId, sessionId, annotationId, commentId) {
    this.notImplemented()
  }
  
  /*
   * Consent
   */
  
  // consent.show -> { User, Project, Session, consent }
  async getConsent (token) {
    this.notImplemented()
  }
  
  // consent.create -> Void
  async sendConsent (token, consent) {
    this.notImplemented()
  }
}
