/** 
 * Does a thing. 
 */
function wikipediaLookup(searchTerm, lang) {
  var searchUrl = 'https://en.wikipedia.org/w/api.php' +
    '?action=query&titles=' + encodeURI(searchTerm) + 
    '&prop=langlinks&lllang=' + lang +
    '&format=json';
  fetch(searchUrl).then(function(response) {
      if (response.status != 200) {
        //err
        renderNotif(false, searchTerm, null);
        return;
      }
      response.json().then(function(translated) {
        translated = translated["query"]["pages"];
        if (translated.hasOwnProperty(-1)) {
          //err
          renderNotif(false, searchTerm, null);
          return;
        }
        translated = translated[Object.keys(translated)[0]].langlinks[0]['*'];
        translated = strip(translated);
        console.log(translated);
        renderNotif(true, searchTerm, translated);
      });
    }, function(errResponse) {
      //err
      renderNotif(false, searchTerm, null);
    });
}

/** 
 *  strips STR of stuff in parenthesis.
 */
function strip(str) {
  var right = str.indexOf(")");
  if (right > -1) {
    var left = str.indexOf("(");
    console.assert(right > left && left > -1, "problem with parantheses");
    console.log("aylmao");
    return str.substring(0,left) + strip(str.substring(right + 1));
  }
  return str;
}

function renderNotif(success, original, translated) {
  if (!success) {
    statusText = "Unable to translate".bold();
    statusText += original;
    
  } else {
    console.log(translated);
    statusText = translated;
  }
  document.getElementById('status').textContent = statusText;
//  document.getElementById("status").style.display="unset";
}

function onload() {
  var searchTerm = "Albert Einstein";
  var lang = "zh";  
  wikipediaLookup(searchTerm, lang);
}

document.addEventListener('DOMContentLoaded', onload);

