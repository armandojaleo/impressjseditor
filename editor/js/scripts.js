/*!
 * Impress JS Editor v1.0.0
 * https://github.com/armandojaleo/impressjseditor
 *
 * Author   Armando Lena
 */
function loadFile() {
    var fileToLoad = $("#filetoload")[0].files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
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
    a.click()
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
            $('#datax').slider({ min: -5000, max: 5000, value: impressEditorJsonGet[p].datax, step: 500, tooltip: 'hide' });
            $('#datay').val(impressEditorJsonGet[p].datay).next($(".labelslider")).text(impressEditorJsonGet[p].datay);
            $('#datay').slider({ min: -5000, max: 5000, value: impressEditorJsonGet[p].datay, step: 500, tooltip: 'hide' });
            $('#dataz').val(impressEditorJsonGet[p].dataz).next($(".labelslider")).text(impressEditorJsonGet[p].dataz);
            $('#dataz').slider({ min: -5000, max: 5000, value: impressEditorJsonGet[p].dataz, step: 500, tooltip: 'hide' });
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
            $('#dataautoplay').slider({ min: 0, max: 60, value: impressEditorJsonGet[p].dataautoplay, step: 1, tooltip: 'hide' });
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
            $('#listSteps').append('<div id="item-' + i + '" class="btn btn-default loadStep" data-idstep="' + impressEditorJsonGet[i].idstep + '">' + impressEditorJsonGet[i].idstep + '</div>');
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
    var p = impressEditorJsonGet.findIndex(x => x.idStep == idStep)
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
        min: -5000,
        max: 5000,
        value: 0,
        step: 500,
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
        max: 60,
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
$(document).on('click', '#saveToFile', function () {
    saveFile(localStorage.impressEditorJson, "steps.json");
});
$(document).ready(function () {
    getAllImpressEditorJson();
    var time = new Date().getTime();
    $('#idstep').val('Step-' + time);

    $('#listSteps').sortable({
        start: function(event, ui) {
            ui.item.startPos = ui.item.index();
        },
        stop: function(event, ui) {
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

    $('#promp-file').on('show.bs.modal', function (e) {
        $(this).find('.modal-header').text($(e.relatedTarget).data('title'));
        $(this).find('.modal-body').text($(e.relatedTarget).data('message')).append('<div class="form-goup"><input class="form-control" id="filetoload" name="filetoload" type="file"></div>');;
        $(this).find('.btn-ok').attr('onclick', $(e.relatedTarget).data('idaction'));
    });

    $('#confirm-delete').on('show.bs.modal', function (e) {
        $(this).find('.modal-header').text($(e.relatedTarget).data('title'));
        $(this).find('.modal-body').text($(e.relatedTarget).data('message'))
        $(this).find('.btn-ok').attr('id', $(e.relatedTarget).data('idaction'));
    });
});


