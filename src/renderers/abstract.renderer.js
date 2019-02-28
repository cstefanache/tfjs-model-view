import {
  LazyIterator
} from "@tensorflow/tfjs-data/dist/iterators/lazy_iterator";

const defaultConfig = {
  nodeSpacing: 2,
  nodeSize: 2,
  layerSpacing: 10,
  prepareNode: (node, config) => {}
}

export default class AbstractRenderer {

  constructor(parentDOM, config) {

    this.parentDOM = parentDOM;

    this.config = {
      ...defaultConfig,
      ...config
    }

    this.layerConfig = {};

    this.nodes = [];
    this.links = [];
  }

  locationFnProvider(config) {
    return (startX, nd) => {
      let padding = config.nodeSize * 2 + config.nodeSpacing;
      let xLoc = nd.indexInLayer / config.depth % config.columns;
      let yLoc = Math.floor(nd.indexInLayer / config.columns);
      const dif = (this.config.height - Math.floor(config.nodesCount / config.columns) * padding) / 2;
      nd.x = startX + xLoc * padding;
      nd.y = dif + yLoc * padding
    }
  }

  parseLayer(model, config) {
    const {
      shape,
      name,
      previousColumn
    } = model;

    this.layerConfig = {

    };

    const {
      layerIndex,
      rightsideModel,
      renderNode
    } = config;

    if (!model.visited) {
      model.visited = true;

      const nodes = [];
      const links = [];
      const [noop, w, h = 1, d = 1] = shape;
      for (let i = 0; i < w * h * d; i++) {
        const id = `${name}-node-${i}`;
        let node = {
          id,
          layerIndex,
          layerName: name,
          model
        };

        const layerConfig = this.getLayerConfig(node, renderNode, {
          w,
          h,
          d
        });
        node.indexInLayer = layerConfig.nodesCount;
        layerConfig.nodesCount++;
        node.config = layerConfig;
        node.render = forceValues => {
          layerConfig.renderNode(node, forceValues);
        }
        nodes.push(node);
        this.nodes.push(node);
      }

      Object.assign(model, {
        nodes,
        links,
        rightsideModel
      });
    }

    if (previousColumn) {
      previousColumn.forEach(layer => {
        this.parseLayer(layer, {
          rightsideModel: model,
          layerIndex: layerIndex - 1,
          renderNode
        });
      });
    }
  }

  getLayerConfig(node, renderNode, shape) {
    const {
      layerIndex
    } = node;

    const {
      w,
      h: rows,
      d: depth
    } = shape;

    let config = this.layerConfig[layerIndex];
    if (!config) {
      const {
        defaultLayer,
        layer
      } = this.config;

      let custom;

      if (layer) {
        custom = layer[node.layerName]
      }

      config = {
        ...defaultConfig,
        ...defaultLayer,
        renderNode,
        nodesCount: 0,
        columns: rows === 1 ? 1 : w,
        rows,
        depth,
        ...custom
      }

      config.move = config.move || this.locationFnProvider(config);
      this.layerConfig[layerIndex] = config;
    }

    return config;
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

    this.modelProfile = modelProfile;

    const layers = Object.values(layerMap);

    this.parseLayer(model, {
      layerIndex: layers.length,
      renderNode
    });

    this.nodes.sort((a, b) => a.layerIndex - b.layerIndex);

    this.nodes.forEach(nd => {
      const {
        config
      } = nd;
      const {
        prepareNode: prepare
      } = config;

      prepare(nd, config);
    });

    this.calculatePosition();
    this.renderPass();
  }

  calculatePosition() {
    console.log('calculating position...');
    let maxX = 0;
    let lastMaxX = 0;
    let lastLayer = -1;
    this.nodes.forEach((nd, index) => {
      if (lastLayer !== nd.layerIndex) {
        lastMaxX = maxX += this.config.layerPadding;
        lastLayer = nd.layerIndex;
      }
      nd.config.move(lastMaxX, nd);
      maxX = Math.max(maxX, nd.x);

    });
  }

  renderPass() {
    console.log('rendering...');
    this.nodes.forEach((nd, index) => {
      nd.render();
    });
  }

  setRenderContext(context) {
    this.renderContext = context;
  }

  layerUpdate(layer) {
    layer.nodes.forEach(node => node.render());
  }

  update(model, input) {
    const {
      output
    } = model;
    console.log(output);
    let inputLayers = model.layerArr.filter(layer => layer.previousColumn.length === 0);
    inputLayers.forEach((layer, index) => {
      layer.nodes.forEach(node => node.render(input[index].dataSync()));
    })

    model.layerArr.forEach(layer => {
      if (inputLayers.indexOf(layer) === -1) {
        layer.nodes.forEach(node => node.render());
      }
    });
  }
}
