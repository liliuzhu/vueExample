import path from "path";
import qiniu, { zone, conf} from 'qiniu'
import type { Option } from './vite-plugin-qiniu'
import ora from 'ora'

console.log('/***1221*****/', qiniu)

// Constants
// const REGEXP_HASH = /\[hash(?::(\d+))?\]/gi;

// Uploading progress tip
const tip = (uploaded:number, failed:number, total:number, retrying:boolean) => {
   let percentage = Math.round(uploaded / total * 100);
   let msg = retrying ? '重试失败的文件:' : '七牛云上传中:';
   return `${msg} 已上传 ${percentage}% ${uploaded}/${total} ， ${failed} 个文件上传失败`;
};


class QiniuPlugin {
   options: Option
   constructor(options:Option) {
      this.options = options
   }

   uploadFiles () {
      let assets = this.options.assets;
      // let hash = this.options.hash;
      let exclude = this.options.exclude;
      let include = this.options.include;
      let batch = this.options.batch || 20;
      let maxRetryTimes = this.options.maxRetryTimes || 3;
      let mac = new qiniu.auth.digest.Mac(this.options.accessKey, this.options.secretKey);
      let qiniuConfig: conf.ConfigOptions = new qiniu.conf.Config();
      let bucket = this.options.bucket;
      // @ts-ignore
      let zone = qiniu.zone[this.options.zone];
      if (zone) qiniuConfig.zone = zone;
      let uploadPath:string = this.options.path;
      // uploadPath = uploadPath && uploadPath.replace(REGEXP_HASH, withHashLength(getReplacer(undefined)));
      // console.log(45, uploadPath)

      let filesNames:string[] = Object.keys(assets);
      let totalFiles:number = 0;
      let uploadedFiles:number = 0;
      let retryFiles:string[] = [];
      let retryFilesCountDown:number = 0;

      // Mark finished
      let _finish = (err?:Error) => {
         spinner.succeed();
         // eslint-disable-next-line no-console
         console.log('\n');
      };

      // Filter files that should be uploaded to Qiniu CDN
      filesNames = filesNames.filter(fileName => {
         // let file = assets[fileName] || {};
         // Ignore unemitted files
         // if (!file.emitted) return false;

         // Check excluced files
         if (exclude && exclude.test(fileName)) return false;

         // Check included files
         if (include) return include.test(fileName);

         return true;
      });

      totalFiles = filesNames.length;

      // eslint-disable-next-line no-console
      console.log('\n');
      let spinner = ora({
         text: tip(0, retryFiles.length, totalFiles, false),
         color: 'green'
      }).start();

      // Perform upload to qiniu
      const performUpload = function(fileName:string, retrying:boolean) {
         let file = assets[fileName] || {};
         let key = path.posix.join(uploadPath, fileName);
         let putPolicy = new qiniu.rs.PutPolicy({ scope: bucket + ':' + key });
         let uploadToken = putPolicy.uploadToken(mac);
         let formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
         let putExtra = new qiniu.form_up.PutExtra();

         return new Promise((resolve) => {
            let begin = Date.now();

            // formUploader.putFile(
            //   uploadToken,
            //   key,
            //   file.existsAt,
            //   putExtra,
            //   function(err, body) {
            //      // handle upload error
            //      if (err) {
            //         // eslint-disable-next-line no-console
            //         console.log(`上传文件 ${fileName} 失败: ${err.message || err.name || err.stack}`);
            //         if (!~retryFiles.indexOf(fileName)) retryFiles.push(fileName);
            //      } else {
            //         uploadedFiles++;
            //      }
            //
            //      spinner.text = tip(uploadedFiles, retryFiles.length, totalFiles, retrying);
            //      body.duration = Date.now() - begin;
            //      resolve(body);
            //   });

            setTimeout(()=>{
               uploadedFiles++;
               const body:any = {}
               // console.log(file)
               spinner.text = tip(uploadedFiles, retryFiles.length, totalFiles, retrying);
               body.duration = Date.now() - begin;
               resolve(body);
            }, 1000)
         });
      };

      // Retry all failed files one by one
      const retryFailedFiles = function(err?:Error):any {
         if (err) {
            // eslint-disable-next-line no-console
            console.log('\n');
            return Promise.reject(err);
         }

         if (retryFilesCountDown < 0) retryFilesCountDown = 0;

         // Get batch files
         let _files = retryFiles.splice(
           0,
           batch <= retryFilesCountDown ? batch : retryFilesCountDown
         );
         retryFilesCountDown = retryFilesCountDown - _files.length;


         if (_files.length) {
            return Promise.all(
              _files.map(file => performUpload(file, true))
            ).then(() => retryFailedFiles(), retryFailedFiles);
         } else {
            if (retryFiles.length) {
               return Promise.reject(new Error('文件上传失败'));
            } else {
               return Promise.resolve();
            }
         }
      };

      // Execute stack according to `batch` option
      const execStack = function(err?:Error):any {
         if (err) {
            // eslint-disable-next-line no-console
            console.log('\n');
            return Promise.reject(err);
         }

         // Get batch files
         let _files = filesNames.splice(0, batch);

         if (_files.length) {
            return Promise.all(
              _files.map(file => performUpload(file, false))
            ).then(() => execStack(), execStack);
         } else {
            return Promise.resolve();
         }
      };

      execStack().then(() => {
         retryFilesCountDown = retryFiles.length * maxRetryTimes;
         return retryFailedFiles();
      }).then(() => _finish(), _finish);
   };
}

export default QiniuPlugin
