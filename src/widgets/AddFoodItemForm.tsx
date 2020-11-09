import { create, tsx } from '@dojo/framework/core/vdom';
import Form from '@dojo/widgets/form';
import { FormMiddleware } from '@dojo/widgets/form/middleware';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';

import store from '../middleware/store';
import { addFoodItem } from '../processes/foodItemsProcesses';

import { FoodItem } from '../Data';

const factory = create({ store });

export default factory(function AddFoodItemForm({ middleware: { store } }) {
	const addFood = store.executor(addFoodItem);
	return (
		<Form
			name="add-food-item-form"
			onSubmit={(foodItem: FoodItem) => {
				addFood(foodItem);
			}}
		>
			{({ valid, disabled, field }: FormMiddleware<FoodItem>) => {
				const food = field('food', true);
				const cost = field('cost', true);

				return (
					<div>
						<div>
							<TextInput
								key="food"
								required={true}
								initialValue={food.value()}
								onValue={food.value}
								onValidate={food.valid}
								disabled={food.disabled()}
							>
								{{ label: 'Food Name' }}
							</TextInput>
						</div>
						<div>
							<TextInput
								type="number"
								step={0.05}
								key="cost"
								required={true}
								initialValue={cost.value()?.toFixed(2)}
								onValue={(value) => {
									cost.value(Number(value));
								}}
								onValidate={cost.valid}
								disabled={cost.disabled()}
							>
								{{ label: 'Food Cost' }}
							</TextInput>
						</div>
						<Button
							key="submit"
							type="submit"
							disabled={!valid() || disabled()}
						>
							Add Food Item
						</Button>
					</div>
				);
			}}
		</Form>
	);
});
