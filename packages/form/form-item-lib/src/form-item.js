export default {
  props: {
    value: {
      type: Object | String | Array | Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "small",
    },
    props: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
    on: {
      type: Object,
      required: false,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    change(value) {
      this.$emit("input", value);
    },
  },
  render(h) {
    const {
      type,
      value,
      size,
      props,
      change,
      on
    } = this;
    const listener = {
      input: [change],
    };
    for (let x in on) {
      !listener[x] && (listener[x] = []);
      listener[x].push(on[x]);
    }
    return h(`stms-${type}`, {
      props: {
        value,
        size,
        ...(props || {}),
      },
      attrs: {
        value,
        size,
        ...(props || {}),
      },
      on: listener,
    });
  },
};