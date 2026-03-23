import { baseApi } from "./baseApi";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //1st EP - Get Orders
    getOrders: builder.query({
      query: (userId = "") => ({
        url: "/Order",
        params: userId ? { userId } : {},
      }),

      providesTags: ["Order"],

      transformResponse: (response) => {
        if (response && response.result && Array.isArray(response.result)) {
          return response.result;
        }
        if (response && Array.isArray(response)) {
          return response;
        }
        return [];
      },
    }),

    //2nd EP -Get order by ID
    getOrderById: builder.query({
      query: (userId) => ({
        url: `/Order/${userId}`,
      }),

      providesTags: (result, error, userId) => [{ type: "Order", id: userId }],

      transformResponse: (response) => {
        if (response && response.result) {
          return response.result;
        }
        return response;
      },
    }),

    //3rd Create order mutation
    createOrder: builder.mutation({
      query: (formData) => ({
        url: "/Order",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Order"],
    }),

    //4th update order
    updateOrder: builder.mutation({
      query: ({ orderId, formData }) => ({
        url: `/Order/${orderId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
      ],
    }),

    //Rating Update
    updateOrderDetail: builder.mutation({
      query: ({ orderDetailId, rating }) => ({
        url: `/OrderDetail/${orderDetailId}`,
        method: "PUT",
        body: {
          orderDetailId: orderDetailId,
          rating: rating,
        },
      }),
      invalidatesTags: ["Order", "MenuItem"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useUpdateOrderDetailMutation,
} = ordersApi;
