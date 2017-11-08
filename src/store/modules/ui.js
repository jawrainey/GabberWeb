const state = {
    activeShowPlayListMenu: null,
    showAddRegionNote: false,
    regionsLoaded: false,
    regionsLoadedMessage: "Searching for regions for this project ..."
};

const getters = {
    showPlayListMenu: state => state.activeShowPlayListMenu,
    showAddRegionNote: state => state.showAddRegionNote,
    regionsLoaded: state => state.regionsLoaded,
    regionsLoadedMessage: state => state.regionsLoadedMessage
};

const mutations = {
    showPlayListMenu(state, isShowing) {
        if (state.activeShowPlayListMenu === isShowing)
        {
            // As the toggle is ID based, we must reset it to null.
            state.activeShowPlayListMenu = null;
        }
        else {
            state.activeShowPlayListMenu = isShowing;
        }
    },
    showAddRegionNote(state, isShowing) {
        state.showAddRegionNote = isShowing;
    },
    regionsLoaded: (state, isLoaded) => state.regionsLoaded = isLoaded,
    regionsLoadedMessage: (state, message) => state.regionsLoadedMessage = message
};

export default {
    state,
    getters,
    mutations
}