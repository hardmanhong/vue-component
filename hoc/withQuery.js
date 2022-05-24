const paginationParams = {
  page: 1,
  limit: 20
};

const withQuery = (Wrapped, { api, isPagination = true, rowKey = '' }) => {
  return {
    data() {
      return {
        loading: false,
        total: 0,
        tableData: [],
        pageParams: isPagination
          ? {
              ...paginationParams
            }
          : {},
        formParams: {}
      };
    },
    methods: {
      fetchData() {
        this.loading = true;
        api({
          ...this.pageParams,
          ...this.formParams
        })
          .then((res) => {
            if (res.code === '0') {
              this.tableData = res.data.map((item, index) => ({
                ...item,
                _frontSort:
                  index + 1 + this.pageParams.limit * (this.pageParams.page - 1)
              }));
              if (isPagination && res.pageInfo) {
                this.total = res.pageInfo.sumRow;
                this.pageParams.page = res.pageInfo.page;
              }
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      onCurrentChange(page) {
        if (isPagination) this.pageParams.page = page;
        this.fetchData();
      },
      onSizeChange(size) {
        if (isPagination) this.pageParams.limit = size;
        this.fetchData();
      },
      onSearch(values) {
        if (isPagination) this.pageParams.page = paginationParams.page;
        this.formParams = values;
        this.fetchData();
      },
      onReset(values) {
        if (isPagination) {
          this.pageParams.page = paginationParams.page;
          this.pageParams.limit = paginationParams.limit;
        }
        this.formParams = values;
        this.fetchData();
      }
    },
    computed: {
      formProps() {
        return {
          list: this.formList,
          model: this.formParams
        };
      },
      formEvents() {
        return {
          search: this.onSearch,
          reset: this.onReset
        };
      },
      tableProps() {
        return {
          loading: this.loading,
          border: true,
          size: 'mini',
          'row-key': rowKey,
          data: this.tableData
        };
      },
      paginationProps() {
        return {
          total: this.total,
          pageSize: this.pageParams.limit,
          currentPage: this.pageParams.page
        };
      },
      paginationEvents() {
        return {
          currentChange: this.onCurrentChange,
          sizeChange: this.onSizeChange
        };
      }
    },
    created() {
      this.fetchData();
    },
    render() {
      return (
        <Wrapped
          formProps={this.formProps}
          tableProps={this.tableProps}
          paginationProps={this.paginationProps}
          formEvents={this.formEvents}
          paginationEvents={this.paginationEvents}
        />
      );
    }
  };
};
export default withQuery;
