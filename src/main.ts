// import 'virtual:svg-icons-register';
import 'virtual:windi.css';
import { createApp } from 'vue';
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
}

renderApp({ container: '#app' });
