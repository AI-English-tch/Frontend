// import 'virtual:svg-icons-register';
import 'virtual:windi.css';
import { createApp } from 'vue';
import pinia from './store/pinia';
import utils from '@/utils/utils';
import { setupRouter } from './router';
import App from './App.vue';
interface renderProps {
  container: Element | string;
}
function renderApp(props: renderProps) {
  const { container } = props;
  const instance = createApp(App);
  setupRouter(instance);
  instance.mount(container);
  utils.elSvg(instance);
  instance.use(pinia)
}

renderApp({ container: '#app' });
