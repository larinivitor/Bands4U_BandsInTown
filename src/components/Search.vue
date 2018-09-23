<template>
  <div class="Search">
    <md-field>
      <label>Band or Artist name</label>
      <md-input :value="value" @input="requestInfo" ref="input" class="Search__input"></md-input>
    </md-field>
    <div class="Search__spinner">
      <div v-show="fetching">
        <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Search",
  mounted: function() {
    this.$refs.input.$el.focus();
  },
  computed: {
    ...mapState({
      value: state => state.artist,
      fetching: state => state.infoFetching
    })
  },
  methods: {
    ...mapActions({
      requestInfo: "requestInfo"
    })
  }
};
</script>

<style scoped lang="scss">

.Search {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  width: 50%;
  border: 1px solid white;
  border-radius: 10px;
  padding-left: 30px;

  &__spinner {
    width: 100px;
    flex-shrink: 0;
  }

  .md-field &__input.md-input,
  .md-field.md-has-value &__input.md-input {
    font-size: 60px;
    height: auto;
  }
}

@media screen and (max-width: 800px) {
  .Search {
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    width: 100%;
    border: 1px solid white;
    border-radius: 10px;
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__spinner {
      width: 20px;
      flex-shrink: 0;
    }

    .md-field &__input.md-input,
    .md-field.md-has-value &__input.md-input {
      font-size: 20px;
      height: auto;
    }
  }
}
</style>
