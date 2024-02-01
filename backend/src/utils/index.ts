import { loyalty } from '@/common/constant'
import { Loyalty } from '@/common/type'

export const calculateAmountToNext = (tier: number, current: string): number => {
    if (current == Loyalty.Gold.toString()) return 0
    if (current == Loyalty.Silver.toString()) return loyalty[Loyalty.Gold] - tier
    return loyalty[Loyalty.Silver] - tier
}

export const downgradable = (tier: number, current: string): boolean | null => {
    if (current == Loyalty.Gold.toString() && tier < loyalty[Loyalty.Gold]) return true
    if (current == Loyalty.Silver.toString() && tier < loyalty[Loyalty.Silver]) return true
    return null
}

export const calculateLoyalty = (tier: number): Loyalty => {
    if (tier >= loyalty[Loyalty.Gold]) return Loyalty.Gold
    if (tier >= loyalty[Loyalty.Silver]) return Loyalty.Silver
    return Loyalty.Bronze
}

export const getLastYear = (): Date => {
    const startOfLastYear = new Date()
    startOfLastYear.setFullYear(startOfLastYear.getFullYear() - 1)
    startOfLastYear.setMonth(0) // January
    startOfLastYear.setDate(1) // 1st day of the month
    return startOfLastYear
}

export const getStartDate = (): number => {
    return new Date().getFullYear() - 1
}

export const getDownGradeYear = (downgrade: boolean | null): number => {
    const downgradeYear =
        downgrade == true ? new Date().getFullYear() + 1 : new Date().getFullYear() + 2
    return downgradeYear
}

export const getYearFlag = (date: Date): number => {
    const thisYear = new Date().getFullYear()
    const lastYear = thisYear - 1
    const dateInfo = new Date(date).getFullYear()
    return dateInfo >= thisYear ? 2 : dateInfo >= lastYear ? 1 : 0
}
