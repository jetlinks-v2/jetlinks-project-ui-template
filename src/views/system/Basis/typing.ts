// 基本配置表单数据类型接口
export interface formDataType {
    title: string | undefined,  // 系统名称
    headerTheme: "light" | "dark",  // 主题色
    apiKey: string | undefined,  // 高德API Key
    apiWebKey: string | undefined, // 高德web key
    basePath: string | undefined,  // base-path
    logo: string | undefined,  // 系统logo
    ico: string | undefined,  // 浏览器页签
    background: string | undefined  // 登录背景图
}
