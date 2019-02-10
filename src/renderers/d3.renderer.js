import * as d3 from 'd3';
import AbstractRenderer from './abstract.renderer';

const defaultLayerProfile = {
  radius: 15,
  renderLinks: true,
  layer: {

  }
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


  updateNode(node, value) {
    node.valueTextElement.innerHTML = value ? value.toFixed(2) : 'N/A';
  }

  updateLink(link, value) {
    d3.select(link.dom)
      .attr('stroke-width', Math.abs(value))
      .attr('stroke', value < 0 ? '#FF0000' : '#000000');
    }

  updateBias(node) {
    node.biasTextElement.innerHTML = node.bias.toFixed(2);
  }

  initialize(modelProfile) {
    super.initialize(modelProfile);
    const scale = d3.scaleOrdinal(d3.schemePastel1)
    const nodes = Object.values(this.nodesMap).sort((a, b) => {
      return a.layerIndex - b.layerIndex
    });

    let startX = 0;
    let maxX = 0;
    let layerIndex = 0;
    nodes.forEach(d => {
      const layerConfig = {
        columns: 1,
        ...this.config.layer[d.layerName]
      }
      if (layerIndex !== d.layerIndex) {
        layerIndex = d.layerIndex;
        startX = maxX + 100;
      }
      const height = Math.floor(this.columnSizes[d.layerIndex] / layerConfig.columns);
      d.y = this.config.height / 2 - height * this.config.radius * 1.5 + Math.floor(d.indexInColumn / layerConfig.columns) * this.config.radius * 3;
      d.x = startX + d.indexInLayer % layerConfig.columns * this.config.radius * 4;

      if (maxX < d.x) {
        maxX = d.x;
      }
    });


    const simulation = this.simulation = d3.forceSimulation(nodes)
    // .alpha(0.2)
    // .force('link', d3.forceLink(this.links).id(d => d.id).strength(0.01))
    // .force('charge', d3.forceManyBody().strength(0.5))
    // .force("collide", d3.forceCollide(this.config.radius * 2))
    // .force('x', d3.forceX().x(d => d.layerIndex * 100).strength(10))
    // .force('y', d3.forceY().y(d => -this.columnSizes[d.layerIndex] * this.config.radius + d.indexInColumn * this.config.radius * 2).strength(0.5))
    //.force("center", d3.forceCenter())

    const link = this.svg.append('g')
      .attr('stroke', '#000')
      .selectAll('line')
      .data(this.links)
      .join('line')
      .call(function(d) {
        d.each( (elem, idx, all) => elem.dom = all[idx]);
      });

    const node = this.svg.append('g')
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .join('.node')


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
      })

    node.append('text')
      .attr('stroke', '#000')
      .attr('stroke-width', 0.5)
      .attr('font-size', 6)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(function (d) {
        d.valueTextElement = this;
        return d.value ? d.value.toFixed(2) : ''
      })

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });

  }
}
