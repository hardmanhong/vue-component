export default {
	props: {
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		},
		total: {
			type: Number,
			default: 0
		},
		currentPage: {
			type: Number,
			default: 1
		},
		pageSize: {
			type: Number,
			default: 20
		},
		pageSizes: {
			type: Array,
			default: () => [10, 20, 30, 40]
		}
	},
	methods: {
		onCurrentChange(page) {
			this.$emit('currentChange', page)
		},
		onSizeChange(size) {
			this.$emit('sizeChange', size)
		}
	},
	render() {
		return (
			<el-pagination
				layout={this.layout}
				total={this.total}
				pageSize={this.pageSize}
				pageSizes={this.pageSizes}
				on-current-change={this.onCurrentChange}
				on-size-change={this.onSizeChange}
			/>
		)
	}
}
