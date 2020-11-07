import { create, tsx } from '@dojo/framework/core/vdom';

import { State } from '../interfaces';

const factory = create().properties<State>();

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
								<td>{ foodItem.id }</td>
								<td>{ foodItem.food }</td>
								<td>{ foodItem.cost }</td>
								<td>
									<button>Edit</button>
									<button>Delete</button>
									<button>{
										foodItem.status ? 'bought' : 'pending'
									}</button>
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

