const intelliModule = require('..')

const budget = 130
const products = [
    { name: 'Apple', weight: 30, earning: 50 },
    { name: 'Banana', weight: 20, earning: 30 },
    { name: 'Orange', weight: 60, earning: 70 },
    { name: 'Pineapple', weight: 10, earning: 25 },
    { name: 'Grape', weight: 40, earning: 60 },
]

const response = intelliModule({
    budget,
    products,
})

console.log(response)
