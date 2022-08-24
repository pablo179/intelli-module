import { Props } from './interface'
import config from './config'

const { populationLimit, generationLimit } = config
let products = []
let budget
let population = []

const getTotalWeight = (individual) => {
    let totalWeight = 0
    individual.forEach((value, index) => {
        if (value === 1) {
            totalWeight += products[index].weight
        }
    })
    return totalWeight
}

const getTotalEarnings = (individual) => {
    let totalEarnings = 0
    individual.forEach((value, index) => {
        if (value === 1) {
            totalEarnings += products[index].earnings
        }
    })
    return totalEarnings
}

const createIndividual = () => {
    const length = products.length
    let individual
    individual = new Array(length).fill(0).map(() => Math.round(Math.random()))
    if (getTotalWeight(individual) > budget) {
        individual = createIndividual()
    }
    return individual
}

const intelliModule = (props: Props) => {
    products = props.products
    budget = props.budget
    population = new Array(populationLimit).fill(0).map(() => createIndividual())
    let bestIndividual = 0
    let actualEarning = getTotalEarnings(population[bestIndividual])
    population.forEach((individual, index) => {
        if (getTotalEarnings(individual) > actualEarning) {
            bestIndividual = index
            actualEarning = getTotalEarnings(individual)
        }
    })
    return population[bestIndividual]
}

module.exports = intelliModule
