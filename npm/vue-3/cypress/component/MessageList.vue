<template>
  <ul>
    <li v-for="(message, index) in messages" :key="index">
      {{ message }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// from https://alexjoverm.github.io/2017/08/21/Write-the-first-Vue-js-Component-Unit-Test-in-Jest/
export default defineComponent({
  name: "list",
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
});
</script>
