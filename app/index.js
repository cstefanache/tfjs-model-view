import 'babel-polyfill';

import runIris from './iris/iris';
import runIrisCustom from './iris-custom/iris';
import runMnist from './mnist/mnist';
import runMnistConv from './mnist-conv/mnist';
import tiny from './tiny/tiny'

const samples = {
  tiny: {
    name: 'Tiny',
    link: 'tiny',
    executor: tiny
  },
  iris: {
    name: 'Iris',
    link: 'iris',
    executor: runIris
  },
  irisc: {
    name: 'Iris Custom',
    link: 'irisc',
    executor: runIrisCustom
  },
  mnist: {
    name: 'Mnist Dense',
    link: 'mnist',
    executor: runMnist
  },
  mnistc: {
    name: 'Mnist Conv',
    link: 'mnistc',
    executor: runMnistConv
  }
};

let load;

function prepareMenu() {
  document.body.innerHTML = '<h3>Tensorflow.js model viewer samples:</h3>';
  const menuBar = document.createElement('div');
  menuBar.classList.add('menu-content');
  document.body.appendChild(menuBar);

  Object.values(samples).forEach(sample => {
    const menuItem = document.createElement('a');
    menuItem.setAttribute('href', `http://localhost:4500?sample=${sample.link.toLowerCase()}${sample.append ? sample.append : ''}`)
    menuItem.innerHTML = sample.name;
    menuItem.classList.add('menu-item')
    menuItem.addEventListener('click', () => {
      load(sample.executor);
    });
    menuBar.appendChild(menuItem);
  })
}

load = executor => {

  if (executor) {
    executor();
  }
}

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const runner = samples[getUrlParameter('sample')];
prepareMenu();
if (runner) {
  load(runner.executor);
}
