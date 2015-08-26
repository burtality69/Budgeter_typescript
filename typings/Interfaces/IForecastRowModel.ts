interface IForecastRowModel {
    caldate: Date,
    payment_details: {[name: string]: number}
    total_payments: number,
    deduction_details: {[name: string]: number}
    total_deductions: number,
    savings_details: {[name: string]: number}
    total_savings: number,
    balance: number,
    savings: number
}

interface IForecastRowServerModel {
    caldate: string,
    payment_details: {[name: string]: number}
    total_payments: number,
    deduction_details: {[name: string]: number}
    total_deductions: number,
    savings_details: {[name: string]: number}
    total_savings: number,
    balance: number,
    savings: number
}