<template>
  <div class="flex-between wrap">
    <el-form ref="searchForm" inline :model="model">
      <el-form-item
        v-for="item in config"
        :key="item.key"
        :label="item.label"
        :prop="item.key"
        :label-width="item.labelWidth || '120px'"
        v-bind="item.itemProps"
      >
        <slot v-if="item.component === 'slot'" :name="item.slotName"></slot>
        <div
          v-else-if="item.component === 'innerText'"
          :class="item.innerClass"
          :style="item.style"
        >
          {{ item.innerText || model[item.key] }}
        </div>
        <template v-else>
          <div class="xb-flex-align-center">
            <component
              :is="item.component"
              v-model="model[item.key]"
              style="width: 100%; flex: 1"
              v-bind="item.props"
              v-on="item.listeners"
            >
              <template v-if="item.component === 'el-radio-group'">
                <el-radio
                  v-for="radio in item.options"
                  :key="radio.value"
                  style="margin-top: 10px"
                  :label="radio.value"
                  :disabled="radio.disabled"
                >
                  {{ radio.label }}
                </el-radio>
              </template>

              <template v-if="item.component === 'el-checkbox-group'">
                <el-checkbox
                  v-for="checkbox in item.options"
                  :key="checkbox.value"
                  :label="checkbox.value"
                >
                  {{ checkbox.label }}
                </el-checkbox>
              </template>
              <template v-if="item.component === 'el-select'">
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </template>
            </component>
          </div>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button
          icon="el-icon-search"
          type="primary"
          onClick="{this.onSearch}"
        >
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" onClick="{this.onReset}">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["config", "model"],
};
</script>

<style>
</style>