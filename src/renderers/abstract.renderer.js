export default class D3Renderer {

  updateGraph(layer, values) {
    const {
      activations,
      weights,
      renderData,
      previousColumn
    } = layer;

    if (renderData && renderData.updatePrevious) {
      layer.renderData.updatePrevious({
        weights,
        values
      });
    }

    if (previousColumn && previousColumn.length > 0) {
      previousColumn.forEach(column => {
        this.updateGraph(column, activations);
      });
    }
  }

  update(modelProfile, input) {
    if (!modelProfile) {
      return;
    }

    const {
      model,
      output
    } = modelProfile;

    this.updateGraph(model, output);
    modelProfile.model.renderData.nodes.forEach((node, index) => {

      node.render(output[index]);
    });

    if (this.config.onPredict) {
      this.config.onPredict(this.renderContext, modelProfile, input);
    }
  }

  layerUpdate(layer) {
    const {
      activations,
      weights,
      renderData
    } = layer;
    if (renderData && renderData.updatePrevious) {
      layer.renderData.updatePrevious({
        weights,
        previousValues: activations
      });
    }
  }

  parseLayer(model, options = {}) {
    const {
      shape,
      name,
      weights,
      activations,
      previousColumn
    } = model;
    const groupIndex = this.groupIndex++;
    const {
      values,
      rightsideNodes,
      rightsideWeights,
      layerIndex,
      offset,
      line
    } = options;

    const nodes = [];
    const links = [];
    const [noop, w, h = 1, d = 1] = shape;

    const biases = rightsideWeights && rightsideWeights['1'] ? rightsideWeights['1'].values : undefined;
    const column = this.columnSizes[layerIndex];
    if (!column) {
      this.columnSizes[layerIndex] = 0;
    }
    for (let i = 0; i < w * h * d; i++) {
      const id = `${name}-node-${i}`;
      let node = {
        id,
        layerName: name,
        groupIndex,
        layerIndex,
        indexInLayer: nodes.length,
        indexInColumn: this.columnSizes[layerIndex],
        value: values ? values[i] : undefined,
        bias: biases ? biases[i] : '',
        line: line || 0
      };

      this.columnSizes[layerIndex]++;

      this.nodesMap[id] = node;
      nodes.push(node);
    }

    let previousNodes = [];
    let previousLinks = [];

    if (previousColumn && previousColumn.length > 0) {
      let localOffset = 0;
      previousColumn.forEach((prevLayer, lineIndex) => {
        const {
          nodes: prevNodes,
          links: prevLinks
        } = this.parseLayer(prevLayer, {
          layerIndex: layerIndex - 1,
          rightsideNodes: nodes,
          rightsideWeights: weights,
          values: activations,
          offset: localOffset,
          line: lineIndex
        });
        localOffset += prevNodes.length;
        previousNodes = previousNodes.concat(prevNodes);
        previousLinks = previousLinks.concat(prevLinks);
      });
    }

    if (this.config.renderLinks) {
      if (rightsideWeights) {
        const {
          2: rightsideKernels
        } = rightsideWeights;

        rightsideNodes.forEach((rightsideNode, rightNodeIndex) => {
          nodes.forEach((node, nodeIndex) => {
            if (rightsideKernels || rightNodeIndex === nodeIndex + offset) {
              const link = {
                id: this.links.length,
                source: node,
                target: rightsideNode,
                weight: rightsideKernels ? rightsideKernels.values[nodeIndex * rightNodeIndex] : 1
              }
              this.links.push(link);
              links.push(link);
            }
          });
        })
      }
    }

    model.renderData = {
      nodes,
      updatePrevious: updateData => {
        const {
          previousValues: updatePreviousValues,
          weights: updateWeights,
          values: updateValues
        } = updateData;
        const {
          1: updateBiases,
          2: updateKernels
        } = updateWeights;

        if (updateBiases) {
          nodes.forEach((localNode, index) => {
            localNode.bias = updateBiases.values[index];
            this.updateBias(localNode)
          });
        }

        if (updateKernels) {
          previousLinks.forEach((prevLink, index) => {
            this.updateLink(prevLink, updateKernels.values[index]);
          });
        }

        if (updatePreviousValues) {
          previousNodes.forEach((prevNode, index) => {
            this.updateNode(prevNode, updatePreviousValues[index])
          });
        }

        if (updateValues) {
          nodes.forEach((localNode, index) => {
            this.updateNode(localNode, updateValues[index]);
          });
        }

        if (updateKernels) {
          previousLinks.forEach((prevLink, index) => {
            prevLink.weight = updateKernels.values[index];
          });
        }
      }
    }

    return {
      nodes,
      links
    };
  }

  initialize(modelProfile, renderNode) {
    const {
      layerMap,
      model,
      output
    } = modelProfile;

    if (this.config.prepareRenderContext) {
      this.config.prepareRenderContext(this.renderContext);
    }

    this.groupIndex = 0;
    this.nodesMap = {};
    this.columnSizes = {};
    this.links = [];
    const size = Object.keys(layerMap).length;
    this.parseLayer(model, {
      layerIndex: size,
      values: output
    });

    const nodes = Object.values(this.nodesMap).sort((a, b) => a.layerIndex - b.layerIndex);
    const layerConfig = {};
    let startX = 0;
    let maxX = 0;
    let lastLayerIndex = 0;

    nodes.forEach(node => {
      const {
        layerIndex
      } = node;
      const layer = modelProfile.layerArr[layerIndex - 1];
      const {
        shape: [_, w, h = 1, a = 1]
      } = layer;
      let config = layerConfig[layerIndex];
      if (!config) {
        config = {
          ...this.config,
          ...this.config.defaultLayer,
          nodesCount: layerMap[node.layerName].renderData.nodes.length,
          columns: h === 1 ? 1 : w,
          rows: h,
          depth: a,
          radius: this.config.radius || 5,
          layerPadding: this.config.layerPadding || 100,
          nodesPadding: this.config.nodesPadding || 0,
          depthPadding: this.config.depthPadding || 5,
          ...(this.config.layer || {})[node.layerName]
        }

        if (!config.getLocation) {

          if (lastLayerIndex !== node.layerIndex) {
            lastLayerIndex = node.layerIndex;
            startX = maxX + config.layerPadding;
          }

          config.getLocation = nd => {

            let space = config.radius * 3 + config.nodesPadding;
            let pixIndex = nd.indexInColumn % config.depth;
            let cellIndex = Math.floor(nd.indexInColumn / config.depth);
            let cellX = cellIndex % config.columns;
            let cellY = Math.floor(cellIndex / config.columns);
            let vPadding = (this.config.height - (config.depth * config.depthPadding + this.columnSizes[node.layerIndex] / config.columns * space)) / 2;
            let x = startX + cellX * space;
            let y = vPadding + pixIndex * config.depthPadding + pixIndex * config.rows * space + cellY * space;

            if (maxX < x) {
              maxX = x;
            }

            return {
              x,
              y
            };
          }
        }

        if (!config.renderNode) {
          config.renderNode = renderNode
        }

        layerConfig[layerIndex] = config;
      }

      node.render = value => {
        config.renderNode(node, value, config);
      }

      Object.assign(node, config.getLocation(node), {
        radius: config.radius
      });
      node.render(0);
    });

  }

  updateNode(node, value) {
    node.render(value);
  }

  updateBias() {}

  updateLink() {}

  renderNode() {}
}
