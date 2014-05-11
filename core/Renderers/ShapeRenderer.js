define(function() {
	function drawCircle(circle, ctx) {
                if (circle.image) {
                    draw(circle, ctx);
                }
                else {
    		        ctx.beginPath();
                    ctx.arc(circle.position.X, circle.position.Y, circle.radius, 0, 2 * Math.PI, false);
                    ctx.closePath();
                    ctx.stroke();

                    if (circle.fillStyle) {
                        ctx.fillStyle = circle.fillStyle;
                    }

                    if (circle.filled) {
                        ctx.fill();    
                    }
                }
	}

	function drawSquare(square, ctx) {
                if (square.image) {
                    draw(square, ctx);
                }
                else {
                    ctx.beginPath();
                    ctx.rect(square.position.X, square.position.Y, square.side, square.side);
                    
                    if (square.fillStyle) {
                        ctx.fillStyle = square.fillStyle;
                    }

                    if (square.filled) {
                        ctx.fill();    
                    }

                    ctx.lineWidth = 1;
                    ctx.stroke();    
                }
	}

    function drawRectangle(rectangle, ctx) {
            if (rectangle.image) {
                draw(rectangle, ctx);
            }
            else {
                ctx.beginPath();
                ctx.rect(rectangle.position.X, rectangle.position.Y, rectangle.width, rectangle.height);
                
                if (rectangle.fillStyle) {
                    ctx.fillStyle = rectangle.fillStyle;
                }

                if (rectangle.filled) {
                    ctx.fill();    
                }

                ctx.lineWidth = 1;
                ctx.stroke(); 

                if (rectangle.hasOwnProperty('textPosition')) {
                    drawText(rectangle, ctx);
                }
            }
    }

    function drawText(obj, ctx) {
        ctx.font = obj.font;
        ctx.fillStyle = obj.textColor;
        ctx.fillText(obj.text, obj.textPosition.x, obj.textPosition.y);

       //ctx.font="30px Verdana";
        // Create gradient
        // var gradient=ctx.createLinearGradient(0,0,c.width,0);
        // gradient.addColorStop("0","magenta");
        // gradient.addColorStop("0.5","blue");
        // gradient.addColorStop("1.0","red");
        // Fill with gradient
        //ctx.fillStyle=gradient;
        //ctx.fillText("Big smile!",10,90);
    }

    function draw(obj, ctx) {
            ctx.drawImage(obj.image, obj.sourceX, obj.sourceY, obj.width, obj.height, obj.position.X, obj.position.Y, obj.width, obj.height);
    }

	return { drawCircle : drawCircle, drawSquare : drawSquare, drawRectangle : drawRectangle, drawText : drawText }
})