<template>
  <div>
    <div class="detail_header">
      <h2>{{ catalog.single.name }}</h2>
    </div>
    <div class="product">
      <div class="price">
        <span>{{ Number(catalog.single.price).toFixed(2) }}</span>
        <span class="price_symbol">€</span>
      </div>
      <div class="description" v-html="catalog.single.description"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['catalog'],
  data: () => {
    return {
      image: {
        width: '',
        height: '',
        loaded: false
      }
    }
  },
  created() {
    this.$emit('update')
    this.get_image_meta(this.catalog.single.image)
  },
  methods: {
    get_image_meta(url) {
      let img = new Image()
      img.onload = () => {
        this.image.width = img.width
        this.image.height = img.height
        this.image.loaded = true
        this.resize()
      }
      img.src = url
    },
    resize() {
      let size = this.calculateAspectRatioFit(this.image.width, this.image.height, window.innerWidth, window.innerHeight - 150)
      this.$emit('resize', size)
    },
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
      return { width: srcWidth * ratio, height: srcHeight * ratio }
    }
  }
}
</script>

<style lang="scss" scoped>
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
.product {
  .price {
    font-family: 'Prata';
    font-weight: 400;
    color: #000;
    padding-right: 10px;
    padding-top: 5px;
    font-size: 1.15rem;
    .price_symbol {
      font-size: 0.7rem;
      margin-left: 2px;
    }
  }
}
.close {
  position: fixed;
  top: 15px;
  left: 15px;
  outline: none;
  border: none;
  border-radius: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 8px 15px;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  i {
    font-size: 1rem;
    color: #efefef;
  }
}
</style>
