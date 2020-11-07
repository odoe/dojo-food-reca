import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import dojo from '@dojo/widgets/theme/dojo';

import AddFoodItem from './widgets/AddFoodItemForm';

import * as css from './App.m.css';

const factory = create({ theme });

const initValue = {
	food: 'beef',
	cost: 4.5,
};

export default factory(function App({ middleware: { theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}
	return (
		<div classes={[css.root]}>
			<AddFoodItem {...initValue} />
		</div>
	);
});
