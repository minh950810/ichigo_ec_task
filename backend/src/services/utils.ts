import { loyalty } from "../common/constant"
import { Loyalty } from "../common/type"

export function calculateAmountToNext(tier: number, current: string): number {
    if (current == Loyalty.Gold.toString()) return 0
    if (current == Loyalty.Silver.toString()) return loyalty[Loyalty.Gold] - tier
    return loyalty[Loyalty.Silver] - tier
}

export function downgradable(tier: number, current: string): boolean | null {
    if (current == Loyalty.Gold.toString() && tier < loyalty[Loyalty.Gold]) return true
    if (current == Loyalty.Silver.toString() && tier < loyalty[Loyalty.Silver]) return true
    return null
}

export function calculateLoyalty(tier: number) {
    if (tier >= loyalty[Loyalty.Gold]) return Loyalty.Gold
    if (tier >= loyalty[Loyalty.Silver]) return Loyalty.Silver
    return Loyalty.Bronze
}
