export interface FoodItem {
	id: number;
	food: string;
	cost: number;
	status: boolean;
}

export interface State {
	editing: boolean;
	selectedItem?: FoodItem,
	foodItems: FoodItem[];
}
