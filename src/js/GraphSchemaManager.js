define(['VisualizeGraphSchema','TabWrapper','jsonEditor'],function (VisualizeGraphSchema, TabWrapper,JSONEditor) {
    function GraphSchemaManager(){
        var _schema = {};

        return {
            add:function(json){
                if(json.hasOwnProperty('name')){
                    if(!_schema.hasOwnProperty(json.name)){
                        _schema[json.name] = json;

                        var visNetwork = VisualizeGraphSchema(json);
                        TabWrapper.addClosableTab(json.name + ' VisNetwork', visNetwork.canvas.frame);

                        var $jsonEditorContainer = $('<div></div>');
                        var options ={modes:[ 'tree', 'view', 'form', 'code', 'text']};
                        new JSONEditor($jsonEditorContainer[0], options, json);
                        TabWrapper.addClosableTab(json.name + ' JsonEditor', $jsonEditorContainer);


                        return json.name;
                    }
                    else return new Error('Graph Schema already exists');
                }
                else return new Error('Graph Schema got no name');
            }
        }

    }
    return new GraphSchemaManager();
});