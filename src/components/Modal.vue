<template>
  <transition name="modal">
    <div class="modal-mask">
      <button v-if="showClose" class="modal-close" @click="$emit('close')">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-content">
            <slot name="notice"></slot>
            <slot name="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showClose: true
    }
  },
  created() {
    this.hasNoticeSlot()
  },
  beforeUpdate() {
    this.hasNoticeSlot()
  },
  methods: {
    hasNoticeSlot() {
      this.showClose = !this.$slots.notice?.[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.landscape {
  &.mobile {
    .modal-container {
      width: calc(100% - 350px);
    }
  }
  &.tablet {
    .modal-container {
      width: calc(100% - 500px);
    }
  }
  &.laptop {
    .modal-container {
      width: calc(100% - 650px);
    }
  }
  &.desktop {
    .modal-container {
      width: calc(100% - 50%);
    }
  }
}
.portrait {
  &.mobile {
    .modal-container {
      width: calc(100% - 50px);
    }
  }
  &.tablet {
    .modal-container {
      width: calc(100% - 300px);
    }
  }
  &.laptop {
    .modal-container {
      width: calc(100% - 400px);
    }
  }
  &.desktop {
    .modal-container {
      width: calc(100% - 600px);
    }
  }
}

.fullscreen {
  .modal-container {
    width: 100% !important;
    max-height: 100% !important;
  }
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.98);
  transition: opacity 0.3s ease;
}
.modal-wrapper {
}
.modal-container {
  width: calc(100% - 100px);
  max-height: calc(100% - 100px);
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.modal-content {
  position: relative;
}

.modal-close {
  position: absolute;
  top: 15px;
  left: 50%;
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  z-index: 99999;
  outline: none;
  border: none;
  border-radius: 50px;
  background: rgba($color: #000000, $alpha: 0.5);
  padding: 2px 6px;
  cursor: pointer;
  i {
    font-size: 1.5rem;
    color: #efefef;
  }
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease-out;
}

.modal-enter {
  opacity: 1;
}

.modal-leave-to {
  opacity: 0;
}
</style>
