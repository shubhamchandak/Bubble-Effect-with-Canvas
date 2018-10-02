var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

var mouse = {
	x : undefined,
	y : undefined
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})

var maxRadius = 50;

var colorArray = [
					'#2C3E50',
					'#E74C3C',
					'#ECF0F1',
					'#3498DB',
					'#2980B9'
				];

function Circle(x, y, dx, dy, radius){
	this.x =x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * 5)];

	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		context.fillStyle = this.color;
		context.fill();
	}

	this.update = function(){
		if(this.x > innerWidth - this.radius || this.x < this.radius){
			this.dx = -this.dx;
		} 
		if(this.y > innerHeight - this.radius || this.y < this.radius){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if(this.x - mouse.x < 50 && this.x - mouse.x > -50 
			&& this.y - mouse.y < 50 && this.y - mouse.y > -50){
				if(this.radius < maxRadius)
					this.radius++;
		}else if(this.radius > this.minRadius){
			this.radius--;
		}

		this.draw();
	}
}

var circleArray = [];

function animate(){
	requestAnimationFrame(animate);
	context.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}	
}

function init(){
	circleArray = [];
	for(var i = 0; i < 900; i++){
		var radius = Math.random() * 4 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;
		circleArray.push(new Circle(x, y, dx, dy, radius)); 
	}	
}
init();
animate();
