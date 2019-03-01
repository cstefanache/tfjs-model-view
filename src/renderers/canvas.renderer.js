import AbstractRenderer from './abstract.renderer';
import {
  scaleOrdinal
} from 'd3-scale';

import {
  schemeAccent
} from 'd3-scale-chromatic';

const colorScale = scaleOrdinal(schemeAccent);

const defaultLayerProfile = {
  nodeSize: 2,
  strokeStyle: '#808080',
  renderLinks: false,
  layerPadding: 20,
  defaultLayer: {
    getStrokeStyle: (value, node) => colorScale(node.layerIndex),
    getFillStyle: value => `rgba(255, 255, 255, ${value / 255})`
  }
}
export default class CanvasRenderer extends AbstractRenderer {

  constructor(parentDom, config = {}) {

    super(parentDom, {
      ...defaultLayerProfile,
      ...config,
      defaultLayer: {
        ...defaultLayerProfile.defaultLayer,
        ...config.defaultLayer
      }
    });

    const {
      width,
      height
    } = config;
    const canvas = document.createElement('canvas');
    parentDom.appendChild(canvas);

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let ctx = canvas.getContext('2d', {
      alpha: false
    });
    this.setRenderContext(ctx);

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  initialize(modelProfile) {

    super.initialize(modelProfile, (d, forceValues) => {
      const {
        config
      } = d;

      let source = forceValues || d.model.activations
      let value = source ? source[d.indexInLayer] : 0;
      // this.renderContext.strokeStyle = this.renderContext.fillStyle = `#000`;
      // this.renderContext.beginPath();
      // this.renderContext.arc(d.x, d.y, config.nodeSize, 0, 2 * Math.PI);
      // this.renderContext.fill();
      // this.renderContext.stroke();

      this.renderContext.strokeStyle = config.getStrokeStyle(value, d);
      this.renderContext.fillStyle = config.getFillStyle(value, d);
      this.renderContext.beginPath();
      this.renderContext.arc(d.x, d.y, config.nodeSize, 0, 2 * Math.PI);
      this.renderContext.stroke();
      this.renderContext.fill();
    });

    if (this.config.renderLinks) {
      this.renderContext.strokeStyle = this.config.strokeStyle;
      this.links.forEach(link => {
        const {
          source,
          target
        } = link;
        this.renderContext.beginPath();
        this.renderContext.moveTo(source.x + source.nodeSize, source.y);
        this.renderContext.lineTo(target.x - target.nodeSize, target.y);
        this.renderContext.stroke();
      })
    }

  }

}
