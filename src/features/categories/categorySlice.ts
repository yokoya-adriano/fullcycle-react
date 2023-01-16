import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Category {
    id: string;
    name: string;
    deleted_at: null | string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    description: null | string;
}

const category: Category = {
    id: "0ce68ddd-4891-4ee2-a23b-a01452b96b01",
    name: "Olive",
    description: "test tse teste12 test",
    is_active: true,
    deleted_at: null,
    created_at: "2022-08-15T10:59:09+0000",
    updated_at: "2022-08-15T10:59:09+0000"
}

export const InitialState = [
    category,
    { ...category, id:"1ce68ddd-4891-4ee2-a23b-a01452b96b01", name: "Peach" },
    { ...category, id:"2ce68ddd-4891-4ee2-a23b-a01452b96b01", name: "Apple" },
    { ...category, id:"3ce68ddd-4891-4ee2-a23b-a01452b96b01", name: "Banana" },
]


const categoriesSlice = createSlice({
    name: 'categories',
    initialState: InitialState,
    reducers: {
        createCategory(state, action) {},
        updateCategory(state, action) {},
        deleteCategory(state, action) {},
    },
})

//Selectors
export const selectCategories = (state: RootState) => state.categories
// select category by id
export const selectCategoryById = (state: RootState, id: string) => {
    const category = state.categories.find((category) => category.id === id)
    return (
        category || {
            id: "",
            name: "",
            description: "",
            is_active: false,
            deleted_at: null,
            created_at: "",
            updated_at: ""
        }
    )
}

export default categoriesSlice.reducer