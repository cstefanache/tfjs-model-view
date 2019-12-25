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

        this.layers = {};


        layerArr.forEach(l => {
            const { name, shape, activation } = l;
            this.outputLayer = l;
            const customConfig = layer[name] || {};
            const layerConfig = Object.assign({}, config, customConfig)
            const {
                radius,
                nodePadding,
                layerPadding,
                groupPadding,
                domainMax = 1,
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
                            y
                        });
                        height = y;
                    }
                }
            }

            height += groupPadding + radius;
            maxHeight = Math.max(maxHeight, height);

            this.layers[name] = {
                name,
                x: cx,
                layerWidth: width,
                layerHeight: height,
                radius,
                nodes,
                domainMax,
                layer: l
            }

            cx += width;

        });

        cx += xPadding || 0;

        Object.assign(this, { width: cx, height: maxHeight });
    }

}