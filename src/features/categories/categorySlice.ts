import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
    id: string;
    name: string;
    deleted_at: null | string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    description: null | string;
}

const endpointUrl = "/categories"
export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({ query }) => ({
        getCategories: query<Results, void>({
            query: () => `${endpointUrl}`,
            providesTags: ["Categories"]
        })
    })
})


const category: Category = {
    id: "0ce68ddd-4891-4ee2-a23b-a01452b96b01",
    name: "Olive",
    description: "teste tse teste test",
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
        createCategory(state, action) {
            state.push(action.payload)
        },
        updateCategory(state, action) {
            //find index on state of category to update
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            )
            // update category on state
            state[index] = action.payload
        },
        deleteCategory(state, action) {
            const index = state.findIndex(
                (category) => category.id === action.payload.id
            )
            state.splice(index, 1)
        },
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
export const { createCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export const { useGetCategoriesQuery } = categoriesApiSlice