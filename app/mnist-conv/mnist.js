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
    radius: 0.5,
    prepareRenderContext: context => {
      ctx = context

    },
    renderNode: (node, value) => {
      ctx.fillStyle = "rgba(" + 255 + "," + 255 + "," + 255 + "," + value + ")";
      ctx.fillRect(node.x, node.y, 1, 1);
    }
  });

  setTimeout(async () => {
    let randomData = tf.randomNormal([1, 100]).dataSync();
    const res = await model.predict([tf.tensor([randomData]), tf.tensor([
      [5]
    ])]);
  }, 1000)


  //const res = await model.predict(tf.tensor([randomData, [0]]));
  // console.log(model);

};
