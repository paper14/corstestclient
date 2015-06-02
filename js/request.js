jQuery(document).ready(function($) {
  $('.btnSubmit').on('click', function() {
    $.ajax({
      url: 'http://localhost:3000/ajax-test',
      crossDomain: true,
      method: 'GET',
      success: function(data) {
        console.log(data);
      }
    });
  });
});