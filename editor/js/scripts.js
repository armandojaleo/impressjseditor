/*!
 * Impress JS Editor v1.0.0
 * https://github.com/armandojaleo/impressjseditor
 *
 * Author   Armando Lena
 */
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
    $.when(impressEditorJsonGet).then(function (x) {
        var p = impressEditorJsonGet.findIndex(x => x.idStep == idStep)
        if (p !== -1) {
            $('#saveStep').removeClass('disabled');
            $('#delStep').removeClass('disabled');
            $('#idStep').val(impressEditorJsonGet[p].idStep);
            $('#classStep').val(impressEditorJsonGet[p].classStep);
            $('#datax').val(impressEditorJsonGet[p].datax);
            $('#datay').val(impressEditorJsonGet[p].datay);
            $('#dataz').val(impressEditorJsonGet[p].dataz);
            $('#datarotate').val(impressEditorJsonGet[p].datarotate);
            $('#datarotatex').val(impressEditorJsonGet[p].datarotatex);
            $('#datarotatey').val(impressEditorJsonGet[p].datarotatey);
            $('#datarotatez').val(impressEditorJsonGet[p].datarotatez);
            $('#datascale').val(impressEditorJsonGet[p].datascale);
            $('#dataautoplay').val(impressEditorJsonGet[p].dataautoplay);
            $('#stepContent').summernote('destroy');
            $('#stepContent').html(impressEditorJsonGet[p].stepContent);
            $('#stepContent').summernote({
                tabsize: 2,
                height: 325
            });
        };
    });
};
function getAllImpressEditorJson() {
    reset();
    $('#listSteps').html('');
    $('#confirm-delete').modal('hide');
    if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
        $('#delAllSteps').removeClass('disabled');
        var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
        for (var i = 0; i < impressEditorJsonGet.length; i++) {
            $('#listSteps').append('<div class="btn btn-default loadStep" data-idstep="' + impressEditorJsonGet[i].idStep + '">' + impressEditorJsonGet[i].idStep + '</div>');
        };
    } else {
        $('#delStep, #delAllSteps').addClass('disabled');
    };
};
function saveImpressEditorJson(data) {
    var idStep = data[0].idStep;
    var classStep = data[0].classStep;
    var datax = data[0].datax;
    var datay = data[0].datay;
    var dataz = data[0].dataz;
    var datarotate = data[0].datarotate;
    var datarotatex = data[0].datarotatex;
    var datarotatey = data[0].datarotatey;
    var datarotatez = data[0].datarotatez;
    var datascale = data[0].datascale;
    var dataautoplay = data[0].dataautoplay;
    var stepContent = data[0].stepContent;
    if (localStorage.impressEditorJson !== undefined && localStorage.impressEditorJson != '') {
        var impressEditorJsonGet = JSON.parse(localStorage.impressEditorJson);
    };
    if (impressEditorJsonGet !== undefined) {
        var p = impressEditorJsonGet.findIndex(x => x.idStep == idStep)
        if (p !== -1) {
            if (classStep !== null) { impressEditorJsonGet[p].classStep = classStep; }
            if (datax !== null) { impressEditorJsonGet[p].datax = datax; }
            if (datay !== null) { impressEditorJsonGet[p].datay = datay; }
            if (dataz !== null) { impressEditorJsonGet[p].dataz = dataz; }
            if (datarotate !== null) { impressEditorJsonGet[p].datarotate = datarotate; }
            if (datarotatex !== null) { impressEditorJsonGet[p].datarotatex = datarotatex; }
            if (datarotatey !== null) { impressEditorJsonGet[p].datarotatey = datarotatey; }
            if (datarotatez !== null) { impressEditorJsonGet[p].datarotatez = datarotatez; }
            if (datascale !== null) { impressEditorJsonGet[p].datascale = datascale; }
            if (dataautoplay !== null) { impressEditorJsonGet[p].dataautoplay = dataautoplay; }
            if (stepContent !== null) { impressEditorJsonGet[p].stepContent = stepContent; }
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
function reset() {
    $('#idStep').val('');
    $('#classStep').val('step');
    $('#datax').val('0');
    $('#datay').val('0');
    $('#dataz').val('0');
    $('#datarotate').val('0');
    $('#datarotatex').val('0');
    $('#datarotatey').val('0');
    $('#datarotatez').val('0');
    $('#datascale').val('1');
    $('#dataautoplay').val('5');
    $('#stepContent').summernote('destroy');
    $('#stepContent').html('');
    $('#stepContent').summernote({
        placeholder: 'Step text',
        tabsize: 2,
        height: 325
    });
    $('#delStep').addClass('disabled');
};
$(document).on('click', '.loadStep', function () {
    var idStep = $(this).data('idstep');
    getImpressEditorJson(idStep);
});
$(document).on('input', '#idStep', function () {
    if ($(this).val().length > 0) {
        $('#saveStep').removeClass('disabled');
    } else {
        $('#saveStep').addClass('disabled');
    };
});
$(document).on('click', '#deleteStep', function () {
    var idStep = $('#idStep').val();
    deleteStep(idStep);
});
$(document).on('click', '#deleteAllSteps', function () {
    localStorage.impressEditorJson = '';
    getAllImpressEditorJson();
});
$(document).on('click', '#saveToFile', function () {
    saveFile(localStorage.impressEditorJson, "steps.json");
});
$(document).ready(function () {
    getAllImpressEditorJson();
    var time = new Date().getTime();
    $('#idStep').val('Step-' + time);
    
    $('form').submit(function (e) {
        e.preventDefault();
        var data = $(this).serializeFormJSON();
        var jsonToLocalStorage = [];
        jsonToLocalStorage.push(data);
        saveImpressEditorJson(jsonToLocalStorage);
    });
    $('#confirm-delete').on('show.bs.modal', function (e) {
        $(this).find('.modal-header').text($(e.relatedTarget).data('title'));
        $(this).find('.modal-body').text($(e.relatedTarget).data('message'));
        $(this).find('.btn-ok').attr('id', $(e.relatedTarget).data('idaction'));
    });
});