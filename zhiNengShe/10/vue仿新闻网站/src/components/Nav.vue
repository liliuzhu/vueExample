<template>
	<div class="nav">
		<ul>
			<!--<li class="active"><a href="#">首页</a></li>-->
			<!--<li><a href="#">关注</a></li>-->
			<!--<li><a href="#">栏目</a></li>-->
			<router-link to="/home" tag="li" active-class="active">
				<a href="javascript:">首页</a>
			</router-link>
			<router-link to="/follow" tag="li" active-class="active">
				<a href="javascript:">关注</a>
			</router-link>
			<router-link to="/column" tag="li" active-class="active">
				<a href="javascript:">栏目</a>
			</router-link>
		</ul>
	</div>
</template>
<script>
	export default{
		//name:'nav'
	}
</script>