<template>
  <div class="section_title">
    <div v-if="!home" class="home_title">
      <p class="title" v-html="title.title"></p>
      <h1 v-html="title.name"></h1>
      <p class="location">{{ title.location }}</p>
    </div>
    <div v-else class="topics_title">
      <h2>{{ title.title }}</h2>
      <!--<div class="breadcrumb">{{ title.breadcrumb }}</div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'home'],
  data: () => {
    return {}
  }
}
</script>

<style scoped lang="scss">
.section_title {
  margin-bottom: 25px;
  text-align: center;
  h1 {
    font-size: 1.6rem;
    margin-bottom: 5px;
    color: #292929;
  }
  .location {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 30px;
  }
  .title {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    margin: 0;
    margin-top: 15px;
    color: #636444;
    i {
      margin: 0 5px;
    }
  }
  .topics_title {
    margin-bottom: 25px;
    h2 {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .breadcrumb {
      font-size: 0.9rem;
    }
  }
}
</style>
