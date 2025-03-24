import React, { ChangeEventHandler, MouseEventHandler } from "react"

export interface authenticationTypes {
    fullName: string
    email: string
    password?: string
    passwordConfirmation?: string
    profile?: null | string
    subsribe?: boolean
    admin?: boolean
}
export interface accountTypes {
    data: {
        _id?: string
        fullName: string
        email: string
        password: string
        passwordConfirmation: string
        profile?: null | string
        subsribe?: boolean
        admin?: boolean
        description?: string
    }[]
}

export interface ordersTypes {
    data: {
        _id?: string
        userId: {
            fullName: string
            email: string
            profile?: null | string
            subsribe?: boolean
            admin?: boolean
        }
        products: {
            productId: {
                _id?: string
                name: string
                description: string
                price: number
                picture: string
                categoryId: {
                    _id?: string
                    categoryName: string
                }
                createAt?: string
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
        _id?: string
        name: string
        description: string
        price: number
        pictures: string[]
        categoryId: {
            _id?: string
            categoryName: string
        }
        createAt?: string
    }[]

}
export interface inputTypes {
    name: string
    description: string
    price: number | null
    pictures: string[]
    categoryId: string
    [key: string]: string | number | null | string[]
}

export type loadingTypes = {
    newProduct: boolean
    showProducts: boolean
}
export type popUpTypes = {
    modify: boolean
    remove: boolean
    productId?: string | null
    categorieId?: string | null
}
export interface categoriesTypes {
    data: {
        _id?: string
        categoryName: string
    }[]
}

export type categorieNameTypes = { categoryName: string }
export interface contactsTypes {
    data: {
        _id: string,
        name: string,
        email: string,
        description: string
    }[]
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
    setPopUp: React.Dispatch<React.SetStateAction<popUpTypes>>
    productValue: inputTypes
    setProductValue: React.Dispatch<React.SetStateAction<inputTypes>>
    onChange: ChangeEventHandler
    pictureValue: string
    pictureAction: (action: string, index?: number) => void
    onCreateProduct: MouseEventHandler
    categories: categoriesTypes
    loading?: loadingTypes
    pictureMethod: (productId: string | null) => void
    product?: inputTypes
}
export type productCardsComponentsTypes = {
    loading: loadingTypes,
    products: productsTypes
    handelProduct: (id: string | null) => void
    setPopUp: React.Dispatch<React.SetStateAction<popUpTypes>>
    isUrl: (url: string) => string
}