$('#selectall').change(function () {

    if ($(this).prop('checked')) {

        $('.table_checkbox').prop('checked', true);

    } else {

        $('.table_checkbox').prop('checked', false);

    }

});