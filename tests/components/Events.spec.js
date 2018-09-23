import Vuex from "vuex";
import { mount, shallow } from "@vue/test-utils";
import Events from "src/components/Events.vue";

describe("Events.vue", () => {
  let store;
  let state;

  beforeEach(() => 
  {
    state = {
      eventsFetching: true,
      events: []
    };
    store = new Vuex.Store({
      state,
      mutations: {
        addEvent: concert => state.events.push(concert)
      }
    });
  });

  it("displays spinner while fetching", () => {
    const wrapper = mount(Events, {
      store
    });
    let spinner = wrapper.find(".md-progress-spinner");
    expect(spinner.exists()).toBeTruthy();
    state.eventsFetching = false;
    spinner = wrapper.find(".md-progress-spinner");
    expect(spinner.exists()).toBeFalsy();
  });

  it("displays ‘not found’ message if there are no events after fetching is finished ", () => {
    const wrapper = shallow(Events, {
      store
    });
    expect(wrapper.text()).toBeFalsy();
    state.eventsFetching = false;
    expect(wrapper.text()).toBe("No events found");
  });

  it("displays events list if there are events", () => {
    const wrapper = mount(Events, {
      store
    });
    state.eventsFetching = false;
    state.events.push({
      venue: {
        city: "fooCity",
        country: "barCountry"
      }
    });
    expect(wrapper.text()).toMatch("fooCity");
    expect(wrapper.text()).toMatch("barCountry");
  });
});
