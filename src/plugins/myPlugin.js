
const myPlugin = {
  install: function(Vue, options) {
    Vue.directive('lazy', (element, params) => {
      
      element.src = options.loading
      // console.log(Vue.prototype);
      if(params) {
        element.src = params.value
      }
    })
  }
}

export default myPlugin