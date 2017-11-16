namespace Game {
    export const WIDTH = 1310;
    export const HEIGHT = 1126;
    export const CHIPS_UPDATE = "chipUpdate";
    export const DRAW_RESULT = "drawResult";
    export class Game extends PIXI.Application {

        private loading: PIXI.Sprite;
        private loadingTexture: PIXI.BaseTexture;
        private mainGame: MainBoard;

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
                this.mainGame = new MainBoard();
                this.stage.addChild(this.mainGame)
                this.ticker.add(this.update, this);

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

        private update(elapsed: number) {
            this.mainGame.update();
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
            .add("carsJSON", "asset/img/cars2x.json")
            .add("roadback", "asset/img/roadback.jpg")
    }
    window['WebFontConfig'] = {
        active: () => {
            init();
            document.documentElement.focus();
        },
        inactive: function () {
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
        } : function (...params: any[]) { };
    export let LadderGame: Game;
}