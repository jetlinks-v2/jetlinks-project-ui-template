import { initWebSocket } from "@/utils/websocket";
import { getToken } from "@jetlinks-web/utils";
import { TOKEN_KEY, BASE_API } from "@jetlinks-web/constants";


/**
 * 初始化package
 */
export const initPackages = () => {

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

  _initWs();
};
