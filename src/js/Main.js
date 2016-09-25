'use strict';
define(['NavBarMain', 'GraphSchemaManager'],function (NavBarMain,GraphSchemaManager) {
    $(document).ready(function(){

        NavBarMain();

        $('body').append(GraphSchemaManager.get$node());
        /*require(['./../test/TestMain'], function () {
            console.log('Start Tests');
        });*/
    });
});