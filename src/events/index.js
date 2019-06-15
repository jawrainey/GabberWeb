/*
 * Global event busses
 */

import Vue from 'vue'

// @logout -> When the user logged out
export const AuthEvents = new Vue({ })
// @AddToUnknownPlaylist -> notify playlist creation of selection
export const PlaylistEvents = new Vue({ })
