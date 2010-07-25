(function($){
  var yql_hash_url = "http://yqlhash.appspot.com/api"
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
      console.log(search_string);
      if( search_string == default_string || $.trim(search_string).length == 0 ){
        $('#search_query').val('').focus();
      } else {
        var template = $('.resultFormat').clone().removeClass('resultFormat').addClass('result').show();
        $.getJSON(yql_base_url + '"' + search_string + '"' ,{},
          function(json){
            var temp_container = $("<div/>");
            $.each(json.query.results.result, function(index, result) {
              var item = $(template).clone();
              $('.resultLink', item).html(result.title).attr('href', result.url);
              $('.resultAbstract', item).html(result.abstract);
              temp_container.append(item[0]);
            });
            $('.resultsBlock').append(temp_container).slideDown();
        });

        $.getJSON(yql_hash_url ,{action: 'get_index', index: search_string},
          function(json){
            var temp_container = $("<div/>");
            if(json.result.length > 1) return false;

            var item = $(template).clone();
            // show enhanced results only if it's very specific
            $('.resultLink', item).html(json.result[0].title).attr('href', json.result[0].url);
            $('.resultAbstract', item).html(json.result[0].abstract);
            temp_container.append(item[0]);
            
            $('.yqlhashBlock').append(temp_container).slideDown();
        });

      }
      return false;
    });
    
    $('#createIndexForm').click(function() {
      $('.createIndex').toggle('slide');
    });
    
    $('#index_create_form').submit(function() {
      if( !(validate_index_form()) ) {
        // do something
      } else {
        $.getJSON(yql_hash_url, $(this).serialize(),
          function(json){
            // natthing
        });
      }
      
      return false;
    });
    
    function validate_index_form() {
      return $('#index', '.createIndex').val().length > 0 &&
             $('#yql_query', '.createIndex').val().length > 0 &&
             $('#tag', '.createIndex').val().length > 0
    }
  });
})(jQuery);
