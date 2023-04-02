const express = require('express')
const {spawn} = require('child_process');
const { json } = require('express');
const app = express()
const port = 4000

var modelOne = {
  id: 1,
  modelName: 'XGBoost',
  description: 'For our baseline model, we constructed a pipeline with standard scalar and XG classifier and computed cross-validation scores by training our model on different training sets and testing on validation sets. To make further improvements to our baseline model, we performed GridSearchCV along with cross-validation to find the optimal parameters. ',
  results: 'After obtaining the optimal parameters we again computed the cross-validation accuracy score but this time with the best parameters. Finally, we test the trained model on hidden test data.',
  imageURL: 'http://localhost:4000/imgModelOne',
}

var modelTwo = {
  id: 2,
  modelName: 'Adaboost',
  description: 'For classification problems adaptive booting is the useful ensemble technique. The weight-assigning method of adaboost after each iteration is the strongest feature of adaboost which makes this model unique from others.',
  results: 'This model performs well when we extract the features of app_entropy and time_corr which is time correlation from the BCI dataset.',
  imageURL: 'http://localhost:4000/imgModelTwo',

}

var modelThree = {
  id: 3,
  modelName: 'Random Forest',
  description: 'Random Forest a strong candidate for this project where we need to classify BCI signals. There are three hyper-parameters that are tuned before the actual training begins. We further applied cross-validation (K-fold) for better training results and to avoid overfitting and finally used GridSearch to set the best parameters for our model.',
  results: 'The following is the predictions accuracy.',
  imageURL: 'http://localhost:4000/imgModelThree',

}

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  next();
});

app.get('/', (req, res) => {
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['script1.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend)
  });
})

app.get('/modelOne', (req, res) => {
  const python = spawn('python3', ['model1.py']);
  python.on('close', () => {
    const jsonData= require('./model1.json'); 
    const obj = JSON.parse(jsonData)
    modelOne.accuracy = obj.accuracy
    modelOne.predictions = obj.predictions
    console.log(modelOne)
    res.send(modelOne)
  });
})

app.get('/imgModelOne', (req, res) => {
  res.sendFile('./models/images/model1.png', { root: __dirname })
})

app.get('/modelTwo', (req, res) => {
  const python = spawn('python3', ['model2.py']);
  python.on('close', () => {
    const jsonData= require('./model2.json'); 
    const obj = JSON.parse(jsonData)
    modelTwo.accuracy = obj.accuracy
    modelTwo.predictions = obj.predictions
    console.log(modelTwo)
    res.send(modelTwo)
  });
})

app.get('/imgModelTwo', (req, res) => {
  res.sendFile('./models/images/model2.png', { root: __dirname })
})

app.get('/modelThree', (req, res) => {
  const python = spawn('python3', ['model3.py']);
  python.on('close', () => {
    const jsonData= require('./model3.json'); 
    const obj = JSON.parse(jsonData)
    modelThree.accuracy = obj.accuracy
    modelThree.predictions = obj.predictions
    console.log(modelThree)
    res.send(modelThree)
  });
})

app.get('/imgModelThree', (req, res) => {
  res.sendFile('./models/images/model3.png', { root: __dirname })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})