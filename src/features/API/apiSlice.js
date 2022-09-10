import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://lws-server-anuapan9.herokuapp.com/',
    }),
    tagTypes: ["ToDos", "ToDo"],
    endpoints: (builder) => ({
        // get todo ------------------------
        getToDos: builder.query(
            {
                query: () => '/todos',
                keepUnusedDataFor: 600,
                providesTags: ["ToDo"]
            }
        ),
        // add new one --------------
        addToDos: builder.mutation({
            query: (data) => ({
                url: `/todos`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['ToDos']
        }),
        // complete ---------------
        toggleCompleteToDo: builder.mutation({
            query: ({ id, data }) => (
                {
                    url: `/todos/${id}`,
                    method: 'PATCH',
                    body: data
                }),
            invalidatesTags: ['ToDos', "ToDo"]
        }),
        // delete --------------
        deleteToDos: builder.mutation({
            query: (id) => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["ToDos"]
        }),
        // status change
        statusChange: builder.mutation({
            query: ({
                id,
                data
            }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,

            }),
            invalidatesTags: ["ToDos", "ToDo"]
        }),
        // color change -----------------------
        colorChange: builder.mutation({
            query: ({
                id,
                data
            }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['ToDos']

        }),
        // name change ---
        textChange: builder.mutation({
            query: ({
                id,
                data
            }) => ({
                url: `/todos/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ['ToDos']

        }),


        // get filtered todo
        getFilteredTodo: builder.query({
            query: ({
                status,
                colors
            }) => {
                let queryText = '/todos'
                // based on status filter the items
                switch (status) {
                    case "All":
                        if (colors.length > 0) {
                            queryText += '?'
                            colors.forEach(col => queryText += `color_like=${col}&`)
                        }
                        return queryText;

                    case "Complete":
                        queryText += '?'
                        queryText += 'completed_like=true&'
                        if (colors.length > 0) {
                            colors.forEach(col => queryText += `color_like=${col}&`)

                        }
                        return queryText;
                    case "Incomplete":
                        queryText += '?'
                        queryText += 'completed_like=false&'
                        if (colors.length > 0) {
                            colors.forEach(col => queryText += `color_like=${col}&`)

                        }
                        return queryText;
                    default:
                        return queryText
                }
            },
            providesTags: ['ToDos']
        }),
    })

})

export const {
    useGetToDosQuery,
    useAddToDosMutation,
    useDeleteToDosMutation,
    useToggleCompleteToDoMutation,
    useStatusChangeMutation,
    useColorChangeMutation,
    useGetFilteredTodoQuery,
    useTextChangeMutation
} =
    apiSlice;