var citiesCount;
var distances;
var crossoverConstant;
var mutationRate = 0.1;
var populationSize = 1000;
var calculatedFitness = new Map();

class Chromosome {
    // constructor(parent1 = "Adam", parent2 = "Eve", genesArray) {
    constructor(genesArray) {
        if (genesArray) {
            this.genes = genesArray;
        } else {
            this.genes = this.combinateGenes();
        }
        this.fitness = this.calculateFitness();
        /* this.parent1 = parent1;
        this.parent2 = parent2; */
    }

    combinateGenes() {
        let citiesToAdd = [];
        for (let i = 0; i < citiesCount; i++) {
            citiesToAdd.push(i);
        }
        let combination = [];
        while (citiesToAdd.length) {
            let position = getRandom(citiesToAdd.length);
            combination.push(citiesToAdd[position]);
            citiesToAdd.splice(position, 1);
        }
        return combination;
    }

    calculateFitness() {
        let tour = this.genes;
        let fitness = 0;
        if (!calculatedFitness.has(tour)) {
            for (let i = 0; i < tour.length - 1; i++) {
                fitness += distances[tour[i]][tour[i+1]];
            }
            fitness += distances[tour[tour.length - 1]][tour[0]];
            calculatedFitness.set(tour, fitness);
        }
        else {
            fitness = calculatedFitness.get(tour);
        }
        return fitness;
    }

    mutation() {
        let genes = this.genes;

        let firstPosition = getRandom(genes.length);
        let secondPosition = getRandom(genes.length);
        while (secondPosition == firstPosition) secondPosition = getRandom(genes.length);
        let reverseStart = Math.min(firstPosition, secondPosition);
        let reverseEnd = Math.max(firstPosition, secondPosition);

        let firstSite = genes.slice(0, reverseStart);
        let invertedSite = genes.slice(reverseStart, reverseEnd + 1).reverse();
        let secondSite = genes.slice(reverseEnd + 1);
        let newGenesCombination = firstSite.concat(invertedSite, secondSite);

        return new Chromosome(newGenesCombination);
    }

    static crossover(parent1, parent2) {
        let parent1Genes = parent1.genes;
        let parent2Genes = parent2.genes;
        let child = parent1Genes.slice();
        //let swapFirstGene = 3;
        let swapFirstGene = getRandom(child.length - crossoverConstant + 1);
        let addedCities = [];
        let deletedCities = [];
    
        for (let i = swapFirstGene; i < swapFirstGene + crossoverConstant; i++) {
            let deletedCity = child[i];
            let addedCity = parent2Genes[i];
            child[i] = addedCity;
    
            addedCities.push(addedCity);
            deletedCities.push(deletedCity);
        }

        deletedCities = deletedCities.filter(item => {
            return addedCities.indexOf(item) < 0;
        });

        /* let position = 0;
        while (position < addedCities.length) {
            let city = addedCities[position];
            if (deletedCities.includes(city)) {
                addedCities.splice(addedCities.indexOf(city), 1);
                deletedCities.splice(deletedCities.indexOf(city), 1);
                continue;
            }
            position++;
        } */
    
        for (let i = 0; i < child.length; i++) {
            if (i >= swapFirstGene && i < swapFirstGene + crossoverConstant) continue;
            if (addedCities.includes(child[i])) {
                let position = getRandom(deletedCities.length);
                child[i] = deletedCities[position];
                deletedCities.splice(position, 1);
            }
        }
        return new Chromosome(child);
        /* try {
            return new Chromosome(parent1, parent2, child);
        }
        catch {
            console.log("error caught", parent1, parent2, child);
        }    */
    }

    static selection(chromosome1, chromosome2) {
        return chromosome1.fitness - chromosome2.fitness;
    }
}

class Population extends Array {
    constructor(size = 0) {
        super(size);
    }

    makeGeneration(size) {
        for (let i = 0; i < size; i++) {
            this[i] = new Chromosome();
        }
    }

