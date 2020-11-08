import {
  createProcess,
  createCommandFactory
} from '@dojo/framework/stores/process';

import { add, remove, replace, test } from '@dojo/framework/stores/state/operations';

import { State, FoodItem } from '../interfaces';

const commandFactory = createCommandFactory<State>();

//---------------------
// Processes
//---------------------

const fetchFoodItemsCommand = commandFactory(async ({ path }) => {
	console.log('fetch food items command');
	return [
		add(path('foodItems'), [])
	];
});

const addFoodItemCommand = commandFactory<FoodItem>(async ({ at, get, path, payload }) => {
	const idx = get(path('foodItems', 'length')) || 0;
	const item = get(at(path('foodItems'), idx - 1));
	let id = item ? item.id + 1 : idx;
	const updatedItem = { ...payload, id };
	return [
		add(
			at(path('foodItems'), idx),
			updatedItem
		),
		test(
			at(path('foodItems'), idx),
			updatedItem
		),
		test(
			path('foodItems', 'length'), idx + 1
		)
	];
});

const editFoodItemCommand = commandFactory<FoodItem>(async ({ at, get, path, payload }) => {
	const items = get(path('foodItems'));
	let index = 0;
	items.find((item, idx) => {
		if(item.id === payload.id) {
			index = idx;
			return true;
		}
		return false;
	});
	return [
		replace(at(path('foodItems'), index), payload)
	];
});

const deleteFoodItemCommand = commandFactory<FoodItem>(async ({ at, get, path, payload }) => {
	const items = get(path('foodItems'));
	let index = 0;
	items.find((item, idx) => {
		if(item.id === payload.id) {
			index = idx;
			return true;
		}
		return false;
	});
	return [
		remove(at(path('foodItems'), index))
	];
});

const updateEditingCommand = commandFactory<Pick<State, 'editing' | 'selectedItem'>>(async ({ path, payload }) => {
	const { editing, selectedItem } = payload;
	return [
		replace(path('editing'), editing),
		replace(path('selectedItem'), selectedItem)
	];
});

//---------------------
// Processes
//---------------------

export const fetchFoodItems = createProcess(
	'fetch-food-items',
	[fetchFoodItemsCommand]
);

export const addFoodItem = createProcess(
	'add-food-item',
	[addFoodItemCommand]
);

export const editFoodItem = createProcess(
	'edit-food-item',
	[editFoodItemCommand]
);

export const updateEditing = createProcess(
	'update-editing',
	[updateEditingCommand]
);

export const deleteFoodItem = createProcess(
	'delete-food-item',
	[deleteFoodItemCommand]
);

