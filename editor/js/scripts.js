/*!
 * Impress JS Editor v1.0.0
 * https://github.com/armandojaleo/impressjseditor
 *
 * Author   Armando Lena
 */
(function ($) {
    $.fn.ijse = function (options) {
        if (localStorage.impressEditorOptionsJson !== undefined && localStorage.impressEditorOptionsJson != '') {
            var impressEditorOptionsJsonGet = JSON.parse(localStorage.impressEditorOptionsJson);
            var defaults = {
                maxv: impressEditorOptionsJsonGet[0].maxv,
                maxt: impressEditorOptionsJsonGet[0].maxt
            }
        } else {
            var defaults = {
                maxv: 10000,
                maxt: 60
            };
        }
        var settings = $.extend({}, defaults, options);
        function loadFile() {
            var fileToLoad = $("#filetoload")[0].files[0];
            var fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                var textFromFileLoaded = fileLoadedEvent.target.result;
                localStorage.impressEditorJson = textFromFileLoaded;
            };
            fileReader.readAsText(fileToLoad, "UTF-8");
            location.reload();
        };
        function saveFile(text, filename) {
            var a = document.createElement('a');
            a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
            a.setAttribute('download', filename);
            a.click();
        }
        function saveFileOffline() {
            $.get('../css/impress-demo.css', function (data2) {
                var fd2 = '<style>' + data2 + '</style>';
                $.get('../js/impress.js', function (data5) {
                    fd5 = '<script>' + data5 + '</script>';
                    $.get('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', function (data6) {
                        fd6 = '<script>' + data6 + '</script>';
                        var fd1 = '<!doctype html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=1024" /><meta name="apple-mobile-web-app-capable" content="yes" /><title>impress.js | presentation tool based on the power of CSS3 transforms and transitions in modern browsers | by Bartek Szopka @bartaz</title><meta name="description" content="impress.js is a presentation tool based on the power of CSS3 transforms and transitions in modern browsers and inspired by the idea behind prezi.com." /><meta name="author" content="Bartek Szopka" />';
                        stl = '';
                        if (localStorage.impressEditorOptionsJson !== undefined && localStorage.impressEditorOptionsJson != '') {
                            var impressEditorOptionsJsonGet = JSON.parse(localStorage.impressEditorOptionsJson);
                            var stl = '<style>body { background: ' + impressEditorOptionsJsonGet[0].background + ' }</style>'
                        };
                        var fd3 = '</head><body class="impress-not-supported"><div class="fallback-message"><p>Your browser <b>doesn\'t support the features required</b> by impress.js, so you are presented with a simplified version of this presentation.</p><p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p></div><div id="impress" data-autoplay="2">';
                        var sd = '';
                        var fd4 = '</div><div id="impress-toolbar"></div><div class="hint"><p>Use a spacebar or arrow keys to navigate. <br/>Press \'P\' to launch speaker console.</p></div><script> if ("ontouchstart" in document.documentElement) { document.querySelector(".hint").innerHTML = "<p>Swipe left or right to navigate</p>"; } </script>'
                        var fd7 = '</script><script>$(document).ready(function(){ impress().init(); });</script></body></html>';
                        if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
                            var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
                            for (var i = 0; i < impressEditorJsonGet.length; i++) {
                                var sd = sd + '<div ' +
                                    'id="' + impressEditorJsonGet[i].idstep +
                                    '" class="' + impressEditorJsonGet[i].classstep +
                                    '" data-x="' + impressEditorJsonGet[i].datax +
                                    '" data-y="' + impressEditorJsonGet[i].datay +
                                    '" data-z="' + impressEditorJsonGet[i].dataz +
                                    '" data-rotate="' + impressEditorJsonGet[i].datarotate +
                                    '" data-rotate-x="' + impressEditorJsonGet[i].datarotatex +
                                    '" data-rotate-y="' + impressEditorJsonGet[i].datarotatey +
                                    '" data-rotate-z="' + impressEditorJsonGet[i].datarotatez +
                                    '" data-scale="' + impressEditorJsonGet[i].datascale +
                                    '" data-autoplay="' + impressEditorJsonGet[i].dataautoplay +
                                    '">' + impressEditorJsonGet[i].stepcontent + '</div>';
                            };
                        };

                        var a = document.createElement('a');
                        a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(fd1 + fd2 + stl + fd3 + sd + fd4 + fd5 + fd6 + fd7));
                        a.setAttribute('download', 'offline.html');
                        a.click();
                    });
                });
            });
        }
        function getImpressEditorJson(idStep) {
            if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
                var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
            };
            if (impressEditorJsonGet !== undefined) {
                var p = impressEditorJsonGet.findIndex(x => x.idstep == idStep)
                if (p !== -1) {
                    destroySliders();
                    $('#saveStep').removeClass('disabled');
                    $('#delStep').removeClass('disabled');
                    $('#idstep').val(impressEditorJsonGet[p].idstep);
                    $('#classstep').val(impressEditorJsonGet[p].classstep);
                    $('#datax').val(impressEditorJsonGet[p].datax).next($(".labelslider")).text(impressEditorJsonGet[p].datax);
                    $('#datax').slider({ min: -(settings.maxv), max: settings.maxv, value: impressEditorJsonGet[p].datax, step: 100, tooltip: 'hide' });
                    $('#datay').val(impressEditorJsonGet[p].datay).next($(".labelslider")).text(impressEditorJsonGet[p].datay);
                    $('#datay').slider({ min: -(settings.maxv), max: settings.maxv, value: impressEditorJsonGet[p].datay, step: 100, tooltip: 'hide' });
                    $('#dataz').val(impressEditorJsonGet[p].dataz).next($(".labelslider")).text(impressEditorJsonGet[p].dataz);
                    $('#dataz').slider({ min: -(settings.maxv), max: settings.maxv, value: impressEditorJsonGet[p].dataz, step: 100, tooltip: 'hide' });
                    $('#datarotate').val(impressEditorJsonGet[p].datarotate).next($(".labelslider")).text(impressEditorJsonGet[p].datarotate);
                    $('#datarotate').slider({ min: -360, max: 360, value: impressEditorJsonGet[p].datarotate, step: 15, tooltip: 'hide' });
                    $('#datarotatex').val(impressEditorJsonGet[p].datarotatex).next($(".labelslider")).text(impressEditorJsonGet[p].datarotatex);
                    $('#datarotatex').slider({ min: -360, max: 360, value: impressEditorJsonGet[p].datarotatex, step: 15, tooltip: 'hide' });
                    $('#datarotatey').val(impressEditorJsonGet[p].datarotatey).next($(".labelslider")).text(impressEditorJsonGet[p].datarotatey);
                    $('#datarotatey').slider({ min: -360, max: 360, value: impressEditorJsonGet[p].datarotatey, step: 15, tooltip: 'hide' });
                    $('#datarotatez').val(impressEditorJsonGet[p].datarotatez).next($(".labelslider")).text(impressEditorJsonGet[p].datarotatez);
                    $('#datarotatez').slider({ min: -360, max: 360, value: impressEditorJsonGet[p].datarotatez, step: 15, tooltip: 'hide' });
                    $('#datascale').val(impressEditorJsonGet[p].datascale).next($(".labelslider")).text(impressEditorJsonGet[p].datascale);
                    $('#datascale').slider({ min: 1, max: 10, value: impressEditorJsonGet[p].datascale, step: 1, tooltip: 'hide' });
                    $('#dataautoplay').val(impressEditorJsonGet[p].dataautoplay).next($(".labelslider")).text(impressEditorJsonGet[p].dataautoplay);
                    $('#dataautoplay').slider({ min: 0, max: settings.maxt, value: impressEditorJsonGet[p].dataautoplay, step: 1, tooltip: 'hide' });
                    $('#stepcontent').summernote('destroy');
                    $('#stepcontent').html(impressEditorJsonGet[p].stepcontent);
                    $('#stepcontent').summernote({
                        tabsize: 2,
                        height: 325
                    });
                    $(".datasliderone").on("slide", function (slideEvt) {
                        $(this).next($(".labelslider")).text(slideEvt.value);
                    });
                    $(".dataslidertwo").on("slide", function (slideEvt) {
                        $(this).next($(".labelslider")).text(slideEvt.value);
                    });
                    $(".datasliderthree").on("slide", function (slideEvt) {
                        $(this).next($(".labelslider")).text(slideEvt.value);
                    });
                    $(".datasliderfour").on("slide", function (slideEvt) {
                        $(this).next($(".labelslider")).text(slideEvt.value);
                    });
                };
            };
        };
        function getAllImpressEditorJson() {
            $('#confirm-delete').modal('hide');
            if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
                $('#preview, #saveToFile, #delAllSteps').removeClass('disabled');
                var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
                $('#listSteps').html('');
                for (var i = 0; i < impressEditorJsonGet.length; i++) {
                    $('#listSteps').append('<div id="item-' + i + '" class="btn btn-default col-xs-12 col-md-2 loadStep" data-idstep="' + impressEditorJsonGet[i].idstep + '" aria-label="Move Step">' + impressEditorJsonGet[i].idstep + '</div>');
                };
            };
            $('#stepcontent').summernote({
                placeholder: 'Step text',
                tabsize: 2,
                height: 325
            });
            generateSliders();
        };
        function saveImpressEditorJson(data) {
            var idstep = data[0].idstep;
            var classstep = data[0].classstep;
            var datax = data[0].datax;
            var datay = data[0].datay;
            var dataz = data[0].dataz;
            var datarotate = data[0].datarotate;
            var datarotatex = data[0].datarotatex;
            var datarotatey = data[0].datarotatey;
            var datarotatez = data[0].datarotatez;
            var datascale = data[0].datascale;
            var dataautoplay = data[0].dataautoplay;
            var stepcontent = data[0].stepcontent;
            if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
                var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
            };
            if (impressEditorJsonGet !== undefined) {
                var p = impressEditorJsonGet.findIndex(x => x.idstep == idstep)
                if (p !== -1) {
                    if (classstep !== null) { impressEditorJsonGet[p].classstep = classstep; }
                    if (datax !== null) { impressEditorJsonGet[p].datax = datax; }
                    if (datay !== null) { impressEditorJsonGet[p].datay = datay; }
                    if (dataz !== null) { impressEditorJsonGet[p].dataz = dataz; }
                    if (datarotate !== null) { impressEditorJsonGet[p].datarotate = datarotate; }
                    if (datarotatex !== null) { impressEditorJsonGet[p].datarotatex = datarotatex; }
                    if (datarotatey !== null) { impressEditorJsonGet[p].datarotatey = datarotatey; }
                    if (datarotatez !== null) { impressEditorJsonGet[p].datarotatez = datarotatez; }
                    if (datascale !== null) { impressEditorJsonGet[p].datascale = datascale; }
                    if (dataautoplay !== null) { impressEditorJsonGet[p].dataautoplay = dataautoplay; }
                    if (stepcontent !== null) { impressEditorJsonGet[p].stepcontent = stepcontent; }
                } else {
                    impressEditorJsonGet.push(data[0]);
                };
                localStorage.impressEditorJson = JSON.stringify(impressEditorJsonGet);
            } else {
                localStorage.impressEditorJson = JSON.stringify(data);
            };
            location.reload();
        };
        function deleteStep(idStep) {
            if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
                var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
            };
            var p = impressEditorJsonGet.findIndex(x => x.idstep == idStep)
            if (p !== -1) {
                impressEditorJsonGet.splice(p, 1);
            };
            localStorage.impressEditorJson = JSON.stringify(impressEditorJsonGet);
            location.reload();
        };
        function stepsOrder(fromIndex, toIndex) {
            var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
            var element = impressEditorJsonGet[fromIndex];
            impressEditorJsonGet.splice(fromIndex, 1);
            impressEditorJsonGet.splice(toIndex, 0, element);
            localStorage.impressEditorJson = JSON.stringify(impressEditorJsonGet);
        }
        function generateSliders() {
            $(".datasliderone").slider({
                min: -(settings.maxv),
                max: settings.maxv,
                value: 0,
                step: 100,
                tooltip: 'hide'
            });
            $(".datasliderone").on("slide", function (slideEvt) {
                $(this).next($(".labelslider")).text(slideEvt.value);
            });
            $(".dataslidertwo").slider({
                min: -360,
                max: 360,
                value: 0,
                step: 15,
                tooltip: 'hide'
            });
            $(".dataslidertwo").on("slide", function (slideEvt) {
                $(this).next($(".labelslider")).text(slideEvt.value);
            });
            $(".datasliderthree").slider({
                min: 1,
                max: 10,
                value: 1,
                step: 1,
                tooltip: 'hide'
            });
            $(".datasliderthree").on("slide", function (slideEvt) {
                $(this).next($(".labelslider")).text(slideEvt.value);
            });
            $(".datasliderfour").slider({
                min: 0,
                max: settings.maxT,
                value: 2,
                step: 1,
                tooltip: 'hide'
            });
            $(".datasliderfour").on("slide", function (slideEvt) {
                $(this).next($(".labelslider")).text(slideEvt.value);
            });
        };

        function destroySliders() {
            $(".datasliderone").slider('destroy');
            $(".dataslidertwo").slider('destroy');
            $(".datasliderthree").slider('destroy');
            $(".datasliderfour").slider('destroy');
        };

        function saveOptions() {
            var background = $('#background').val();
            var maxv = $('#maxv').val();
            var maxt = $('#maxt').val();
            var saveOptions = [];
            var options = {
                background: background,
                maxv: maxv,
                maxt: maxt
            };
            saveOptions.push(options);
            localStorage.impressEditorOptionsJson = JSON.stringify(saveOptions);
        }

        $(document).on('click', '.loadStep', function () {
            var idStep = $(this).data('idstep');
            getImpressEditorJson(idStep);
        });
        $(document).on('input', '#idstep', function () {
            if ($(this).val().length > 0) {
                $('#saveStep').removeClass('disabled');
            } else {
                $('#saveStep').addClass('disabled');
            };
        });
        $(document).on('click', '#deleteStep', function () {
            var idStep = $('#idstep').val();
            deleteStep(idStep);
        });
        $(document).on('click', '#deleteAllSteps', function () {
            localStorage.impressEditorJson = '';
            location.reload();
        });
        $(document).on('click', '#loadFile', function (e) {
            e.preventDefault();
            loadFile();
        });
        $(document).on('click', '#saveToFile', function (e) {
            e.preventDefault();
            saveFile(localStorage.impressEditorJson, "steps.json");
        });
        $(document).on('click', '#offline', function (e) {
            e.preventDefault();
            saveFileOffline();
        });
        $(document).on('click', '#saveOptions', function () {
            saveOptions();
            location.reload();
        });
        $(document).ready(function () {
            getAllImpressEditorJson();
            var time = new Date().getTime();
            $('#idstep').val('Step-' + time);

            $('#listSteps').sortable({
                start: function (event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                stop: function (event, ui) {
                    stepsOrder(ui.item.startPos, ui.item.index());
                }
            });

            $('form').submit(function (e) {
                e.preventDefault();
                var data = $(this).serializeFormJSON();
                var jsonToLocalStorage = [];
                jsonToLocalStorage.push(data);
                saveImpressEditorJson(jsonToLocalStorage);
            });

            $('#promp-options').on('show.bs.modal', function (e) {
                if (localStorage.impressEditorOptionsJson !== undefined && localStorage.impressEditorOptionsJson != '') {
                    var impressEditorOptionsJsonGet = JSON.parse(localStorage.impressEditorOptionsJson);
                    $('#backgroundaddon, #background').colorpicker('destroy')
                    $(this).find('#background').val(impressEditorOptionsJsonGet[0].background);
                    $('#backgroundaddon, #background').colorpicker({ color: impressEditorOptionsJsonGet[0].background });
                    $(this).find('#maxv').val(impressEditorOptionsJsonGet[0].maxv);
                    $(this).find('#maxt').val(impressEditorOptionsJsonGet[0].maxt);
                }

                $(this).find('.btn-ok').attr('id', $(e.relatedTarget).data('idaction'));
            });

            $('#promp-file').on('show.bs.modal', function (e) {
                $(this).find('.modal-header').text($(e.relatedTarget).data('title'));
                $(this).find('.modal-body').text($(e.relatedTarget).data('message')).append('<div class="form-goup"><input class="form-control" id="filetoload" name="filetoload" type="file"></div>');;
                $(this).find('.btn-ok').attr('id', $(e.relatedTarget).data('idaction'));
            });

            $('#confirm-delete').on('show.bs.modal', function (e) {
                $(this).find('.modal-header').text($(e.relatedTarget).data('title'));
                $(this).find('.modal-body').text($(e.relatedTarget).data('message'))
                $(this).find('.btn-ok').attr('id', $(e.relatedTarget).data('idaction'));
            });
        });
    };
}(jQuery));
