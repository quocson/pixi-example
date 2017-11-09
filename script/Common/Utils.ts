namespace Game {
    export function formatStr(...params: string[]): string {
        let str = params[0];
        for (var i = 0; i < params.length - 1; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "gm");
            str = str.replace(reg, params[i + 1]);
        }
        return str;
    };

    export function padNumber(value: number, pad: number = 2) {
        var s = String(value);
        while (s.length < pad) {
            s = "0" + s;
        }
        return s;
    }

    export function formatMoney(input: number) {
        if (!input) {
            return "0.00";
        }
        return input.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }

    export function addKSeparator(input: number) {
        if (!input) return "0"
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    export function isiOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
    }

    export function isFirefox() {
        return /Firefox/.test(navigator.userAgent);
    }

    export function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
        return o.reduce((res, key) => {
            res[key] = key;
            return res;
        }, Object.create(null));
    }

    export function getUrl(path: string, param?: string): string {
        return REST_URL + "/REST/GameEngine/" + path + "?game=ladder" + (param || "");
    }


    export function analyzeDraw(draw: Draw) {
        if (!draw.rt || !draw.rno) {
            return;
        }

        let resAnl = draw.rt.split("|");
        draw.start = resAnl[0].indexOf("L") >= 0 ? 1 : 2;
        draw.oe = resAnl[1].indexOf("O") >= 0 ? 1 : 2;
        draw.legs = parseInt(resAnl[2], 10);
        draw.result = resAnl[3];
    }


    let queries = null;
    export function getQueries(): any {
        if (queries != null) return queries;
        let source = location.search.replace("?", "");
        let data = source.split("&");
        queries = {};
        for (let val of data) {
            let nameVal = val.split("=");
            queries[nameVal[0]] = nameVal[1];
        }
        return queries;
    }

    export function chipText(amount: number) {
        if (amount < 1000) {
            return amount.toString();
        }
        if (amount < 1000000) {
            return Math.floor(amount / 1000).toString() + "K" + (amount % 1000 != 0 ? "+" : "");
        }
        return Math.floor(amount / 1000000).toString() + "M" + (amount % 1000000 != 0 ? "+" : "");
    }

    export function createZArray(length: number) {
        return Array.apply(null, Array(length)).map(Number.prototype.valueOf, 0);
    }


    export function isResultBetType(betType: number, last: Draw) {
        if (!last) return false;
        // Bet on End
        if (betType == 3) return last.oe == 1;
        if (betType == 4) return last.oe == 2;

        if (last.start == 1) { // Left
            // Start on Left
            if (betType == 1) return true;
            // Legs and OxEx
            if (last.oe == 1) { // Odd
                return betType == 6 || betType == 8;
            } else { // Even
                return betType == 5 || betType == 9;
            }
        } else { // Right
            // Start on Right
            if (betType == 2) return true;
            // Legs and OxEx
            if (last.oe == 1) { // Odd
                return betType == 5 || betType == 7;
            } else { // Even
                return betType == 6 || betType == 10;
            }
        }
    }


    var lang = -1;
    const LANGS_REG: Array<RegExp> = [
        /(en-us)|(en)|(us)/,
        /(zh-cn)|(zh)|(cn)|(cs)/,
        /(vi-vn)|(vi)|(vn)/,
        /(km-kh)|(km)|(kh)/,
        /(ja-jp)|(ja)|(jp)/,
        /(id-id)|(id)/,
        /(th-th)|(th)/,
        /(ko-kr)|(ko)|(kr)/
    ]
    const LANGS = ["en-us", "zh-cn", "vi-vn", "km-kh", "ja-jp", "id-id", "th-th", "ko-kr"]
    export function Language(): string {
        let querylang = getQueries().lang;
        if (!querylang) lang = 0;
        if (lang < 0) {
            for (let i = 0; i < LANGS_REG.length; i++) {
                if (LANGS_REG[i].test(querylang)) {
                    lang = i;
                    return LANGS[lang];
                }
            }
            lang = 0;
        }
        return LANGS[lang];
    }
}