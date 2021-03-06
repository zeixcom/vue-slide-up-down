export default {
  name: 'SlideUpDown',

  props: {
    active: Boolean,
    duration: {
      type: Number,
      default: 300
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.23, 1, 0.32, 1)' // ease out quint
    },
    tag: {
      type: String,
      default: 'div'
    },
    delay: {
      type: Number,
      default: 10,
    },
  },

  data: () => ({
    scrollHeight: 0,
    isMounted: false,
    active2: true,
  }),

  watch: {
    active() {
      // add delay
      setTimeout(() => {
        this.active2 = this.active;
      }, this.delay);
    },
    active2() {
      this.layout();
    },
  },

  render (h) {
    return h(
      this.tag,
      {
        style: this.style,
        ref: 'container'
      },
      this.$slots.default,
    );
  },

  mounted () {
    window.addEventListener('resize', this.layout);

    this.active2 = this.active;
    this.layout();

    this.$nextTick(() => {
      this.isMounted = true;
    });
  },

  destroyed () {
    window.removeEventListener('resize', this.layout);
  },

  computed: {
    style () {
      const heightSize = this.active2 ? this.scrollHeight : 0

      return {
        overflow: 'hidden',
        'transition-property': 'height',
        height: this.isMounted ? heightSize + 'px' : 'auto',
        'transition-duration': this.duration + 'ms',
        'transition-timing-function': this.easing,
      };
    },
  },

  methods: {
    layout () {
      const { container } = this.$refs;
      this.scrollHeight = container.scrollHeight;
    }
  }
}
