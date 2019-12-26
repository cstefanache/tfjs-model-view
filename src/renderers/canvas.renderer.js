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


    render() {
        this.renderContext.clearRect(0, 0, this.width, this.height);
        this.layers.forEach(layer => {
            const { name, radius, nodes, domainMax } = layer;
            nodes.forEach((node, index) => {
                const { x: nx, y: ny, value } = node;
                this.renderContext.strokeStyle = '#000';
                this.renderContext.fillStyle = `rgba(0,0,0, ${value / domainMax})`
                this.renderContext.beginPath();
                this.renderContext.arc(nx, ny, radius / 2, 0, 2 * Math.PI)
                if (radius > 3) {
                    this.renderContext.stroke();
                }
                this.renderContext.fill();
            });
        })
    }

    prenderLayer(syntheticLayer, activations, weights) {
        const { name, radius, nodes, domainMax, previousLayers, renderLinks } = syntheticLayer;
        console.log(name)

        if (renderLinks && previousLayers && previousLayers.length && weights) {
            const { 1: bias, 2: kernel } = weights || {};
            const leftNodes = previousLayers.reduce((memo, item) => {
                return memo.concat(this.layers[item].nodes)
            }, [])
            for (let i = 0; i < leftNodes.length; i++) {
                const leftNode = leftNodes[i];
                for (let j = 0; j < nodes.length; j++) {
                    const rightNode = nodes[j];
                    const weight = kernel.values[i * j];
                    const col = weight > 0 ? `rgba(0,0,255,${weight})` : `rgba(255,0,0,${-weight})`
                    this.renderContext.strokeStyle = col;
                    this.renderContext.moveTo(leftNode.x, leftNode.y);
                    this.renderContext.lineTo(rightNode.x, rightNode.y);
                    this.renderContext.stroke()
                }
            }
        }

        nodes.forEach((node, index) => {
            const { x: nx, y: ny } = node;
            const val = activations ? activations[index] : 0;
            this.renderContext.strokeStyle = '#000';
            this.renderContext.fillStyle = `rgba(0,0,0, ${val / domainMax})`
            this.renderContext.beginPath();
            this.renderContext.arc(nx, ny, radius / 2, 0, 2 * Math.PI)
            if (radius > 3) {
                this.renderContext.stroke();
            }
            this.renderContext.fill();
        });
    }

    prender(layer, activations) {
        const { name, previousColumn, weights } = layer;
        console.log('rendering', name)
        if (activations) {
            this.renderLayer(this.layers[name], activations, weights)
        }

        if (previousColumn && previousColumn.length > 0 && layer.activations) {
            for (let i = 0; i < layer.previousColumn.length; i++) {
                this.render(layer.previousColumn[i], layer.activations[i])
            }
        }
    }
}
