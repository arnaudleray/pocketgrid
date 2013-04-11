/**
 * http://stackoverflow.com/questions/1219860/javascript-jquery-html-encoding/1219983#1219983
 */
function htmlEncode(value){
  // Create a in-memory div, set it's inner text(which jQuery automatically encodes)
  // then grab the encoded contents back out. The div never exists on the page.
  return $('<div/>').text(value).html();
}
function htmlDecode(value){
  return $('<div/>').html(value).text();
}

/**
 * http://www.hermanradtke.com/blog/blog/managing-multiple-jquery-promises
 * http://taraxe.wordpress.com/2011/12/13/jquery-promises/
 */
var deferredHelper = {
  all: function all(array) {
    var deferred = $.Deferred();
    var fulfilled = 0, length = array.length;
    var results = [];

    if (length === 0) {
        deferred.resolve(results);
    } else {
        _.each(array, function(promise, i){
            $.when(promise()).then(function (value) {
                results[i] = value;
                fulfilled++;
                if (fulfilled === length){
                    deferred.resolve(results);
                }
            });
        });
    }

    return deferred.promise();
  },

  sequence: function sequence(array) {
      var seed = $.Deferred().resolve([]);
      if (!array || array.length === 0) return seed;
      else {
          return _.reduce(array, function(state, promise) {
              return state.pipe(function(input) {
                  return promise().pipe(function(i) {
                      return input.concat(i);
                  });
              });
          }, seed.promise());
      }
  },

  parallel: function parallel(array) {
      var seed = $.Deferred().resolve([]);
      if (!array || array.length === 0) return seed;
      else {
          return _.map(array,
                  function(p) {
                      return p();
                  }).reduce(function(state, promise) {
                      return state.pipe(function(input) {
                          return promise.pipe(function(i) {
                              return input.concat(i);
                          });
                      });
                  }, seed.promise());
      }
  }
};

Twitter = {
  search:function(query) {
    var deferred = $.Deferred();
    $.ajax({
     url:"http://search.twitter.com/search.json",
     data:{q:query},
     dataType:'jsonp',
     success:deferred.resolve
    });
    return deferred.promise();
  }
}