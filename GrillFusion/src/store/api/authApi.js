import { baseApi } from "./baseApi";

//Inject endpoints in base API
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //All endpoints here

    loginUser: builder.mutation({
      query: (formData) => ({
        url: "/Auth/login",
        method: "POST",
        body: formData,
      }),
    }),

    registerUser: builder.mutation({
      query: (formData) => ({
        url: "/Auth/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});


export const {useLoginUserMutation, useRegisterUserMutation} = authApi;
