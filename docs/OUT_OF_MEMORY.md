# 内存溢出 JavaScript heap out of memory

由于NodeJS本身默认内存限制为1G 在打包内容过多的情况下 会出现内存溢出问题
解决方法如下：
修改 /bin/roadhog 文件中 ```--max_old_space_size=4096``` 的值

```shell
if [ -x "$basedir/node" ]; then
  "$basedir/node" "--max_old_space_size=4096"  "$basedir/../node_modules/._roadhog@2.3.0@roadhog/bin/roadhog.js" "$@"
  ret=$?
else 
  node "--max_old_space_size=4096" "$basedir/../node_modules/._roadhog@2.3.0@roadhog/bin/roadhog.js" "$@"
  ret=$?
fi
exit $ret
```