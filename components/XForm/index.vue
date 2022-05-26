<template>
  <el-form ref="form" v-bind="$attrs" :model="source" class="xb-form">
    <el-row class="xb-form-row" :gutter="20" type="flex">
      <el-col
        v-for="item in config"
        :key="item.key"
        :span="item.hidden ? 0 : item.span || 8"
      >
        <el-form-item
          v-if="!item.hidden"
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
            {{ item.innerText || source[item.key] }}
          </div>
          <template v-else>
            <div class="xb-flex-align-center">
              <component
                :is="item.component"
                v-model="source[item.key]"
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
              <div v-if="item.after" class="xb-form__after">
                {{ item.after }}
              </div>
            </div>
            <div
              v-if="item.tips"
              class="xb-form__tips"
              v-html="item.tips"
            ></div>
          </template>
        </el-form-item>
        <!-- <div
            v-if="item.tips"
            :style="{ marginLeft: item.labelWidth || '120px' }"
            class="xb-form__tips"
            v-html="item.tips"
          ></div> -->
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
// {
//     key: '', // 当前字段的 key 值，同时会传到 el-form-item 的prop，不传数据验证和重置会失效
//     label: '', // 当前 el-form-item 的label
//     hidden: '', // 当前表单项是否展示
//     labelWidth: '', // el-form-item 的label宽度
//     component: '', // 支持 slot、innerText、Component，渲染成什么
//     slotName: '', // compoment 为 slot 时，该值为对应slot的名字供外部使用
//     innerClass: '', // component 为 innerText 时，给文本的样式，通常为全局样式
//     innerStyle: '', // 同上
//     innerText: '', // component 为 innerText 时，优先显示的文本，否则会显示当前的字段值
//     itemProps: '', // 注入到 el-form-item 的属性
//     props: '', // 当 component 为渲染组件时，注入到渲染组件当中的属性
//     listeners： '', // 当 component 为渲染组件时，注入到渲染组件当中的事件
// }

export default {
  name: "XbForm",
  components: {},
  props: {
    config: {
      type: Array,
      default: () => [],
    },
    source: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields();
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    async validate() {
      const valid = await this.$refs.form.validate();
      return valid;
    },
  },
};
</script>
<style lang="scss">
.xb-form {
  .el-form-item__label {
    font-weight: normal;
  }
  .xb-flex-align-center {
    display: flex;
    align-items: center;
  }
}
</style>


