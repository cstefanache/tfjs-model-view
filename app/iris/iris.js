import * as tf from '@tensorflow/tfjs';
import ModelView from '../../src';

import {
  IRIS_DATA,
  getIrisData
} from './data';


async function trainModel(xTrain, yTrain, xTest, yTest) {

  // Define the topology of the model: two dense layers.
  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 10,
    activation: 'sigmoid',
    inputShape: [xTrain.shape[1]]
  }));

  model.add(tf.layers.dense({
    units: 3,
    activation: 'softmax'
  }));

  model.summary();

  const optimizer = tf.train.adam(0.02);
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  new ModelView(model, {
    printStats: true,
    radius: 25,
    renderLinks: true,
    layer: {
      'dense_Dense1_input': {
        domainMax: 7
      },
      'dense_Dense2/dense_Dense2': {
        nodePadding: 30
      }
    }
  });

  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest]
  });

  console.log('predicting!')
  setInterval(() => {
    model.predict(tf.tensor([IRIS_DATA[Math.floor(Math.random() * IRIS_DATA.length)].slice(0, 4)]));
  }, 1000);

  return model;
}

const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

export default async () => {
  trainModel(xTrain, yTrain, xTest, yTest);
}
