<template>
  <xb-form
    ref="searchForm"
    v-bind="{
      ...$attrs,
      config: searchConfig,
    }"
  >
    <div slot="search">
      <el-button type="primary" @click="onSearch">查询</el-button>
      <el-button @click="onReset">重置</el-button>
    </div>
  </xb-form>
</template>

<script>
import XbForm from "../XbForm";
export default {
  components: {
    XbForm,
  },
  props: ["config", "source"],
  computed: {
    searchConfig() {
      const search = {
        component: "slot",
        slotName: "search",
        span: 8,
        labelWidth: "0",
      };
      return [...this.config, search];
    },
  },
  methods: {
    onSearch() {
      console.log("onSearch");
    },
    onReset() {
      console.log("onReset");
    },
  },
};
</script>

<style>
</style>