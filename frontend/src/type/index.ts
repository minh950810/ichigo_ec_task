export enum Loyalty {
    Bronze,
    Silver,
    Gold
}

export interface Order {
    orderId: string
    incents: number
    date: Date
}

export interface Customer {
    userId: string
    name: string
    orders: Order[]
    spentAmount: number
    amountToNext: number
    loyalty: number
    downgradeYear: number
}
