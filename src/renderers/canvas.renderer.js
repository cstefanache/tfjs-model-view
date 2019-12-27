import AbstractRenderer from './abstract.renderer';

export default class CanvasRenderer extends AbstractRenderer {
    constructor(config, initData) {
        super(config, initData);
        const canvas = document.createElement('canvas');

        const { onBeginRender, onEndRender } = config;

        Object.assign(this, { onBeginRender, onEndRender })

        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);
        document.body.appendChild(canvas);

        this.renderContext = canvas.getContext('2d')
        this.renderElement = canvas;
    }

    render() {
        const { onBeginRender, onEndRender } = this;
        this.renderContext.clearRect(0, 0, this.width, this.height);

        if (onBeginRender) {
            onBeginRender(this);
        }

        this.layers.forEach(layer => {
            const {
                radius,
                nodes,
                domain: [min, max],
                previousColumn,
                renderLinks,
                renderNode,
                weights,
                color: [r, g, b]
            } = layer;

            let { 1: bias, 2: kernel } = weights;
            let leftSideNodes;
            if (renderLinks) {
                leftSideNodes = previousColumn.reduce((memo, prevLayer) => {
                    return memo.concat(prevLayer.nodes);
                }, [])
            }

            nodes.forEach((node, index) => {
                const { x: nx, y: ny, value } = node;

                if (renderLinks) {
                    leftSideNodes.forEach((leftNode, leftIdx) => {
                        this.renderContext.beginPath();
                        let hasWeight = kernel && kernel.values;
                        const weightVal = hasWeight ? kernel.values[index * leftIdx] : 0.5
                        if (hasWeight) {
                            this.renderContext.strokeStyle = weightVal > 0 ?
                                `rgb(0, 0, 255, ${weightVal})` :
                                `rgb(255, 0, 0, ${Math.abs(weightVal)})`;
                        } else {
                            this.renderContext.strokeStyle = 'rgba(0,0,0,.5)';
                        }
                        this.renderContext.moveTo(leftNode.x + leftNode.radius / 2, leftNode.y);
                        this.renderContext.lineTo(node.x - node.radius / 2, node.y);
                        this.renderContext.stroke();
                    })
                }
                this.renderContext.strokeStyle = `rgb(${r}, ${g}, ${b})`;
                const domainValue = value / (max + min)
                if (!isNaN(domainValue)) {
                    this.renderContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${domainValue})`
                } else {
                    this.renderContext.fillStyle = '#FFF';
                }
                this.renderContext.beginPath();
                this.renderContext.arc(nx, ny, radius / 2, 0, 2 * Math.PI)
                if (radius > 3) {
                    this.renderContext.stroke();
                }
                this.renderContext.fill();

                if (renderNode) {
                    renderNode(this.renderContext, node);
                }
            });
        })

        if (onEndRender) {
            onEndRender(this);
        }
    }
}
