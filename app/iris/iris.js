import * as tf from '@tensorflow/tfjs';
import ModelView from '../../src';

import {
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

  if (window.location.search.indexOf('canvas') !== -1) {
    new ModelView(model, {
      printStats: true,
      width: 180,
      height: 220,
      layerPadding: 40,
      renderer: 'canvas',
      renderLinks: true,
      layer: {
        'dense_Dense1_input': {
          layerPadding: 20
        }
      },
      prepareRenderContext: ctx => {
        ctx.fillStyle = '#FFF';
        ctx.font = '12px Arial';
        ctx.fillText('Input', 20, 60);
        ctx.fillText('Hidden', 75, 20);
        ctx.fillText('Output', 130, 70);
      },
      defaultLayer: {
        nodeSize: 5,
        getFillStyle: (value, node) => {
          const {
            layerIndex
          } = node;
          if (layerIndex === 1) {
            return `rgba(125,125,255, ${value/7})`;
          } else if (layerIndex === 2) {
            return `rgba(125,255,125, ${value*10})`
          } else {
            return `rgba(255,255,255, ${value})`;
          }
        }
      }
    });
  } else {
    /** Render model view */
    new ModelView(model, {
      width: 600,
      renderer: 'd3',
      printStats: true,
      layer: {
        'dense_Dense1_input': {
          nodesPadding: 30
        }
      }

    });
  }



  await model.fit(xTrain, yTrain, {
    epochs: 100,
    validationData: [xTest, yTest]
  });

  return model;
}

const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

export default async () => {
  trainModel(xTrain, yTrain, xTest, yTest);
}
