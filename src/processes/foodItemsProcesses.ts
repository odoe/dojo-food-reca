import {
    createProcess,
    createCommandFactory
} from '@dojo/framework/stores/process';

import { replace } from '@dojo/framework/stores/state/operations';

import { FoodItem, State } from '../Data';

const commandFactory = createCommandFactory<State>();

// Commands
const fetchFoodItemsCommand = commandFactory(async ({ state }) => {
    state.foodItems = [];
});

const editFoodItemCommand = commandFactory<FoodItem>(async ({ at, path, payload, state }) => {
    const { foodItems } = state;
    let index = 0;
    foodItems.find((item, idx) => {
        if (item.id === payload.id) {
            index = idx;
            return true;
        }
        return false;
    });
    return [
        replace(at(path('foodItems'), index), payload)
    ];
});

const addFoodItemCommand = commandFactory<FoodItem>(async ({ state, payload }) => {
    const index = state.foodItems.length;
    const lastItem = state.foodItems[index - 1];
    const id = lastItem ? lastItem.id + 1 : index
    const item = { ...payload, id, status: false };

    state.foodItems = [...state.foodItems, item];
});

const updateEditingCommand = commandFactory<Pick<State, 'editing' | 'selectedItem'>>(async ({ state, payload }) => {
    const { editing, selectedItem } = payload;
    state.editing = editing;
    state.selectedItem = selectedItem;
});

const deleteFoodItemCommand = commandFactory<FoodItem>(async ({ state, payload }) => {
    const { id } = payload;
    const items = state.foodItems.filter((x => x.id !== id));
    state.foodItems = [...items];
});

// Processes
export const fetchFoodItems = createProcess(
    'fetch-food-items',
    [fetchFoodItemsCommand]
);

export const editFoodItem = createProcess(
    'edit-food-item',
    [editFoodItemCommand]
);

export const addFoodItem = createProcess(
    'add-food-item',
    [addFoodItemCommand]
);

export const updateEditing = createProcess(
    'update-editing',
    [updateEditingCommand]
);

export const deleteFoodItem = createProcess(
    'delete-food-item',
    [deleteFoodItemCommand]
);
