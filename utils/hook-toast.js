function showToast(title='数据加载成功！',icon='success',duration=1500){
	return uni.showToast({
		title,
		icon,
		duration

	})
}

export  {
	showToast
}