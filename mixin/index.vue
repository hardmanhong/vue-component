<template>
  <div>
    <z-form v-bind="formProps" v-on="formEvents" />
    <z-table v-bind="tableProps" />
    <z-pagination v-bind="paginationProps" v-on="paginationEvents" />
  </div>
</template>

<script>
import { ZForm, ZTable, ZPagination, queryMixin } from "./ZQuery";
import { getList } from "../api";
export default {
  name: "Test",
  api: getList,
  isPagination: true,
  rowKey: "customerId",
  components: {
    ZForm,
    ZTable,
    ZPagination,
  },
  mixins: [queryMixin],
  data() {
    return {
      formList: [
        {
          props: {
            label: "",
            prop: "input",
          },
          component: (prop) => (
            <el-input
              v-model={this.formParams[prop]}
              clearable
              placeholder="请输入关键字"
            />
          ),
        },
        {
          props: {
            label: "",
            prop: "select",
          },
          component: (prop) => (
            <el-select v-model={this.formParams[prop]}>
              <el-option label="男" value={1}></el-option>
              <el-option label="女" value={2}></el-option>
            </el-select>
          ),
        },
        {
          props: {
            label: "",
            prop: "datePicker",
          },
          component: (prop) => (
            <el-date-picker
              v-model={this.formParams[prop]}
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="datetimerange"
              value-format="timestamp"
            ></el-date-picker>
          ),
        },
      ],
      columns: [
        {
          label: "名称",
          prop: "name",
          formatter: (row) => {
            return <el-link type="primary">{row.name}</el-link>;
          },
        },
      ],
    };
  },
};
</script>


