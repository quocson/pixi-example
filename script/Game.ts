namespace Game {
    export const WIDTH = 1310;
    export const HEIGHT = 1126;
    export const CHIPS_UPDATE = "chipUpdate";
    export const DRAW_RESULT = "drawResult";
    export class Game extends PIXI.Application {

        private loading: PIXI.Sprite;
        private loadingTexture: PIXI.BaseTexture;
        
        constructor() {
            super({
                view: document.getElementById("game-canvas") as HTMLCanvasElement,
                width: window.innerWidth,
                height: window.innerHeight,
                antialias: true,
                backgroundColor: 0x191919,
                forceCanvas: true
            });
            LadderGame = this;
            let bootLoader = new PIXI.loaders.Loader();            
            bootLoader.add("logo", "asset/img/loading.jpg").once("complete", (loader) => {
                this.loadingTexture = loader.resources["logo"].texture.baseTexture;
                this.loading = new PIXI.Sprite(this.getTextureByProgress());
                this.loading.anchor.set(0.5, 0);
                this.loading.position.set(WIDTH / 2, (HEIGHT - this.loadingTexture.height / 2) / 2);
                this.loading.scale.set(0.5);
                PIXI.loader.on("progress", this.inProgress, this);
                this.stage.addChild(this.loading);
                PIXI.loader.load();                
            }, this).load();

            this.onUpdateWindowSize();
            PIXI.loader.onComplete.add(() => {               
                // Resource loading complete
                this.stage.removeChild(this.loading);

                //Added by Mina
                let texture = PIXI.Texture.fromImage('roadback');
                let tilingSprite = new PIXI.extras.TilingSprite(texture, 2500, 478);
                this.stage.addChild(tilingSprite);

                this.ticker.add(function() {
                    tilingSprite.x = -500;
                    tilingSprite.y = 0;

                    // tilingSprite.tilePosition.x += 5;
                });

                let cars = [];

                for (let i = 1; i < 11; i++) {
                    cars[i] = PIXI.Sprite.fromFrame("cars_" + i + ".png");
                    this.stage.addChild(cars[i]);
                    
                    let randNum = (Math.floor(Math.random() * (70) + 1));

                    cars[i].x = 1600 + randNum;
                    
                    if (i == 1) {
                        cars[1].y = 20;
                    } else {
                        cars[i].y = cars[i - 1].y + cars[i].height - 12;
                    }
                    
                    cars[i].scale.set(0.6, 0.6);
                }
            });

            window.onresize = () => {
                this.onUpdateWindowSize();
            }
        }

        private getTextureByProgress() {
            _trace("Loading:", PIXI.loader.progress);
            return new PIXI.Texture(this.loadingTexture,
                new PIXI.Rectangle(0, 0, this.loadingTexture.width,
                    Math.min(PIXI.loader.progress / 100, 1) * this.loadingTexture.height));
        }
        private inProgress() {
            this.loading.texture = this.getTextureByProgress();
        }

        private onUpdateWindowSize() {
            let width = Math.min(window.innerWidth, document.body.clientWidth),
                height = Math.min(window.innerHeight, document.body.clientHeight);
            this.view.style.width = width + "px";
            this.view.style.height = height + "px";
            this.view.width = width;
            this.view.height = height;
            this.renderer.autoResize = true;
            this.renderer.resize(width, height);
            let ratio = 1;
            if (width / height > WIDTH / HEIGHT) {
                ratio = height / HEIGHT;
                this.stage.x = (width - WIDTH * ratio) / 2;
                this.stage.y = 0;
            } else {
                ratio = width / WIDTH;
                this.stage.x = 0;
                this.stage.y = (height - HEIGHT * ratio) / 2;
            }
            this.stage.scale.set(ratio, ratio);
        }
    }
    let init = function () {
        new Game();
        PIXI.loader.add("picker", "asset/img/datepicker.png")
            .add("cars", "asset/img/cars2x.json")
            .add("roadback", "asset/img/roadback.jpg");
    }
    window['WebFontConfig'] = {
        active: () => {
            init();
            document.documentElement.focus();
        },
        inactive: function() {          
            init();
            document.documentElement.focus(); 
        },
        custom: {
            families: ['Roboto'],
            urls: ['css/font.css']
        }
    };
    export let _trace = getQueries().debug ?
        function (...params: any[]) {
            console.log.apply(console, params);
        } : function (...params: any[]) { };
    export let LadderGame: Game;
}