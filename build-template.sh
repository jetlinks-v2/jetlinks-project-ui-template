#!/usr/bin/env bash
docker build -f Dockerfile.template -t registry.cn-shenzhen.aliyuncs.com/jetlinks/jetlinks-template-ui:2.12.0 --push .
