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
    units: 10,
    activation: 'sigmoid',
    inputShape: [10]
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
    xOffset: 100,
    renderNode(ctx, node) {
      const { x, y, value } = node;
      ctx.font = '10px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value * 100) / 100, x, y);
    },
    onBeginRender: renderer => {
      const { renderContext } = renderer;
      renderContext.fillStyle = '#000';
      renderContext.textAlign = 'end';
      renderContext.font = '12px Arial';
      renderContext.fillText('Sepal Length (cm)', 110, 110);
      renderContext.fillText('Sepal Width (cm)', 110, 136);
      renderContext.fillText('Petal Length (cm)', 110, 163);
      renderContext.fillText('Petal Width (cm)', 110, 190);

      renderContext.textAlign = 'start';
      renderContext.fillText('Setosa', renderer.width - 60, 95);
      renderContext.fillText('Versicolor', renderer.width - 60, 150);
      renderContext.fillText('Virginica', renderer.width - 60, 205);
    },
    layer: {
      'dense_Dense1_input': {
        domain: [0, 8],
        color: [165, 130, 180]
      },
      'dense_Dense1/dense_Dense1': {
        color: [125, 125, 125]
      },
      'dense_Dense2/dense_Dense2': {
        color: [125, 125, 125]
      },
      'dense_Dense3/dense_Dense3': {
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
