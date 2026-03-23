import { baseApi } from "./baseApi";

export const menuItemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //Gotta create enpoints here for menu items


        //Get all menu Items for Homepage as an array
        getMenuItems: builder.query({
            query: ()=>"/MenuItem",
            providesTags: ["MenuItem"],
            transformResponse: (response) => {
                if(response && response.result && Array.isArray(response.result)){
                    return response.result;
                }
                if(response && Array.isArray(response)){
                    return response;
                }
                return [];
            }

        }),


        //Get individual menu item using ID as param for Menu Item Details page
        getMenuItemsById: builder.query({
            query: (id)=>`MenuItem/${id}`,
            providesTags: (result,error,{id})=>[{type: "MenuItem", id}],
            transformResponse: (response) => {
                if(response && response.result){
                    return response.result;
                }
                return response;
            }

        }),


        //endpoint for create items (POST)

        createMenuItems: builder.mutation({
            query: (formData) => ({
                url: "/MenuItem",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["MenuItem"]
        }),

        //EP for delete
        deleteMenuItem: builder.mutation({
            query: (id) => ({
                url: `/MenuItem?id=${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["MenuItem"]
        }),

        //EP for update
        updateMenuItem: builder.mutation({
            query: ({id,formData}) => ({
                url: `/MenuItem?id=${id}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: (result,error,{id})=>[{type: "MenuItem", id}]
        })
    })
})

export const {useGetMenuItemsQuery, useCreateMenuItemsMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation, useGetMenuItemsByIdQuery} = menuItemApi;