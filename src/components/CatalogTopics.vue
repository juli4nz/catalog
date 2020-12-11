<template>
  <div>
    <RestaurantInfo v-if="!is_home" :info="restaurant" />
    <div v-else class="detail_header">
      <h2>{{ restaurant.title }}</h2>
      <!--<div class="breadcrumb">{{ restaurant.breadcrumb }}</div>-->
    </div>
    <TopicList :topics="topics.selected" :slugs="topics.selected_slugs" />
    <div v-if="!is_home && notes !== ''" class="section_notes" v-html="notes"></div>
  </div>
</template>

<script>
import TopicList from './TopicList.vue'
import RestaurantInfo from './RestaurantHeader.vue'

export default {
  components: {
    TopicList,
    RestaurantInfo
  },
  props: ['restaurant', 'topics', 'notes'],
  computed: {
    level() {
      if (this.$route.params.c_slug) return 3
      if (this.$route.params.b_slug) return 2
      if (this.$route.params.a_slug) return 1
      return 0
    },
    is_home() {
      return this.level == 0 ? false : true
    }
  },
  created() {
    this.$emit('update')
    let size = { height: 180 }
    this.$emit('resize', size)
  }
}
</script>

<style scoped lang="scss">
.detail_header {
  margin-bottom: 25px;
  h2 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .breadcrumb {
    font-size: 0.9rem;
  }
}
.section_notes {
  width: 100%;
  font-family: 'Rubik';
  font-weight: 300;
  font-size: 0.65rem;
  border: 1px solid #dedede;
  padding: 10px;
  border-radius: 5px;
  color: #292929;
  background-color: #fefefe;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}
</style>

<style lang="scss">
.section_notes {
  > * {
    width: 100% !important;
  }
  strong {
    font-weight: 500;
  }
  a {
    color: #555;
    text-decoration: none !important;
  }
}
</style>
