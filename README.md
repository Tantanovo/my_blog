# 我的博客

一个现代化的个人博客网站，支持浏览量统计、点赞和评论功能。

## 功能特性

- **三大面板**：个人简介、技术博客、日常生活分享
- **浏览量统计**：每篇文章自动记录访问次数
- **点赞功能**：访客可点赞/取消点赞（每浏览器唯一）
- **评论系统**：支持匿名评论
- **Markdown 渲染**：文章支持 Markdown 格式
- **响应式设计**：适配手机、平板和桌面

## 技术栈

- [Next.js 15](https://nextjs.org/) — React 全栈框架
- [Tailwind CSS](https://tailwindcss.com/) — 样式
- [Prisma](https://www.prisma.io/) + SQLite — 数据库
- [React Markdown](https://github.com/remarkjs/react-markdown) — Markdown 渲染

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

```bash
npm run db:push
npm run db:seed
```

### 3. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 即可访问。

> 局域网内其他设备可通过 `http://你的电脑IP:3000` 访问（如 `http://192.168.1.207:3000`）。

## 常见问题

### 网络安装失败

如果 `npm install` 超时，项目已配置国内镜像（`.npmrc`），也可手动指定：

```bash
npm install --registry=https://registry.npmmirror.com
```

### Windows 启动报错 EXDEV

若出现 `cross-device link not permitted`，项目已在启动脚本中禁用 Next.js 遥测。如仍有问题，可手动执行：

```powershell
$env:NEXT_TELEMETRY_DISABLED="1"
npm run dev
```

## 部署到公网

要让任何人通过网址访问，推荐以下方式：

### 方式一：Vercel（推荐，免费）

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 添加环境变量 `DATABASE_URL`（需使用 [Turso](https://turso.tech) 等云 SQLite 服务）
4. 部署完成后获得 `https://你的域名.vercel.app` 公网地址

### 方式二：Railway / Render

这些平台支持持久化存储，可直接使用 SQLite：

1. 注册 [Railway](https://railway.app) 或 [Render](https://render.com)
2. 连接 GitHub 仓库
3. 设置启动命令：`npm run build && npm run db:push && npm run db:seed && npm start`
4. 获得公网 URL

### 方式三：自有服务器

```bash
npm run build
npm run db:push
npm run db:seed
npm start
```

使用 Nginx 反向代理到 3000 端口，并配置域名即可。

## 自定义内容

- **个人简介**：修改 `prisma/seed.ts` 中的 Profile 数据，或直接在数据库中编辑
- **文章**：修改 seed 文件添加文章，或通过 Prisma Studio 管理：`npx prisma studio`
- **样式**：编辑 `tailwind.config.ts` 中的 `brand` 颜色主题

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页（三大面板入口）
│   ├── profile/          # 个人简介
│   ├── tech/             # 技术博客
│   ├── life/             # 生活分享
│   └── api/              # API 接口
├── components/           # UI 组件
└── lib/                  # 工具函数
```
