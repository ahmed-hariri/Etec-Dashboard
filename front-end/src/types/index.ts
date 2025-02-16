export interface accountTypes {
    _id?: string
    fullName: string
    email: string
    password: string
    passwordConfirmation: string
    profile?: null
    subsribe?: boolean
    admin?: boolean
}

export interface ordersTypes {
    _id?: string
    userId: Partial<accountTypes>
    products: [
        { productId: string, quantity: number }
    ]
    status: "Processing" | "Shipped" | "Delivered"
    totalPrice: number
    createdAt: string
}

export interface productsTypes {
    _id?: string
    name: string
    description: string
    price: number
    picture: string
    categoryId: {
        _id?: string
        categoryName: string
    }
}

export interface CategorysTypes {
    _id: string,
    categoryName: string
}

export interface inputsTypes {
    type: string,
    inputName: string,
    inputLabel: string,
    placeHolder: string
}