import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';

import { FoodItem } from '../interfaces';

type FoodItems = {
	foodItems: FoodItem[]
};

const factory = create().properties<FoodItems>();

export default factory(function FoodItemList({ properties }) {
	const { foodItems = [] } = properties();
	return (
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
				{
					foodItems.length > 0 ? (
						foodItems.map((foodItem) => (
							<tr key={foodItem.id}>
								<td>{ String(foodItem.id) }</td>
								<td>{ foodItem.food }</td>
								<td>{ foodItem.cost.toFixed(2) }</td>
								<td>
									<Button>Edit</Button>
									<Button>Delete</Button>
									<Button>{
										foodItem.status ? 'bought' : 'pending'
									}</Button>
							</td>
						</tr>
					))
					) : (
						<tr>
							<td colSpan={3}>No food for a lazy man</td>
						</tr>
					)
				}
			</tbody>
		</table>
	);
});

