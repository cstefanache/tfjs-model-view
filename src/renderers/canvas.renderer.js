import AbstractRenderer from './abstract.renderer';

export default class CanvasRenderer extends AbstractRenderer {
    constructor(config, initData) {
        super(config, initData);
        const canvas = document.createElement('canvas');

        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        document.body.appendChild(canvas);

        this.renderContext = canvas.getContext('2d')
        this.renderElement = canvas;
    }

    update(model, input) {
        const inputs = Object.keys(this.layers).filter(name => name.indexOf('_input') !== -1);

        if (inputs.length !== input.length) {
            throw new Error(`identified 2 input layers: ${inputs.join(',')} and had only ${input.length} input values`);
        }

        inputs.forEach((name, index) => {
            this.render({ name }, input[index].dataSync());
        });

        this.render(this.outputLayer, model.outputData);
    }

    render(layer, activations, outputData) {
        const { name, previousColumn } = layer;
        if (activations || outputData) {
            const vals = activations || outputData
            const { height } = this;

            try {
                const { x, layerWidth, radius, nodes, layerHeight, domainMax } = this.layers[name];
                const sy = Math.floor((height - layerHeight) / 2);
                this.renderContext.clearRect(x - radius / 2 - 2, 0, layerWidth + 2, height);

                nodes.forEach((node, index) => {
                    const { x: nx, y: ny } = node;
                    this.renderContext.strokeStyle = '#000';
                    this.renderContext.fillStyle = `rgba(0,0,0, ${vals[index] / domainMax})`
                    this.renderContext.beginPath();
                    this.renderContext.arc(nx, sy + ny, radius / 2, 0, 2 * Math.PI)
                    if (radius > 3) {
                        this.renderContext.stroke();
                    }
                    this.renderContext.fill();
                });
            } catch (err) {
                debugger
            }
        } else if (previousColumn && previousColumn.length > 0 && layer.activations) {
            for (let i = 0; i < layer.previousColumn.length; i++) {
                this.render(layer.previousColumn[i], layer.activations[i])
            }
        }
    }
}