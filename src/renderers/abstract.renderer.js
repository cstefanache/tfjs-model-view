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

  update(modelProfile) {
    if (!modelProfile) {
      return;
    }

    const {
      model,
      output
    } = modelProfile;
    this.updateGraph(model, output)

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

  initialize(modelProfile) {
    const {
      layerMap,
      model,
      output
    } = modelProfile;

    this.groupIndex = 0;
    this.nodesMap = {};
    this.columnSizes = {};
    this.links = [];
    const size = Object.keys(layerMap).length;
    this.parseLayer(model, {
      layerIndex: size,
      values: output
    });

  }

  updateNode(node, value) {}
  updateBias(node) {}
  updateLink(link, value) {}

  prepareRenderContext(context) {}
  renderNode(context) {}
}
