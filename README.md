# tfjs-model-view

__tfjs-model-view__ is a library for _in browser_ visualization of neural network intended for use with TensorFlow.js.

Features:

* Automatically render of the neural net 
* Automatically update weights/biases/values
* Different rendering methods: canvas(default), d3

The library also aims to be flexible and make it easy for you to incorporate.

## Demos

- [Movielens recommendation using Tensorflow.js](https://beta.observablehq.com/@cstefanache/movielens-recommendation-using-tensorflow-js)
- [Iris Prediction with Custom Node Renderer](https://beta.observablehq.com/@cstefanache/tensorflow-js-model-viewer-iris)
- [MNIST Prediction](https://beta.observablehq.com/@cstefanache/mnist-tensorflow-js-network-view-tfjs-model-view)

## Sample rendering output

![Samples](https://raw.githubusercontent.com/cstefanache/cstefanache.github.io/master/media/img/net2.png "Samples")


## Usage

Simple:
```
new ModelView(model)
```

Customized:
```
const modelView = new ModelView(model, {
  /** supports: canvas, d3 */
  renderer: 'd3',   
  
  /** if set to false you can get the DOM using modelView.getDOMElement() */
  appendImmediately: true,

  /** node radius if no custom renderer is defined */            
  radius: 10,

  /** By default d3 has property set to true and canvas is set to false */
  renderLinks: false,

  /** distance between nodes */
  nodesPadding: 0,

  /** prints layer names */                            
  printStats: true,

  /** gets d3 svg or canvas ctx to pre render */                   
  prepareRenderContext: context => { ... },

  /** executed when predict is called. gets drawing context and prediction result as parameters */
  onPredict: (context, result) => { ... },

  /** executed during training and predict. used to update a node */
  updateNode: (node, value) => { ... },

  /** executed at initialization for each node. context d3 or canvas context */
  nodeRenderer: context => { ... },
  
  /** can be used to define default layer parameters */
  defaultLayer: {
    /** used in Canvas renderer used to get the node fill style */
    getFillStyle: (value, node) => { ... }
  },

  /** can be used to customize a single layer */
  layer: {

    /** layer name. layers will be printed on console if printStats: true. All properties defined above can be overridden for a single layer */
    'dense_Dense1_input': {

      /** sample modification of padding for the input layer */
      layerPadding: 30
      
    }
  }
})
```

## Installation

You can install this using npm with

```
npm install tfjs-model-view
```

or using yarn with

```
yarn add tfjs-model-view
```

## Building from source

To build the library, you need to have node.js installed. We use `yarn`
instead of `npm` but you can use either.

First install dependencies with

```
yarn
```

or

```
npm install
```

You can start the dev environment using

```
yarn dev
```

or

```
npm run dev
```


## Sample Usage


## Issues

Found a bug or have a feature request? Please file an [issue](https://github.com/cstefanache/tfjs-model-view/issues/new)
