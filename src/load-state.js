(function() {
    var div = document.createElement('div');
    div.setAttribute('id', 'inputDiv');
    div.setAttribute('style', 'position:absolute;top:0;right:0;bottom:0;left:0;z-index:10000;background:white;');
    var btnClick = "var str = window.document.getElementById('gameStateInput').value;"
        + "var json = JSON.parse(str);"
        + "window.localStorage.setItem('gameState', JSON.stringify(json.gameState));"
        + "window.localStorage.setItem('statistics', JSON.stringify(json.statistics));"
        + "window.location.reload()";
    div.innerHTML = '<textarea id="gameStateInput" style="width:100%;height:150px;box-sizing:border-box;" placeholder="Paste your save here"></textarea><button onclick="' + btnClick + '">Restore</button>';
    window.document.body.appendChild(div);
})();
