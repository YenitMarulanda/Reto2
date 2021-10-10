var urlRest = 'https://g89512091449df4-db202109251217.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/category/category';

$(document).ready(function () {
    loadDataTable();
});

$("#formCategory").on("click",function(event){
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
                    '<td><button onclick="deleteCategory(' + myItems[i].id + ')" class="btn btn-danger">Delete</button>' +
                    '&nbsp;&nbsp;<button onclick="detailsCategory(' + myItems[i].id + ')" class="btn btn-warning">Details</button></td>' +
                    '</tr>';
            }
            $('#tbodyCategory').html(valor);
            $('#details').hide();
        }
    });
}

function createCategory() {
    var dataForm = {
        id: $('#myId').val(),
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

function deleteCategory(idCategory) {
    var dataForm = {
        id: idCategory
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

function updateCategory(idCategory) {
    var dataForm = {
        id: idCategory,
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
            var valor = '<input type="submit" id="btnCreate" onclick="createCategory()" value="Create" class="btn btn-primary" />';
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

function detailsCategory(idCategory) {
    $.ajax({
        url: urlRest+'/'+idCategory,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<strong>Id:</strong>' +  myItem.id+' <br>' +
                '<strong>Nombre:</strong>' + myItem.name+' <br>' +
                '<button onclick="loadDataForm(' + myItem.id + ')" class="btn btn-warning" > Editar </button>';

            $('#details').show();
            $('#details').html(valor);
        }
    });
}

function loadDataForm(idCategory) {
    $.ajax({
        url: urlRest+'/'+idCategory,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            console.log(response);
            var myItem = response.items[0];
            var valor = '<input type="submit" id="btnUpdate" onclick="updateCategory('+myItem.id+')" value="Actualizar" class="btn btn-warning" />';           
            $("#myId").val(myItem.id);
            $("#name").val(myItem.name);

            $('#btnCreate').remove();
            $('#btnForm').html(valor);
            $("#myId").prop('disabled', true);
        }
    });
}

function clearForm(){
    $('#formCategory')[0].reset();
} 