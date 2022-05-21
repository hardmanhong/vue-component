export default {
	props: {
		model: {
			type: Object,
			default: () => ({})
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		onSearch() {
			this.$refs.searchForm.validate(() => {
				this.$emit('search', this.model)
			})
		},
		onReset() {
			this.$refs.searchForm.resetFields()
			this.$emit('reset', {})
		}
	},
	render() {
		return (
			<div class='flex-between wrap'>
				<el-form
					ref='searchForm'
					{...{
						props: {
							inline: true,
							model: this.model
						}
					}}>
					{this.list.map(item => (
						<el-form-item key={item.prop} {...{ props: item.props }}>
							{item.component(item.props.prop)}
						</el-form-item>
					))}
					<el-form-item>
						<el-button
							icon='el-icon-search'
							type='primary'
							onClick={this.onSearch}>
							搜索
						</el-button>
						<el-button icon='el-icon-refresh' onClick={this.onReset}>
							重置
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		)
	}
}
