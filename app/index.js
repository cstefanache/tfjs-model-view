import 'babel-polyfill';

import runIrisCustom from './iris-custom/iris';
import runIris from './iris/iris';
import runMnist from './mnist/mnist';

// import './samples/mnist';
// import './samples/rnn-sample';


// import './samples/iris';
// import './samples/two-inputs';
// import './samples/curve-fitting';

//

const samples = {
  iris: {
    name: 'Iris',
    link: 'iris',
    executor: runIris
  },
  customiris: {
    name: 'Iris with custom renderer',
    link: 'customiris',
    executor: runIrisCustom
  },
  mnist: {
    name: 'Mnist',
    link: 'mnist',
    executor: runMnist
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
    menuItem.setAttribute('href', `http://localhost:4500?sample=${sample.link.toLowerCase()}`)
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
console.log(runner);
if (runner) {
  load(runner.executor);
}
