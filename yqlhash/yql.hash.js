(function($){
  var yql_base_url = "http://query.yahooapis.com/v1/public/yql?format=json&q=select title,abstract,url from search.web where query="
  var default_string = "Enter search term";
  
  $(document).ready(function() {
    $('#search_query').val(default_string).focus(function() {
      if(this.value == default_string) {
        this.value = '';
      }
    });;
    
    $('#search_form').submit(function() {
      search_string = $('#search_query').val();
      if( search_string == default_string || $.trim(search_string).length == 0 ){
        $('#search_query').val('').focus();
      } else {
        var temp_container = $("<div/>");
        var template = $('.resultFormat').clone().removeClass('resultFormat').addClass('result').show();
        $.getJSON(yql_base_url + '"' + search_string + '"' ,{},
          function(json){
            $.each(json.query.results.result, function(index, result) {
              var item = $(template).clone();
              $('.resultLink', item).html(result.title).attr('href', result.url);
              $('.resultAbstract', item).html(result.abstract);
              temp_container.append(item[0]);
            });
        });
        $('.resultsBlock').append(temp_container).slideDown();
      }
      return false;
    });
  });
})(jQuery);
