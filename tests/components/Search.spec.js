import Vuex from "vuex";
import { mount } from "@vue/test-utils";
import Search from "src/components/Search.vue";

describe("Search.vue", () => 
{
  let store;

  beforeEach(() => {
    store = new Vuex.Store({});
  });

  it("sets focus to input field on being mounted", () => {
    const wrapper = mount(Search, {
      store
    });

    const input = wrapper.find("input").element;

    expect(input).toEqual(document.activeElement);
  });
});
