define(['lodash','vis'], function(_,vis){
    return function(graphSchema){
        var network = {nodes:[], edges:[]};
        var keyStore  = {};
        _.forOwn(graphSchema.vertex_classes, function(value, key){
            var classNode = {};
            classNode.id = key;
            classNode.label = key;
            network.nodes.push(classNode);
            _.forOwn(graphSchema.vertex_classes[key].properties, function(v, propName){

                if(!keyStore.hasOwnProperty(propName)) {
                    var propNode = {};
                    keyStore[propName] = true;
                    propNode.id = propName;
                    propNode.label = propName;
                    propNode.color = 'rgb(255,168,7)';
                    network.nodes.push(propNode);
                }
                var propEdge = {};
                propEdge.from = key;
                propEdge.to =  propName;
                propEdge.color = 'rgb(255,168,7)';
                network.edges.push(propEdge);
            });

            var superClass = graphSchema.vertex_classes[key].super_class;
            if(superClass){
                var superClassEdge = {};
                superClassEdge.from = key;
                superClassEdge.to = superClass;
                superClassEdge.arrows = 'to';
                superClassEdge.color = 'red';
                superClassEdge.label = 'isSubClassOf';
                superClassEdge.font = {align: 'middle'};
                network.edges.push(superClassEdge);
            }

        });

        _.forOwn(graphSchema.edge_classes, function(value, key){
            var edge =graphSchema.edge_classes[key];
            var edgeNode = {};
            edgeNode.id = key;
            edgeNode.label = key;
            edgeNode.shape = 'diamond';
            edgeNode.color = '#7BE141';
            network.nodes.push(edgeNode);

            if(edge.hasOwnProperty('from') && edge.hasOwnProperty('to')) {
                var toEdge = {};
                toEdge.from = key;
                toEdge.to = edge.to.classname;
                toEdge.arrows = 'to';
                toEdge.font = {align: 'middle'};
                toEdge.color = 'lime';

                network.edges.push(toEdge);

                var fromEdge = {};
                fromEdge.from = edge.from.classname;
                fromEdge.to = key;
                fromEdge.arrows = 'to';
                fromEdge.font = {align: 'middle'};
                fromEdge.color = 'lime';
                network.edges.push(fromEdge);
            }
            _.forOwn(graphSchema.edge_classes[key].properties, function(v, propName){

                if(!keyStore.hasOwnProperty(propName)) {
                    var propNode = {};
                    keyStore[propName] = true;
                    propNode.id = propName;
                    propNode.label = propName;
                    propNode.color = 'rgb(255,168,7)';
                    network.nodes.push(propNode);
                }
                var propEdge = {};
                propEdge.from = key;
                propEdge.to =  propName;
                propEdge.color = 'rgb(255,168,7)';
                network.edges.push(propEdge);
            });

        });

        // create an array with nodes
        var nodes = new vis.DataSet(network.nodes);

        var edges = new vis.DataSet(network.edges);

        // create a network
        var container = $('<div></div>')[0];
        var networkData = {
            nodes: nodes,
            edges : edges
        };
        var options = {
            nodes: {borderWidth: 2},
            interaction: {hover: true},
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -26,
                    centralGravity: 0.005,
                    springLength: 230,
                    springConstant: 0.18
                },
                maxVelocity: 146,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: {iterations: 300}
            }
        };

        return new vis.Network(container, networkData, options);
    }

});
