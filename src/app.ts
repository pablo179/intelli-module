import { Props } from './interface'
import config from './config'
import { performance } from 'perf_hooks';

const { populationLimit, generationLimit } = config
let products = []
let limit
let population = []
let pairs = [[], []]

const getTotalWeight = (individual) => {
    const totalWeight = individual.reduce((total, value, index) => {
        if (value === 1) {
            return total + products[index].weight
        }
        return total
    }, 0)
    return totalWeight
}

const getTotalEarnings = (individual) => {
    const totalEarnings = individual.reduce((total, value, index) => {
        if (value === 1) {
            return total + products[index].earning
        }
        return total
    }, 0)
    return totalEarnings
}

const createIndividual = () => {
    let individual
    individual = new Array(products.length)
        .fill(0)
        .map(() => Math.round(Math.random()))
    if (getTotalWeight(individual) > limit) {
        individual = createIndividual()
    }
    return individual
}

const createPairs = () => {
    pairs = [[], []]
    const orderedPopulation = population.sort(
        (a, b) => getTotalEarnings(a) - getTotalEarnings(b)
    )
    for (let i = 0; i < 2; i++) {
        pairs[0].push(orderedPopulation[i])
        pairs[1].push(orderedPopulation[i + 1])
    }
}

const crossPair = (firstIndividual, secondIndividual) => {
    const crossPoint = Math.floor(Math.random() * firstIndividual.length)
    const firstChild = firstIndividual
        .slice(0, crossPoint)
        .concat(secondIndividual.slice(crossPoint))
    const secondChild = secondIndividual
        .slice(0, crossPoint)
        .concat(firstIndividual.slice(crossPoint))
    return [firstChild, secondChild]
}

const crossEachPair = () => {
    const children = []
    pairs.forEach((pair) => {
        children.push(crossPair(pair[0], pair[1]))
    })
    pairs = [...children]
}

const mutation = (individual) => {
    const newIndividual = individual
    newIndividual.forEach((value, index) => {
        if (Math.random() < 0.1) {
            newIndividual[index] = value === 0 ? 1 : 0
        }
    })
    if (getTotalWeight(newIndividual) > limit) {
        mutation(individual)
    }
    return newIndividual
}

const insertNewIndividuals = () => {
    const orderedPopulation = population.sort(
        (a, b) => getTotalEarnings(a) - getTotalEarnings(b)
    )
    const newIndividuals = pairs.flat()
    newIndividuals.forEach((individual, index) => {
        orderedPopulation[index] = individual
    })
}

const getBestIndividual = () => {
    const orderedPopulation = population.sort(
        (a, b) => getTotalEarnings(b) - getTotalEarnings(a)
    )
    return orderedPopulation[0]
}

const intelliModule = (props: Props) => {
    const startTime = performance.now()
    products = props.products
    limit = props.budget
    population = new Array(populationLimit)
        .fill(0)
        .map(() => createIndividual())
    for (let i = 0; i < generationLimit; i++) {
        createPairs()
        crossEachPair()
        pairs.forEach((pair) => {
            pair.forEach((individual) => {
                mutation(individual)
            })
        })
        insertNewIndividuals()
    }
    const bestIndividual = getBestIndividual()
    const endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return {
        bestIndividual,
        totalWeight: getTotalWeight(bestIndividual),
        totalEarnings: getTotalEarnings(bestIndividual),
    }
}

module.exports = intelliModule
