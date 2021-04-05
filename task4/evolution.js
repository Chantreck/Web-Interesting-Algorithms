var citiesCount;
var distances;
var crossoverConstant;
var mutationRate = 0.15;
var populationSize = 10000;
var calculatedFitness = new Map();

class Chromosome {
    constructor(genesArray) {
        if (genesArray) {
            this.genes = genesArray;
        } else {
            this.genes = this.combinateGenes();
        }
        this.fitness = this.calculateFitness();
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
            fitness = +fitness.toFixed(3);
            calculatedFitness.set(tour, fitness);
        }
        else {
            fitness = calculatedFitness.get(tour);
        }
        return fitness;
    }

    mutation() {
        let genes = this.genes.slice();

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
    
        for (let i = 0; i < child.length; i++) {
            if (i >= swapFirstGene && i < swapFirstGene + crossoverConstant) continue;
            if (addedCities.includes(child[i])) {
                let position = getRandom(deletedCities.length);
                child[i] = deletedCities[position];
                deletedCities.splice(position, 1);
            }
        }
        return new Chromosome(child);
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

        let mutatedChildrenCount = Math.floor(populationSize * mutationRate);
        for (let i = 0; i < mutatedChildrenCount; i++) {
            let victim = getRandom(populationSize);
            children[victim] = children[victim].mutation();
        }
        
        return this.concat(children);
    }

    selection() {
        this.sort(Chromosome.selection);
        return this.slice(0, populationSize);
    }

    visualize(cities, lines) {
        window.lines = [];
        let tour = this[0].genes;
        for (let i = 0; i < tour.length - 1; i++) {
            let departure = tour[i];
            let arrival = tour[i + 1];
            window.lines.push(new Line(cities[departure], cities[arrival]));
        }
        let lastCity = tour[tour.length - 1];
        window.lines.push(new Line(cities[lastCity], cities[tour[0]]));
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

export function showInfo(state) {
    window.hiddenInfo.style.display = state;
}

function updateInfo(generationNumber, tourLength) {
    window.generationNumber.innerText = generationNumber;
    window.tourLength.innerText = tourLength;
}

export async function evolution(cities, lines) {
    citiesCount = cities.length;
    crossoverConstant = getRandom(citiesCount / 2);
    distances = calculateDistances(cities);

    let generationNumber = 0;
    let generation = new Population();
    let newGeneration = new Population();
    newGeneration.makeGeneration(populationSize);

    showInfo("block");
    updateInfo(generationNumber, newGeneration[0].fitness);
    newGeneration.visualize(cities, window.lines);
    await sleep(250);

    while(!Population.isEqual(generation, newGeneration) && generationNumber < 1000) {
        generation = newGeneration.slice();
        newGeneration = generation.breeding();
        newGeneration = newGeneration.selection();
        newGeneration.visualize(cities, lines);
        generationNumber++;
        updateInfo(generationNumber, newGeneration[0].fitness);
        await sleep(100);
    }
}

import {Line} from '../dots.js';
import {sleep, buttonsActivity} from '../general.js'