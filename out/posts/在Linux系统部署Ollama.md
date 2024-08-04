---
title: Linux快速部署大语言模型LLaMa3，Web可视化j交互（Ollama+Open Web UI）
date: 2024-04-26
tags: [大语言模型, llama]
categories: [自然语言处理]

---



# 介绍

本文将介绍使用开源工具Ollama(60.6k⭐)部署LLaMa大模型，以及使用Open WebUI搭建前端Web交互界面的方法。

我们先来过一遍几个相关的概念，对这块比较熟悉的朋友可跳过。

## 大规模语言模型

大规模语言模型（Large Language Models, LLMs），顾名思义是指在大量语料数据的基础上训练成的模型，能够模拟人类的语言风格生成较为生动的文本。这类模型的主要特征有：

* 规模大：训练所使用的数据量非常庞大，有时超过1000亿个参数。
* 复杂性高：模型结构比较复杂
* 具有较好的上下文理解能力：大规模语言模型可以理解文本的上下文和细微差别

## LLaMa

LLaMA是一种大规模语言模型，由Meta AI基于Transformer深度学习框架开发。该模型旨在生成各种风格的高质量文本（例如创意写作、对话甚至诗歌），能够胜任以下工作：

- 自然语言处理（NLP）：理解和生成自然语言。
- 机器学习：根据数据和算法学习新的信息和技能。
- 对话生成：可以与用户进行对话，并根据情况生成合适的回应。

## Ollama

