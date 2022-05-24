const paginationParams = {
	page: 1,
	limit: 20
}
export default {
	data() {
		return {
			loading: false,
			total: 0,
			tableData: [],
			pageParams: this.$options.isPagination
				? {
						...paginationParams
				  }
				: {},
			formParams: {}
		}
	},
	methods: {
		fetchData() {
			this.loading = true
			this.$options
				.api({
					...this.pageParams,
					...this.formParams
				})
				.then(res => {
					if (res.code === '0') {
						this.tableData = res.data.map((item, index) => ({
							...item,
							_frontSort:
								index + 1 + this.pageParams.limit * (this.pageParams.page - 1)
						}))
						if (this.$options.isPagination && res.pageInfo) {
							this.total = res.pageInfo.sumRow
							this.pageParams.page = res.pageInfo.page
						}
					}
				})
				.finally(() => {
					this.loading = false
				})
		},
		onCurrentChange(page) {
			if (this.$options.isPagination) this.pageParams.page = page
			this.fetchData()
		},
		onSizeChange(size) {
			if (this.$options.isPagination) this.pageParams.limit = size
			this.fetchData()
		},
		onSearch(values) {
			console.log('onSearch', values)
			if (this.$options.isPagination)
				this.pageParams.page = paginationParams.page
			this.formParams = values
			this.fetchData()
		},
		onReset(values) {
			console.log('onReset', values)
			if (this.$options.isPagination) {
				this.pageParams.page = paginationParams.page
				this.pageParams.limit = paginationParams.limit
			}
			this.formParams = values
			this.fetchData()
		}
	},
	computed: {
		formProps() {
			console.log('formProps', this.formList)
			return {
				list: this.formList,
				model: this.formParams
			}
		},
		formEvents() {
			return {
				search: this.onSearch,
				reset: this.onReset
			}
		},
		tableProps() {
			return {
				loading: this.loading,
				border: true,
				size: 'mini',
				'row-key': this.$options.rowKey,
				data: this.tableData,
				columns: this.columns
			}
		},
		paginationProps() {
			return {
				total: this.total,
				pageSize: this.pageParams.limit,
				currentPage: this.pageParams.page
			}
		},
		paginationEvents() {
			return {
				currentChange: this.onCurrentChange,
				sizeChange: this.onSizeChange
			}
		}
	},
	created() {
		this.fetchData()
	}
}
