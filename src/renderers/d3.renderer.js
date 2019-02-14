import * as d3 from 'd3';
import AbstractRenderer from './abstract.renderer';

const defaultLayerProfile = {
  radius: 15,
  renderLinks: true,
  defaultLayer: {}
}

export default class D3Renderer extends AbstractRenderer {

  constructor(parentDom, config) {

    super(parentDom, config);
    this.parentDom = parentDom;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.parentDom.appendChild(svg);

    this.svg = this.root =
      d3.select(svg)
      .attr('width', config.width)
      .attr('height', config.height);

    const g = this.svg.append('g');
    this.renderContext = this.svg

    this.zoom = d3.zoom()
      .on('zoom', () => {
        this.svg.attr('transform', d3.event.transform);
      });

    this.svg.append('rect')
      .attr('width', config.width)
      .attr('height', config.height)
      .style('fill', 'transparent')
      .style('pointer-events', 'all')
      .call(this.zoom);

    this.svg = g;
    this.config = {
      ...defaultLayerProfile,
      ...config
    }
  }

  updateBias(node) {
    if (node.biasTextElement) {
      node.biasTextElement.innerHTML = node.bias.toFixed(2);
    }
  }

  updateLink(link, value) {
    if (link.dom) {
      d3.select(link.dom)
        .attr('stroke-width', Math.abs(value))
        .attr('stroke', value < 0 ? '#FF0000' : '#000000');
    }
  }

  initialize(modelProfile) {
    super.initialize(modelProfile, (d, value) => {
      if (d.valueTextElement) {
        d.valueTextElement.innerHTML = value ? value.toFixed(2) : 'N/A';
      }
    });

    const scale = d3.scaleOrdinal(d3.schemePastel1);
    const nodes = Object.values(this.nodesMap).sort((a, b) => a.layerIndex - b.layerIndex);

    this.svg.append('g')
      .attr('stroke', '#000')
      .selectAll('line')
      .data(this.links)
      .join('line')
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)
      .call(function (d) {
        d.each((elem, idx, all) => elem.dom = all[idx]);
      });

    const node = this.svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x}, ${d.y})`)
      .attr('id', d => d.id)
      .join('.node')
      .call(function (d) {
        d.each((elem, idx, all) => elem.dom = d3.select(all[idx]));
      });

    if (this.config.nodeRenderer) {
      this.config.nodeRenderer({
        engine: 'd3',
        node
      });
    } else {
      node.append('circle')
        .attr('r', this.config.radius)
        .attr('fill', d => scale(d.groupIndex))
        .attr('stroke', '#000')
        .attr('stroke-width', '1px');

      node.append('text')
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        .attr('font-size', 6)
        .attr('transform', `translate(0, -${this.config.radius * 1.2})`)
        .attr('text-anchor', 'middle')
        .text(function (d) {
          d.biasTextElement = this;
          return d.bias
        });

      node.append('text')
        .attr('stroke', '#000')
        .attr('stroke-width', 0.5)
        .attr('font-size', 6)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(function (d) {
          d.valueTextElement = this;
          return d.value ? d.value.toFixed(2) : ''
        });
    }
  }
}
