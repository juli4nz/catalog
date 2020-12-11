<template>
  <div class="lang_btn">
    <v-select v-model="languages.current" class="lang_switcher" :options="langs_list" label="country_flag_url" :clearable="false" :searchable="false" @input="set_language">
      <template slot="option" slot-scope="lang">
        <img :src="lang.country_flag_url" :alt="lang.native_name" />
      </template>
      <template slot="selected-option" slot-scope="lang">
        <img :src="lang.country_flag_url" :alt="lang.native_name" />
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  props: ['languages'],
  data: () => {
    return {
      langs_list: [],
      is_open: false
    }
  },
  mounted() {
    this.fetch_data()
  },
  methods: {
    fetch_data() {
      this.langs_list.push(this.languages.current)

      if (this.languages.translations.length > 0) {
        this.languages.translations.forEach(lang => {
          this.langs_list.push(lang)
        })
      }
    },
    set_language(lang) {
      this.$emit('switch_language', lang.id)
    }
  }
}
</script>

<style scoped lang="scss"></style>
<style lang="scss">
.lang_switcher {
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background: #fff;
    border: none;
    color: #394066;
  }
  .vs__clear,
  .vs__open-indicator {
    fill: #394066;
  }
  &.vs--single.vs--open {
    .vs__selected {
      position: relative;
    }
  }
  .vs__search,
  .vs__search:focus {
    margin: 0;
    padding: 0;
  }
  .vs__dropdown-menu {
    right: 0;
    left: inherit;
    min-width: 60px;
    width: auto;
    text-align: left;
  }
}
</style>
