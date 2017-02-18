/** 
 * The dumbest chrome extension ever. 
 */
function wikipediaLookup(searchTerm, lang) {
  console.log("FUFKCUFKJKC");
  var searchUrl = 'https://en.wikipedia.org/w/api.php' +
    '?action=query&titles=' + encodeURI(searchTerm) + 
    '&prop=langlinks&lllang=' + lang +
    '&format=json';
  fetch(searchUrl).then(function(response) {
      if (response.status != 200) {
        //err
        console.log("lmao");
        renderNotif(false, searchTerm, null);
        return;
      }
      response.json().then(function(translated) {
        translated = translated["query"]["pages"];
        console.log(translated);
        if (translated.hasOwnProperty(-1)) {
        console.log("stuipd");
          //err
          renderNotif(false, searchTerm, null);
          return;
        }
        translated = translated[Object.keys(translated)[0]]
        if (! ("langlinks" in translated)) {
          console.log('FUCKFUCKFUCK');
          //the fuck do we do here.
          return;
        } 
        translated = translated.langlinks[0]['*'];
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
//  document.getElementById('status').textContent = statusText;
 // document.getElementById("status").style.display="unset";
}

var trans = function (searchTerm, lang) {
  console.log("this called");
  var lang = "zh";  
  wikipediaLookup(searchTerm, lang);
}


