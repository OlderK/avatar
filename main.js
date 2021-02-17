window.boot = function () {
    var settings = window._CCSettings
    window._CCSettings = undefined
    if (!settings.debug) {
        var uuids = settings.uuids
        var rawAssets = settings.rawAssets
        var assetTypes = settings.assetTypes
        var realRawAssets = settings.rawAssets = {}
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {}
            for (var id in entries) {
                var entry = entries[id]
                var type = entry[1]
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type]
                }
                realEntries[uuids[id] || id] = entry
            }
        }
        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid]
            }
        }
        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]]
                }
            }
        }
        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]]
                    }
                }
            }
        }
    }

    function setLoadingDisplay() {
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            loadData.completedCount = completedCount
            loadData.totalCount = totalCount
        }
        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none'
        })
    }

    var onStart = function () {
        cc.loader.downloader._subpackages = settings.subpackages
        cc.view.enableRetina(true)
        cc.view.resizeWithBrowserSize(true)
        if (!false && !false) {
            if (cc.sys.isBrowser) {
                setLoadingDisplay()
            }
            if (cc.sys.isMobile) {
                if (settings.orientation === 'landscape') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
                } else if (settings.orientation === 'portrait') {
                    cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
                }
                cc.view.enableAutoFullScreen(false);
            }
            if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
                cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
            }
        }

        var launchScene = settings.launchScene;
        var canvas;
        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
        }
        var launchScene = settings.launchScene;
        console.log("landscape,", launchScene);
        var MainManger = __require("MainManage");
        MainManger.init(launchScene, cc.sys.isBrowser, canvas.style.visibility);
    };

    var jsList = settings.jsList;

    var bundledScript = settings.debug ? 'src/project.dev.js' : 'src/project.js';
    if (jsList) {
        jsList = jsList.map(function (x) {
            return 'src/' + x;
        });
        jsList.push(bundledScript);
    } else {
        jsList = [bundledScript];
    }


    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !false && settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    }

    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    })

    cc.game.run(option, onStart);
}