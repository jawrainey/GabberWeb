const state = {
  activeShowPlayListMenu: null,
  lastSelectedPlaylistID: null,
  showAddRegionNote: false,
  regionsLoaded: false,
  regionsLoadedMessage: 'Searching for regions for this project ...'
}

const getters = {
  showPlayListMenu: state => state.activeShowPlayListMenu,
  showAddRegionNote: state => state.showAddRegionNote,
  regionsLoaded: state => state.regionsLoaded,
  regionsLoadedMessage: state => state.regionsLoadedMessage,
  lastSelectedPlaylistID: state => state.lastSelectedPlaylistID
}

const mutations = {
  showPlayListMenu (state, isShowing) {
    if (state.activeShowPlayListMenu === isShowing) {
      // As the toggle is ID based, we must reset it to null.
      state.activeShowPlayListMenu = null
    } else {
      state.activeShowPlayListMenu = isShowing
    }
  },
  // TODO: this really should not be here, but #hack #hack #hack
  SELECTED_PLAYLISTID_FOR_REGION_TO_ADD: (state, playlistID) => (state.lastSelectedPlaylistID = playlistID),
  showAddRegionNote: (state, isShowing) => (state.showAddRegionNote = isShowing),
  regionsLoaded: (state, isLoaded) => (state.regionsLoaded = isLoaded),
  regionsLoadedMessage: (state, message) => (state.regionsLoadedMessage = message)
}

export default {
  state,
  getters,
  mutations
}
