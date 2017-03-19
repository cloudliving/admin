/**
 * 侧栏伸缩效果
 */

!(function(){
	var head = $('.layout-head')
	var main = $('.layout-main')
	var side = $('.layout-side')
	var btn = $('.side-area-toggle')
	var loading = $('.loading')
	var isMin = localStorage.getItem('isMin') || 'false'

	// 初始化
	isMin === 'true' ? close() : open()
	loading.fadeOut()

	// 伸缩添加过渡效果
	// setTimeout(function () {
	// 	head.addClass('transition')
	// 	main.addClass('transition')
	// 	side.addClass('transition')
	// }, 500)

	btn.on('click', function(){
		if (isMin === 'true') {
			open()
			localStorage.setItem('isMin', 'false')
			isMin = 'false'
		} else {
			close()
			localStorage.setItem('isMin', 'true')
			isMin = 'true'
		}
	})

	function open () {
		head.removeClass('z-close')
		main.removeClass('z-close')
		side.removeClass('z-close')
	}

	function close () {
		head.addClass('z-close')
		main.addClass('z-close')
		side.addClass('z-close')
	}
})()

/**
 * 弹出框
 *
 * 调用说明
 * D.alert(params) or D.confirm(params)
 *
 * 参数说明
 * params[Object]				配置对象
 * params.title[String]			弹出框标题
 * params.ctn[String]			弹出框正文
 * params.callback[Function]	点击确认后的回调函数
 */
var D = {}
!(function(){
	var template = {
		alert: `
			<div class="pop-up">
			  <div class="pop-up-head"><span class="pop-up-title">{{title}}</span><span class="pop-up-close glyphicon glyphicon-remove"></span></div>
			  <div class="pop-up-body">
			    <div class="pop-up-ctn">{{ctn}}</div>
			    <div class="pop-up-btns text-right"><button class="pop-up-btn-1 btn btn-success">确定</button></div>
			  </div>
			</div>`,
		confirm: `
			<div class="pop-up">
			  <div class="pop-up-head"><span class="pop-up-title">{{title}}</span><span class="pop-up-close glyphicon glyphicon-remove"></span></div>
			  <div class="pop-up-body">
			    <div class="pop-up-ctn">{{ctn}}</div>
			    <div class="pop-up-btns text-right"><button class="pop-up-btn-1 btn btn-success mr10">确定</button><button class="pop-up-btn-2 btn btn-default">取消</button></div>
			  </div>
			</div>`
	}

	D.alert = function (params) {
		verifyParams(params)
		insetDom(template.alert, params)
		addEvent(params)
	}

	D.confirm = function (params) {
		verifyParams(params)
		insetDom(template.confirm, params)
		addEvent(params)
	}

	function verifyParams (params) {
		if (Object.prototype.toString.call(params) !== '[object Object]') throw 'argument muse be Object'
	}

	function insetDom (str, data) {
		$('body').prepend(render(str, data))
	}

	function addEvent (params) {
		var btn1 = $('.pop-up-btn-1')
		var btn2 = $('.pop-up-btn-2')
		var close = $('.pop-up-close')
		var wrap = $('.pop-up')

		btn1.on('click', () => {
			wrap.remove()
			params.callback && params.callback()
		})
		btn2.on('click', () => wrap.remove())
		close.on('click', () => wrap.remove())
	}

	function render (str, data) {
		data.title = data.title || '温馨提示'
		data.ctn = data.ctn || '温馨提示'
		str =  str.replace(/{{(\w+)}}/g, (match, $1) => {
			return data[$1]
		})
		return str
	}
})()