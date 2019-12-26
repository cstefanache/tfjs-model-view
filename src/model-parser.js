function noop() { }

async function parseModel(model, options) {

  const parsed = {
    layerMap: {},
    layerArr: []
  };

  const parserConfig = {
    predictCallback: noop,
    hookCallback: noop,
    ...options
  }

  function parseLayer(layer, nextColumn) {

    const {
      name,
      input,
      inputs,
      shape,
      sourceLayer
    } = layer;

    const {
      getWeights,
      setCallHook,
      activation
    } = sourceLayer || {};

    const currentLayer = {
      previousColumn: [],
      name,
      shape,
      weights: {},
      getWeights: noop,
      mapPosition: Object.keys(parsed.layerMap).length
    };

    parsed.layerMap[name] = currentLayer;
    parsed.layerArr.unshift(currentLayer);

    if (activation) {
      let className = activation.getClassName();
      currentLayer.activation = {
        name: className
      }
    }

    if (setCallHook) {
      sourceLayer.setCallHook(async layerInput => {
        currentLayer.getWeights();
        currentLayer.activations = []
        for (let i = 0; i < layerInput.length; i++) {
          currentLayer.activations.push(layerInput[i].dataSync())
        }
        parserConfig.hookCallback(currentLayer);
      });
    }

    if (getWeights) {

      currentLayer.getWeights = async () => {
        const weights = await sourceLayer.getWeights();

        for (let i = 0; i < weights.length; i++) {
          const weight = weights[i];
          const {
            rankType,
            name: weightName
          } = weight;
          currentLayer.hasWeights = true;
          currentLayer.weights[rankType] = {
            name: weightName,
            values: await weights[i].dataSync()
          }
        }
      }

      currentLayer.getWeights();
    }

    if (inputs) {
      inputs.forEach(inp => {
        parseLayer(inp, currentLayer.previousColumn);
      })
    } else {
      parseLayer(input, currentLayer.previousColumn);
    }

    if (nextColumn) {
      nextColumn.push(currentLayer);
    }

    return currentLayer;
  }

  const predict = model.predict;

  model.predict = (...args) => {
    const result = predict.apply(model, args);
    model.outputData = result.dataSync();
    parserConfig.predictCallback(args);
    return result;
  };

  parsed.model = await parseLayer(model.layers[model.layers.length - 1].output);

  if (options.printStats) {
    const {
      layerArr
    } = parsed;
    console.log(new Array(10).join('-'));
    layerArr.forEach(layer => {
      console.log(`Layer: ${layer.name}`);
    });
  }

  return parsed;
}

export default parseModel;
