
async function getShortUrl() {
    var fullURL = document.getElementById("fullURL").value;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        const cacheData = JSON.parse(this.responseText);
        var shortUrl = document.getElementById("short-url");
        if(shortUrl !=null || shortUrl!=undefined) {
            shortUrl.remove();
        }
        var mydiv = document.getElementById("shortendURL");
        var aTag = document.createElement('a');
        aTag.setAttribute('href',cacheData.urlMapping.fullUrl);
        aTag.setAttribute('id',"short-url");
        aTag.innerText = cacheData.urlMapping.shortUrl;
        mydiv.appendChild(aTag);
        var myUrl = document.getElementById("shortendURL");
        myUrl.style.display = 'block';
    }
    xhttp.open("POST", "/shortURL",true);
    xhttp.setRequestHeader("Content-Type", "text/plain");
    xhttp.send(fullURL);
}

function displayApiKey(key) {
    var form = document.getElementById('api-key-form');
    form.action = `login/${key}`;
    var getApikey = document.getElementById('api-text');
    getApikey.innerText = key;
    form.style.display = 'block';
}