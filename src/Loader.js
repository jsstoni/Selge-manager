const Loader = {
  install(app, options) {
    options;
    app.config.globalProperties.$loader = (el) => {
      let div = document.createElement('div');
      let loadClass = document.createElement('div');
      loadClass.classList.add('lds-dual-ring');
      div.appendChild(loadClass);
      div.classList.add('form-loader');
      el.appendChild(div);
    }
  },
  stop() {
    let eLoader = document.querySelector('.form-loader');
    if (eLoader) document.querySelector('.form-loader').remove();
  }
}
export default Loader;