import 'babel-polyfill';
import parseModel from './model-parser';
import defaultConfig from './default.config';
import rendererMap from './renderers';

export default class ModelView {

  constructor(model, customConfig) {

    if (!model) {
      throw new Error('please provide a tensorflow.js model');
    }

    const config = {
      ...defaultConfig,
      ...customConfig
    };

    this.config = config;

    const RendererClass = rendererMap[config.renderer];
    if (!RendererClass) {
      throw new Error(`Missing renderer: ${config.renderer}. Options: [d3, canvas]`);
    }

    this.element = document.createElement(config.tag);

    if (config.appendImmediately) {
      document.body.appendChild(this.element);
    }

    this.renderer = new RendererClass(this.element, config);

    config.predictCallback = () => {
      this.renderer.update(this.model);
    }

    config.hookCallback = layer => {
      this.renderer.layerUpdate(layer);
    }

    (async () => {
      this.model = await parseModel(model, config);
      this.renderer.initialize(this.model);
    })();
  }

  getDOMElement() {
    return this.element;
  }

}
