<script setup lang="ts">
// const appConfig = useAppConfig()
const colorMode = useColorMode()

// 监听颜色模式变化
watch(colorMode, () => {
	const commentsEl = document.getElementById('Comments')
	if (commentsEl) {
		if (colorMode.value === 'dark') {
			commentsEl.classList.add('atk-dark-mode')
		}
		else {
			commentsEl.classList.remove('atk-dark-mode')
		}
	}
})

onMounted(() => {
	// window.twikoo?.init({
	// 	envId: appConfig.twikoo?.envId,
	// 	// twikoo 会把挂载后的元素变为 #twikoo
	// 	el: '#twikoo',
	// })

	// if (window.Artalk) {
	window.Artalk?.init({
		el: '#Comments',
		pageTitle: '',
		server: 'http://47.107.141.90:23366/',
		site: '鹊楠の小窝',
	})
	// }

	// 页面加载时读取存储的颜色模式状态，为 Artalk 添加暗色模式类
	const commentsEl = document.getElementById('Comments')
	if (commentsEl) {
		if (colorMode.value === 'dark') {
			setTimeout(() => {
				commentsEl.classList.add('atk-dark-mode')
			}, 300)
		}
		else {
			commentsEl.classList.remove('atk-dark-mode')
		}
	}
})
</script>

<template>
<section class="z-comment">
	<h3 id="text-creative" class="text-creative">
		评论区
	</h3>

	<br>

	<!-- <div id="twikoo">
		<p>评论加载中...</p>
	</div> -->

	<div id="Comments" />
</section>
</template>

<style lang="scss" scoped>
.z-comment {
	margin: 3rem 1rem;

	> h3 {
		margin-top: 3rem;
		font-size: 1.25rem;
	}
}

:deep(#twikoo) {
	margin: 2em 0;

	.tk-admin-container {
		position: fixed;
		z-index: 1;
	}

	.tk-input {
		font-family: var(--font-monospace);
	}

	.tk-time {
		color: var(--c-text-3);
	}

	.tk-main {
		margin-top: -0.1rem;
	}

	.tk-content {
		margin-top: 0.1rem;
	}

	.tk-comments-title, .tk-nick > strong {
		font-family: var(--font-creative);
	}

	.tk-owo-emotion {
		width: auto;
		height: 1.4em;
		vertical-align: text-bottom;
	}

	.tk-extras, .tk-footer {
		font-size: 0.7rem;
		color: var(--c-text-3);
	}

	.tk-replies:not(.tk-replies-expand) {
		mask-image: linear-gradient(#FFF 50%, transparent);
	}

	.tk-expand {
		border-radius: 0.5rem;
		transition: background-color 0.1s;
	}
}

:deep(:where(.tk-preview-container,.tk-content)) {
	pre {
		border-radius: 0.5rem;
		font-size: 0.8125rem;
	}

	p {
		margin: 0.2em 0;
	}

	img {
		border-radius: 0.5em;
	}

	menu, ol, ul {
		margin: 0.5em 0;
		padding-inline-start: 1.5em;
		font-size: 0.9rem;
		list-style: revert;

		> li {
			margin: 0.2em 0;

			&::marker {
				color: var(--c-primary);
			}
		}
	}

	blockquote {
		margin: 0.5em 0;
		padding: 0.2em 0.5em;
		border-inline-start: 4px solid var(--c-border);
		border-radius: 4px;
		background-color: var(--c-bg-2);
		font-size: 0.9rem;
	}
}
</style>
