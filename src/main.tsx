import renderer, { tsx } from '@dojo/framework/core/vdom';
import Registry from '@dojo/framework/core/Registry';
import App from './App';

const registry = new Registry();

const r = renderer(() => <App />);
r.mount({ registry });
