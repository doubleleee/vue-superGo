import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // Vue.extend(trn)
  // document.body.appendChild(Toast.$el)

  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2、new 的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()
  // 3、将组件对象手动挂载到某一元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el 对应的就是 div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
