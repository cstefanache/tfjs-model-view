import 'babel-polyfill';

import runIris from './iris/iris';
import runIrisText from '!!raw-loader!././iris/iris.js';

import runIrisCustom from './iris-custom/iris';
import runIrisCustomText from '!!raw-loader!./iris-custom/iris.js';

import runMnist from './mnist/mnist';
import runMnistText from '!!raw-loader!./mnist/mnist.js';

import runMnistConv from './mnist-conv/mnist';
import runMnistConvText from '!!raw-loader!./mnist-conv/mnist.js';

import tiny from './tiny/tiny';
import tinyText from '!!raw-loader!./tiny/tiny.js';

const samples = {
  tiny: {
    name: 'Tiny',
    link: 'tiny',
    executor: tiny,
    text: tinyText
  },
  iris: {
    name: 'Iris',
    link: 'iris',
    executor: runIris,
    text: runIrisText
  },
  irisc: {
    name: 'Iris Custom',
    link: 'irisc',
    executor: runIrisCustom,
    text: runIrisCustomText
  },
  mnist: {
    name: 'Mnist Dense',
    link: 'mnist',
    executor: runMnist,
    text: runMnistText
  },
  mnistc: {
    name: 'Mnist Conv',
    link: 'mnistc',
    executor: runMnistConv,
    text: runMnistConvText
  }
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
const runner = samples[getUrlParameter('sample')];
let load, contentElem;

function prepareMenu() {
  document.body.innerHTML = '<h3>Tensorflow.js model viewer samples:</h3><div id="content"></div>';
  const menuBar = document.createElement('div');
  contentElem = document.querySelector('#content');
  menuBar.classList.add('menu-content');
  contentElem.appendChild(menuBar);

  Object.values(samples).forEach(sample => {

    const menuItem = document.createElement('a');
    menuItem.setAttribute('href', `http://localhost:4500?sample=${sample.link.toLowerCase()}${sample.append ? sample.append : ''}`)
    menuItem.innerHTML = sample.name;
    menuItem.classList.add('menu-item')
    if (runner === sample) {
      menuItem.classList.add('selected')
    }
    menuItem.addEventListener('click', () => {
      load(sample.executor, sample);

    });
    menuBar.appendChild(menuItem);

  })
}

load = (executor, sample) => {
  if (executor) {
    executor();
    let text = sample.text;
    text = text.substr(text.indexOf('  new ModelView'))
    text = text.substr(0, text.indexOf('  });') + 4)
    document.body.innerHTML += `<pre class="prettyprint" style="text-align: left"><code>${text}</code></pre>`;
  }
}

prepareMenu();

if (runner) {
  load(runner.executor, runner);
}
