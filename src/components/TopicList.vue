<template>
  <div class="section_list">
    <div v-for="(topic, index) in topics" :key="index" class="item" :class="is_product(topic)" @click="goto(topic, index)">
      <div class="thumbs">
        <img :src="topic.image_bottle ? topic.image_bottle.url : topic.image.url ? topic.image.url : topic.image" :alt="topic.image_bottle ? topic.image_bottle.alt : topic.image.alt" />
      </div>
      <div class="title">
        <h2>{{ topic.name }}</h2>
      </div>
    </div>
    <!-- End Catalog -->
  </div>
</template>

<script>
export default {
  props: ['topics', 'slugs'],
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
  methods: {
    goto(topic, index) {
      if (topic.has_topics || topic.products) {
        switch (this.level) {
          case 0:
            this.$router.push({
              name: 'catalog_a',
              params: {
                a_slug: this.slugs[index]
              }
            })
            break
          case 1:
            this.$router.push({
              name: 'catalog_b',
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.slugs[index]
              }
            })
            break
          case 2:
            this.$router.push({
              name: 'catalog_c',
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.$route.params.b_slug,
                c_slug: this.slugs[index]
              }
            })
            break
        }
      } else {
        switch (this.level) {
          case 0:
            this.$router.push({
              name: 'catalog_a_detail',
              params: {
                a_slug: this.slugs[index],
                detail: 'detail'
              }
            })
            break
          case 1:
            this.$router.push({
              name: 'catalog_b_detail',
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.slugs[index],
                detail: 'detail'
              }
            })
            break
          case 2:
            this.$router.push({
              name: 'catalog_c_detail',
              params: {
                a_slug: this.$route.params.a_slug,
                b_slug: this.$route.params.b_slug,
                c_slug: this.slugs[index],
                detail: 'detail'
              }
            })
            break
        }
      }
    },
    is_product(item) {
      return item.has_topics || item.products ? 'style2' : 'style1'
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin define-cols($cols, $gap, $h) {
  .section_list {
    grid-template-columns: repeat($cols, 1fr);
    gap: $gap;
    .item {
      height: calc(100vw * $h);
    }
  }
}

.mobile {
  &.landscape {
    .section_list {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.25);
      }
    }
  }
}
.tablet {
  &.landscape {
    .section_list {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.2);
      }
    }
  }
  &.portrait {
    .section_list {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.25);
      }
    }
  }
}
.laptop {
  &.landscape {
    .section_list {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.18);
      }
    }
  }
  &.portrait {
    .section_list {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.18);
      }
    }
  }
}
.desktop {
  &.landscape {
    .section_list {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.11);
      }
    }
  }
  &.portrait {
    .section_list {
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      .item > .thumbs,
      .item.style2 {
        height: calc(100vw * 0.15);
      }
    }
  }
}

.section_list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 25px;
  .item {
    position: relative;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
    &.style1 {
      .thumbs {
        position: relative;
        height: calc(100vw * 0.45);
        border-radius: 5px;
        overflow: hidden;
        img {
          position: relative;
          text-align: center;
          height: 100%;
          width: auto;
          left: 50%;
          -ms-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
      .title {
        padding: 8px;
        margin: 0;
        margin-bottom: 0px;
        margin-bottom: 5px;
        h2 {
          font-family: 'Rubik';
          font-weight: 300;
          font-size: 1rem;
          margin: 0;
          padding: 0;
          text-align: center;
        }
      }
    }
    &.style2 {
      max-height: calc(100vw * 0.35);
      .thumbs {
        position: relative;
        height: calc(100vw * 0.35);
        border-radius: 5px;
        overflow: hidden;
        img {
          position: relative;
          text-align: center;
          height: 100%;
          width: auto;
          left: 50%;
          -ms-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 8px;
        margin: 0;
        border-radius: 5px;
        background: rgb(0, 0, 0);
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
        h2 {
          font-family: 'Rubik';
          font-weight: 300;
          font-size: 1rem;
          margin: 0;
          padding: 0;
          color: #fff;
          text-align: center;
        }
      }
    }
  }
}
</style>
