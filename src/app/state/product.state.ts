export enum DataStateEnum{
    LOADING,
    LOADED,
    ERROR
}
export interface AppDataState<T>{
    dataState?:DataStateEnum;
    data?:T,
    errorMessage?:string,
}

export enum ProductActionsTypes{
    GET_ALL_PRODUCTS="[Product] Get All Products",
    GET_SELECTED_PRODUCTS="[Product] Get Selected Products",
    GET_AVAILABLE_PRODUCTS="[Product] Get Available Products",
    SEARCH_PRODUCTS="[Product] Search Products",
    NEW_PRODUCTS="[Product] NEW Product",   
    SELECT_PRODUCTS="[Product] Select Product",   
    EDIT_PRODUCTS="[Product] Edit Product",   
    DELETE_PRODUCTS="[Product] Delete Product",   
    PRODUCT_ADDED="[Product] Product added", 
    PRODUCT_UPDATED="[Product] Product updated",     
}

export interface ActionEvent{
    type:ProductActionsTypes;
    payload?:any;
}