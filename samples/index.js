const intelliModule = require('..')
const fs = require('fs')
const { performance } = require('perf_hooks')
const budget = 500
const products = [
    {
        weight: 1,
        earning: 4
    },
    {
        weight: 26,
        earning: 13
    },
    {
        weight: 10,
        earning: 2.5
    },
    {
        weight: 25,
        earning: 14
    },
    {
        weight: 15,
        earning: 4
    },
    {
        weight: 22,
        earning: 2
    },
    {
        weight: 71,
        earning: 10
    },
    {
        weight: 29,
        earning: 10
    },
    {
        weight: 60,
        earning: 40
    },
    {
        weight: 50.75,
        earning: 8.75
    },
    {
        weight: 55,
        earning: 3
    },
    {
        weight: 15,
        earning: 4
    },
    {
        weight: 7,
        earning: 2
    },
    {
        weight: 33,
        earning: 1
    },
    {
        weight: 60,
        earning: 11
    },
    {
        weight: 8,
        earning: 4
    },
    {
        weight: 18,
        earning: 3
    },
    {
        weight: 3,
        earning: 1
    },
    {
        weight: 45,
        earning: 4
    },
    {
        weight: 15,
        earning: 3
    },
    {
        weight: 140,
        earning: 30
    },
    {
        weight: 24,
        earning: 4
    },
    {
        weight: 13,
        earning: 2
    },
    {
        weight: 115,
        earning: 11
    },
    {
        weight: 33,
        earning: 3
    },
    {
        weight: 49,
        earning: 6
    },
    {
        weight: 110,
        earning: 18
    },
    {
        weight: 30,
        earning: 10
    },
]
const renderTest = () => {
    const headers = 'time, result \n'
    fs.writeFile('result.csv', headers, err => {
        if (err) {
          console.error(err);
        }
      })
    for (let i = 0; i < 50; i++) {
        const startTime = performance.now()
        const response = intelliModule({
            budget,
            products,
        })
        const endTime = performance.now()
        const row = `${endTime - startTime}, ${response.totalEarnings} \n`
        fs.appendFileSync('result.csv', row)
    }
}
renderTest()