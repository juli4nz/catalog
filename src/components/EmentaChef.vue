<template>
  <div>
    <div class="detail_header">
      <h2>{{ data.chef.title }}</h2>
    </div>
    <div class="detail_chef" v-html="data.chef.content"></div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data: () => {
    return {
      item: {},
      style: ''
    }
  },
  created() {
    this.set_style(this.data.chef)
    this.$emit('style_header', this.style)
  },
  methods: {
    set_style(topic) {
      this.style = topic.image ? { backgroundImage: 'url(' + topic.image + ')' } : { backgroundColor: topic.color }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail_header {
  margin-bottom: 25px;
  h2 {
    margin-top: 10px;
  }
}
.detail_list {
  .measures_container {
    display: flex;
    .measures_dummy,
    .measures {
      width: 50%;
    }
    .measures {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      padding: 0;
      li {
        text-transform: uppercase;
        font-size: 0.8rem;
        letter-spacing: 3px;
        width: 50%;
        text-align: right;
        padding-left: 10px;
      }
    }
  }
  .plate_list {
    .plate_container {
      display: flex;
      border-bottom: 1px dotted #bbb;
      margin-bottom: 15px;
      .plate_title,
      .plate_prices {
        width: 50%;
      }
      .plate_title {
        h3 {
          margin: 5px 0;
          padding: 0;
          color: rgb(99, 100, 68);
        }
        p {
          color: #888;
          margin: 0 0 5px;
          font-size: 0.85rem;
        }
      }
      .plate_prices {
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin: 0;
        li {
          font-family: 'Prata';
          font-weight: 400;
          color: #000;
          width: 50%;
          text-align: right;
          padding-left: 10px;
          padding-top: 5px;
          font-size: 1.15rem;
          .price_symbol {
            font-size: 0.7rem;
            margin-left: 2px;
          }
        }
      }
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

<style lang="scss">
.detail_chef {
  > * {
    width: 100% !important;
  }
  strong {
    font-weight: 500;
    word-break: break-word;
  }
  a {
    color: #555;
    text-decoration: none !important;
  }
}
</style>