> 官网：[Ollama](https://ollama.com/)
>
> API文档：[ollama/docs/api.md at main · ollama/ollama (github.com)](https://github.com/ollama/ollama/blob/main/docs/api.md)
>
> 支持的模型列表：[library](https://ollama.com/library)

一款可以快速部署大模型的工具。

## Open WebUI

> 官网：[Open WebUI](https://openwebui.com/)
>
> 相关介绍及源码：[open-webui/open-webui: User-friendly WebUI for LLMs (Formerly Ollama WebUI) (github.com)](https://github.com/open-webui/open-webui)

Open WebUI 是一个可视化的Web交互环境，它拥有清新简约的UI风格，具有可扩展、功能丰富、用户友好、自托管的特点，可以完全离线运行。它支持各种 LLM 运行程序，包括 Ollama 和 OpenAI 兼容的 API。



# 部署服务

本文介绍的方法使用于Linux系统，同样适用于Windows系统的WSL（安装方法可参见我的[这篇文章](https://blog.csdn.net/mustuo/article/details/133960230?)）。

## 部署Ollama

1、下载Ollama

Linux系统的安装命令如下：

```shell
curl -fsSL https://ollama.com/install.sh | sh
```

※此外[官方](https://ollama.com/download)还提供了macOS和Windows的下载方式。

2、下载llama3模型

```shell
ollama run llama3
```

※在[这里](https://ollama.com/blog/llama3)可以看到该命令的相关介绍。

上述命令将自动拉取模型，并进行sha256验签。处理完毕后自动进入llama3的运行环境，可以使用中文或英文进行提问，<kbd>ctrl</kbd>+<kbd>D</kbd>退出。

3、配置服务

为使外网环境能够访问到服务，需要对HOST进行配置。

打开配置文件：`vim /etc/systemd/system/ollama.service`，根据情况修改变量`Environment`：

* 服务器环境下：`Environment="OLLAMA_HOST=0.0.0.0:11434"`
* 虚拟机环境下：`Environment="OLLAMA_HOST=服务器内网IP地址:11434"`

3、启动服务

启动服务的命令：`ollama serve`

首次启动可能会出现以下两个提示：

> Couldn't find '/home/用户名/.ollama/id_ed25519'. Generating new private key.

该提示表示文件系统中不存在ssh私钥文件，此时命令将自动帮我们生成该文件，并在命令行中打印相应的公钥。

> Error: listen tcp 127.0.0.1:11434: bind: address already in use

看到该提示，大概率服务已在运行中，可以通过`netstat -tulpn | grep 11434`命令进行确认。

* 若命令输出的最后一列包含“ollama”字样，则表示服务已启动，无需做额外处理。
* 否则，可尝试执行下列命令重启ollama：

```shell
# ubuntu/debian
sudo apt update
sudo apt install lsof
stop ollama
lsof -i :11434
kill <PID>
ollama serve

# centos
sudo yum update
sudo yum install lsof
stop ollama
lsof -i :11434
kill <PID>
ollama serve
```

如果您使用的是MacOS，可在[🔗这里](https://github.com/ollama/ollama/issues/707)找到解决方法。

4、在外网环境验证连接

方法一：执行`curl http://ip:11434`命令，若返回“Ollama is running”，则表示连接正常。

方法二：在浏览器访问http://ip:11434，若页面显示文本“Ollama is running”，则表示连接正常。

## 常用命令

1、进入llama3运行环境：`ollama run llama3`

2、启动服务：`ollama serve`

3、重启ollama

```shell
systemctl daemon-reload
systemctl restart ollama
```

4、重启ollama服务

```shell
# ubuntu/debian
sudo apt update
sudo apt install lsof
stop ollama
lsof -i :11434
kill <PID>
ollama serve

# centos
sudo yum update
sudo yum install lsof
stop ollama
lsof -i :11434
kill <PID>
ollama serve
```

5、确认服务端口状态：`netstat -tulpn | grep 11434`

# 部署Open WebUI

1、下载Open WebUI

Open WebUI基于docker部署，docker的安装方法可以参考[这篇知乎文章](https://zhuanlan.zhihu.com/p/651148141)。

Open WebUI既可以部署在服务端，也可以部署在客户端：

```shell
# 若部署在客户端，执行：
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

# 若部署在服务端，执行：
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

如果您的机器在国内，建议将`--restart`的参数值替换为`ghcr.nju.edu.cn/open-webui/open-webui:main`，下载速度会快非常多（见up主小杨生存日记的[这篇文章](https://www.bilibili.com/read/cv32462618/)）。

2、检查相关配置

下载完之后，就可以在浏览器访问了，地址为`http://loacalhost:3000`（客户端部署）或`http://服务器ip:3000`。

页面加载完成后（这个过程可能需要一些时间），新注册一个账号并登录。

登录之后，点击页面顶端的齿轮⚙图标进入设置：

1. 侧边导航栏-General，将语言设置为中文
2. 侧边导航栏-连接，若“Ollama 基础 URL”这一项为`http://host.docker.internal:11434`，则表示ollama服务正常且连接成功；如果是空的，则需要回头检查一下ollama服务了
3. 侧边导航栏-模型，一般会自动拉取ollama服务上部署好的模型，可选模型参看[官方的这篇文档](https://ollama.com/library/llama3)
4. 其它的项目根据需要设置即可

3、选择模型

在顶端下拉框选择好模型，就可以开始提问啦！

<img src="img/image-20240426171143884.png" alt="image-20240426171143884"  />



# 参考文章

* [macOS + Ollama + Enchanted，本地部署最新 Llama3 - 掘金 (juejin.cn)](https://juejin.cn/post/7359470175761350690)
* [服务器部署开源大模型完整教程 Ollama+Gemma+open-webui - 哔哩哔哩 (bilibili.com)](https://www.bilibili.com/read/cv32462618/)
* [Ollama管理本地开源大模型，用Open WebUI访问Ollama接口 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/686952702)
* [22K star的超强工具：Ollama，一条命令在本地跑 Llama2 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/672400265)
* [LLaMa-1 技术详解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/648774481)
* [带你认识本地大语言模型框架Ollama(可直接上手) | 二丫讲梵 (eryajf.net)](https://wiki.eryajf.net/pages/97047e/#模型管理)
* https://www.bytenote.net/article/225623142184255489
* https://zhuanlan.zhihu.com/p/687099148

