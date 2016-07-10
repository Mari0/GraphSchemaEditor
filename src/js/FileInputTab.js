'use strict';
define(['jquery',
        'GraphSchemaManager',
        'Alert',
        'text!tpl/fileInputTab.html'],
    function ($, GraphSchemaManager,Alert,htmlFileInputTab) {
        /** loads the datasource example and initializes drag&drop-event and svg-element*/
        function loadDataSourceExample($node) {
            $node.find("#upload").change(function(){
                var file = this.files[0];
                if (file.name.search(/.json/) !== -1) {
                    var reader = new FileReader();
                    reader.readAsText(file, "UTF-8");

                    reader.onload = function (evt) {
                        var json = JSON.parse(evt.target.result);
                        var result = GraphSchemaManager.add(json);
                        if(result instanceof  Error){
                            Alert.Error('Error: ' + result.message, '#inputCtrl .panel-body');
                        }
                        else {
                            Alert.Success('Successfully loaded ' + json.name + ' GraphSchema', '#inputCtrl .panel-body');
                        }
                    }

                } else {
                    alert("Not a json file");
                }

            });

        }

        /**Initializes the File Input Tab*/
        function FileInputTab() {
            var $fileInputTabContent = $(htmlFileInputTab);
            loadDataSourceExample($fileInputTabContent);
            return $fileInputTabContent;
        }


        return FileInputTab;
    });
