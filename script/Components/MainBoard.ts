namespace Game {
   
    export class MainBoard extends PIXI.Container {
        private roadBG: PIXI.Sprite;
        private roadBGTexture: PIXI.Texture;
        private car1: PIXI.Sprite;
        private car2: PIXI.Sprite;
        private car3: PIXI.Sprite;
        private car4: PIXI.Sprite;
        private car5: PIXI.Sprite;
        private car6: PIXI.Sprite;
        private car7: PIXI.Sprite;
        private car8: PIXI.Sprite;
        private car9: PIXI.Sprite;
        private car10: PIXI.Sprite;
        private intvl: number;

        constructor() {
            super();
            
            //PIXI.loader.add("carsJSON", "asset/img/cars2x.json")
            //.add("cars", "asset/img/cars2x.png")
            //.load(function () {
                this.initialize();
            //});
            console.log("mainboard")
            
        }


        private initialize() {
           
            this.roadBGTexture = PIXI.Texture.fromImage("asset/img/roadback.jpg");
            //this.roadBGTexture.


            /*
            
            
            
            
            
            
            for(let i = 1; i <= 10; i++){

                this["car"+i].x = 980
                if(i == 1)
                this["car"+i].y = 300
                else{
                    this["car"+i].y = this["car"+ (i-1)].y + this["car"+i].height
                }

            }*/
            this.car1 = PIXI.Sprite.fromFrame("cars_1.png"); 
            this.car2 = PIXI.Sprite.fromFrame("cars_2.png"); 
            this.car3 = PIXI.Sprite.fromFrame("cars_3.png"); 
            this.car4 = PIXI.Sprite.fromFrame("cars_4.png"); 
            this.car5 = PIXI.Sprite.fromFrame("cars_5.png"); 
            this.car6 = PIXI.Sprite.fromFrame("cars_6.png"); 
            this.car7 = PIXI.Sprite.fromFrame("cars_7.png"); 
            this.car8 = PIXI.Sprite.fromFrame("cars_8.png"); 
            this.car9 = PIXI.Sprite.fromFrame("cars_9.png"); 
            this.car10 = PIXI.Sprite.fromFrame("cars_10.png"); 

            var tilingSprite = new PIXI.extras.TilingSprite(
                this.roadBGTexture, 1200, 600);
                tilingSprite.y = 300
                tilingSprite.tileScale.y = 1.26
                this.addChild(tilingSprite,this.car1
                                ,this.car2,this.car3
                                ,this.car4,this.car5
                                ,this.car6,this.car7
                                ,this.car8,this.car9
                                ,this.car10);
            this.car1.x = this.car2.x = this.car3.x =
            this.car4.x = this.car5.x = this.car6.x =
            this.car7.x = this.car8.x = this.car9.x =
            this.car10.x = 980
            this.car1.y = 300
            this.car2.y = this.car1.y + this.car2.height;
            this.car3.y = this.car2.y + this.car3.height;
            this.car4.y = this.car3.y + this.car4.height;
            this.car5.y = this.car4.y + this.car5.height;
            this.car6.y = this.car5.y + this.car6.height;
            this.car7.y = this.car6.y + this.car7.height;
            this.car8.y = this.car7.y + this.car8.height;
            this.car9.y = this.car8.y + this.car9.height;
            this.car10.y = this.car9.y + this.car10.height;
            this.intvl = setInterval(() => {
                   tilingSprite.tilePosition.x += 20;
                   this.moveCar(Math.floor((Math.random() * 10) + 1))
                }, 10);
            
            console.log(this["car"+7].x)
        }

        private moveCar(carNum){
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            let carMove = (plusOrMinus * Math.floor((Math.random() * 70) + -20))
            if(this["car"+carNum].x + carMove >= 980)
                this["car"+carNum].x = 980
            else if(this["car"+carNum].x - carMove <= -20)
            clearInterval(this.intvl);
            else    
            this["car"+carNum].x = this["car"+carNum].x + carMove
        }
        
    }
}