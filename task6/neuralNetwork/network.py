# Код написан на основе книги Майкла Нильсена http://neuralnetworksanddeeplearning.com/

import numpy as np
import random
import json
import loader

class Network():
    def __init__(self, structure):
        self.layers_count = len(structure)
        self.weights = [np.random.randn(x, y)/np.sqrt(x) for x, y in zip(structure[1:], structure[:-1])]
        self.biases = [np.random.randn(x, 1) for x in structure[1:]]

    def learning(self, epochs, batch_size, alpha, train_data, validation_data):
        for i in range(epochs):
            random.shuffle(train_data)
            batches = [train_data[k:k+batch_size] for k in range(0, len(train_data), batch_size)]
            for batch in batches:
                self.update_batch(batch, alpha)
                
            random.shuffle(validation_data)
            batches = [validation_data[k:k+batch_size] for k in range(0, len(validation_data), batch_size)]
            for batch in batches:
                self.update_batch(batch, alpha)
                
            print(f"Epoch {i} ended")

    def update_batch(self, batch, alpha):
        sum_weight_gradient = [np.zeros(weights.shape) for weights in self.weights]
        sum_bias_gradient = [np.zeros(biases.shape) for biases in self.biases]
        for image, label in batch:
            delta_weight_gradient, delta_bias_gradient = self.back_propagation(image, label)
            sum_weight_gradient = [sum_grad + delta for (sum_grad, delta) in zip(sum_weight_gradient, delta_weight_gradient)]
            sum_bias_gradient = [sum_grad + delta for (sum_grad, delta) in zip(sum_bias_gradient, delta_bias_gradient)]
        self.weights = [weights - (alpha / len(batch)) * delta for weights, delta in zip(self.weights, sum_weight_gradient)]
        self.biases = [biases - (alpha / len(batch)) * delta for biases, delta in zip(self.biases, sum_bias_gradient)]

    def back_propagation(self, image, label):
        weight_gradient = [np.zeros(weights.shape) for weights in self.weights]
        bias_gradient = [np.zeros(biases.shape) for biases in self.biases]

        network_input = image
        layers = [image]
        z_vectors = []

        for weight, bias in zip(self.weights, self.biases):
            z_vector = np.dot(weight, network_input) + bias
            z_vectors.append(z_vector)
            network_input = sigmoid(z_vector)
            layers.append(network_input)

        for i in range(1, self.layers_count):
            if i == 1:
                delta = cost_derivative(layers[-1], label) * sigmoid_derivative(z_vectors[-1]) # вычисляем выходную ошибку
            else: 
                delta = np.dot(self.weights[-i+1].transpose(), delta) * sigmoid_derivative(z_vectors[-i]) # вычисляем ошибки на внутренних слоях
                
            weight_gradient[-i] = np.dot(delta, layers[-i-1].transpose()) # градиент весов
            bias_gradient[-i] = delta # градиент сдвигов

        return (weight_gradient, bias_gradient)

    def get_result(self, test_data):
        test_results = [(np.argmax(self.feed_forward(image)), label) for (image, label) in test_data]
        print(sum(int(network_result == label) for (network_result, label) in test_results))

    def feed_forward(self, values):
        for weight, bias in zip(self.weights, self.biases):
            values = sigmoid(np.dot(weight, values) + bias)
        return values

    def save(self):
        data = {"weights": [weights.tolist() for weights in self.weights],
                "biases": [biases.tolist() for biases in self.biases]}
        f = open("weights.txt", "w")
        json.dump(data, f)
        f.close()

def sigmoid(vector):
    return 1.0/(1.0 + np.exp(-vector))

def sigmoid_derivative(vector):
    return sigmoid(vector)*(1 - sigmoid(vector))

def cost_derivative(output, label):
        return (output - label)

training_data, validation_data, test_data = loader.load_data()

network = Network([784, 25, 10])
network.get_result(test_data)

EPOCHS_COUNT = 30
BATCH_SIZE = 10
ALPHA = 4.0

network.learning(EPOCHS_COUNT, BATCH_SIZE, ALPHA, training_data, validation_data)
network.get_result(test_data)
network.save()
