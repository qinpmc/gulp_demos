##  Gulp demos

主要参考资料：   
https://www.gulpjs.com.cn/docs/    
https://github.com/onface/gulp-book     
https://github.com/zhonglimh/Gulp    

### 1 安装gulp

- 安装cnpm （npm的国内加速镜像）    
npm install -g cnpm --registry=https://registry.npm.taobao.org

- 查看安装是否成功    
cnpm --version


- 安装gulp   
cnpm install -g gulp


### 2 调试 gulpfile.js

1. 命令行运行（此处为windows系统，node版本v8.12.0）：
node --inspect-brk ./node_modules/gulp/bin/gulp.js --verbose

2. chrome浏览器打开：
chrome://inspect

3. 找到gulpfile.js 添加断点即可

4. 补充说明：
低版本的node（Node.js 6.3+）运行命令为：
 node --inspect --debug-brk ./node_modules/gulp/bin/gulp.js export -p "taf|taf|[]|[]"
export 为命令名称， -p 为选项，"taf|taf|[]|[]" 为选项参数

高版本的命令如上1中所示。

网络说明（本人环境不可用）：
网站：https://stackoverflow.com/questions/40033298/how-to-debug-a-gulp-task
Node.js 6.3+: node --inspect --debug-brk ./node_modules/.bin/gulp css
Node.js 7+: node --inspect-brk ./node_modules/.bin/gulp css














