import * as tf from '@tensorflow/tfjs';
import ModelView from '../../src';

export default async () => {

  // Define the topology of the model: two dense layers.
  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 2,
    activation: 'tanh',
    inputShape: [1]
  }));

  model.add(tf.layers.dense({
    units: 2,
    activation: 'relu',
    inputShape: [2]
  }));

  model.add(tf.layers.dense({
    units: 3,
    activation: 'softplus',
    inputShape: [2]
  }));

  model.add(tf.layers.dense({
    units: 1,
    activation: 'softsign'
  }));

  model.summary();

  new ModelView(model);

  setTimeout(() => {
    const data = model.predict(tf.tensor([[1]])).dataSync();
    console.log(data)
  }, 10);
  return model
}
