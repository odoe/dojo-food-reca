const { describe, it } = intern.getInterface('bdd');
import renderer, { assertion } from '@dojo/framework/testing/renderer';
import { tsx } from '@dojo/framework/core/vdom';

import AddFoodItem from '../../src/widgets/AddFoodItemForm';
import FoodItemList from '../../src/widgets/FoodItemList';
import EditFoodItem from '../../src/widgets/EditFoodItemForm';
import App from '../../src/App';
import { FoodItem } from '../../src/Data';

import * as css from '../../src/App.m.css';

describe('App', () => {
	const value: FoodItem = {
		id: 0,
		food: 'Apple',
		cost: 1.99,
		status: false
	};
	let editing = false;
	const baseAssertion = assertion(() => (
		<div classes={[css.root]}>
			<div>
				<FoodItemList foodItems={undefined as any} />
			</div>
			<div classes={[css.main]}>
				{
					editing ?
					<EditFoodItem {...value} />
					:
					<AddFoodItem />
				}
			</div>
		</div>
	));
	it('default renders correctly', () => {
		const r = renderer(() => <App />);
		r.expect(baseAssertion);
	});
});
