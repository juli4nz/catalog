<template>
  <div id="ementa" class="wrapper">
    <transition name="slide-fade-up">
      <HeaderImage v-if="loaded" :url="info.image_url" />
    </transition>
    <div class="section_content">
      <transition name="slide-fade-down">
        <div v-if="loaded" class="body">
          <div v-if="info" class="section_item">
            <!--Start Content-->
            <RestaurantInfo :info="info" />
            <TopicList :topics="topics" />
            <!--End Content-->
          </div>
        </div>
        <div v-else class="loading">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TopicList from './TopicList.vue'
import HeaderImage from './HeaderImage.vue'
import RestaurantInfo from './RestaurantHeader.vue'

export default {
  components: {
    TopicList,
    HeaderImage,
    RestaurantInfo
  },
  data: () => {
    return {
      api_url: 'https://app.ementa.info/main/wp-json/acf/v3/ementa',
      id: '',
      slug: '',
      info: {
        title: 'Ementa',
        name: '',
        location: '',
        image_url: ''
      },
      topics: [],
      loaded: false
    }
  },
  created() {
    this.id = this.$route.params.id
    this.slug = this.$route.params.slug
    this.fetchData()
  },
  methods: {
    fetchData() {
      let req = new Request(this.api_url)
      fetch(req)
        .then(resp => {
          if (resp.status === 200) return resp.json()
        })
        .then(data => {
          data.forEach(ementa => {
            if (ementa.id == this.id) {
              let acf = ementa.acf
              this.info.name = acf.restaurant.name
              this.info.location = acf.restaurant.location
              this.info.image_url = acf.restaurant.image
              let topics = acf.topics
              topics.forEach(topic => {
                this.topics.push(topic)
              })
              let drink_topics = acf.drink_topics
              drink_topics.forEach(drink_topic => {
                this.topics.push(drink_topic)
              })
              this.loaded = true
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  padding: 10px;
  font-size: 1rem;
  .section_content {
    margin-top: 160px;
    .loading {
      position: absolute;
      font-size: 4rem;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .body {
      position: relative;
      background-color: #fff;
      width: 100%;
      min-height: calc(100vh - 185px);
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
