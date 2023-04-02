import matplotlib.pyplot as plt
from sklearn.metrics import ConfusionMatrixDisplay
import pickle
import numpy as np
import pandas as pd
import json

y = pd.read_csv('y_train.csv', header=None).values
data = np.load('dataRF.npy')
model = pickle.load(open('./models/random_forest_model.sav', 'rb'))
print('Accuracy:', model.score(data, y))
print('Predictions: ', model.predict(data))

output = {
    'accuracy': model.score(data, y),
    'predictions': np.array2string(model.predict(data)),
}

ConfusionMatrixDisplay.from_estimator(model, data, y)
plt.savefig('./models/images/model3.png')

json_string = json.dumps(output)
print(json_string)

with open('model3.json', 'w') as outfile:
    json.dump(json_string, outfile)