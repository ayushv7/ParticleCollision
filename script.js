window.onload = function(){
    const canvas = document.getElementById("can");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];
    let hue = 0;
    window.addEventListener("resize", function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    const touch = {
        x:null, y:null
    }
    
    document.addEventListener("click", function(e){
        touch.x = e.x;
        touch.y = e.y; 
        for(i=0;i<=2.5;i++){
            particlesArray.push(new Particle());
        }
    });
    document.addEventListener("touchmove", function(e){
        touch.x = e.touches[0].clientX;
        touch.y = e.touches[0].clientY;
        for(i=0;i<=2.5;i++){
            particlesArray.push(new Particle());
        }
    });
    document.addEventListener("mousemove", function(e){
        touch.x = e.x;
        touch.y = e.y; 
        for(i=0;i<=2.5;i++){
            particlesArray.push(new Particle());
        }
    });
    class Particle{
        constructor(){
            this.x = touch.x;
            this. y = touch. y;
            //this.size = Math.random()*15 + 1;
            this.size = 10;
            this.speedX = (Math.random()-0.5)*3.5;
            this.speedY = (Math.random()-0.5)*3.5;
            this.color = 'hsl('+hue+',+100%,50%)';
        }
        update(){
            this.x += this.speedX;
            this.y += this.speedY;
            //if(this.size > 0.2)this.size -= 0.1;
            if(this.size + this.x >= window.innerWidth || this.size + this.x <= 0){
                this.speedX = -this.speedX;
            }
            if(this.size + this.y >= window.innerHeight || this.size + this.y <=0){
                this.speedY = -this.speedY;
            }
        }
        draw(){
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x,this.y, this.size,0,Math.PI*2);
            ctx.fill();
        }
    }
 function handleParticles(){
     for(let i = 0; i < particlesArray.length; i++){
         particlesArray[i].update();
         particlesArray[i].draw();

         for(let j= i + 1; j < particlesArray.length; j++){
             const dx = particlesArray[i].x - particlesArray[j].x;
             const dy = particlesArray[i].y - particlesArray[j].y;
             const distance = Math.sqrt(dx * dx + dy*dy);
             if(distance < 50){
                 ctx.beginPath();
                 ctx.strokeStyle = particlesArray[i].color;
                 ctx.lineWidth = 1;
                 ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                 ctx.lineTo(particlesArray[j].x,particlesArray[j].y);
                 ctx.stroke();
                 ctx.closePath();
             }
             if(distance <= particlesArray[i].size + particlesArray[j].size){
                 let t1 = particlesArray[i].speedX;
                 let t2 = particlesArray[i].speedY;
                 particlesArray[i].speedY = particlesArray[j].speedY;
                 particlesArray[i].speedX  = particlesArray[j].speedX;
                 particlesArray[j].speedX = t1;
                 particlesArray[j].speedY = t2;
             
             
             const overlap = (particlesArray[i].size + particlesArray[j].size) - distance;
        const nx = dx / distance; // Normal X
        const ny = dy / distance; // Normal Y
        
        //console.log(nx, ny)
        
        particlesArray[i].x += nx * overlap / 2;
        particlesArray[i].y += ny * overlap / 2;
        particlesArray[j].x -= nx * overlap / 2;
        particlesArray[j].y -= ny * overlap / 2;
         }
         
         }
         if(particlesArray[i].size <= 0.3){
            // particlesArray.splice(i,1);
         }
     }
 }   
    
    function animate(){
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        hue += 2;
        handleParticles();
        requestAnimationFrame(animate);
    }
    animate();
};







