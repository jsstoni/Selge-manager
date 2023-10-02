export default {
  props: {
    data: {
      default: {}
    }
  },
  computed: {
    form: {
      get() {
        return this.data;
      },
      set(value) {
        this.$emit('update:data', value)
      }
    }
  },
  methods: {
    show() {
      this.$refs.popup.open();
    },
    hide() {
      this.$refs.popup.close();
    }
  },
}