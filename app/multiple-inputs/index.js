import * as tf from '@tensorflow/tfjs';
import ModelView from '../../src';


export default async () => {
  const input1 = tf.input({
    shape: [2]
  });
  const input2 = tf.input({
    shape: [2]
  });
  const dense1 = tf.layers.dense({
    units: 7,
    activation: 'relu'
  }).apply(input1);

  const dense11 = tf.layers.dense({
    units: 4,
    activation: 'relu'
  }).apply(dense1);

  const dense2 = tf.layers.dense({
    units: 8,
    activation: 'sigmoid'
  }).apply(input2);

  const concat = tf.layers.concatenate().apply([dense11, dense2]);

  const beforeOutput = tf.layers.dense({
    units: 12,
    activation: 'tanh'
  }).apply(concat);
  const output =
    tf.layers.dense({
      units: 1,
      activation: 'softmax'
    }).apply(beforeOutput);

  const model = tf.model({
    inputs: [input1, input2],
    outputs: output
  });

  /** Render model view */
  let parsed = new ModelView(model, {
    width: 300,
    height: 250,
    renderer: 'canvas',
    renderLinks: true,
    strokeStyle: 'rgb(125,125,160)',
    layerPadding: 40,
    radius: 5,
    printStats: true
  });




  return model;
}
