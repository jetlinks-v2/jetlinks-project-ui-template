import { h } from "vue";
import { initWebSocket } from "@/utils/websocket";
import { initRequest } from "@/utils/context";
import { getToken } from "@jetlinks-web/utils";
import { TOKEN_KEY, BASE_API } from "@jetlinks-web/constants";
import { Modal } from "ant-design-vue";

const licenseModal = () => {
  Modal.error({
    title: "License已到期或者错误",
    content: h(
      "a",
      {
        onClick: () => {
          Modal.destroyAll?.();
          window.location.href = "/#/init-license";
        },
      },
      "请更新License"
    ),
  });
};

/**
 * 初始化package
 */
export const initPackages = () => {
  // 初始化axios,获取环境变量中的代理标识
  const _initRequest = () => {
    initRequest(() => ({
      errorHandler(error) {
        // 自定义请求错误处理
        if (error.response) {
          const { data } = error.response.data as any;
          if (data?.code === "license required") {
            licenseModal();
          }
        }
      },
    }));
  };

  /**
   * 初始化websocket
   */
  const _initWs = () => {
    const token = getToken();
    const protocol = window.location.protocol === "https" ? "wss://" : "ws://";
    const host = document.location.host;
    const url = `${protocol}${host}${BASE_API}/messaging/${token}?:${TOKEN_KEY}=${token}`;

    initWebSocket(url);
  };

  _initRequest();
  _initWs();
};
