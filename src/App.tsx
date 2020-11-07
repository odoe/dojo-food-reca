import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import icache from '@dojo/framework/core/middleware/icache';
import dojo from '@dojo/widgets/theme/dojo';

import AddFoodItem from './widgets/AddFoodItemForm';
import EditFoodItem from './widgets/EditFoodItemForm';
import FoodItemList from './widgets/FoodItemList';

import { FoodItem } from './interfaces';

import * as css from './App.m.css';

const factory = create({ icache, theme });

const initState: FoodItem = {
	id: 0,
	food: 'beef',
	cost: 6.75
};

export default factory(function App({ middleware: { icache, theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const editing = icache.getOrSet('editing', false);
	const selectedFoodItem = icache.getOrSet('foodItem', initState);

	return (
		<div classes={[css.root]}>
			<div>
				<FoodItemList foodItems={[initState]} />
			</div>
			<div>
				{
					editing ?
					<EditFoodItem {...selectedFoodItem} />
					:
					<AddFoodItem />
				}
			</div>
		</div>
	);
});
