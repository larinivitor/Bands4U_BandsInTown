import { config } from "src/store";
import Vuex from "vuex";
import cloneDeep from "lodash/cloneDeep";


jest.mock("vuex-persistedstate", () => () => () => {});

let store;

describe("Store", () => {
  beforeEach(() => {
    store = new Vuex.Store({
      ...cloneDeep(config),
      plugins: []
    });
  });

  it("sets artists name and sets fetching flag on `requestInfo` action", () => {
    store.replaceState({
      ...store.state,
      artist: "foo",
      infoFetching: false
    });

    store.dispatch("requestInfo", "bar");

    expect(store.state).toMatchObject({
      artist: "bar",
      infoFetching: true
    });
  });
});
