const { describe, it } = intern.getInterface('bdd');
import renderer, { assertion } from '@dojo/framework/testing/renderer';
import { tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';

import FoodItemList from '../../../src/widgets/FoodItemList';
import { FoodItem } from '../../../src/Data';

describe('FoodItemList', () => {
	const noop = () => { };
	const emptyFoodItems: FoodItem[] = [];
	const foodItems: FoodItem[] = [
		{
			id: 0,
			food: 'Apple',
			cost: 1.99,
			status: false
		},
		{
			id: 1,
			food: 'Lettuce',
			cost: 0.75,
			status: false
		}
	];
	const baseAssertion = assertion(() => (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Food</th>
					<th>Cost</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td colSpan={3}>No food available</td>
				</tr>
			</tbody>
		</table>
	));
	const listAssertion = assertion(() => (
		<table>
			<thead>
				<tr>
					<th>Id</th>
					<th>Food</th>
					<th>Cost</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr key={0}>
					<td>0</td>
					<td>Apple</td>
					<td>1.99</td>
					<td>
						<Button onClick={noop}>Edit</Button>
						<Button onClick={noop}>Delete</Button>
						<Button onClick={noop}>Purchase</Button>
					</td>
				</tr>
				<tr key={1}>
					<td>1</td>
					<td>Lettuce</td>
					<td>0.75</td>
					<td>
						<Button onClick={noop}>Edit</Button>
						<Button onClick={noop}>Delete</Button>
						<Button onClick={noop}>Purchase</Button>
					</td>
				</tr>
			</tbody>
		</table>
	));

	it('default renders correctly', () => {
		const r = renderer(() => <FoodItemList foodItems={emptyFoodItems}/>);
		r.expect(baseAssertion);
	});
	it('can render food items', () => {;
		const r = renderer(() => <FoodItemList foodItems={foodItems}/>);
		r.expect(listAssertion);
	})
});
