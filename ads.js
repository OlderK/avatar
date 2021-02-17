/*
 * @Author: your name
 * @Date: 2021-02-17 19:42:50
 * @LastEditTime: 2021-02-17 20:31:36
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \big-watermelon\ads.js
 */
function onAdError() {}

function showMyAds() {}

function onAdsManagerLoaded() {}

function onContentPauseRequested() {}

function onContentResumeRequested() {}

function noAdGoToScene() {
    var GameConfig = __require("GameConfig")
    var launchScene = GameConfig.launchScene
    cc.director.loadScene(launchScene, null,
        function () {}
    )
}