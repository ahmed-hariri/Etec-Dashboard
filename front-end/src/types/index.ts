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

export interface productsTypes {
    data: {
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
    }[]

}
export interface categorieTypes {
    data: {
        _id?: string
        categoryName: string
    }[]
}

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