<template>
  <div class="Info" v-if="info.mbid">
    <md-card class="Info__band">
      <md-card-media-cover>
        <md-card-media>
          <img :src="info.image_url" alt="info.name" ref="bandImage" class="Info__cover">
        </md-card-media>

        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{ info.name }}</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-actions v-if="info.facebook_page_url" class="Info__actions">
          <md-button :href="info.facebook_page_url" target="_blank" class="md-dense md-raised md-primary">
            Facebook Page
          </md-button>
        </md-card-actions>

        <md-card-content>
          <slot name="events"></slot>
        </md-card-content>
      </md-card-media-cover>
    </md-card>
  </div>
  <div v-else>
    <div v-if="notFound">
      No information found
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import defer from "lodash/defer";

export default {
  name: "Info",
  computed: {
    ...mapState({
      info: function(state) {
        this.setCover(""); // Flush cache
        defer(() => this.setCover(state.info.image_url));

        return state.info;
      },
      notFound: state => state.artist && !state.info.mbid && !state.infoFetching
    })
  },
  methods: {
    setCover: function(src) {
      if (this.$refs && this.$refs.bandImage) {
        this.$refs.bandImage.src = src;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.Info {
  
  &__band.md-card {
    margin-top: 5%;
    padding-top: 4%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: auto;
    text-align: center;
  }

  &__actions.md-card-actions {
    justify-content: center;
  }

  &__cover {
    max-height: 300px;
    width: auto;
  }
}
</style>