    breeding() {
        let children = new Population();
        let populationSize = this.length;

        for (let i = 0; i < populationSize; i++) {
            let firstParent = getRandom(populationSize);
            let secondParent;
            do {
                secondParent = getRandom(populationSize);
            } while (secondParent == firstParent);
            children.push(Chromosome.crossover(this[firstParent], this[secondParent]));
        }

        /* if (time) {
            let crossoverstart = Date.now();
            for (let i = 0; i < populationSize; i++) {
                let firstParent = getRandom(populationSize);
                let secondParent;
                do {
                    secondParent = getRandom(populationSize);
                } while (secondParent == firstParent);
                children.push(Chromosome.crossover(this[firstParent], this[secondParent]));
            }
            console.log("> Crossover:", Date.now() - crossoverstart);
        } else {
            for (let i = 0; i < populationSize; i++) {
                let firstParent = getRandom(populationSize);
                let secondParent;
                do {
                    secondParent = getRandom(populationSize);
                } while (secondParent == firstParent);
                children.push(Chromosome.crossover(this[firstParent], this[secondParent]));
            }
        } */

        /* if (time) {
            let crossoverstart = Date.now();
            for (let i = 0; i < populationSize - 1; i++) {
                for (let j = i + 1; j < populationSize; j++) {
                    children.push(Chromosome.crossover(this[i], this[j]));
                }
            }
            console.log("> Crossover:", Date.now() - crossoverstart);
        } else {
            for (let i = 0; i < populationSize - 1; i++) {
                for (let j = i + 1; j < populationSize; j++) {
                    children.push(Chromosome.crossover(this[i], this[j]));
                }
            }
        } */
        
        //let mutatedChildren = new Population();
        let childrenCount = children.length;
        let mutatedChildrenCount = Math.floor(populationSize * mutationRate);

        for (let i = 0; i < mutatedChildrenCount; i++) {
            let victim = getRandom(childrenCount);
            children[victim] = children[victim].mutation();
        }

        /* if (time) {
            let mutationstart = Date.now();
            for (let i = 0; i < mutatedChildrenCount; i++) {
                let victim = getRandom(childrenCount);
                children[victim] = children[victim].mutation();
            }
            console.log("> Mutation:", Date.now() - mutationstart);
        }
        else {
            for (let i = 0; i < mutatedChildrenCount; i++) {
                let victim = getRandom(childrenCount);
                children[victim] = children[victim].mutation();
            }
        } */
        
        return this.concat(children);
    }

    selection() {
        this.sort(Chromosome.selection);
        return this.slice(0, populationSize);
    }

    visualize(cities, lines) {
        lines = [];
        let tour = this[0].genes;
        for (let i = 0; i < tour.length - 1; i++) {
            let departure = tour[i];
            let arrival = tour[i + 1];
            lines.push(new Line(cities[departure], cities[arrival]));
        }
        let lastCity = tour[tour.length - 1];
        lines.push(new Line(cities[lastCity], cities[tour[0]]));
    }

    static isEqual(population1, population2) {
        let result = true;
        for (let i = 0; i < populationSize; i++) {
            result = result && population1[i] == population2[i];
        }
        return result;
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function calculateDistances(cities) {
    let distances = [];
    for (let i = 0; i < cities.length; i++) {
        distances[i] = [];
    }
    for (let i = 0; i < cities.length; i++) {
        for (let j = i; j < cities.length; j++) {
            if (i == j) {
                distances[i][j] = Infinity;
                continue;
            }
            distances[i][j] = Math.sqrt((cities[i].x - cities[j].x)**2 + (cities[i].y - cities[j].y)**2);
            distances[j][i] = distances[i][j];
        }
    }
    return distances;
}

export function evolution(cities, lines) {
    citiesCount = cities.length;
    crossoverConstant = getRandom(citiesCount / 2);
    //console.log("CrossoverConstant", crossoverConstant);
    distances = calculateDistances(cities);

    //console.log(distances);

    let generation = new Population();
    let newGeneration = new Population();
    newGeneration.makeGeneration(populationSize);

    /* let newgenstart = Date.now();
    newGeneration.makeGeneration(populationSize);
    console.log("Making a generation:", Date.now() - newgenstart); */
    //newGeneration.visualize(cities, lines);

    //console.log("Before cycle", newGeneration);

    let generationNumber = 0;

    let evolutionStart = Date.now();

    while(!Population.isEqual(generation, newGeneration)) {
        generation = newGeneration.slice();
        // console.log("start of cycle body", generation);

        newGeneration = generation.breeding();
        /* if (generationNumber == 0) {
            let breedingstart = Date.now();
            newGeneration = generation.breeding(1);
            console.log("Breeding a generation:", Date.now() - breedingstart);
        } else {
            newGeneration = generation.breeding(0);
        } */
        
        //console.log("after breeding", newGeneration);   

        newGeneration = newGeneration.selection();
        /* if (generationNumber == 0) {
            let selectionstart = Date.now();
            newGeneration = newGeneration.selection();
            console.log("Selection a generation:", Date.now() - selectionstart);
        } else {
            newGeneration = newGeneration.selection();
        } */
        //console.log("after selection", newGeneration);
        //newGeneration.visualize(cities, lines);
        generationNumber++;
    }
    
    console.log(`Evolution ended in ${Date.now() - evolutionStart} ms`);
    console.log(`Generations passed: ${generationNumber}`);
    console.log(`Solution:`, generation[0]);
}

export function test(cities, lines) {

    let array = [5, 0, 6, 2, 3, 7, 8, 4, 1];
    let concatslice = Date.now();
    let result1 = deleteValue(array, 5);
    console.log("Concat + slice", Date.now() - concatslice);

    let splice = Date.now();
    let result2 = array.splice(5, 1);
    console.log("Splice", Date.now() - splice);

    /* citiesCount = cities.length;
    crossoverConstant = 3
    distances = calculateDistances(cities);

    let parent1 = new Chromosome("god", "god", [5, 0, 6, 2, 3, 7, 8, 4, 1]);
    let parent2 = new Chromosome("god", "god", [5, 6, 4, 3, 7, 8, 1, 2, 0]);
    debugger;
    let child = Chromosome.crossover(parent1, parent2); */
}

import {Line} from '../dots.js';