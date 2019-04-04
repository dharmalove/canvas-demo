var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToUser(yyy)


var eraserEnabled = false
eraser.onclick = function() {
    eraserEnabled =true
    eraser.classList.add('active')
    pen.classList.remove('active')

}
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')

}

black.onclick = function(){
    context.fillStyle = '#000000'
    context.strokeStyle = '#000000'
    black.classList.add('active')
}

green.onclick = function(){
    context.fillStyle = '#00FF00'
    context.strokeStyle = '#00FF00'
    green.classList.add('active')
}
blue.onclick = function(){
    context.fillStyle = '#0066FF'
    context.strokeStyle = '#0066FF'
    blue.classList.add('active')
}
orange.onclick = function(){
    context.fillStyle = '#FF5511'
    context.strokeStyle = '#FF5511'
    orange.classList.add('active')
}
red.onclick = function(){
    context.fillStyle = '#FF0000'
    context.strokeStyle = '#FF0000'
    red.classList.add('active')
}
purple.onclick = function(){
    context.fillStyle = '#9900FF'
    context.strokeStyle = '#9900FF'
    purple.classList.add('active')
}

thin.onclick = function(){
    context.lineWidth = 4
}

thick.onclick = function(){
    context.lineWidth = 8
}

clear.onclick = function(){
    context.clearRect( 0, 0, yyy.width, yyy.height)
}

save.onclick = function(){
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = "我的图画"
    a.target = '_blank'
    a.click()
}
/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function() {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = this.lineWidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }

        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function(e) {
            using = false
        }

    }else {
        //非触屏设备
        canvas.onmousedown = function(e) {
            var x = e.clientX
            var y = e.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(e) {
            var x = e.clientX
            var y = e.clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function(e) {
            using = false
        }
    }

}