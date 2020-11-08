import { tsx, create } from '@dojo/framework/core/vdom';
import theme from '@dojo/framework/core/middleware/theme';
import dojo from '@dojo/widgets/theme/dojo';

import store from './middleware/store';
import { fetchFoodItems } from './processes/foodItemsProcesses';

import AddFoodItem from './widgets/AddFoodItemForm';
import EditFoodItem from './widgets/EditFoodItemForm';
import FoodItemList from './widgets/FoodItemList';

import * as css from './App.m.css';

const factory = create({ store, theme });

export default factory(function App({ middleware: { store, theme } }) {
	if (!theme.get()) {
		theme.set(dojo);
	}

	const { get, path } = store;
	const foodItems = get(path('foodItems'));
	const editing = get(path('editing'));
	const selectedFoodItem = get(path('selectedItem'));

	if (!foodItems) {
		store.executor(fetchFoodItems)({});
	}

	return (
		<div classes={[css.root]}>
			<div>
				<FoodItemList foodItems={foodItems} />
			</div>
			<div classes={[css.main]}>
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
