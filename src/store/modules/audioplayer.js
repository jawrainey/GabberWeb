const state = {
    player: {},
    // The position of the progress bar as a percentage of the region length
    position: 0,
    isPlaying: false,
    uiProgressTimer: 0,
};

const getters = {
    POSITION: state => state.position,
    IS_PLAYING: state => state.isPlaying
};

const mutations = {
    AUDIO_PLAYER: (state, player) => state.player = player,
    INCREASE_POSITION: (state, position) => state.position += position,
    UPDATE_POSITION: (state, position) => state.position = position
};

const actions = {
    PLAY_AUDIO: ({dispatch, state}, region) => {
        // When rapidly switching between audio sources an error is thrown (https://goo.gl/LdLk22)
        // HACK: setting a timeout avoids the promise and loads the next audio (https://goo.gl/nbCrje)
        setTimeout(function () {
            // Note: we seek to the start of the region as the whole file is currently sent from the server.
            state.player.currentTime = (state.position > 0) ? (region.start + state.position) : region.start;
            state.player.play().catch();
            dispatch('CREATE_PROGRESS_BAR', region);
            state.isPlaying = true;
        }, 150);
    },
    PAUSE_AUDIO: ({state}) => {
        clearInterval(state.uiProgressTimer);
        state.player.pause();
        state.isPlaying = false;
    },
    PLAYPAUSE_AUDIO: ({dispatch, state}, region) => {
        if (state.isPlaying) dispatch('PAUSE_AUDIO');
        else dispatch('PLAY_AUDIO', region);
    },
    SEEK_TEN_FORWARD: ({dispatch, getters}) => {
        if (state.position + 10 >= getters.selectedRegion.length) {
            dispatch('RESET_AUDIO');
        }
        else {
            state.player.currentTime += 10;
            state.position += 10;
        }
    },
    SEEK_TEN_BACKWARD: ({dispatch}) => {
        if (state.position - 10 <= 0) {
            dispatch('RESET_AUDIO');
        }
        else {
            state.player.currentTime -= 10;
            state.position -= 10;
        }
    },
    TRACK_CHANGED: ({dispatch}, region) => {
        dispatch('RESET_AUDIO');
        dispatch('PLAY_AUDIO', region);
    },
    RESET_AUDIO: ({dispatch, state}) => {
        clearInterval(state.uiProgressTimer);
        state.player.currentTime = 0;
        state.position = 0;
        dispatch('PAUSE_AUDIO');
    },
    CREATE_PROGRESS_BAR: ({commit, dispatch, getters}, region) => {
        state.uiProgressTimer = setInterval(function() {
            // NOTE: position is accessed every second from here.
            if (getters.POSITION >= region.length) {
                dispatch('RESET_AUDIO');
            }
            else {
                commit('INCREASE_POSITION', .1);
            }
        }, 100);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}