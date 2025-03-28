import React, { ChangeEventHandler, MouseEventHandler } from "react"

export interface authenticationTypes {
    fullName: string
    email: string
    password: string
    passwordConfirmation: string
    profile: null | string
    subsribe: boolean
}
export interface accountTypes {
    data: {
        _id: string
        fullName: string
        email: string
        password: string
        passwordConfirmation: string
        profile: null | string
        subscribe: boolean
        role: "admin" | "client"
        description?: string
    }[]
}
export interface ordersTypes {
    data: {
        _id?: string
        userId: {
            fullName: string
            email: string
            profile: null | string
            subsribe: boolean
            role: "admin" | "client"
        }
        products: {
            productId: {
                _id: string
                name: string
                description: string
                price: number
                picture: string
                categoryId: {
                    _id: string
                    categoryName: string
                }
                createAt: string
            }, quantity: number
        }[]
        status: "Processing" | "Shipped" | "Delivered"
        totalPrice: number
        createdAt: string
    }[]
}
export type newProductTypes = {
    name: string,
    description: string,
    price: number | null,
    pictures: string[],
    categoryId: string
}
export interface productsTypes {
    data: {
        _id: string
        name: string
        description: string
        price: number
        pictures: string[]
        categoryId: {
            _id: string
            categoryName: string
        }
        createAt: string
    }[]
}
export interface categoriesTypes {
    data: {
        _id?: string
        categoryName: string
    }[]
}
export type categorieNameTypes = {
    categoryName: string
}
export interface contactsTypes {
    data: {
        _id: string,
        name: string,
        email: string,
        description: string
    }[]
}
export interface inputTypes {
    name?: string
    description?: string
    price?: number | null
    pictures?: string[]
    categoryId?: string
    [key: string]: string | number | null | string[] | undefined
}

export type loadingTypes = {
    newProduct?: boolean
    showProducts?: boolean
}
export type popUpTypes = {
    modify?: boolean
    remove?: boolean
    productId?: string | null
    categorieId?: string | null
    contactId?: string | null
}
export interface inputsTypes {
    type: string
    inputName: string
    inputLabel: string
    placeHolder: string
}
export interface linksTypes {
    href: string
    context: string
    icon: React.ElementType
}
export interface cardsTypes {
    title: string
    number: number
    icon: React.ElementType
}
export interface chartTypes {
    month: string
    order: number
}
export interface contextTyes {
    cards: cardsTypes[]
    chartData: chartTypes[]
    orders: ordersTypes[]
    links: linksTypes[]
    inputs: inputsTypes[]
}

export type productComponentsTypes = {
    type: "remove" | "modify"
    popUp: popUpTypes
    setPopUp?: (popUp: popUpTypes) => void
    product?: inputTypes
    setProduct: React.Dispatch<React.SetStateAction<inputTypes>>
    onChange: ChangeEventHandler
    pictureValue: string
    pictureAction: (action: string, index?: number) => void
    onCreateProduct: MouseEventHandler
    categories: categoriesTypes
    loading?: loadingTypes
    pictureMethod: (productId: string | null) => void
}
export type productCardsComponentsTypes = {
    loading: loadingTypes,
    products: productsTypes
    handelProduct: (id: string | null) => void
    setPopUp?: (popUp: popUpTypes) => void
    isUrl: (url: string) => string
}

/*---> Store Types (Zustand) <---*/
interface StoreType {
    loading: boolean
    setLoading: (loading: boolean) => void
    popUp?: popUpTypes
    setPopUp?: (popUp: popUpTypes) => void
}
export interface categoriesStoreType extends StoreType {
    categorie?: string
    setCategorie?: (categorie: string) => void
    categories: categoriesTypes
    setCategories: (newCategories: categoriesTypes) => void
}
export interface clientsStoreType extends StoreType {
    clients: accountTypes
    setClients: (newClients: accountTypes) => void
}
export interface contactsStoreType extends StoreType {
    contacts: contactsTypes
    setContacts: (newContacts: contactsTypes) => void
}
export interface dashboardStoreType extends StoreType, clientsStoreType {
    products: productsTypes
    setProducts: (newProducts: productsTypes) => void
    orders: ordersTypes
    setOrders: (newOrders: ordersTypes) => void
    purchased: ordersTypes
    setPurchased: (newPurchased: ordersTypes) => void
}
export interface ordersStoreType {
    orders: ordersTypes
    setOrders: (newOrders: ordersTypes) => void
}
export interface productsStoreType {
    product: Partial<inputTypes>
    setProduct: React.Dispatch<React.SetStateAction<Partial<inputTypes>>>
    products: productsTypes
    setProducts: (newProducts: productsTypes) => void
    orders: ordersTypes
    setOrders: (newOrders: ordersTypes) => void
    categories: categoriesTypes
    setCategories: (newCategories: categoriesTypes) => void
    picture: string,
    setPicture: (newPicture: string) => void
    loading: loadingTypes
    setLoading: (loading: loadingTypes) => void
    popUp?: popUpTypes
    setPopUp?: (popUp: popUpTypes) => void
}
export interface purchasedStoreType {
    purchaseds: ordersTypes
    setPurchaseds: (newPurchased: ordersTypes) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    popUp?: popUpTypes
    setPopUp?: (popUp: popUpTypes) => void
}

export interface authenticationStoreType {
    account: Partial<authenticationTypes>
    setAccount: (newAccount: Partial<authenticationTypes>) => void
    loading: boolean
    setLoading: (loading: boolean) => void
    showPassword: boolean
    setShowPassword: (newValue: boolean) => void
}