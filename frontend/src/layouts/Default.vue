<template>
  <div>
    <a-layout class="layout-default" id="layout-default" :class="[layoutClass]">
      <DefaultHeader></DefaultHeader>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <DefaultFooter></DefaultFooter>
    </a-layout>
  </div>
</template>

<script>
import DefaultHeader from "../components/Headers/DefaultHeader";
import DefaultFooter from "../components/Footers/DefaultFooter";

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
  },
  data() {
    return {};
  },
  computed: {
    layoutClass() {
      return this.$route.meta.layoutClass;
    },
  },
};
</script>