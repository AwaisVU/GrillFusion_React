import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { AUTH_STORAGE_KEYS, BASE_API_URL } from "../../utility/constants";

//Base query with auth and authorization token from frontend

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_API_URL+"/api",
    prepareHeaders: (headers,{getState}) => {
        const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
        if(token){
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

//Base query template only

const baseQueryWithAuth = async(args,_api,extraOptions) => {
    const result = await baseQuery(args,_api,extraOptions);
    return result;
}

//Main exported base api object

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithAuth,
    tagTypes: [],
    endpoints: ()=>({}) //Endpoints should be defined in individual files
})