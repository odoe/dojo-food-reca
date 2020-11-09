import { create, tsx } from '@dojo/framework/core/vdom';
import Button from '@dojo/widgets/button';

import store from '../middleware/store';
import { editFoodItem, deleteFoodItem, updateEditing } from '../processes/foodItemsProcesses';

import { FoodItem } from '../Data';

const factory = create({store}).properties<{ foodItems: FoodItem[] }>();

export default factory(function FoodItemList({ properties, middleware: { store } }) {
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
									<Button onClick={() => {
										store.executor(updateEditing)({
											editing: true,
											selectedItem: foodItem
										})
									}}>Edit</Button>
									<Button onClick={() => {
										store.executor(deleteFoodItem)(foodItem);
									}}>Delete</Button>
									<Button onClick={() => {
										store.executor(editFoodItem)({
											...foodItem,
											status: !foodItem.status
										});
									}}>{
										foodItem.status ? 'Sold' : 'Purchase'
									}</Button>
							</td>
						</tr>
					))
					) : (
						<tr>
							<td colSpan={3}>No food available</td>
						</tr>
					)
				}
			</tbody>
		</table>
	);
});

