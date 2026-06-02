import { PrismaClient, PostCategory } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.likeRecord.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      id: 1,
      name: "杨子业",
      title: "C++ / iOS 开发工程师 · 西安财经大学",
      bio: "19 岁，西安财经大学软件工程专业在读。具备较强的自驱力与学习能力，擅长将日常学习记录沉淀为博客。曾在上海穹彻智能科技担任 iOS 客户端研发实习生，从零上手 Swift/SwiftUI 并完成核心功能开发与性能优化。CSDN 原创博主，累计 200+ 篇技术文章、25W+ 浏览量。",
      avatar: "👨‍💻",
      email: "1348215719@qq.com",
      phone: "15502639510",
      github: "https://github.com/Tantanovo",
      csBlog: "https://blog.csdn.net/2501_92707800",
      education: "西安财经大学 · 软件工程 · 本科（2024-09 ~ 至今）",
      highlights: JSON.stringify([
        "CSDN 博主，原创 200+ 博客，累计 25W+ 浏览量",
        "上海穹彻智能科技 · iOS 客户端研发实习生（2026-03 ~ 2026-06）",
        "重构上传模块，将数据采纳率从 60% 提升至 90%",
        "主修：C/C++、数据结构算法、计算机网络、Linux、数据库、Qt",
        "研读书籍：《计算机网络自顶向下方法》《大话数据结构》《Linux 高性能服务器编程》",
      ]),
      skills: JSON.stringify([
        "C/C++",
        "Swift",
        "SwiftUI",
        "iOS 开发",
        "数据结构与算法",
        "Linux 系统编程",
        "网络编程",
        "MySQL",
        "Redis",
        "Git",
        "MVVM",
        "多线程",
      ]),
    },
  });

  const techPosts = [
    {
      title: "iOS 实习复盘：从零学习 Swift 到功能上线",
      slug: "ios-internship-swift-learning",
      excerpt:
        "在上海穹彻智能科技的 iOS 实习经历——零基础入门 Swift/SwiftUI，参与多模式录制 App 核心功能开发与上线。",
      content: `## 背景

2026 年 3 月，我加入上海穹彻智能科技，担任 iOS 客户端研发实习生。实习前完全没有 iOS 开发经验，需要在短时间内完成 Swift 语言、SwiftUI 框架和 MVVM 架构的学习，并参与真实项目的开发与上线。

## 负责的工作

- 负责一款支持**多模式录制、跨平台数据存储**的 App 核心功能开发
- 定位并修复闪退、数据上传失败等高频 Bug
- 参与 UI 体验优化与新需求迭代，保障功能稳定上线
- 完成每日需求汇报，熟悉敏捷开发流程

## 技术学习路径

### Swift 基础与并发

系统学习了 Swift 基本语法，以及现代并发编程：

- \`async/await\` 异步编程
- \`Task\` 任务管理
- \`Actor\` 线程安全
- \`Combine\` 响应式编程

### SwiftUI 与 MVVM

通过 SwiftUI 构建 UI 界面，并基于 MVVM 架构实现相关 Demo，理解数据绑定与视图分离的设计思想。

## 个人收获

在完全没有 iOS 基础的情况下，能够在短时间内完成从需求到上线的全流程开发；通过线上问题修复，显著提升了问题定位与工程优化能力，也熟悉了团队协作与敏捷开发规范。`,
      category: PostCategory.TECH,
      cover: "📱",
    },
    {
      title: "上传模块重构：数据采纳率从 60% 提升到 90%",
      slug: "upload-module-refactor",
      excerpt:
        "实习期间重构 App 上传模块，优化异步处理、错误重试与断点续传，大幅提升传输稳定性。",
      content: `## 问题背景

App 的数据上传模块存在稳定性问题，**数据采纳率仅为 60%**，用户频繁遇到上传失败、数据丢失等情况，严重影响产品体验。

## 问题分析

排查后发现几个核心问题：

1. **异步处理不完善** — 并发上传时缺乏合理的任务调度
2. **错误重试机制缺失** — 网络波动导致失败后直接放弃
3. **无断点续传** — 大文件上传中断后需从头开始

## 优化方案

### 1. 异步处理优化

重构上传队列，使用 \`async/await\` 管理上传任务的生命周期，避免回调地狱，提升代码可维护性。

### 2. 错误重试机制

实现指数退避重试策略：

\`\`\`swift
// 伪代码示意
func uploadWithRetry(data: Data, maxRetries: Int = 3) async throws {
    for attempt in 0..<maxRetries {
        do {
            try await performUpload(data)
            return
        } catch {
            let delay = pow(2.0, Double(attempt))
            try await Task.sleep(nanoseconds: UInt64(delay * 1_000_000_000))
        }
    }
    throw UploadError.maxRetriesExceeded
}
\`\`\`

### 3. 断点续传

记录已上传的字节偏移量，网络恢复后从断点处继续传输，避免重复上传。

## 效果

重构完成后，**数据采纳率从 60% 提升至 90%**，传输稳定性大幅提升，用户投诉明显减少。`,
      category: PostCategory.TECH,
      cover: "🚀",
    },
    {
      title: "C++ 线程池实现：从固定式到工作窃取",
      slug: "cpp-thread-pool-implementation",
      excerpt:
        "基于 C++11 实现的线程池组件，涵盖固定式、缓冲式、工作窃取式和计划式四种模型。",
      content: `## 项目介绍

这是一个基于 C++11 多线程实现的线程池模型组件，支持四种线程池模式：

- **固定式线程池** — 线程数量恒定
- **缓冲式线程池** — 动态扩缩容
- **工作窃取式线程池** — 空闲线程从忙碌线程队列窃取任务
- **计划式线程池** — 支持定时/周期性任务

## 技术栈

C++11 多线程、互斥锁、条件变量、智能指针、\`std::function\`、移动语义、完美转发

## 核心实现

### 1. 生产者/消费者模型

利用生产者/消费者模型实现同步队列（任务缓冲区），使用 STL 容器存储任务，互斥锁 + 条件变量实现线程同步。

### 2. 线程生命周期管理

\`\`\`cpp
// 使用 unordered_map 作为线程组
// 智能指针管理线程生命周期
// std::function 包装可调用对象
std::unordered_map<size_t, std::unique_ptr<std::thread>> workers;
\`\`\`

### 3. 工作窃取优化

利用 \`std::move\` 提高消费者性能，可设置线程数目下限（核心线程）和上限，使用工作窃取思想提高线程利用率。

### 4. 计划式线程池

设计定时器对象和定时器管理对象，使用 epoll 检测定时器任务是否触发，实现周期性任务执行。

## 总结

这个项目加深了我对并发编程的理解，从理论上的生产者/消费者模型到实际工程中的线程池设计，是一次很有价值的实践。`,
      category: PostCategory.TECH,
      cover: "⚙️",
    },
  ];

  const lifePosts = [
    {
      title: "CSDN 写博客 200+ 篇：我的技术输出心得",
      slug: "csdn-blogging-journey",
      excerpt:
        "从 0 到 200+ 篇原创博客、25W+ 浏览量，分享我坚持技术写作的方法与收获。",
      content: `## 为什么开始写博客

大一开始学编程后，我发现很多知识点当时理解了，过几周就忘了。于是开始在 CSDN 上记录学习笔记，没想到一写就是 200 多篇。

## 写作习惯

- **学完即写** — 每学完一个知识点，当天就整理成一篇博客
- **问题导向** — 不只记结论，更记录「为什么」和「踩过的坑」
- **系列化** — 同类主题写成系列，方便日后查阅

## 数据与反馈

截至目前：

- 原创文章 **200+ 篇**
- 累计浏览量 **25W+**
- 涵盖 C/C++、数据结构、Linux、网络编程等方向

## 收获

写博客最大的收益不是浏览量，而是**倒逼自己把知识讲清楚**。如果你发现自己讲不明白，说明还没真正理解。

正如我在自我评价里说的：擅于日常学习的记录和总结，这已经成为我最重要的学习习惯之一。`,
      category: PostCategory.LIFE,
      cover: "✍️",
    },
    {
      title: "读《计算机网络自顶向下方法》笔记",
      slug: "book-notes-computer-networks",
      excerpt:
        "作为软件工程专业的学生，这本经典教材帮我建立了完整的网络知识体系。",
      content: `## 为什么读这本书

计算机网络是大一的核心课程之一，老师推荐了《计算机网络：自顶向下方法》这本经典教材。配合课程学习，我系统地梳理了网络协议栈的各层原理。

## 核心收获

### 应用层

理解了 HTTP/HTTPS 协议的工作流程，DNS 解析过程，以及 Web 应用中客户端-服务器模型的本质。

### 传输层

深入学习了 TCP 的三次握手、四次挥手、可靠传输机制，以及 UDP 的适用场景。

### 网络层与链路层

了解了 IP 寻址、路由选择、NAT 等概念，对「数据包从浏览器到服务器」的完整旅程有了清晰认识。

## 与项目的联系

读完这本书后，我在**在线预约系统**项目中实践了 Socket 编程和 TCP 通信，理论结合实践，理解更加深刻。

## 推荐

如果你正在学计算机网络，强烈推荐这本「自顶向下」的写法——从应用层开始，比传统自底向上更容易建立全局观。`,
      category: PostCategory.LIFE,
      cover: "📚",
    },
    {
      title: "大一上学期：从高中到大学的编程之路",
      slug: "freshman-programming-journey",
      excerpt:
        "进入西安财经大学软件工程专业后的第一个学期，记录我的学习与成长。",
      content: `## 新的起点

2024 年 9 月，我进入西安财经大学软件工程专业。从高中的纯理论学习，到大学真正动手写代码，这是一个巨大的转变。

## 第一个学期的课表

- C/C++ 程序设计
- 数据结构算法
- 计算机组成原理
- 计算机网络
- Linux 操作系统
- 数据库原理及应用

每一门课都不轻松，但也每一门都很有趣。

## 课外探索

除了课堂，我还：

- 在 CSDN 上持续输出学习笔记
- 完成了**在线预约系统**和**C++ 线程池**两个项目
- 阅读《大话数据结构》《Linux 高性能服务器编程》等书籍
- 2026 年 3 月进入上海穹彻智能科技实习，开启 iOS 开发之路

## 一点感悟

19 岁的我，深知自己还有很多不足。但保持好奇心、坚持输出、敢于接受挑战——这些习惯会让我走得更远。

大学才刚开始，路还很长，但每一步都走得很踏实。`,
      category: PostCategory.LIFE,
      cover: "🎓",
    },
  ];

  for (const post of [...techPosts, ...lifePosts]) {
    await prisma.post.create({ data: post });
  }

  console.log("✅ 种子数据已写入");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
