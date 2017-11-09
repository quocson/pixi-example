module Game {
    export const AVAILABLE_MARKETS = [1];
    export const FST_2013 = 1356969600;
    export const REST_URL = "//" + window.location.host;
    export const TIMEOUT = 1200;
    export const PRODUCT_ID = 4;

    export const RULES_LANG = {
        "en-us": "en",
        "zh-cn": "cs",
        "vi-vn": "vn",
        "km-kh": "kh",
        "th-th": "th",
        "ja-jp": "jp",
        "id-id": "id",
        "ko-kr": "kr"
    };
    export const KEY_EVENT = {
        LEFT: 37,
        RIGHT: 39,
        DELETE: 46,
        BACKSPACE: 8
    }
    export const CHIPS = [1, 5, 25, 100, 500, 1000, 3000, 5000, 10000, 25000, 
        50000, 100000, 250000, 500000, 1000000, 2500000, 5000000];

    //for Game's behavior 
    export const DISPLAY_RESULT_TO_GAMEBOARD = "displayResultToGameboard";
    export const DISPLAY_RESULT_TO_GAMEBOARD_FINISH = "displayResultToGameboardFinish";
    export const SHOW_GLOW_ANIMATION_TO_BET_BOARD = "showGlowAnimationToBetBoard";
    export const CHANGE_STATUS_TEXT_BASE_ON_MARKET_TIME = "changeStatusTextBaseOnMarketTime";
    export const DISABLE_BET_COMMAND_AS_SHOWING_RESULT = "disableBetCommandAsShowingResult";
    export const ENABLE_BET_COMMAND_AS_SHOWING_RESULT = "enableBetCommandAsShowingResult";
}
