export default {
    renderer: 'canvas',

    radius: 6,
    nodePadding: 2,
    layerPadding: 20,
    groupPadding: 1,
    
    xPadding: 10,
    yPadding: 10,
   
    renderLinks: false,
    plotActivations: false,
    nodeStroke: true,

    onRendererInitialized: renderer => {
        document.body.appendChild(renderer.canvas);
    }
}
