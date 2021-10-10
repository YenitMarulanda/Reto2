var urlRest = 'https://g89512091449df4-db202109251217.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/machine/machine';

$(document).ready(function () {
    loadDataTable();
});

$("#formMachine").on("click", function (event) {
    event.preventDefault();
});

function loadDataTable() {
    $.ajax({
        url: urlRest,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var myItems = response.items;
            var valor = '';
            for (i = 0; i < myItems.length; i++) {
                valor += '<tr>' +
                    '<td>' + myItems[i].id + '</td>' +
                    '<td>' + myItems[i].brand + '</td>' +
                    '<td>' + myItems[i].model + '</td>' +
                    '<td>' + myItems[i].category_id + '</td>' +
                    '<td>' + myItems[i].name + '</td>' +
                    '<td><button onclick="deleteMachine(' + myItems[i].id + ')" class="btn btn-danger">Delete</button>' +
                    '&nbsp;&nbsp;<button onclick="detailsMachine(' + myItems[i].id + ')" class="btn btn-warning">Details</button></td>' +
                    '</tr>';
            }
            $('#tbodyMachine').html(valor);
            $('#details').hide();
        }
    });
}

function createMachine() {
    var dataForm = {
        id: $('#myId').val(),
        brand: $('#brand').val(),
        model: $('#model').val(),
        category_id: $('#category_id').val(),
        name: $('#name').val()
    };

    var dataFormJson = JSON.stringify(dataForm);

    $.ajax({
        url: urlRest,
        type: 'POST',
        data: dataFormJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            loadDataTable();
            clearForm();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }

    });
}

function deleteMachine(idMachine) {
    var dataForm = {
        id: idMachine
    };

    var dataFormJson = JSON.stringify(dataForm);

    $.ajax({
        url: urlRest,
        type: 'DELETE',
        data: dataFormJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            loadDataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }
    });
}

function updateMachine(idMachine) {
    var dataForm = {
        id: idMachine,
        brand: $('#brand').val(),
        model: $('#model').val(),
        category_id: $('#category_id').val(),
        name: $('#name').val()
    };

    var dataFormJson = JSON.stringify(dataForm);

    $.ajax({
        url: urlRest,
        type: 'PUT',
        data: dataFormJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
            var valor = '<input type="submit" id="btnCreate" onclick="createMachine()" value="Create" class="btn btn-primary" />';
            $('#btnForm').html(valor);
            $('#btnUpdate').remove();
            $("#myId").prop('disabled', false);
            loadDataTable();
            clearForm();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error');
        }

    });
}

function detailsMachine(idMachine) {
    $.ajax({
        url: urlRest + '/' + idMachine,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<strong>Id:</strong>' + myItem.id + ' <br>' +
                '<strong>Brand:</strong>' + myItem.brand + ' <br>' +
                '<strong>Model:</strong>' + myItem.model + ' <br>' +
                '<strong>Category_id::</strong>' + myItem.category_id + ' <br>' +
                '<strong>Name:</strong>' + myItem.name + ' <br>' +
                '<button onclick="loadDataForm(' + myItem.id + ')" class="btn btn-warning" > Editar </button>';

            $('#details').show();
            $('#details').html(valor);
        }
    });
}

function loadDataForm(idMachine) {
    $.ajax({
        url: urlRest + '/' + idMachine,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<input type="submit" id="btnUpdate" onclick="updateMachine(' + myItem.id + ')" value="Actualizar" class="btn btn-warning" />';
            $("#myId").val(myItem.id);
            $('#brand').val(myItem.brand);
            $('#model').val(myItem.model);
            $('#category_id').val(myItem.category_id);
            $('#name').val(myItem.name);

            $('#btnCreate').remove();
            $('#btnForm').html(valor);
            $("#myId").prop('disabled', true);
        }
    });
}

function clearForm() {
    $('#formMachine')[0].reset();
}