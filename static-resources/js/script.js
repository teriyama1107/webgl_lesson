import "core-js/stable"
import "regenerator-runtime/runtime"

import ThreeApp from './components/three_application'

window.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#webgl');
  const app = new ThreeApp(wrapper);
  app.render();
}, false);