const { describe, it } = intern.getInterface('bdd');
import renderer, { assertion } from '@dojo/framework/testing/renderer';
import { tsx } from '@dojo/framework/core/vdom';
import Form from '@dojo/widgets/form';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';

import EditFoodItemForm from '../../../src/widgets/EditFoodItemForm';
import { FoodItem } from '../../../src/interfaces';

describe('EditFoodItemForm', () => {
	const noop = () => { };
	const value: FoodItem = {
		id: 0,
		food: 'Apple',
		cost: 1.99
	};
	const baseAssertion = assertion(() => (
		<Form
			name="edit-food-item-form"
			initialValue={value}
			onSubmit={noop}
		>
			{() => {

				return (
					<div>
						<div>
							<TextInput
								key="food"
								required={true}
								initialValue={value.food}
								onValue={noop}
								onValidate={noop}
								disabled={false}
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
								initialValue={String(value.cost)}
								onValue={noop}
								onValidate={noop}
								disabled={false}
							>
								{{ label: 'Food Cost' }}
							</TextInput>
						</div>
						<Button
							key="update"
							type="submit"
							disabled={false}
						>
							Add Food Item
						</Button>
						<Button
							key="cancel"
							disabled={false}
							onClick={noop}
						>
							Add Food Item
						</Button>
					</div>
				);
			}}
		</Form>
	));
	it('default renders correctly', () => {
		const r = renderer(() => <EditFoodItemForm {...value}/>);
		r.expect(baseAssertion);
	});
});
