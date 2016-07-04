define(['jquery',
        'GraphSchemaManager',
        'text!tpl/fileInputTab.html'],
    function ($, GraphSchemaManager,htmlFileInputTab) {
        /** loads the datasource example and initializes drag&drop-event and svg-element*/
        function loadDataSourceExample($node) {
            $node.find("#upload").change(function(){
                var file = this.files[0];
                if (file.name.search(/.json/) !== -1) {
                    var reader = new FileReader();
                    reader.readAsText(file, "UTF-8");

                    reader.onload = function (evt) {
                        GraphSchemaManager.add(JSON.parse(evt.target.result));
                    };

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
