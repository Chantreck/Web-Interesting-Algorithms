var distances = [[Infinity, 3, 5], [3, Infinity, 4], [5, 4, Infinity]];

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

    }

    calculateFitness() {
        let tour = this.genes;
        let tourLength = 0;
        for (let i = 0; i < tour.length - 1; i++) {
            tourLength += distances[tour[i]][tour[i+1]];
        }
        tourLength += distances[tour[tour.length - 1]][tour[0]];
        return tourLength;
    }

    static crossover(parent1, parent2, swapSize) { //передавать genesArray!
        let child = parent1;
        let swapFirstGene = getRandom(child.length - swapSize + 1);
        let addedCities = [];
        let deletedCities = [];
    
        for (let i = swapFirstGene; i < swapFirstGene + swapSize; i++) {
            let deletedCity = child[i];
            let addedCity = parent2[i];
            child[i] = addedCity;
    
            if (deletedCities.includes(addedCity) && addedCities.includes(deletedCity)) {
                deletedCities.splice(deletedCities.indexOf(addedCity), 1);
                addedCities.splice(addedCities.indexOf(deletedCity), 1);
            }
            else if (deletedCities.includes(addedCity)) {
                deletedCities.splice(deletedCities.indexOf(addedCity), 1);
                deletedCities.push(deletedCity);
            }
            else if (addedCities.includes(deletedCity)) {
                addedCities.splice(addedCities.indexOf(deletedCity), 1);
                addedCities.push(addedCity);
            }
            else {
                addedCities.push(addedCity);
                deletedCities.push(deletedCity);
            }
        }
    
        for (let i = 0; i < child.length; i++) {
            if (i >= swapFirstGene && i < swapFirstGene + swapSize) continue;
            if (addedCities.includes(child[i])) {
                let position = getRandom(deletedCities.length);
                child[i] = deletedCities[position];
                deletedCities.splice(position, 1);
            }
        }
    
        return child;
    }

    static mutation(chromosome) {
        let genes = chromosome.genesArray;
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

