export default {
	name: 'z-table',
	props: {
		data: {
			type: Array,
			default: () => []
		},
		isSort: {
			type: Boolean,
			default: true
		},
		columns: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			sort: {
				label: '序号',
				width: 100,
				prop: '_frontSort',
				fixed: true,
				sortable: true
			}
		}
	},
	computed: {
		maxHeight() {
			return this.$store.state.appMainHeight - 174 || null
		}
	},
	render() {
		const tableProps = {
			...this.$attrs,
			data: this.data,
			maxHeight: this.maxHeight
		}
		const colProps = {
			'show-overflow-tooltip': true,
			align: 'center'
		}
		const columns = this.isSort ? [this.sort, ...this.columns] : this.columns
		const directives = [{ name: 'loading', value: this.$attrs.loading }]
		return (
			<el-table {...{ props: tableProps }} {...{ directives }}>
				{columns.map(item => (
					<el-table-column
						key={item.prop}
						{...{ props: { ...colProps, ...item } }}
					/>
				))}
			</el-table>
		)
	}
}
