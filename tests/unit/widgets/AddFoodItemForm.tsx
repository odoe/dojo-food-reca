const { describe, it } = intern.getInterface('bdd');
import renderer, { assertion } from '@dojo/framework/testing/renderer';
import { tsx } from '@dojo/framework/core/vdom';
import Form from '@dojo/widgets/form';
import TextInput from '@dojo/widgets/text-input';
import Button from '@dojo/widgets/button';

import AddFoodItemForm from '../../../src/widgets/AddFoodItemForm';

describe('AddIFoodItemForm', () => {
	const noop = () => { };
	const baseAssertion = assertion(() => (
		<Form
			name="add-food-item-form"
			onSubmit={noop}
		>
			{() => {

				return (
					<div>
						<div>
							<TextInput
								key="food"
								required={true}
								initialValue={""}
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
								initialValue={""}
								onValue={noop}
								onValidate={noop}
								disabled={false}
							>
								{{ label: 'Food Cost' }}
							</TextInput>
						</div>
						<Button
							key="submit"
							type="submit"
							disabled={false}
						>
							Add Food Item
						</Button>
					</div>
				);
			}}
		</Form>
	));
	it('default renders correctly', () => {
		const r = renderer(() => <AddFoodItemForm />);
		r.expect(baseAssertion);
	});
});
