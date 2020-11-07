export interface FoodItem {
    id?: string;
    userId?: number;
    food: string;
    cost: number;
    status?: boolean;
}

export interface State extends FoodItem {
    foodItem?: FoodItem;
    foodItems?: FoodItem[];
    editing?: boolean;
}