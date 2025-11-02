import type { FeedEntry } from './app/types/feed'

export { zhCN as dateLocale } from 'date-fns/locale/zh-CN'

const basicConfig = {
	title: '鹊楠の小窝',
	subtitle: '世界那么大，我想去看看',
	// 长 description 利好于 SEO
	description: '鹊楠的个人博客，“彼方尚有荣光在，世界不止眼前的苟且，还有诗和远方！🫡”，鹊楠是一个啥都只会点皮毛的编程爱好者，这个博客用于分享一些自己的学习笔记和技术分享，涵盖了学习、编程、软件分享、杂谈等领域。',
	author: {
		name: '鹊楠',
		avatar: 'https://i.p-i.vip/43/20240913-66e403f2331ec.webp',
		email: 'qn2987271942@outlook.com',
		homepage: 'https://www.quenan.cn/',
	},
	copyright: {
		abbr: 'CC BY-NC-SA 4.0',
		name: '署名-非商业性使用-相同方式共享 4.0 国际',
		url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
	},
	favicon: 'https://pic1.imgdb.cn/item/6900c4b13203f7be00ac9ded.png',
	language: 'zh-CN',
	timeEstablished: '2024-01-26',
	timezone: 'Asia/Shanghai',
	url: 'https://blog.quenan.cn/',
	defaultCategory: '未分类',
}

// 存储 nuxt.config 和 app.config 共用的配置
// 此处为启动时需要的配置，启动后可变配置位于 app/app.config.ts
// @keep-sorted
const blogConfig = {
	...basicConfig,

	article: {
		categories: {
			[basicConfig.defaultCategory]: { icon: 'ph:folder-dotted-bold' },
			经验分享: { icon: 'ph:mouse-bold', color: '#3af' },
			杂谈: { icon: 'ph:chat-bold', color: '#3ba' },
			生活: { icon: 'ph:shooting-star-bold', color: '#f77' },
			代码: { icon: 'ph:code-bold', color: '#77f' },
			项目: { icon: 'ph:projector-screen-bold', color: '#f7f' },
		},
		defaultCategoryIcon: 'ph:folder-bold',
		/** 分类排序方式，键为排序字段，值为显示名称 */
		order: {
			date: '创建日期',
			updated: '更新日期',
			// title: '标题',
		},
		/** 使用 pnpm new 新建文章时自动生成自定义链接（permalink/abbrlink） */
		useRandomPremalink: false,
		/** 隐藏基于文件路由（不是自定义链接）的 URL /post 路径前缀 */
		hidePostPrefix: true,
		/** 禁止搜索引擎收录的路径 */
		robotsNotIndex: ['/preview', '/previews/*'],
	},

	/** 博客 Atom 订阅源 */
	feed: {
		/** 订阅源最大文章数量 */
		limit: 50,
		/** 订阅源是否启用XSLT样式 */
		enableStyle: true,
	},

	/** 向 <head> 中添加脚本 */
	scripts: [
		// Twikoo 评论系统
		{ src: 'https://lib.baomitu.com/twikoo/1.6.44/twikoo.min.js', defer: true },
		// Microsoft Clarity 用户行为分析系统
		// 使用前请先到 https://clarity.microsoft.com/ 创建项目并获取项目ID
		// 然后取消下面一行的注释并替换 YOUR_CLARITY_PROJECT_ID 为实际的项目ID
		// { src: 'https://www.clarity.ms/tag/trmlqvobd9', defer: true },
		// { src: 'https://quenan-atk.qyliu.top/dist/Artalk.js', defer: true },
	],

	/** 自己部署的 Twikoo 服务 */
	// twikoo: {
	// 	envId: 'https://twi.quenan.cn/',
	// 	preload: 'https://twi.quenan.cn/',
	// },
}

/** 用于生成 OPML 和友链页面配置 */
export const myFeed: FeedEntry = {
	author: blogConfig.author.name,
	sitenick: 'の小窝',
	title: blogConfig.title,
	desc: blogConfig.subtitle || blogConfig.description,
	link: blogConfig.url,
	feed: new URL('/atom.xml', blogConfig.url).toString(),
	icon: blogConfig.favicon,
	avatar: blogConfig.author.avatar,
	archs: ['Nuxt', 'Vercel'],
	date: blogConfig.timeEstablished,
	comment: '这是我自己',
}

export default blogConfig
