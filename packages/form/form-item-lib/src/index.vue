<template>
  <form-item v-bind="$attrs" v-on="$listeners" />
</template>

<script>
import FormItem from "./form-item";

export default {
  name: "stms-form-item-lib",
  components: {
    FormItem,
  },
};
</script>
