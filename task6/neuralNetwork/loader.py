import pickle
import gzip
import numpy as np

def load_data():
    # Возвращает кортеж из тренировочных, контрольных и тестовых данных
    # Тренировочные и контрольные данные хранятся в формате: (вектор пикселей, вектор выходных данных)
    # Тестовые данные хранятся в формате: (вектор пикселей, метка)

    f = gzip.open('mnist.pkl.gz', 'rb')
    u = pickle._Unpickler(f)
    u.encoding = 'latin1'
    training_data, validation_data, test_data = u.load()
    f.close()

    training_inputs = [np.reshape(x, (784, 1)) for x in training_data[0]]
    training_results = [vectorized_result(y) for y in training_data[1]]
    training_data = list(zip(training_inputs, training_results))

    validation_inputs = [np.reshape(x, (784, 1)) for x in validation_data[0]]
    validation_results = [vectorized_result(y) for y in validation_data[1]]
    validation_data = list(zip(validation_inputs, validation_results))
    
    test_inputs = [np.reshape(x, (784, 1)) for x in test_data[0]]
    test_data = list(zip(test_inputs, test_data[1]))
    
    return (training_data, validation_data, test_data)

def vectorized_result(number):
    # Переделывает стандартную метку в вектор
    
    vector = np.zeros((10, 1))
    vector[number] = 1.0
    
    return vector
