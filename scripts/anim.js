//alert("Javascript Loaded");

var images = document.getElementsByClassName("k-anim");

window.onload = function() {
    resizeKAnime();
    pageDoneLoading();
    postLoad();

    
}

function resizeKAnime() {
    
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if(img) {
            var rows = parseInt(img.getAttribute("rows"));
            var cols = parseInt(img.getAttribute("cols"));
            if(rows && cols) {
                var size = [img.naturalWidth / rows, img.naturalHeight / cols];
                img.style.width = size[0] + "px";
                img.style.height = size[1] + "px";
            } else {
                images[i] = undefined;
            }
            //console.log(size);
        }
    }
}

function pageDoneLoading() {
    var cover = document.getElementById("cover");
    cover.parentNode.removeChild(cover);
}

function postLoad() {
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        if(img) {
            img.frame = 0;
            img.maxFrame = parseInt(img.getAttribute("frames"));
            setInterval(() => animateImage(img), img.getAttribute("interval") || 100);
        }
    }
}
    
function animateImage(img) {
    var pos = img.style.objectPosition.split(" ");
    var x = parseInt(pos[0] || 0) - img.width;
    var y = parseInt(pos[1] || 0);
    if(img.maxFrame && img.frame >= img.maxFrame - 1) {
        img.frame = 0;
        x = y = 0;
    } else if(x <= -img.naturalWidth) {
        x = 0;
        y -= img.height;

        if(y <= -img.naturalHeight) {
            y = 0;
            img.frame = 0;
        }
    }

    img.style.objectPosition = x + "px " + y + "px";
    img.frame++;
    //console.log(img.style.objectPosition);
}
