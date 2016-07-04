requirejs.config({
    baseUrl:"js",
    paths: {
        chai : "./../components/chai/chai",
        jquery: "./../components/jquery/dist/jquery.min",
        vis:"./../components/vis/dist/vis.min",
        test:"../test",
        sinon : "./../components/sinonjs/sinon",
        lodash : "./../components/lodash/dist/lodash.min",
        text: './../components/text/text',
        mocha:'./../components/mocha/mocha',
        tpl: "./../templates"
    }
});
requirejs(['jquery','test/TabWrapperTest','text!./../test/mocha.html', 'mocha'],
    function(jquery,  TabWrapperTest, mochaHtml){

        $("<link/>", {
            rel: "stylesheet",
            type: "text/css",
            href: "components/mocha/mocha.css"
        }).appendTo("head");
        $('body').prepend($(mochaHtml));

        $('#show_hide_tests').click(function(){

            var  $showTest = $('#showTest');
            if($showTest.is(':visible')) {
                $showTest.hide();
                $(this).text('Show Tests');
            }
            else{
                $showTest.show();
                $(this).text('Hide Tests');
            }
        });

        mocha.setup('bdd');
        mocha.reporter('html');
        //mocha.timeout(5000);

        TabWrapperTest();

        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        }
        else {
            mocha.run();
        }
    });