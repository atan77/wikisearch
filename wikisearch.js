var queryReturns = [];

function queryOutput(title, snippet) {
  this.title = title;
  this.snippet = snippet;
}

function findText() {
  // Use Ajax to enable predictive search and remove need to submit search with button click
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=' + $('#queryinput').val(),
    dataType: 'jsonp',
    type: 'POST',
    success: function(data) {

     $('.results').empty();
     queryReturns.length = 0;
     var queryCards = data.query.search;

 //create a loop to append the results of each return result
      for (var result in queryCards) {
        queryReturns.push(new queryOutput(queryCards[result].title, queryCards[result].snippet));

        $('.results').append('<div class="returns"><a href="https://en.wikipedia.org/wiki/' + queryCards[result].title + '"target="_blank"><h3>' + queryCards[result].title + '</h3><p>' + queryCards[result].snippet + '</p></a></div><p>');
      }
    }
  });

  $('#queryinput').unbind('keyup');
  $('#queryinput').keyup(function() {
    findText();
  });
}

$('#queryinput').keyup(function() {
  findText();
});
