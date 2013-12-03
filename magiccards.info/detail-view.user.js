// ==UserScript==
// @name         link to mkm/mcm when clicking on card image
// @description  magiccards.info
// @version      0.0.2
// @namespace    https://github.com/solygen/userscripts-and-bookmarklets
// @repository   https://github.com/solygen/userscripts-and-bookmarklets.git
// @license      MIT
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
//
// @include      http://magiccards.info/*.html
// @include      http://magiccards.info/query?*
//
// @updateURL    https://rawgithub.com/solygen/userscripts-and-bookmarklets/master/magiccards.info/detail-view.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts-and-bookmarklets/master/magiccards.info/detail-view.user.js
// @homepage     https://github.com/solygen/userscripts-and-bookmarklets
//
// ==/UserScript==

'use strict';

var cardname, images, container, link,
    url = ((navigator.language || navigator.userLanguage) === 'de' ? 'http://www.magickartenmarkt.de' : 'http://www.magiccardmarket.eu'),
    query = '/?mainPage=showSearchResult&searchFor=',
    getImages = function () {
        var list = document.getElementsByTagName('img'),
            images = [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].getAttribute('src').indexOf('jpg') >= 0) {
                images.push(list[i]);
            }
        }
        return images;
    },
    copyToClipboard = function () {
        window.prompt ('Copy to clipboard: Ctrl+C, Enter', name);
    };

//get image
images = getImages();

//process each card image
for (var i = 0; i < images.length; i++) {
    var image = images[i];

    //add hover effect
    $(image).hover(
            function () {
                this.setAttribute("style", "opacity: 0.90; border: 1px solid black");
            },
            function () {
                this.setAttribute("style", "opacity: 1; border: 1px solid black");
            }
        );

    //gather data
    cardname = image.getAttribute('alt');
    container = image.parentNode;

    //create link
    link = document.createElement('a');
    link.href = url + query + cardname;
    link.title = url;

    //create dom hierarchy (container > link > image)
    link.appendChild(image);
    container.appendChild(link);
}
