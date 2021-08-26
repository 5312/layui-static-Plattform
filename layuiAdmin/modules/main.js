layui.define(['layer'], function (exports) {
  let layer = layui.layer
  let notice = layui.notice
  let index;
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api',
    timeout: '1000ms',
    headers: { 'content-type': '  application/json;charset=utf-8' }
    // headers: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8'}
    // headers: { 'content-type': 'multipart/form-data;charset=utf-8' },// 文件
  });

  // 添加请求拦截器ms
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    index = layer.msg('请求中...', { icon: 16, shade: 0.01, time: false });
    return config;
  }, function (error) {
    // 对请求错误做些什么
    layer.msg('请求失败', { icon: 2 });
    return Promise.reject(error);
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 加载动画
    layer.close(index)
    // 对响应数据做点什么
    if (response.data.code == 0) {

      return response.data;
    }
    if (response.data.code == 1) { // 1 后台处理失败
      notice.msg(response.data.msg, { icon: 2 });
      return Promise.reject(response.data);
    }

  }, function (error) {
    layer.close(index)
    // 对响应错误做点什么
    let status = {
      500: "/page/错误页/500.html",
      404: "/page/错误页/404.html",
      403: "/page/错误页/403.html"
    }
    // 错误有提示
    notice.msg(error.response && error.response.data.msg || '加载失败', { icon: 2, displayMode: 1 });
    if (error.response) {
      // 重定向跳转
      console.log('----------')
      window.location = status[error.response.status];
      //layui.index.openTabsPage(status[error.response.status])
    }
    return Promise.reject(error);
  });

  window.axios = instance;
  exports('main', instance);
})

