# 初始化项目超时

1. 设置镜像源
2. 取消代理

上述方法无用后，考虑下载包时设置的时限太短：

增加yarn的网络超时时间：

```bash
# 300sec
yarn config set network-timeout 300000
```

> [Timeout error on yarn install with date-fns@next on Dockerhub · Issue #1004 · date-fns/date-fns (github.com)](https://github.com/date-fns/date-fns/issues/1004)

# Nodejs 版本过新

报错：

```
this[kHandle] = new _Hash(algorithm, xofLen);
^

Error: error:0308010C:digital envelope routines::unsupported
```

node.js V17版本中最近发布的OpenSSL3.0, 而OpenSSL3.0对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响。

1. 降低Nodejs版本

2. 或者项目运行前设置命令：

   ```bash
   set NODE_OPTIONS=--openssl-legacy-provider 
   ```

​	例如这里加在了 start 命令里，用 & 连接，注意**这里必须写在前面**：

![image-20240121163553367](https://xiongyuqing-img.oss-cn-qingdao.aliyuncs.com/img/202401211635491.png)

> [终极解决：Error: error:0308010C:digital envelope routines::unsupported-CSDN博客](https://blog.csdn.net/m0_48300767/article/details/131450325)
