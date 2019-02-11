import AbstractRenderer from './abstract.renderer';

const defaultLayerProfile = {
  radius: 1,
  layerPadding: 20,
  layer: {

  }
}
export default class CanvasRenderer extends AbstractRenderer {

  constructor(parentDom, config) {

    super(parentDom, config);

    const {
      width,
      height
    } = config;
    const canvas = document.createElement('canvas');
    parentDom.appendChild(canvas);

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let ctx = this.ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fill();

    this.config = {
      ...defaultLayerProfile,
      ...config
    }
  }

  updateNode(node, value) {
    node.render(value);
  }

  updateBias() {}

  update(model) {
    if (this.config.onPredict) {
      model.model.renderData.nodes.forEach((node, index) => {
        node.render(model.output[index]);
      });
      this.config.onPredict(this.ctx, model);
    }
  }

  initialize(modelProfile) {
    super.initialize(modelProfile);

    const nodes = Object.values(this.nodesMap).sort((a, b) => a.layerIndex - b.layerIndex);

    let startX = 0;
    let maxX = 0;
    let layerIndex = 0;

    nodes.forEach(d => {
      const layerConfig = {
        columns: 1,
        getFillStyle: value => `rgba(255, 255, 255, ${value / 255})`,
        radius: this.config.radius,
        ...this.config.layer[d.layerName]
      }

      let radius = layerConfig.radius;

      if (this.config.nodeRenderer) {
        d.render = value => {
          this.config.nodeRenderer(this.ctx, value)
        };
      } else {
        d.render = value => {
          this.ctx.fillStyle = `#000`;
          this.ctx.beginPath();
          this.ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
          this.ctx.fill();

          this.ctx.fillStyle = d.getFillStyle(value);
          this.ctx.beginPath();
          this.ctx.arc(d.x, d.y, radius, 0, 2 * Math.PI);
          this.ctx.fill();
        }
      }

      if (layerIndex !== d.layerIndex) {
        layerIndex = d.layerIndex;
        startX = maxX + this.config.layerPadding;
      }

      const height = Math.floor(this.columnSizes[d.layerIndex] / layerConfig.columns);
      d.y = Math.floor(this.config.height / 2 - height * radius * 1.5 + Math.floor(d.indexInColumn / layerConfig.columns) * radius * 3);
      d.x = Math.floor(startX + d.indexInLayer % layerConfig.columns * radius * 3);
      d.radius = radius;
      d.getFillStyle = layerConfig.getFillStyle;
      if (maxX < d.x) {
        maxX = d.x;
      }
    });

    this.ctx.strokeStyle = 'rgba(255,255,255,1)';
    nodes.forEach(node => {
      const {
        x,
        y
      } = node;

      this.ctx.beginPath();
      this.ctx.arc(x, y, node.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    });
  }
}
