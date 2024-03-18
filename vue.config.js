module.exports = {
	runtimeCompiler: true,
	devServer: {
		port: 8081,
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'Muse Vue Ant Design - by Creative Tim'
				return args
			})
	}
}
