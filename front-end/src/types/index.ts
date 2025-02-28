export interface accountTypes {
    _id?: string
    fullName: string
    email: string
    password: string
    passwordConfirmation: string
    profile?: null | string
    subsribe?: boolean
    admin?: boolean
}

export interface ordersTypes {
    _id?: string
    userId: Partial<accountTypes>
    products: { productId: string, quantity: number }[]
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

export interface purchasedTypes extends productsTypes {
    date: string
}
export interface categorieTypes {
    _id?: string
    categoryName: string
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