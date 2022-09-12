import { Props } from './interface'
import config from './config'

const { populationLimit, generationLimit, crossProbability, mutationProbability } = config
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
    do {
        individual = []
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < products.length; i++) {
            individual.push(Math.round(Math.random()))
        }
    } while (getTotalWeight(individual) > limit)
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
    if (Math.random() < crossProbability) {
        const crossPoint = Math.floor(Math.random() * firstIndividual.length)
        const firstChild = [
            ...firstIndividual.slice(0, crossPoint),
            ...secondIndividual.slice(crossPoint),
        ]
        const secondChild = [
            ...secondIndividual.slice(0, crossPoint),
            ...firstIndividual.slice(crossPoint),
        ]
        return [firstChild, secondChild]
    }
    return [firstIndividual, secondIndividual]
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
    do {
        newIndividual.forEach((value, index) => {
            if (Math.random() < mutationProbability) {
                newIndividual[index] = value === 0 ? 1 : 0
            }
        })
    } while (getTotalWeight(newIndividual) > limit)
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
    return {
        bestIndividual,
        totalWeight: getTotalWeight(bestIndividual),
        totalEarnings: getTotalEarnings(bestIndividual),
    }
}

module.exports = intelliModule
