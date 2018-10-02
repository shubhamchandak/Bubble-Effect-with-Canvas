var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

function Circle(x, y, dx, dy, radius){
	this.x =x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		context.strokeStyle = 'blue';
		context.fillStyle = 'purple';
		context.stroke();
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
		this.draw();
	}
}

var circleArray = [];

for(var i = 0; i < 400; i++){
	var radius = 30;
	var x = Math.random() * (innerWidth - radius * 2) + radius;
	var y = Math.random() * (innerHeight - radius * 2) + radius;
	var dx = (Math.random() - 0.5) * 2;
	var dy = (Math.random() - 0.5) * 2;
	circleArray.push(new Circle(x, y, dx, dy, radius)); 
}
console.log(circleArray);

function animate(){
	requestAnimationFrame(animate);
	context.clearRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}	
}

animate();
