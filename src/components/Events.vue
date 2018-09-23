<template>
  <div>
    <div v-if="notFound"> No events found </div>
    <div v-else>
      <div v-if="fetching">
        <md-progress-spinner md-mode="indeterminate" :md-diameter="30"></md-progress-spinner>
      </div>
      <md-list class="md-triple-line" v-else>
          <template v-for="(concert, index) in events">
            <md-list-item :key="concert.id">
              <md-avatar>
                <md-icon>place</md-icon>
              </md-avatar>

              <div class="md-list-item-text">
                <span>{{concert.venue.city}}, {{concert.venue.country}}</span>
                <span>{{ parseDate(concert.datetime) }}</span>
                <p>{{concert.venue.name}}</p>
              </div>
            </md-list-item>

            <md-divider class="md-inset" :key="`divider-${concert.id}`" v-if="index < events.length - 1"></md-divider>
          </template>
      </md-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Events",
  computed: {
    ...mapState({
      events: state => state.events,
      fetching: state => state.eventsFetching,
      notFound: state => !(state.events.length || state.eventsFetching)
    })
  },
  methods: {
    parseDate: date => new Date(date).toLocaleDateString()
  }
};
</script>
