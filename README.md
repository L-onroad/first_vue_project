## 项目展示地址
http://120.78.152.158/#/home

# 项目使用的主要技术

### 1、商品导航栏使用编程式路由跳转加事件委派，解决了使用路由式跳转过多操作真实DOM导致卡顿的问题。该方法使用获取点击事件对象target中的dataset属性获取对应的自定义属性定位到相应传参位置
### 2、在主组件请求商品数据，避免子组件重复多次请求渲染，降低消耗
### 3、轮播图使用swiper插件，使用watch+nextTick在获取完数据以及渲染完页面之后，创建swiper实例，使轮播图能正常工作
### 4、搜索和点击商品栏进行索引跳转，通过给定义的对象传入不同参数，随后发送post请求给服务器，服务器返回相应的数据进行展示
### 5、自定义分页器实现，利用prop让父组件给子组件传递页面的参数，利用自定义事件让子组件给父组件传递点击的页面，收到数据之后整合数据重新发送请求展示响应数据
### 6、展示图放大镜效果，利用mousemove事件，offsetX获取鼠标在父组件里的X坐标，offsetWidth获取蒙版的宽度，通过计算设置蒙版和背景图片的位置
### 7、加入购物车案例，点击加入购物车后，派发post请求给服务器，接收服务器返回的成功与否信息，该过程使用了async和await配合try和catch进一步处理成功和失败的结果，成功后进行路由跳转到加入购物车成功页面，商品数据通过query参数配合本地存储送到成功页面。
### 8、购物车商品数量判断，每次点击增加或者减少或者通过输入更改数量，触发同一个事件，不同的是传入的参数，通过判断参数的类型，达到数量的不同修改情况，然后向服务器发起请求，更新购物车商品数量
### 9、实现用户注册，使用v-model双向绑定用户输入的内容，将用户输入的内容作为参数整理好派发ajax请求，进行用户注册
### 10、派发ajax请求的所有暴露接口用main.js接收并设置在vue原型对象上，靠$API调用接口
### 11、支付窗口按需引入elementUI使用message弹窗，在原型对象上绑定方法进行调用，并配置合适的方法。生成二维码地址使用qrcode的QRCode.toDataURL()方法传入二维码的字符串
### 12、路由守卫的使用，定义变量接收路由实例对象，使用beforeEach方法注册全局路由守卫，通过判断token存在与否进入响应页面跳转，存在token时判断路由to.path的方向，如果是登录注册页面则直接跳回home路由。如果是不存在token，则调到支付或订单页面会直接调到登录页面，同时传递query参数，在登录组件里接收query参数，在登录完成后直接跳到响应页面。
### 13、打包配置，将不必要上线的map.js通过配置vue.config.js将
### productionSourceMap设置为 false，这样打包的文件就不会包含占更大内存的map.js文件了
### 14、发布上线，购买阿里云服务器，设置用户密码，配置安全组，再经过xshell配置服务器，使用xftp上传文件到服务器，其中用到了nginx反向代理的功能，需要进入到与root文件同级的etc文件中，使用yum install nginx安装nginx，进入nginx中的nginx.conf进行页面配置和反向代理

## 使用到的（vue）插件：
nProgress 加载进度条
qrcode 传入二维码字符串获取二维码地址
vue-lazyload 图片懒加载

## 应用的路由方法
1）、路由元信息meta
2）、路由页面滚动事件
3）、路由守卫
4）、路由懒加载（高效加载相应组件）
