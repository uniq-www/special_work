<template>
    <a-button @click="setOperate" :disabled="disabled">
        {{title}} <span v-show="disabled">({{setTime}} s)</span>
    </a-button>
</template>

<script>
  export default {
    name: "tcc-timeBtn",
    props: {
      title: {
        type: String,
        default: ''
      },
      time: {
        type: Number,
        default: 5
      }
    },
    data: function() {
      return {
        disabled: false,
        timer: null,
        setTime: this.time
      }
    },
    methods: {
      setOperate () {
        this.disabled = true;
        this.timer = setInterval(() => {
          if (this.setTime > 1) {
            this.setTime -= 1
          } else {
            this.setTime = this.time;
            clearInterval(this.timer);
            this.disabled = false
          }
        }, 1000)
      }
    }
  }
</script>

<style scoped>

</style>
