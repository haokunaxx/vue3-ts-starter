# 路由文档

# 路由配置参数

- 显示相关

  - title 显示标题
  - icon 图标
  - activeIcon 激活的图标
  - badge 标记

- 配置相关

  - defaultOpened 默认打开
  - permanent 是否在 tab 栏常驻
  - auth 权限清单，满足一个即可访问该路由

  - sidebar 是否在侧边栏菜单中显示
  - activeMenu 当匹配到当前路由时激活的侧边栏菜单项

  - whiteList 白名单，可以跳过登录直接访问的页面

  - cache 缓存（暂不考虑）
  - noCache 不缓存（暂不考虑）

- 功能相关

  - link 新窗口打开一个超链接
  - iframe iframe

# 路由分类

## 固定路由

- 登录路由
  - 顶级路由
  - 路由名称`/login`
- 重定向路由
  - 顶级路由
  - 路由名称`/redirect?to=somePath`
- 404 路由
  - 顶级路由
  - 路由名称`*`

## 系统路由

- /
  - 顶级路由
  - redirect to home
- home 主页路由
  - 一级路由
  - 路由名称`home`
- 个人设置
  - 一级路由
  - 路由名称`personal-settings`
- 一个增删改查模块路由

## 权限路由

- demo 路由
- 列表
  - 懒加载列表
  - 虚拟列表
