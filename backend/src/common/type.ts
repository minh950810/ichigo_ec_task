export interface Order {
    orderId: string
    incents: number
    date: Date
}

export enum Loyalty {
    Bronze,
    Silver,
    Gold
}
