import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import debounce from "lodash/debounce";

Vue.use(Vuex);

const CancelToken = axios.CancelToken;
let cancelInfoRequest = () => {};
let cancelEventsRequest = () => {};

const escapeName = (name = "") => {
  return name
    .replace(/\//g, "%252F")
    .replace(/\?/g, "%253F")
    .replace(/\*/g, "%252A")
    .replace(/"'/g, "%27C");
};

export const config = {
  plugins: [createPersistedState()],
  state: {
    artist: "",
    infoFetching: false,
    eventsFetching: false,
    info: {},
    events: []
  },
  mutations: {
    changeArtist(state, artist) {
      state.artist = artist;
    },
    toggleInfoFetching(state, value) {
      state.infoFetching = value;
    },
    toggleEventsFetching(state, value) {
      state.eventsFetching = value;
    },
    changeInfo(state, info) {
      state.info = info;
    },
    changeEvents(state, events) {
      state.events = events;
    }
  },
  actions: {
    requestInfo({ dispatch, commit }, name) {
      commit("changeArtist", name);

      if (!name) {
        cancelInfoRequest();
        commit("toggleInfoFetching", false);
        commit("changeInfo", {});
        return;
      }

      cancelInfoRequest();
      cancelEventsRequest();
      commit("toggleInfoFetching", true);
      dispatch("debouncedGetInfo", name);
    },
    debouncedGetInfo: debounce(({ commit, dispatch, state }, name) => {
      return axios
        .get(`https://rest.bandsintown.com/artists/${escapeName(name)}`, {
          params: {
            app_id: "bands4U"
          },
          cancelToken: new CancelToken(cancelHandler => {
            cancelInfoRequest = cancelHandler;
          })
        })
        .then(response => {
          if (state.infoFetching) {
            commit("changeInfo", response.data);
            commit("changeEvents", []);
            commit("toggleEventsFetching", true);
            dispatch("debouncedGetEvents", response.data.name);
          }
          commit("toggleInfoFetching", false);
        })
        .catch(() => {
          commit("toggleInfoFetching", false);
        });
    }, 1000),
    debouncedGetEvents: debounce(({ commit, state }, name) => {
      return axios
        .get(
          `https://rest.bandsintown.com/artists/${escapeName(name)}/events`,
          {
            params: {
              app_id: "bands4U"
            },
            cancelToken: new CancelToken(cancelHandler => {
              cancelEventsRequest = cancelHandler;
            })
          }
        )
        .then(response => {
          if (state.eventsFetching) {
            commit("changeEvents", response.data);
          }
          commit("toggleEventsFetching", false);
        })
        .catch(() => {
          commit("toggleEventsFetching", false);
        });
    }, 1000)
  }
};

export default new Vuex.Store(config);
