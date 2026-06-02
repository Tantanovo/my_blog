# 公网部署指南（Railway + GitHub）

本指南带你把博客部署到公网，完成后任何人都可以通过 `https://xxx.up.railway.app` 访问。

> 预计耗时：15–30 分钟  
> 费用：Railway 新用户有 $5 免费额度，个人博客足够用

---

## 整体流程

```
本地代码 → GitHub 仓库 → Railway 部署 → 获得公网网址
```

---

## 第一步：确认本地项目正常

在项目目录打开终端，执行：

```powershell
cd c:\Users\LENOVO\Documents\Mytest1
npm install
npm run dev
```

浏览器打开 http://localhost:3000 确认能正常访问，然后 `Ctrl+C` 停止。

---

## 第二步：注册 GitHub 账号

1. 打开 https://github.com/signup
2. 按提示注册账号（建议记住用户名，后面会用到）
3. 登录后进入首页

---

## 第三步：在 GitHub 创建仓库

1. 点击右上角 **+** → **New repository**
2. 填写：
   - **Repository name**：`my-blog`（或任意名称）
   - **Public**：选 Public（公开）
   - **不要**勾选 "Add a README file"
3. 点击 **Create repository**
4. 创建完成后，记下仓库地址，形如：
   ```
   https://github.com/你的用户名/my-blog.git
   ```

---

## 第四步：把代码推送到 GitHub

在项目目录执行（把 `你的用户名` 换成你的 GitHub 用户名）：

```powershell
cd c:\Users\LENOVO\Documents\Mytest1

git init
git add .
git commit -m "准备公网部署"
git branch -M main
git remote add origin https://github.com/你的用户名/my-blog.git
git push -u origin main
```

> 第一次 push 会弹出 GitHub 登录窗口，按提示授权即可。  
> 若提示需要 Personal Access Token，见下方「常见问题」。

---

## 第五步：注册 Railway

1. 打开 https://railway.app
2. 点击 **Login**，选择 **Login with GitHub** 授权
3. 登录后进入 Dashboard

---

## 第六步：在 Railway 创建项目

1. 点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 首次使用需点击 **Configure GitHub App**，授权 Railway 访问你的仓库
4. 在列表中选择刚创建的 `my-blog` 仓库
5. Railway 会自动开始构建（使用项目里的 Dockerfile）

---

## 第七步：添加持久化存储（重要！）

SQLite 数据库需要持久化磁盘，否则重启后数据会丢失：

1. 在 Railway 项目中，点击你的服务（Service）
2. 点击 **Settings** 标签
3. 找到 **Volumes**，点击 **Add Volume**
4. 设置：
   - **Mount Path**：`/data`
   - **Size**：1 GB（默认即可）
5. 点击 **Add**

---

## 第八步：配置环境变量

1. 点击 **Variables** 标签
2. 添加变量：

| 变量名 | 值 |
|--------|-----|
| `DATABASE_URL` | `file:/data/prod.db` |
| `NEXT_TELEMETRY_DISABLED` | `1` |

3. 保存后 Railway 会自动重新部署

---

## 第九步：生成公网域名

1. 点击 **Settings** 标签
2. 找到 **Networking** → **Public Networking**
3. 点击 **Generate Domain**
4. Railway 会分配一个域名，例如：
   ```
   https://my-blog-production-xxxx.up.railway.app
   ```

这就是你的公网博客地址！复制到浏览器打开即可。

---

## 第十步：验证部署

访问你的公网地址，检查：

- [ ] 首页显示「杨子业的博客」
- [ ] 个人简介页信息正确
- [ ] 技术博客 / 生活分享文章能打开
- [ ] 点赞、评论功能正常
- [ ] 刷新页面后浏览量增加

---

## 后续更新网站

修改本地代码后，重新推送即可自动部署：

```powershell
git add .
git commit -m "更新内容"
git push
```

Railway 检测到 GitHub 有新提交后会自动重新构建部署。

---

## 常见问题

### Q：git push 要求输入密码/token？

GitHub 已不支持密码推送，需要 Personal Access Token：

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token，勾选 `repo` 权限
3. push 时用户名填 GitHub 用户名，密码填 token

### Q：Railway 构建失败？

1. 在 Railway 点击 **Deployments** → 最新部署 → **View Logs**
2. 常见原因：网络超时 → 重试 Deploy；Volume 未挂载 → 检查第七步

### Q：网站打开是 502 / Application Error？

1. 确认 Volume 已挂载到 `/data`
2. 确认 `DATABASE_URL=file:/data/prod.db` 已设置
3. 查看 Deploy Logs 是否有报错

### Q：想绑定自己的域名？

1. Railway Settings → Networking → Custom Domain
2. 添加你的域名（如 `blog.example.com`）
3. 在域名 DNS 处添加 Railway 提供的 CNAME 记录

### Q：免费额度用完了？

- Railway 按用量计费，个人博客流量很小
- 也可换用 [Render](https://render.com)（免费层有休眠）或自有 VPS

---

## 备选方案

| 平台 | 优点 | 缺点 |
|------|------|------|
| **Railway**（本指南） | 支持 SQLite 持久化，操作简单 | 免费额度有限 |
| **Render** | 有免费层 | 免费层会休眠，需 Docker |
| **Vercel** | Next.js 原生支持 | 需改用 Turso 云数据库 |
| **自有 VPS** | 完全控制 | 需自己运维 |

如需改用其他平台，告诉我即可。
