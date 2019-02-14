import * as tf from '@tensorflow/tfjs';

import {
  scaleOrdinal
} from 'd3-scale';

import {
  schemeAccent
} from 'd3-scale-chromatic';

import ModelView from '../../src';

import {
  getIrisData,
  IRIS_CLASSES,
  IRIS_DATA
} from './data';

const INPUTS = ['Sepal Length (Cm)', 'Sepal Width (Cm)', 'Petal Length (Cm)', 'Petal Width (Cm)'];

const colorScale = scaleOrdinal(schemeAccent);

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

  /** Render model view */
  new ModelView(model, {
    renderer: 'd3',
    printStats: true,
    radius: 15,
    prepareRenderContext: svg => {
      ['setosa', 'versicolor', 'virginica'].forEach((species, index) => {
        svg.select('g')
          .append('image')
          .attr('class', species)
          .attr('href', `https://raw.githubusercontent.com/cstefanache/cstefanache.github.io/master/media/img/${species}.png`)
          .attr('width', 100)
          .attr('x', 400)
          .attr('y', 120 + index * 100)
      })
    },
    onPredict: (svg, res) => {
      ['setosa', 'versicolor', 'virginica'].forEach((species, index) => {
        svg.select(`.${species}`).attr('opacity', res.output[index]);
        svg.select(`[id="dense_Dense2/dense_Dense2-node-${index}"] text`).text(res.output[index].toFixed(2));
      });
    },
    updateNode: (node, value) => {
      node.dom.select('text').text(value.toFixed(2));
    },
    nodeRenderer: context => {
      const {
        node
      } = context;

      node
        .append('rect')
        .attr('x', -10)
        .attr('y', -10)
        .attr('width', 20)
        .attr('height', 20)
        .attr('stroke', '#000')
        .attr('fill', d => colorScale(d.groupIndex))
        .attr('stroke-width', 1);

      node.append('text')
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        .attr('font-size', 6)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(function (d) {
          d.valueTextElement = this;
          return d.value ? d.value.toFixed(2) : ''
        });

      node.append('text')
        .attr('stroke', '#000')
        .attr('transform', 'translate(0, -15)')
        .attr('stroke-width', 0.5)
        .attr('font-size', 6)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'bottom')
        .text(function (d) {
          d.biasTextElement = this;
          return d.value ? d.value.toFixed(2) : ''
        });

      node
        .append('text')
        .attr('font-size', 10)
        .text(d => {
          switch (d.layerIndex) {
            case 1:
              return INPUTS[d.indexInColumn];
            case 3:
              return IRIS_CLASSES[d.indexInColumn];
            default:
              return '';
          }
        })
        .attr('x', d => {
          switch (d.layerIndex) {
            case 1:
              return -90;
            case 3:
              return 15;
            default:
              return -8;
          }
        })
        .attr('y', 5)

    }
  });

  await model.fit(xTrain, yTrain, {
    epochs: 10,
    validationData: [xTest, yTest]
  });

  setInterval(() => {
    model.predict(tf.tensor([
      IRIS_DATA[Math.floor(Math.random() * IRIS_DATA.length)].slice(0, 4)
    ]));
  }, 2000)

  return model;
}

const [xTrain, yTrain, xTest, yTest] = getIrisData(0.15);

export default async () => {
  trainModel(xTrain, yTrain, xTest, yTest);
}
