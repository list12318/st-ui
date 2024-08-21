<template>
  <div>
    <stms-api-design-bodys v-model="bodys" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      bodys: { type: "", param: [] },
    };
  },
  mounted() {
    console.log(this.bodys);
  },
  methods: {},
};
</script>
