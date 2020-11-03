$('#id-btn-up-documento').on('click', function() {
  $('#id-up-documento').trigger('click');
});

$('#id-up-documento').on('change', function() {
  var fileName = $(this)[0].files[0].name;
  $('#id-up-documento-file').val(fileName);
});