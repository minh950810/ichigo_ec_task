import Customers from '@/models/customerModel'
import { Order } from '@/common/type'
import {
    calculateAmountToNext,
    downgradable,
    calculateLoyalty,
    getLastYear,
    getStartDate,
    getDownGradeYear,
    getYearFlag
} from '../utils'

export const addOrderHandler = async (
    customerId: string,
    customerName: string,
    newOrder: Order
) => {
    try {
        //check existance
        const exist = await Customers.findOne({ userId: customerId })
        const flag = getYearFlag(newOrder.date)

        const bonusThisYear = flag == 2 ? newOrder.incents : 0
        const bonusLastYear = flag == 1 ? newOrder.incents : 0

        if (exist) {
            const thisYear = exist.tier?.thisYear || 0
            const lastYear = exist.tier?.lastYear || 0


            //add the Order info
            const customer = await Customers.findOneAndUpdate(
                { userId: customerId },
                {
                    $push: { orders: newOrder },
                    tier: {
                        thisYear: thisYear + bonusThisYear,
                        lastYear: lastYear + bonusLastYear
                    },
                    loyalty: calculateLoyalty(thisYear + lastYear + newOrder.incents)
                },
                { new: true }
            )
            return customer
        } else {
            //create the new customer
            const newCustomer = await Customers.create({
                name: customerName,
                userId: `${customerName.split(' ').join('')}-${Date.now()}`,
                orders: newOrder,
                tier: {
                    lastYear: bonusLastYear,
                    thisYear: bonusThisYear
                },
                loyalty: calculateLoyalty(newOrder.incents)
            })

            if (newCustomer) return newCustomer
            else return null
        }
    } catch (error) {
        return null
    }
}

export const getCustomerOrdersHandler = async (customerId: string) => {
    try {
        //fetch the customer by id with order date from start of last  year
        const customer = await Customers.findOne(
            { userId: customerId },
            {
                orders: {
                    $filter: {
                        input: '$orders',
                        as: 'order',
                        cond: { $gt: ['$$order.date', getLastYear()] }
                    }
                },
                name: 1,
                userId: 1
            }
        )
        if (!customer) return null
        console.log(customer)

        const { userId, name } = customer
        const paginatedOrders = customer.orders.sort(
            (a: Order, b: Order) => b.date.getTime() - a.date.getTime()
        )

        return {
            userId,
            name,
            orders: paginatedOrders
        }
    } catch (error) {
        return null
    }
}

export const getCustomerInfoHandler = async (page: number, limit: number) => {
    try {
        const validPage = page > 0 ? page : 1
        const validLimit = limit > 0 ? limit : 10
        const customer = await Customers.find({})
            .limit(validLimit * 1)
            .skip((validPage - 1) * validLimit)
            .sort({ updatedAt: -1 })
            .exec()
        if (customer) {
            const result = []
            for (let i = 0; i < customer.length; i++) {
                const tier = {
                    thisYear: customer[i].tier?.thisYear || 0,
                    lastYear: customer[i].tier?.lastYear || 0
                }

                //get the advanced info
                const { userId, name, loyalty } = customer[i]
                const startDate = getStartDate()
                const spentAmount = tier.thisYear + tier.lastYear
                const amountToNext = calculateAmountToNext(spentAmount, loyalty)
                const downgrade = downgradable(tier.thisYear, loyalty)
                const downgradeYear = getDownGradeYear(downgrade)
                result.push({
                    userId,
                    name,
                    loyalty,
                    startDate,
                    spentAmount,
                    amountToNext,
                    downgrade,
                    downgradeYear
                })
            }

            return result
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

//yearly update
export const newYearUpdate = async () => {
    try {
        const customer = await Customers.updateMany({}, [
            {
                $set: {
                    'tier.lastYear': '$tier.thisYear',
                    'tier.thisYear': 0,
                    loyalty: {
                        $cond: {
                            if: { $gt: ['$tier.thisYear', 500] },
                            then: 2,
                            else: {
                                $cond: {
                                    if: { $gt: ['$tier.thisYear', 100] },
                                    then: 1,
                                    else: 1
                                }
                            }
                        }
                    }
                }
            }
        ])
        return customer
    } catch (error) {
        return null
    }
}
