var urlRest = 'https://g89512091449df4-db202109251217.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message';

$(document).ready(function () {
    loadDataTable();
});

$("#formMessage").on("click",function(event){
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
                    '<td>' + myItems[i].messagetext + '</td>' +
                    '<td><button onclick="deleteMessage(' + myItems[i].id + ')" class="btn btn-danger">Delete</button>' +
                    '&nbsp;&nbsp;<button onclick="detailsMessage(' + myItems[i].id + ')" class="btn btn-warning">Details</button></td>' +
                    '</tr>';
            }
            $('#tbodyMessage').html(valor);
            $('#details').hide();
        }
    });
}

function createMessage() {
    var dataForm = {
        id: $('#myId').val(),
        messagetext: $('#messagetext').val()
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

function deleteMessage(idMessage) {
    var dataForm = {
        id: idMessage
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

function updateMessage(idMessage) {
    var dataForm = {
        id: idMessage,
        messagetext: $('#messagetext').val()
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
            var valor = '<input type="submit" id="btnCreate" onclick="createMessage()" value="Create" class="btn btn-primary" />';
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

function detailsMessage(idMessage) {
    $.ajax({
        url: urlRest+'/'+idMessage,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<strong>Id:</strong>' +  myItem.id+' <br>' +
                '<strong>Name:</strong>' + myItem.messagetext+' <br>' +
                '<button onclick="loadDataForm(' + myItem.id + ')" class="btn btn-warning" > Editar </button>';

            $('#details').show();
            $('#details').html(valor);
        }
    });
}

function loadDataForm(idMessage) {
    $.ajax({
        url: urlRest+'/'+idMessage,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<input type="submit" id="btnUpdate" onclick="updateMessage('+myItem.id+')" value="Actualizar" class="btn btn-warning" />';           
            $("#myId").val(myItem.id);
            $("#messagetext").val(myItem.messagetext);

            $('#btnCreate').remove();
            $('#btnForm').html(valor);
            $("#myId").prop('disabled', true);
        }
    });
}

function clearForm(){
    $('#formMessage')[0].reset();
} 