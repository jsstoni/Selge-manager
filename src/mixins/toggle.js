export default {
  data() {
    return {
      isVisible: false
    }
  },
  unmounted() {
    document.body.style.overflow = 'auto';
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    }
  },
  watch: {
    isVisible() {
      if (this.isVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }
}