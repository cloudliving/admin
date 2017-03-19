fis.set('project.ignore', [
		'.git/**',
		'node_modules/**',
		'output/**',
		'README.md',
		'.gitignore',
		'package.json',
		'fis-conf.js'
	])

fis
	.match('*.pug', {
		parser: 'pug',
		rExt: 'html'
	})
	.match('*.styl', {
		parser: 'stylus',
		rExt: 'css'
	})

fis
	.media('prod')
	.match('src/view/(**/*.pug)', {
		release: '/html/$1'
	})
	// 给资源加上统一路径
	// .match('!*.pug', {
		// domain: 'publicPath/'
	// })
	.match('src/stylus/(*.styl)', {
		release: '/css/$1',
		optimizer: fis.plugin('clean-css'),
		preprocessor: fis.plugin('autoprefixer', {
			"browsers": ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"],
			"cascade": true
		})
	})
	.match('src/js/(*.js)', {
		release: '/js/$1',
		parser: fis.plugin('babel-5.x'),
		optimizer: fis.plugin('uglify-js')
	})
	.match('src/images/(*.png)', {
		release: '/images/$1',
		optimizer: fis.plugin('png-compressor')
	})
	.match('src/lib/(**)', {
		release: '/lib/$1'
	})