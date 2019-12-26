import parseModel from './model-parser';
import CanvasRenderer from './renderers/canvas.renderer';
import defaultConfig from './default.config';

export default class ModelView {

    constructor(model, customConfig) {
        const config = Object.assign({}, defaultConfig, customConfig);
        let renderer;

        config.predictCallback = input => {
            if (renderer) {
                renderer.update(model, input);
                renderer.render();
            }
        }

        config.hookCallback = layer => {
            if (renderer) {
                renderer.updateValues(layer);
                renderer.render();
            }
        }

        parseModel(model, config).then(res => {
            renderer = new CanvasRenderer(config, res);
        });
    }
}
