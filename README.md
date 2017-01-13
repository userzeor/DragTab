1.引入对应的css，js；
html遵守下面结构
<div class="dragTab">
	<div class="dragTab_header">
		<div class="dragTab_header_scroll">
			<a href="#topLine" class="header_title title_active">头条</a>
			<a href="#focusNews" class="header_title">要闻</a>
			<a href="#entertainment" class="header_title">娱乐</a>
		</div>
	</div>
	<div class="dragTab_iscroll"></div>
	<div class="dragTab_content">
		<div class="dragTab_wrapGroup">
			<div class="dragTab_wrap">
				<div class="divmap_content">头条</div>
				<div class="divmap_content">头条</div>
			</div>
			<div class="dragTab_wrap">
				<div class="divmap_content">要闻</div>
			</div>
			<div class="dragTab_wrap">
				<div class="divmap_content">娱乐</div>
				<div class="divmap_content">娱乐</div>
			</div>
		</div>
	</div>
</div>
当头部超过五个选项时自动实现左右滑，五个以下自适应