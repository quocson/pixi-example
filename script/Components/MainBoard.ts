namespace Game {
   
    export class MainBoard extends PIXI.Container {
        private roadBG: PIXI.Sprite;
        private roadBGTexture: PIXI.Texture;
        private carsArr: Array<Cars> = [];
        private intvl: number;
        private countMove:number = 0;
        private blacker:PIXI.Graphics;
        private blacker2:PIXI.Graphics;
        private carsCountFinish:number = -1;
        //private carsClass:Cars;
        constructor() {
            super();
            this.initialize();     
        }

        private initialize() {
           
            this.blacker = new PIXI.Graphics();
            this.blacker.beginFill(0x191919)
            this.blacker.drawRect(0,0,500,600);
            this.blacker.x = 1200
            this.blacker.y = 300

            this.blacker2 = new PIXI.Graphics();
            this.blacker2.beginFill(0x191919)
            this.blacker2.drawRect(0,0,500,650);
            this.blacker2.x = -501
            this.blacker2.y = 280

            this.roadBGTexture = PIXI.Texture.fromFrame("roadback");
            var tilingSprite = new PIXI.extras.TilingSprite(
                this.roadBGTexture, 1200, 600);
                tilingSprite.y = 300
                tilingSprite.tileScale.y = 1.26
                this.addChild(tilingSprite);
                for(let i = 0; i < 10; i++){
                    let cars:Cars = new Cars();
                    cars.initialize(i);
                    
                    cars.x = 980
                    if(i == 0)
                    cars.y = 300
                    else{
                        cars.y = this.carsArr[i - 1].y + cars.carHeight
                    }
                    this.addChild(cars);
                    this.carsArr.push(cars);
                    

                }
            this.addChild(this.blacker,this.blacker2);
            this.intvl = setInterval(() => {
                   tilingSprite.tilePosition.x += 20;
                   for(let carCount = 0; carCount < 10; carCount++)
                   this.moveCar(carCount)
                   
                }, 10);
        }

        private moveCar(carNum){
          
           let carCount:number = 0;
           this.carsArr[carNum].update(this.countMove);
             if(carNum == Math.floor((Math.random() * 9) + 1))  { 
                if(this.countMove == 90)
                    this.countMove = 0;
                this.countMove++;
             }
             if(this.countMove == 485){
                clearInterval(this.intvl)
                console.log("win == car"+this.carsCountFinish)
                
               // this.carsArr[this.carsCountFinish].x =  600 - this.carsArr[this.carsCountFinish].width;
                //this.carsArr[this.carsCountFinish].y =  500 //+ this.carsArr[this.carsCountFinish].height;
            }
            if(this.carsArr[carNum].x + this.carsArr[carNum].carSpeed >= 1200 )
                this.carsArr[carNum].x =  1200;
            else 
            if(this.carsArr[carNum].x - this.carsArr[carNum].carSpeed <= 0 && this.carsCountFinish == -1){
                this.countMove = 91;
                for(let carsCount = 0;carsCount < 10; carsCount++)
                this.carsArr[carsCount].carSpeed = (-4)
                this.carsCountFinish = carNum + 1;
            }
            else {   
            this.carsArr[carNum].x = this.carsArr[carNum].x + this.carsArr[carNum].carSpeed;
            
        }
        
    }
}
}