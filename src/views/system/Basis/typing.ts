// 表单数据类型接口
export interface formDataType {
    title: string | undefined,  // 系统名称
    headerTheme: "light" | "dark",  // 主题色
    apiKey: string | undefined,  // 高德API Key
    basePath: string | undefined,  // base-path
    logo: string | undefined,  // 系统logo
    ico: string | undefined,  // 浏览器页签
    background: string | undefined  // 登录背景图
}

// 上传相关信息接口
export interface uploadInfoType {
    // 上传提示
    logoTip: object,
    icoTip: object,
    backgroundTip: object,
    // 上传的地址
    action: string,
    headers: object,
    // 上传的状态
    logoLoading: boolean,
    icoLoading: boolean,
    backgroundLoading: boolean,
    // 是否展示uplaodList
    showUploadList: boolean,
    // 是否支持拖拽
    drag: true,
    // 上传接受的类型
    imageType: string,
    icoTyep: string,
  
    //验证图片是否小于4M
    isImageLess4M(file: File): boolean,
  
    //验证图片大小是否小于1M
    isImageLess1M(file: File): boolean,
  
    // 验证是否是图片类型
    isImageType(file: File): boolean,
  
    // 验证是否时icon类型
    isicoType(file: File): boolean,
  
    // 上传change事件
    changUpload(info: any, loading: string, image: string, msg: string): void,
  
    // logo上传change事件
    changeLogoUpload(info): void,
  
    // 浏览器页签上传change事件
    changeicoUpload(info): void,
  
    // 背景图片上传change事件
    changebackgroundUpload(info): void,
  
    // logo 上传验证
    isLogoImage(file: File): boolean,
  
    // icon 上传验证
    isicoImage(file: File): boolean,
  
    // 背景图片上传验证
    isbackground(file: File): boolean
  }