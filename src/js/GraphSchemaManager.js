'use strict';
define(['VisualizeGraphSchema','TabWrapper','jsonEditor'],function (VisualizeGraphSchema, TabWrapper,JSONEditor) {
    function GraphSchemaManager(){
        var _schema = {};

        var _viewGSM = new TabWrapper('gsmTabC', 'gsmTabCC');

        return {
            add:function(json){
                if(json.hasOwnProperty('name')){
                    if(!_schema.hasOwnProperty(json.name)){
                        _schema[json.name] = json;

                        var graphSchemaEditor = new TabWrapper('tabC'+json.name, 'tabCC'+json.name);

                        var visNetwork = VisualizeGraphSchema(json);
                        graphSchemaEditor.addTab('Network' , visNetwork.canvas.frame);

                        var $jsonEditorContainer = $('<div></div>');
                        var options ={modes:[ 'tree', 'view', 'form', 'code', 'text']};
                        new JSONEditor($jsonEditorContainer[0], options, json);
                        graphSchemaEditor.addTab('Editor', $jsonEditorContainer);

                        var $graphSchemaContainer = $('<div></div>').attr('id', json.name).append(graphSchemaEditor.get$node());
                        _viewGSM.addClosableTab(json.name, $graphSchemaContainer);

                        return json.name;
                    }
                    else return new Error('Graph Schema ' + json.name + ' already exists');
                }
                else return new Error('Graph Schema got no name');
            },
            get$node:function(){
                return _viewGSM.get$node();
            }
        }

    }
    return new GraphSchemaManager();
});