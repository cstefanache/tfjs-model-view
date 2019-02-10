function noop() {}

async function parseModel(model, options) {

  const parsed = {
    layerMap: {}
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


    if (activation) {
      let className = activation.getClassName();
      currentLayer.activation = {
        name: className
      }
    }

    if (setCallHook) {
      sourceLayer.setCallHook(async layerInput => {
        currentLayer.getWeights();
        currentLayer.activations = await layerInput[0].dataSync();
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
    parsed.output = result.dataSync();
    parserConfig.predictCallback(parsed);
    return result;
  };

  parsed.model = await parseLayer(model.layers[model.layers.length - 1].output);

  return parsed;
}

export default parseModel;
