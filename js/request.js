jQuery(document).ready(function($) {
  $('.btnSubmit').on('click', function() {
    $.ajax({
      url: 'http://corstestserver.herokuapp.com/ajax-test',
      crossDomain: true,
      method: 'GET',
      success: function(data) {
        console.log(data);
      }
    });
  });
});