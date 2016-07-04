define(['NavBarMain'],function (NavBarMain) {
    $(document).ready(function(){
        NavBarMain();
        require(['./../test/TestMain'], function () {
            console.log('Start Tests');
        });
    });
});