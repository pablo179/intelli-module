const intelliModule = require('..')

const budget = 1000
const products = [
    { name: 'Apple', weight: 100, earning: 50 },
    { name: 'Banana', weight: 200, earning: 30 },
    { name: 'Orange', weight: 300, earning: 70 },
    { name: 'Pineapple', weight: 400, earning: 25 },
    { name: 'Grape', weight: 500, earning: 60 },
    { name: 'Watermelon', weight: 100, earning: 80 },
    { name: 'Mango', weight: 500, earning: 90 },
    { name: 'Papaya', weight: 200, earning: 20 },
    { name: 'Strawberry', weight: 100, earning: 40 },
    { name: 'Peach', weight: 300, earning: 50 },
    { name: 'Pear', weight: 200, earning: 30 },
    { name: 'Cherry', weight: 100, earning: 70 },
    { name: 'Kiwi', weight: 200, earning: 25 },
    { name: 'Lemon', weight: 300, earning: 60 },
    { name: 'Pomegranate', weight: 400, earning: 80 },
    { name: 'Raspberry', weight: 500, earning: 90 },
    { name: 'Blueberry', weight: 100, earning: 20 },
]

const response = intelliModule({
    budget,
    products,
})
console.log('response', response)
const productsToBuy = []
response.forEach((item, index) => {
    if (item) {
        productsToBuy.push(products[index])
    }
})
console.log('products to buy:', productsToBuy)
console.log(
    'total cost:',
    productsToBuy.reduce((acc, item) => acc + item.weight, 0)
)

console.log(
    'total earning:',
    productsToBuy.reduce((acc, item) => acc + item.earning, 0)
)
