var dragValue;
var lastSelected;
var defaultPositions = {};

function move() {
    var elements = ['img1', 'img2', 'img3', 'img4'].map(function(id) {
        return document.getElementById(id);
    });

    elements.forEach(function(element) {
        element.style.position = "absolute";

        element.onmousedown = function() {
            dragValue = element;
            lastSelected = element;
        };

        element.ontouchstart = function() {
            dragValue = element;
            lastSelected = element;
        };

        if (!element.hasAttribute('data-rotation')) {
            element.setAttribute('data-rotation', 0);
        }
        if (!element.hasAttribute('data-scaleX')) {
            element.setAttribute('data-scaleX', 1);
        }
        if (!element.hasAttribute('data-scaleY')) {
            element.setAttribute('data-scaleY', 1);
        }

        // Store default positions
        var rect = element.getBoundingClientRect();
        defaultPositions[element.id] = { 
            top: Math.round(rect.top / 10) * 10 + 'px',
            left: Math.round(rect.left / 10) * 10 + 'px'
        };
    });
}

document.ontouchend = document.onmouseup = function() {
    dragValue = null;
};

document.ontouchmove = document.onmousemove = function(e) {
    if (dragValue) {
        var x = e.touches ? e.touches[0].pageX : e.pageX;
        var y = e.touches ? e.touches[0].pageY : e.pageY;
        dragValue.style.left = Math.round(x / 10) * 10 + "px";
        dragValue.style.top = Math.round(y / 10) * 10 + "px";
    }
};

function applyTransform(element) {
    var rotation = element.getAttribute('data-rotation');
    var scaleX = element.getAttribute('data-scaleX');
    var scaleY = element.getAttribute('data-scaleY');
    element.style.transform = `rotate(${rotation}deg) scaleX(${scaleX}) scaleY(${scaleY})`;
}

function Rotate15() {
    var Object2Rotate = lastSelected;

    if (Object2Rotate) {
        var currentRotation = parseInt(Object2Rotate.getAttribute('data-rotation'), 10) || 0;
        currentRotation += 15;
        Object2Rotate.setAttribute('data-rotation', currentRotation);
        applyTransform(Object2Rotate);
    }
}

function RotateM15() {
    var Object2Rotate = lastSelected;

    if (Object2Rotate) {
        var currentRotation = parseInt(Object2Rotate.getAttribute('data-rotation'), 10) || 0;
        currentRotation -= 15;
        Object2Rotate.setAttribute('data-rotation', currentRotation);
        applyTransform(Object2Rotate);
    }
}

function FlipX() {
    var Object2Flip = lastSelected;

    if (Object2Flip) {
        var currentScaleX = parseFloat(Object2Flip.getAttribute('data-scaleX')) || 1;
        currentScaleX *= -1;
        Object2Flip.setAttribute('data-scaleX', currentScaleX);
        applyTransform(Object2Flip);
    }
}

function FlipY() {
    var Object2Flip = lastSelected;

    if (Object2Flip) {
        var currentScaleY = parseFloat(Object2Flip.getAttribute('data-scaleY')) || 1;
        currentScaleY *= -1;
        Object2Flip.setAttribute('data-scaleY', currentScaleY);
        applyTransform(Object2Flip);
    }
}

function resetTransform() {
    for (var id in defaultPositions) {
        var element = document.getElementById(id);
        element.style.top = defaultPositions[id].top;
        element.style.left = defaultPositions[id].left;
        element.setAttribute('data-rotation', 0);
        applyTransform(element);
    }
}

// Initialize movement
move();

// Event listeners for buttons
document.getElementById('rotateButton').onclick = Rotate15;
document.getElementById('rotateButton2').onclick = RotateM15;
document.getElementById('mirrorXButton').onclick = FlipX;
document.getElementById('mirrorYButton').onclick = FlipY;
document.getElementById('resetButton').onclick = resetTransform;
