import pandas as pd
import numpy as np
from mne.io import RawArray
import mne
from mne.preprocessing import ICA, create_ecg_epochs
from mne_features.feature_extraction import extract_features

data = pd.read_csv('x_train.csv', header=None)

rows_to_drop = []
for i in range(256):
    rows_to_drop.append(i)
data = data.drop(labels = rows_to_drop, axis = 0)

data = data.values
sensor1 = np.zeros((896,140))
sensor2 = np.zeros((896,140))
sensor3 = np.zeros((896,140))
column = 0
column2 = 0
column3 = 0
for i in range(420):
    if i<140:
        sensor1[:,column] = data[:,i]
        column += 1
    elif i>=140 and i<280:
        sensor2[:,column2] = data[:,i]
        column2 += 1
    elif i>=280 and i<420:
        sensor3[:,column3] = data[:,i]
        column3 += 1
sensor1 = sensor1.T
sensor2 = sensor2.T
sensor3 = sensor3.T

sensor = np.stack((sensor1, sensor3), axis = 1)
sensor = sensor.reshape((2,140,896))
sensor = sensor.reshape(sensor.shape[0], (sensor.shape[1] * sensor.shape[2]))

ch_names = ['C3', 'C4']

info_sensor = mne.create_info(ch_names = ch_names, sfreq = 128, ch_types=['eeg']*2)
raw = RawArray(sensor, info = info_sensor)

raw = raw.copy().filter(l_freq=None, h_freq=40)

raw = raw.copy().filter(l_freq = 1., h_freq=None)

ica = mne.preprocessing.ICA(n_components = 2, random_state = 97, max_iter = 'auto')
ica.fit(raw)

ica.apply(raw)

epochs =  mne.make_fixed_length_epochs(raw, duration = 7, preload = True)
data = epochs.get_data()
print(data.shape)

data = epochs.get_data()

selected_funcs = ['app_entropy', 'time_corr'] #Using the following features for applying onto gridSearchCV
X_new =  extract_features(data, 128, selected_funcs)
X_RF = extract_features(data, 128, ['app_entropy', 'quantile', 'time_corr', 'mean'])

np.save('data.npy', X_new)
np.save('dataRF.npy', X_new)