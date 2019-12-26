export default class AbstractRenderer {

    constructor(config, initData) {
        const {
            xPadding,
            yPadding,
            layer = {},
        } = config;
        const { layerArr } = initData;

        let maxHeight = (yPadding || 1) * 2;
        let cx = xPadding || 0

        function processColumn(lyr, col = 0) {
            lyr.column = col;
            lyr.previousColumn.forEach(l => {
                processColumn(l, col + 1);
            });
        }

        processColumn(layerArr[layerArr.length - 1]);

        layerArr.forEach(l => {
            const { name, shape, previousColumn } = l;
            this.outputLayer = l;
            const customConfig = layer[name] || {};
            const layerConfig = Object.assign({}, config, customConfig)
            const {
                radius,
                nodePadding,
                layerPadding,
                groupPadding,
                domainMax = 1,
                renderLinks,
                reshape } = layerConfig;
            let [rows, cols, groups] = Object.assign([1, 1, 1], shape.slice(1));

            const totalNodes = rows * cols * groups;

            if (reshape) {
                const [nr, nc, ng] = Object.assign([1, 1, 1], reshape);
                if (nr * nc * ng !== totalNodes) {
                    throw new Error(`Unable to reshape from [${rows}, ${cols}, ${groups}] to [${nr}, ${nc}, ${ng}]`)
                }

                rows = nr;
                cols = nc;
                groups = ng;
            }

            cx += layerPadding;
            const step = radius + nodePadding;
            const width = layerPadding + cols * step
            const nodes = [];
            let height = 0;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    for (let g = 0; g < groups; g++) {
                        const y = groupPadding + radius + r * step + g * rows * (step + groupPadding)
                        nodes.push({
                            x: cx + c * step,
                            y,
                            radius
                        });
                        height = y;
                    }
                }
            }

            height += groupPadding + radius;
            maxHeight = Math.max(maxHeight, height);

            Object.assign(l, {
                name,
                x: cx,
                layerWidth: width,
                layerHeight: height,
                radius,
                nodes,
                domainMax,
                renderLinks,
                previousLayers: previousColumn.map(lyr => lyr.name)
            })

            cx += width;

        });

        cx += xPadding || 0;

        layerArr.forEach(l => {
            const offsetY = Math.floor((maxHeight - l.layerHeight) / 2);
            l.nodes.forEach(nd => nd.y += offsetY);
        });

        Object.assign(this, { width: cx, height: maxHeight });

        this.layers = layerArr;
        this.layersMap = layerArr.reduce((memo, item) => {
            memo[item.name] = item;
            return memo;
        }, {});
    }

    update(model, input) {
        if (input) {
            model.inputs.forEach((inputLayer, index) => {
                const syntheticLayer = this.layersMap[inputLayer.name];
                this.updateLayerValues(syntheticLayer, input[index].dataSync());
            });
        }

        this.updateLayerValues(this.outputLayer, model.outputData);
    }

    updateLayerValues(layer, data) {
        for (let i = 0; i < layer.nodes.length; i++) {
            layer.nodes[i].value = data[i];
        }
    }

    updateValues(layer) {
        const syntheticLayer = this.layersMap[layer.name];
        syntheticLayer.weights = layer.weights;
        syntheticLayer.previousColumn.forEach((col, idx) => {
            this.updateLayerValues(col, layer.activations[idx]);
        })

    }
}
