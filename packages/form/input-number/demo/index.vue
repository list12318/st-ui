<template>
  <stms-input-number v-model="form" @input="test" />
</template>
<script>
export default {
  data() {
    return {
      form: 1,
    };
  },
  methods: {
    test(data) {
      console.log(data);
    },
  },
};
</script>
