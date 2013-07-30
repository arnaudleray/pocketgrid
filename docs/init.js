// TOC
var $toc = $('.toc');
$toc.html('');
var iTitle = 0;
_.each($('h2').toArray(), function (title) {
  if (iTitle > 0) {
    $toc.append($('<a href="#">' + $(title).text() + '</a><br/>'));
  }
  iTitle++;
});

// Load examples sources

  var exampleUrl = null;
  var htmlSource = null;
  var cssSource = null;
  var regExec = null;
  var regBody = new RegExp('.*<body (.|[\r\n])*</body>');
  var regDiv = new RegExp('(.*<div(.|[\r\n])*</div>)');
  var regCss = new RegExp('<style.*>[\r\n]*((.|[\r\n])*)\n.*</style>');
  var regCssIE8 = new RegExp('(.*<style([^<])*</style>)');

  function getIndent(s) {
    var indent = 0;
    var nbChars = (s) ? s.length : 0;
    var iChar = 0;
    while ((iChar < nbChars) && (s[iChar] === ' ')) {
      iChar++;
    }
    return iChar;
  }

  function unindent(source) {
    var splitCss = source.split('\n');
    if (splitCss.length > 0) {
      var indentCss = getIndent(splitCss[0]);
      for (var iCss = 0, nbLines = splitCss.length; iCss < nbLines; iCss++) {
        splitCss[iCss] = splitCss[iCss].substr(indentCss);
      }
      source = splitCss.join('\n');
    }
    return source;
  }

  function addSources(example, deferred) {
    var $example = $(example);
    var $iframe = $example.find('.example-iframe');
    var exampleUrl = $iframe.attr('src');

    // Add a button to open examples in a new tab.
    $example.find('.iframe-border')
      .prepend($('<a href="' + exampleUrl + '" target="_blank" class="button open" style="margin-top: -27px; margin-right: 1px; padding: 0 10px;">View this demo in a new tab</a>'));

    $example.append('<div class="block-group"><div class="html-source block">Loading...</div><div class="css-source block">Loading...</div></div>')


    // Get the full example source.
    $.get(exampleUrl)
    // When done:
    .done(function (data) {
      // Extract the HTML source.
      regExec = regBody.exec(data);
      if (regExec != null) {
        htmlSource = regExec[0];
      } else {
        regExec = regDiv.exec(data);
        htmlSource = regExec[0];
      }

      htmlSource = unindent(htmlSource);

      // Append HTML sources to the example.
      $example.find('.html-source').html(
        '<div class="example-sourcetitle">HTML</div><pre class="prettyprint linenums lang-html">' +
          htmlEncode(htmlSource)
            .replace(/block-group"/g, '<span class="highlight">block-group</span>"')
            .replace(/(block)([^-])/g, '<span class="highlight">$1</span>$2')
            .replace(/&lt;div class="box"&gt;(([^&]|[\r\n])*)&lt;.div&gt;/g, '<span class="discreet">&lt;div class="box"&gt;</span>$1<span class="discreet">&lt;\\div&gt;</span>') +
          '</pre>'
      ); //append

      // Extract the CSS source.
      regExec = regCssIE8.exec(data);
      if (regExec != null) {
        cssSource = regExec[0];
        // Remove <style> tags
        cssSource = cssSource.substring(cssSource.indexOf("\n") + 1);
        cssSource = cssSource.substring(0, cssSource.lastIndexOf("\n"));
        cssSource = unindent(cssSource);

        // Append CSS sources to the example.
        $example.find('.css-source').html(
          '<div class="example-sourcetitle">CSS</div><pre class="prettyprint linenums lang-css">' +
            htmlEncode(cssSource)
              .replace(/(@media.*)( {)/g, '<span class="highlight-css">$1</span>$2') +
            '</pre>'
        ); //append

        if (deferred) {
          deferred.resolve(data);
        }
      } else {
        $.get(exampleUrl.replace(/html/, 'css'))
        // When done:
        .done(function (data) {
          cssSource = data;
          cssSource = unindent(cssSource);

          // Append CSS sources to the example.
          $example.find('.css-source').html(
            '<div class="example-sourcetitle">CSS</div><pre class="prettyprint linenums lang-css">' +
              htmlEncode(cssSource)
                .replace(/(@media.*)( {)/g, '<span class="highlight-css">$1</span>$2') +
              '</pre>'
          ); //append

          if (deferred) {
            deferred.resolve(data);
          }
        }) //done
        // When error:
        .fail(function(jqXHR, textStatus) {
          // setTimeout(function() { deferred.reject('Cannot load ' + exampleUrl); }, 500);
          if (deferred) {
            deferred.resolve({error: 'Cannot load "' + exampleUrl + '".'}); // Do not reject to not block other results.
          }
        });
      }
    })
    // When error:
    .fail(function(jqXHR, textStatus) {
      // setTimeout(function() { deferred.reject('Cannot load ' + exampleUrl); }, 500);
      if (deferred) {
        deferred.resolve({error: 'Cannot load "' + exampleUrl + '".'}); // Do not reject to not block other results.
      }
    });
  }

  // function checkErrors(sourceResults) {
  //   if (sourceResults) {
  //     sourceResults.map(function (result) {

  //     });
  //   }
  // }

var promises = [];
  // var $toc = $('.toc');
  // $toc.html('');
  _.each($('.example').toArray(), function (ex) {
    // $toc.append($('<a href="' + $(ex).find('.example-iframe').attr('src') + '">' + $(ex).find('.example-title').text() + '</a><br/>'))
    promises.push(function() {
      return $.Deferred(function (dfd) { addSources(ex, dfd); }).promise();
    });
  });

  $.when(deferredHelper.all(promises)).then(function(sourceResults) {
    // alert('RESULTS: ' + sourceResults);
    // checkErrors(sourceResults);
  }).fail(function (message) {
    // alert('Error: ' + message);
  }).always(function() {
    // alert('Always!');
    prettyPrint();
  });

 /* Twitter.search('responsive').then(function(data) {
    if (data.results.length > 0) {
      alert(data.results[0].text);
    }
  });*/

// SMOOTH SCROLLING
/*
$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 600, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
 
});
*/



/*!
 * Smooth Scroll - v1.4.10 - 2013-03-02
 * https://github.com/kswedberg/jquery-smooth-scroll
 * Copyright (c) 2013 Karl Swedberg
 * Licensed MIT (https://github.com/kswedberg/jquery-smooth-scroll/blob/master/LICENSE-MIT)
 */
/*(function(l){function t(l){return l.replace(/(:|\.)/g,"\\$1")}var e="1.4.10",o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2},r=function(t){var e=[],o=!1,r=t.dir&&"left"==t.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!=document&&this!=window){var t=l(this);t[r]()>0?e.push(this):(t[r](1),o=t[r]()>0,o&&e.push(this),t[r](0))}}),e.length||this.each(function(){"BODY"===this.nodeName&&(e=[this])}),"first"===t.el&&e.length>1&&(e=[e[0]]),e};l.fn.extend({scrollable:function(l){var t=r.call(this,{dir:l});return this.pushStack(t)},firstScrollable:function(l){var t=r.call(this,{el:"first",dir:l});return this.pushStack(t)},smoothScroll:function(e){e=e||{};var o=l.extend({},l.fn.smoothScroll.defaults,e),r=l.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(e){var n=this,s=l(this),c=o.exclude,i=o.excludeWithin,a=0,f=0,h=!0,u={},d=location.hostname===n.hostname||!n.hostname,m=o.scrollTarget||(l.smoothScroll.filterPath(n.pathname)||r)===r,p=t(n.hash);if(o.scrollTarget||d&&m&&p){for(;h&&c.length>a;)s.is(t(c[a++]))&&(h=!1);for(;h&&i.length>f;)s.closest(i[f++]).length&&(h=!1)}else h=!1;h&&(e.preventDefault(),l.extend(u,o,{scrollTarget:o.scrollTarget||p,link:n}),l.smoothScroll(u))}),this}}),l.smoothScroll=function(t,e){var o,r,n,s,c=0,i="offset",a="scrollTop",f={},h={};"number"==typeof t?(o=l.fn.smoothScroll.defaults,n=t):(o=l.extend({},l.fn.smoothScroll.defaults,t||{}),o.scrollElement&&(i="position","static"==o.scrollElement.css("position")&&o.scrollElement.css("position","relative"))),o=l.extend({link:null},o),a="left"==o.direction?"scrollLeft":a,o.scrollElement?(r=o.scrollElement,c=r[a]()):r=l("html, body").firstScrollable(),o.beforeScroll.call(r,o),n="number"==typeof t?t:e||l(o.scrollTarget)[i]()&&l(o.scrollTarget)[i]()[o.direction]||0,f[a]=n+c+o.offset,s=o.speed,"auto"===s&&(s=f[a]||r.scrollTop(),s/=o.autoCoefficent),h={duration:s,easing:o.easing,complete:function(){o.afterScroll.call(o.link,o)}},o.step&&(h.step=o.step),r.length?r.stop().animate(f,h):o.afterScroll.call(o.link,o)},l.smoothScroll.version=e,l.smoothScroll.filterPath=function(l){return l.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},l.fn.smoothScroll.defaults=o})(jQuery);

$('a').smoothScroll();
*/