document.addEventListener('DOMContentLoaded', function () {
    const canvasElement = document.getElementById('canvas');
    const sidebar = document.getElementById('sidebar');
    const canvas = new fabric.Canvas('canvas', {
        isDrawingMode: false
    });

    function resizeCanvas() {
        canvasElement.width = window.innerWidth - sidebar.offsetWidth;
        canvasElement.height = window.innerHeight;
        canvas.setWidth(canvasElement.width);
        canvas.setHeight(canvasElement.height);
        canvas.calcOffset();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function clearCanvasEvents() {
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
    }

    function disableInteraction() {
        canvas.selection = false;
        canvas.forEachObject(function (object) {
            object.selectable = false;
            object.evented = false;
        });
    }

    function enableInteraction() {
        canvas.selection = true;
        canvas.forEachObject(function (object) {
            object.selectable = true;
            object.evented = true;
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Delete') {
            var activeObject = canvas.getActiveObject();
            if (activeObject) {
                canvas.remove(activeObject);
            }
        }
    });

    document.getElementById('rectangle').onclick = function () {
        enableInteraction();
        clearCanvasEvents();
        canvas.isDrawingMode = false;
        const rect = new fabric.Rect({
            left: 50,
            top: 50,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            width: 60,
            height: 70
        });
        canvas.add(rect);
    };

    document.getElementById('circle').onclick = function () {
        enableInteraction();
        clearCanvasEvents();
        canvas.isDrawingMode = false;
        const circle = new fabric.Circle({
            radius: 30,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 1,
            left: 50,
            top: 50
        });
        canvas.add(circle);
    };

    document.getElementById('line').onclick = function () {
        disableInteraction();
        clearCanvasEvents();
        let line, isDown;
        canvas.on('mouse:down', function (o) {
            isDown = true;
            var pointer = canvas.getPointer(o.e);
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: 2,
                fill: 'black',
                stroke: 'black',
                originX: 'center',
                originY: 'center',
                selectable: true,
                evented: true
            });
            canvas.add(line);
        });

        canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            var pointer = canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function () {
            isDown = false;
            enableInteraction();
            clearCanvasEvents();
        });
    };

    document.getElementById('text').onclick = function () {
        enableInteraction();
        clearCanvasEvents();
        canvas.isDrawingMode = false;
        const text = new fabric.IText('Hello world', {
            left: 50,
            top: 50,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 20
        });
        canvas.add(text);
    };

    document.getElementById('clear').onclick = function () {
        enableInteraction();
        clearCanvasEvents();
        canvas.clear();
    };
});
