import { create, tsx } from '@dojo/framework/core/vdom';
import Form from '@dojo/widgets/form';
import { FormMiddleware } from '@dojo/widgets/form/middleware';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';

import store from '../middleware/store';
import { updateEditing, editFoodItem } from '../processes/foodItemsProcesses';

import { FoodItem } from '../interfaces';

const factory = create({ store }).properties<FoodItem>();

export default factory(function EditFoodItemForm({ properties, middleware: { store } }) {
	const props = properties();
	const editFood = store.executor(editFoodItem);
	const updateEdit = store.executor(updateEditing);
	return (
		<Form
			name="edit-food-item-form"
			initialValue={props}
			onSubmit={(foodItem: FoodItem) => {
				editFood(foodItem);
				updateEdit({
					editing: false
				});
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
								initialValue={String(cost.value())}
								onValue={(value) => {
									console.log(value);
									cost.value(Number(value));
								}}
								onValidate={cost.valid}
								disabled={cost.disabled()}
							>
								{{ label: 'Food Cost' }}
							</TextInput>
						</div>
						<Button
							key="update"
							type="submit"
							disabled={!valid() || disabled()}
						>
							Update
						</Button>
						<Button
							key="cancel"
							disabled={!valid() || disabled()}
							onClick={() => {
								store.executor(updateEditing)({
									editing: false
								});
							}}
						>
							Cancel
						</Button>
					</div>
				);
			}}
		</Form>
	);
});
