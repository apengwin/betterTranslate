function onClick(info, tab) {
    trans(info.selectionText, "zh");
}
properties = {"title": "translate %s",
              "contexts": ["selection"],
               "onclick": onClick};
var a = chrome.contextMenus.create(properties);
