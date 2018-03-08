/** An interface for interacting with the Gabber api */
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
  
  // GET: /project/:id () -> Project
  async getProject (id) {
    this.notImplemented()
  }
  
  // GET: /projects/public () -> Project[]
  // async listPublicProjects () {
  //   this.notImplemented()
  // }
  
  // POST: /project/join (id) -> Project
  async joinProject (id) {
    // NOTE: could this return the joined project?
    this.notImplemented()
  }
  
  // POST: /project/create (...Project) -> Project
  async createProject (title, description, tags, privacy) {
    this.notImplemented()
  }
  
  // POST: /project/edit (...Project) -> Project
  async editProject (id, title, description, tags, privacy) {
    this.notImplemented()
  }
  
  // DEL:  /project/:id (project_id)
  async deleteProject (id) {
    this.notImplemented()
  }
  
  /*
   * Projects Relations
   */
  
  // GET: /project/:id () -> Tag[]
  async getProjectTags (projectId) {
    this.notImplemented()
  }
  
  // GET: /project/:id/regions () -> Region[]
  async getProjectRegions (projectId) {
    this.notImplemented()
  }
  
  /*
   * Sessions
   */
  
  // GET: /project/:id/sessions () -> Session[]
  async getProjectSessions (projectId) {
    this.notImplemented()
  }
  
  // GET: /projectBySlug/:slug () -> Project
  async projectBySlug (slug) {
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

/* EXPECTED ENDPOINTS:

...

*/

/* EXPECTED TYPES:

 */
