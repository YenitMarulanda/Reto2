var urlRest = 'https://g89512091449df4-db202109251217.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client';

$(document).ready(function () {
    loadDataTable();
});

$("#formClient").on("click",function(event){
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
                    '<td>' + myItems[i].name + '</td>' +
                    '<td>' + myItems[i].email + '</td>' +
                    '<td>' + myItems[i].age + '</td>' +
                    '<td><button onclick="deleteClient(' + myItems[i].id + ')" class="btn btn-danger">Delete</button>' +
                    '&nbsp;&nbsp;<button onclick="detailsClient(' + myItems[i].id + ')" class="btn btn-warning">Details</button></td>' +
                    '</tr>';
            }
            $('#tbodyClient').html(valor);
            $('#details').hide();
        }
    });
}

function createClient() {
    var dataForm = {
        id: $('#myId').val(),
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val()
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

function deleteClient(idClient) {
    var dataForm = {
        id: idClient
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

function updateClient(idClient) {
    var dataForm = {
        id: idClient,
        name: $('#name').val(),
        email: $('#email').val(),
        age: $('#age').val()
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
            var valor = '<input type="submit" id="btnCreate" onclick="createClient()" value="Create" class="btn btn-primary" />';
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

function detailsClient(idClient) {
    $.ajax({
        url: urlRest+'/'+idClient,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<strong>Id:</strong>' +  myItem.id+' <br>' +
                '<strong>Name:</strong>' + myItem.name+' <br>' +
                '<strong>Email:</strong>' + myItem.email+' <br>' +
                '<strong>Age:</strong>' + myItem.age+' <br>' +
                '<button onclick="loadDataForm(' + myItem.id + ')" class="btn btn-warning" > Editar </button>';

            $('#details').show();
            $('#details').html(valor);
        }
    });
}

function loadDataForm(idClient) {
    $.ajax({
        url: urlRest+'/'+idClient,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<input type="submit" id="btnUpdate" onclick="updateClient('+myItem.id+')" value="Actualizar" class="btn btn-warning" />';           
            $("#myId").val(myItem.id);
            $("#name").val(myItem.name);
            $('#email').val(myItem.email);
            $('#age').val(myItem.age);

            $('#btnCreate').remove();
            $('#btnForm').html(valor);
            $("#myId").prop('disabled', true);
        }
    });
}

function clearForm(){
    $('#formClient')[0].reset();
} 