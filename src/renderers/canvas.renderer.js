import AbstractRenderer from './abstract.renderer';
import {
  scaleOrdinal
} from 'd3-scale';

import {
  schemeAccent
} from 'd3-scale-chromatic';

const defaultLayerProfile = {
  radius: 2,
  strokeStyle: '#808080',
  renderLinks: false,
  layerPadding: 20,
  defaultLayer: {
    getFillStyle: value => `rgba(255, 255, 255, ${value / 255})`
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

    let ctx = this.renderContext = canvas.getContext('2d');

    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = '#000';
    ctx.fill();

    this.config = {
      ...defaultLayerProfile,
      ...config
    }
  }

  initialize(modelProfile) {
    const colorScale = scaleOrdinal(schemeAccent);

    super.initialize(modelProfile, (d, value, config) => {
      this.renderContext.strokeStyle = this.renderContext.fillStyle = `#000`;
      this.renderContext.beginPath();
      this.renderContext.arc(d.x, d.y, config.radius, 0, 2 * Math.PI);
      this.renderContext.fill();
      this.renderContext.stroke();
      this.renderContext.strokeStyle = colorScale(d.groupIndex);
      this.renderContext.fillStyle = config.getFillStyle(value, d);
      this.renderContext.beginPath();
      this.renderContext.arc(d.x, d.y, config.radius, 0, 2 * Math.PI);
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
        this.renderContext.moveTo(source.x + source.radius, source.y);
        this.renderContext.lineTo(target.x - target.radius, target.y);
        this.renderContext.stroke();
      })


    }

  }

}
