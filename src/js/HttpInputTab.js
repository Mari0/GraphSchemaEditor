define([
    'jquery',
    'lodash',
    'Alert',
    'text!tpl/httpInputTab.html',
    'text!tpl/radioButton.html',
    'text!tpl/htmlGETForm.html',
    'text!tpl/htmlPOSTForm.html'], /**@lends HttpInputTab*/
	function ($, _, Alert,  htmlHttpInputTab, tplRadioButton, htmlGETForm, htmlPOSTForm) {
	
	function HttpInputTab() {

        var tpl = _.template(tplRadioButton);
        var $httpInputTab = $(htmlHttpInputTab);

        function RadioButton(label, callback, active) {
            $httpInputTab.find('#httpInputRadioButtons').append($(tpl({name: label, active: active ? 'active' : ''}))
                .click(function () {
                    if (callback) {
                        callback();
                    }
                }));
        }
        function httpGetInputForm() {
            var $htmlGetForm = $(htmlGETForm);
            $htmlGetForm.find('button')
                .click(function () {
                    var url = $('#httpGetInputForm_getUrl').val();
                    var successCallback = function (resp) {
                        var data;
                        try {
                            data = JSON.parse(resp);
                        } catch (e) {
                            data = resp;
                        }


                        Alert.Success('Get Request was sucessful', '#httpGetForm');
                    };
                    var errorCallback = function () {
                        Alert.Error('Error! Invalid request. ', '#httpGetForm');
                    };
                    var JSONP_request = {
                        type: 'GET',
                        url: url,
                        dataType: "jsonp",
                        jsonpCallback: 'callback',
                        headers: {
                            // 'Access-Control-Allow-Origin': '*'
                        },
                        xhrFields: {
                            withCredentials: false
                        },
                        success: function (resp) {
                            successCallback(resp);
                        },
                        error: function (resp) {
                            errorCallback(resp);
                        }

                    };
                    var request = {
                        type: 'GET',
                        url: url,
                        contentType: 'application/json',
                        headers: {
                            // 'Access-Control-Allow-Origin': '*'
                        },
                        xhrFields: {
                            withCredentials: false
                        },
                        success: function (resp) {
                            successCallback(resp);
                        },
                        error: function (resp) {
                            errorCallback(resp);
                        }

                    };
                    if ($('#httpGetForm').find('.checkbox input').prop('checked')) {
                        $.ajax(JSONP_request);
                    }
                    else {
                        $.ajax(request);
                    }
                });
            return $htmlGetForm;
        }
        function httpPostInputForm() {
            var $htmlPOSTForm = $(htmlPOSTForm);
            $(htmlPOSTForm).find('button')
                .click(function () {
                    var url = $('#httpPostInputForm_getUrl').val();
                    var data = $('#httpPostInputForm_getData').val();
                    $.post(url, data, function (data) {
                        $('#panel_MappingConfigurator').remove();
                        Alert.Success('Get Request was sucessful', '#httpPostForm');
                    }).fail(function (error) {
                        var e = JSON.parse(error.responseText);
                        Alert.Error(e.code + ' ! ' + e.errorMessage, '#httpPostForm');
                    });
                });
            return $htmlPOSTForm;
        }

        RadioButton('GET', function () {
            var $httpGetForm = $httpInputTab.find('#httpGetForm');
            if ($httpGetForm.length === 0) {
                $httpInputTab.find('.panel-body').append(httpGetInputForm());
            }
            $httpGetForm.show();
            $httpInputTab.find('#httpPostForm').hide();
        }, true);
        RadioButton('POST', function () {
            var $httpPostForm = $httpInputTab.find('#httpPostForm');
            if ($httpPostForm.length === 0) {
                $httpInputTab.find('.panel-body').append(httpPostInputForm());
            }
            $httpPostForm.show();
            $httpInputTab.find('#httpGetForm').hide();
        });

        return $httpInputTab;

    }
	return HttpInputTab;
});
