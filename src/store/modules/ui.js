const state = {
    activeShowPlayListMenu: null,
    showAddRegionNote: false
};

const getters = {
    showPlayListMenu: state => state.activeShowPlayListMenu,
    showAddRegionNote: state => state.showAddRegionNote
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
    }
};

export default {
    state,
    getters,
    mutations
}