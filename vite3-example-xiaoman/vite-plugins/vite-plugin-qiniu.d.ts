export declare interface Option {
   enable?: boolean, // 是否开启插件
   accessKey: string,
   secretKey: string,
   bucket: string, // 上传的位置(空间)
   path?: string // 空间下上传路径
   exclude?: RegExp, // 排除上传的文件
   sourceFilesDir?: string // 上传的文件夹路径
   zone?: string,
   [propName:string]:any
}

export declare interface File {
   name: string,
   existsAt: string
}
