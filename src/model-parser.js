function noop() {}

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

  async function parseLayer(layer, nextColumn) {

    const {
      name,
      input,
      inputs,
      shape,
      sourceLayer
    } = layer;

    if (parsed.layerMap[name]) {
      return parsed.layerMap[name];
    }

    const {
      getWeights,
      setCallHook,
      activation
    } = sourceLayer || {};

    let currentLayer = {
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
      inputs.forEach(async inp => {
        await parseLayer(inp, currentLayer.previousColumn);
      })
    } else {
      await parseLayer(input, currentLayer.previousColumn);
    }

    if (nextColumn) {
      nextColumn.push(currentLayer);
    }

    return currentLayer;
  }

  const predict = model.predict;

  model.predict = async (...args) => {
    const result = await predict.apply(model, args);
    parsed.output = result.dataSync();
    parserConfig.predictCallback(args);
    return result;
  };

  const syntheticOutput = {
    name: 'synthetic',
    inputs: model.outputs,
    shape: [null, 1]
  };

  parsed.model = await parseLayer(syntheticOutput);

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
