const referralKeys = [
  'ref', 'referrer', 'ref_id', 'refid', 'refer', 'ref_src', 'utm_source', 'utm-source',
];

function changeRefToDeezNuts(request){
  let urlAndQueryString = request.url.split('?');
  if (urlAndQueryString.length != 2){
    return
  }
  let url = urlAndQueryString[0];
  let queryString = urlAndQueryString[1];

  var queryStringDict = {};
  let queryStringItems = queryString.split('&');
  for (var i in queryStringItems){
    let thisItem = queryStringItems[i].split('=');
    let k = thisItem[0];
    let v = thisItem[1];
    queryStringDict[k] = v;
  }

  var changed = false;
  for (var i=0 in referralKeys){
    let key = referralKeys[i];
    let currentVal = queryStringDict[key];
    if (currentVal != undefined && currentVal != 'deez_nuts'){
      queryStringDict[key] = 'deez_nuts';
      changed = true;
    }
  }
  if (!changed){
    return
  }
  var newQueryString = [];
  for(var key in queryStringDict){
    newQueryString.push(key + '=' + queryStringDict[key]);
  }
  newQueryString = newQueryString.join("&");
  let newUrl = [url, newQueryString].join('?');
  return {
    redirectUrl: newUrl
  };
}

browser.webRequest.onBeforeRequest.addListener(
  changeRefToDeezNuts,
  {urls: ["<all_urls>"]},
  ['blocking'],
);
