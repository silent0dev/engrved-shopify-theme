var searchInterval = setInterval(searchElement, 500);

function stopSearch() {
    clearInterval(searchInterval);
}

function searchElement() {
    if(document.getElementById('infiniteoptions-container').children.length > 0) {
    stopSearch();
    var $Submit = $('form[action="/cart/add"]').find('button[type="submit"]');
    
    if ($('body').hasClass('gempage')) {
        var previewButton = `<button type="button" name="add" id="open__preview" class="product-form-product-template button btn gf_button-stretch">Live Preview</button>`;
        $Submit.before(previewButton);
    }
    
    var topInput = document.getElementById('Top Text_copy-0-0');
    var bottomInput = document.getElementById('Bottom Text-0-1');

    var canvasSize = 750, originaltopFontSize = previewData.positions[0].fontsize, originalbottomFontSize = previewData.positions[1].fontsize, topFontSize = 0, bottomFontSize = 0;

    var openPreviewButton = document.getElementById('open__preview');
    var previewModal = document.getElementById('productPreviewModal');
    var closePreviewButton = document.getElementsByClassName('close__preview')[0];
    var productPreviewModalContent = document.getElementsByClassName('productPreviewModal__content')[0];
    
    var canvas = document.getElementById('previewCanvas');
    var getcontext = canvas.getContext('2d');


    function drawPreviewProduct(isRedraw) {
        if (metalColor == 'white') {
            canvas.style.backgroundColor = 'violet';
        } else {
            canvas.style.backgroundColor = 'white';
        }

        if (isRedraw) {
        getcontext.clearRect(0, 0, canvasSize, canvasSize);
        }

        var bottomText = bottomInput.value.toUpperCase();
        var topText = topInput.value.toUpperCase();

        if (window.innerWidth < 800) {
            topFontSize = originaltopFontSize * (canvasSize / 750);
            bottomFontSize = originalbottomFontSize * (canvasSize / 750);
        } else {
            topFontSize = originaltopFontSize;
            bottomFontSize = originalbottomFontSize;
        }

        var image = new Image();
        image.onload = function() {
        getcontext.drawImage(image, 0, 0, canvasSize, canvasSize);
        };
        image.src = previewImages[metalColor];

        setTimeout(() => {
        // draw Address Number
        getcontext.font = `${topFontSize}px ${previewData.positions[0].fontname}`;
        getcontext.font.letterSpacing  = "0px";
        var grd = getcontext.createLinearGradient(0, 0, canvasSize, 0);
        var stepLength = metalColors[metalColor].length;
        for(var i = 0;i < stepLength;i++) {
            grd.addColorStop(steps[stepLength-1][i], metalColors[metalColor][i]);
        }
        getcontext.fillStyle = grd;
        getcontext.textAlign = "center";
        getcontext.fillText(topText, canvasSize/2, canvasSize * Number(previewData.positions[0].y), 600 * (canvasSize / 750));

        // draw Address Name
        getcontext.font = `${bottomFontSize}px ${previewData.positions[1].fontname}`;
        getcontext.font.letterSpacing  = "0px";
        getcontext.fillStyle = grd;
        getcontext.textAlign = "center";
        getcontext.fillText(bottomText, canvasSize/2, (canvasSize) * Number(previewData.positions[1].y), 600 * (canvasSize / 750));
        }, 10);
        
    }
    
    drawPreviewProduct(false);

    openPreviewButton.onclick = function(){
        drawPreviewProduct(true);
        previewModal.classList.add("active");
    }

    closePreviewButton.onclick = function(){
        previewModal.classList.remove("active");
    }

    function resizeCanvas() {
        if (window.innerWidth < 800) {
        canvasSize = window.innerWidth * 0.8;
        productPreviewModalContent.style.height = `${window.innerWidth * 0.9}px`;
        } else {
        canvasSize = 750;
        productPreviewModalContent.style.height = `800px`;
        }
        canvas.setAttribute('width', `${canvasSize}px`);
        canvas.setAttribute('height', `${canvasSize}px`);
    }

    resizeCanvas();

    window.addEventListener('resize', function(event){
        resizeCanvas();
        drawPreviewProduct(true);
    });

    $('#Top Text_copy-0-0').keyup(function(){
        drawPreviewProduct(true);
    });

    $('#Bottom Text-0-1').keyup(function(){
        drawPreviewProduct(true);
    });
    }
}

setTimeout(function(){
    stopSearch();
},60000);