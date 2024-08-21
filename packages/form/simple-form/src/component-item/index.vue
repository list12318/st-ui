<template>
  <component :is="'component-item-' + data.type" :data="data">
    <template slot-scope="scope">
      <template v-for="(item, index) in scope.data">
        <component-item :key="index" :data="item" />
      </template>
    </template>
  </component>
</template>

<script>
import ComponentItemCol from "./col";
import ComponentItemRow from "./row";
import ComponentItemComponent from "./component";

export default {
  name: "component-item",
  components: {
    ComponentItemCol,
    ComponentItemRow,
    ComponentItemComponent,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
};
</script>
