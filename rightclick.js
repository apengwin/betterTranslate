function onClick(info, tab) {
    trans(info.selectionText, "zh");
}
properties = {"title": "Translate %s",
              "contexts": ["selection"],
               "onclick": onClick};
var a = chrome.contextMenus.create(properties);

chrome.notifications.onButtonClicked.addListener(function(not, btnIdx) {
    if (btnIdx === 0) {
      var input = document.createElement('textarea');
      document.body.appendChild(input);
      input.value = translated;
      input.focus();
      input.select();
      document.execCommand('Copy');
      input.remove();
    } else {
      console.log("THIS SHOULDN'T BE HAPENINIGNNGIGNNG");
    }
});

