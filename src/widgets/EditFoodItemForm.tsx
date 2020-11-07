import { create, tsx } from '@dojo/framework/core/vdom';
import Form from '@dojo/widgets/form';
import { FormMiddleware } from '@dojo/widgets/form/middleware';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';

import { State } from '../interfaces';

const factory = create().properties<State>();

export default factory(function EditFoodItemForm({ properties }) {
	const props = properties();
	return (
		<Form
			initialValue={props}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({ valid, disabled, field, value }: FormMiddleware<State>) => {
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
								step={0.25}
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
								value(props);
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
