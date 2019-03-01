import * as tf from '@tensorflow/tfjs';

import ModelView from '../../src';
let ctx;
let id;
let d;
export default async () => {
  const model = await tf.loadModel('https://tensorspace.org/assets/model/acgan/model.json')
  const modelView = new ModelView(model, {
    printStats: true,
    width: 1500,
    height: 10000,
  });

  // setTimeout(async () => {
  //   let randomData = tf.randomNormal([1, 100]).dataSync();
  //   const res = await model.predict([tf.tensor([randomData]), tf.tensor([
  //     [5]
  //   ])]);
  // }, 100)


  //const res = await model.predict(tf.tensor([randomData, [0]]));
  // console.log(model);

};
