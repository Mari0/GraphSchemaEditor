define(['chai','TabWrapper'],function (chai,TabWrapper) {
    return function(){
        var expect = chai.expect;
        describe('Add Tabs to DOM using JQuery', function(){
            before(function(done){
                $('body').append(TabWrapper.get$node());
                TabWrapper.addClosableTab('TestTab1',$('<div>Test Content 1</div>'), null);
                TabWrapper.addClosableTab('TestTab2',$('<div>Test Content 2</div>'), null);
                done();

            });

            it('Should have a Tab Container in DOM', function(){
                expect($('#tabContainer').length).to.be.gt(0);
            });

            it('Should have a Tab Content in DOM', function(){
                expect($('#tabContent').length).to.be.gt(0);
            });

            it('Should have two Tabs', function(){
                expect($('#tabContainer').find('a[href="#tabContent0"]').length).to.be.gt(0);
                expect($('#tabContainer').find('a[href="#tabContent1"]').length).to.be.gt(0);
            });

            it('The second tab should be the active tab', function(){
                expect(TabWrapper.getActiveTabId()).to.be.equal('#tabContent1');

            });

            it('Check content containers');

            after(function(done){
                $('#tabContainer').find('a[href="#tabContent0"] button').click();

                describe('Delete the first Tab and add a another Tab', function(){
                    before(function(done){
                        TabWrapper.addClosableTab('TestTab3',$('<div>Test Content 3</div>'), null);
                        done();
                    });

                    it('Check Tabs', function(){
                        expect($('#tabContainer').find('a[href="#tabContent0"]').length).to.be.equal(0);
                        expect($('#tabContainer').find('a[href="#tabContent1"]').length).to.be.gt(0);
                        expect($('#tabContainer').find('a[href="#tabContent2"]').length).to.be.gt(0);
                    });

                    it('The fourth tab should be the active tab', function(){
                        expect(TabWrapper.getActiveTabId()).to.be.equal('#tabContent2');
                    });

                    it('Check content containers');

                    after(function(done){
                        //$('#tabContainer').find('a[href="#tabContent1"] button').click();
                        $('#tabContainer').find('a[href="#tabContent2"] button').click();
                        done();
                    })
                });
                done();

            })

        })
    }
});