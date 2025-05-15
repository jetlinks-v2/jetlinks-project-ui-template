#!/usr/bin/env bash

# 切换到项目根目录（防止路径问题）
cd "$(dirname "$0")/.."

docker build -f template-docker/Dockerfile -t registry.cn-shenzhen.aliyuncs.com/jetlinks/jetlinks-template-ui:1.0 .
docker push registry.cn-shenzhen.aliyuncs.com/jetlinks/jetlinks-template-ui:1.0
