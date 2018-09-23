import Vuex from "vuex";
import { shallow } from "@vue/test-utils";
import Info from "src/components/Info.vue";

describe("Info.vue", () => {
  let store;
  let state;

  beforeEach(() => 
  {
    state = {
      info: {
        mbid: 1,
        image_url: "foo"
      }
    };
    store = new Vuex.Store({ state });
  });

  it("flushes old cover picture before starting to fetch a new one", async () => {
    const setCover = jest.fn();
    const valueSet = new Promise(resolve =>
      setCover.mockImplementation(value => {
        if (value) {
          resolve();
        }
      })
    );

    shallow(Info, {
      store,
      methods: {
        setCover
      }
    });
    const cover = "bar";

    state.info.image_url = cover;

    expect(setCover).toHaveBeenCalledWith("");
    await valueSet;
    expect(setCover).toHaveBeenCalledWith(cover);
  });
});
