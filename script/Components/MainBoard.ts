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
            this.initialize();     
        }

        private initialize() {
           
            this.roadBGTexture = PIXI.Texture.fromFrame("roadback");
            var tilingSprite = new PIXI.extras.TilingSprite(
                this.roadBGTexture, 1200, 600);
                tilingSprite.y = 300
                tilingSprite.tileScale.y = 1.26
                this.addChild(tilingSprite);
                for(let i = 1; i <= 10; i++){
                    this["car"+i]= PIXI.Sprite.fromFrame("cars_"+i+".png"); 
                    this["car"+i].x = 980
                    if(i == 1)
                    this["car"+i].y = 300
                    else{
                        this["car"+i].y = this["car"+ (i-1)].y + this["car"+i].height
                    }
                    this.addChild(this["car"+i]);

                }
            this.intvl = setInterval(() => {
                   tilingSprite.tilePosition.x += 20;
                   this.moveCar(Math.floor((Math.random() * 10) + 1))
                }, 10);
        }

        private moveCar(carNum){
           let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
           let carMove = (plusOrMinus * Math.floor((Math.random() * 20) + 0))
            //let carMove = -1
            if(this["car"+carNum].x + carMove >= 980)
                this["car"+carNum].x = 980
            else if(this["car"+carNum].x - carMove <= -20)
            clearInterval(this.intvl);
            else    
            this["car"+carNum].x = this["car"+carNum].x + carMove
        }
        
    }
}