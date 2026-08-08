var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CONFIG = (function () {
    var configFile = __packdir__ + "/innercore/config.json";
    var config = FileTools.ReadJSON(configFile);
    if (config.hasOwnProperty("soundapi")) {
        if (config.soundapi.hasOwnProperty("maxStreams") &&
            config.soundapi.hasOwnProperty("forceOneChannel"))
            return config.soundapi;
        config.soundapi = __assign({ maxStreams: 10, forceOneChannel: false }, config.soundapi);
    }
    else {
        config.soundapi = {
            maxStreams: 10,
            forceOneChannel: false
        };
    }
    FileTools.WriteJSON(configFile, config, true);
    var configInfoFile = __packdir__ + "/assets/res/config.info.json";
    var configInfo = FileTools.ReadJSON(configInfoFile);
    configInfo.properties['soundapi'] = {
        name: {
            ru: "Настройки SoundAPI",
            en: "Settings SoundAPI"
        },
        collapsible: false
    };
    configInfo.properties['soundapi.maxStreams'] = {
        name: {
            ru: "Максимум потоков для SoundPool",
            en: "Maximum streams for SoundPool"
        },
        type: "SeekBar",
        min: 1,
        max: 50
    };
    configInfo.properties['soundapi.forceOneChannel'] = {
        name: {
            ru: "Принудительно расчитывать громкость для одного канала",
            en: "Forcibly calculate the volume for one channel"
        }
    };
    FileTools.WriteJSON(configInfoFile, configInfo, true);
    return config.soundapi;
})();
/*
  ____                        _     _     ____   ___
 / ___|  ___  _   _ _ __   __| |   / \   |  _ \ |_ _|
 \___ \ / _ \| | | | '_ \ / _` |  / _ \  | |_) | | |
  ___) | (_) | |_| | | | | (_| | / ___ \ |  __/  | |
 |____/ \___/ \__,_|_| |_|\__,_|/_/   \_\|_|    |___|
                                                                
    SoundAPI 3.0 ©WolfTeam ( https://vk.com/wolf___team )
    GitHub: https://github.com/Wolf-Team/SoundAPI
*/
LIBRARY({
    name: "SoundAPI",
    version: 300,
    shared: true,
    api: "CoreEngine",
    //dependencies: ["SettingsManager"]
});
//IMPORT("SettingsManager");

var SettingsManager = {
    getSetting: function(name) {
        return 100;
        //я просто хз где эту либу найти, 80lk отзовись!
    }
}

/// <reference path="index.ts" />
var SoundAPINetwork;
(function (SoundAPINetwork) {
    var NetworkSoundPlayerMap = /** @class */ (function () {
        function NetworkSoundPlayerMap() {
            this.players = {};
        }
        NetworkSoundPlayerMap.prototype.getPlayer = function (sender, id) {
            if (!this.players.hasOwnProperty(sender))
                throw new RangeError("Unknown sender " + sender);
            if (!this.players[sender].hasOwnProperty(id))
                throw new RangeError("Unknown player ".concat(id, " from sender ").concat(sender));
            return this.players[sender][id];
        };
        NetworkSoundPlayerMap.prototype.addPlayer = function (sender, id, player) {
            if (!this.players.hasOwnProperty(sender))
                this.players[sender] = {};
            this.players[sender][id] = player;
            return this.players[sender][id];
        };
        NetworkSoundPlayerMap.prototype.release = function () {
            for (var sender in this.players) {
                for (var playerID in this.players[sender]) {
                    var player = this.players[sender][playerID];
                    player.stop();
                    delete this.players[sender][playerID];
                }
                delete this.players[sender];
            }
        };
        return NetworkSoundPlayerMap;
    }());
    var NetworkPacket;
    (function (NetworkPacket) {
        NetworkPacket["Play"] = "soundapi.play";
        NetworkPacket["Pause"] = "soundapi.pause";
        NetworkPacket["Stop"] = "soundapi.stop";
    })(NetworkPacket = SoundAPINetwork.NetworkPacket || (SoundAPINetwork.NetworkPacket = {}));
    ;
    ;
    var networkSoundPlayerMap = new NetworkSoundPlayerMap();
    Callback.addCallback("LevelLeft", networkSoundPlayerMap.release);
    Network.addServerPacket(NetworkPacket.Play, function (client, data) {
        var sender = client.getPlayerUid();
        Network.sendToAllClients(NetworkPacket.Play, __assign(__assign({}, data), { sender: sender }));
    });
    Network.addServerPacket(NetworkPacket.Pause, function (client, data) {
        var sender = client.getPlayerUid();
        Network.sendToAllClients(NetworkPacket.Play, __assign(__assign({}, data), { sender: sender }));
    });
    Network.addServerPacket(NetworkPacket.Stop, function (client, data) {
        var sender = client.getPlayerUid();
        Network.sendToAllClients(NetworkPacket.Play, __assign(__assign({}, data), { sender: sender }));
    });
    Network.addClientPacket(NetworkPacket.Play, function (data) {
        if (data.sender == Player.get())
            return;
        networkSoundPlayerMap.addPlayer(data.sender, data.id, SoundAPI.select(data.uid)
            .at(data.target)
            .distance(data.distance)
            .volume(data.volume)
            .loop(data.loop)
            .sync(false)).play();
    });
    Network.addClientPacket(NetworkPacket.Pause, function (data) {
        if (data.sender == Player.get())
            return;
        networkSoundPlayerMap.getPlayer(data.sender, data.id).pause();
    });
    Network.addClientPacket(NetworkPacket.Stop, function (data) {
        if (data.sender == Player.get())
            return;
        networkSoundPlayerMap.getPlayer(data.sender, data.id).stop();
    });
})(SoundAPINetwork || (SoundAPINetwork = {}));
var File = java.io.File;
// Object.assign = function <A, B>(a: A, b: B): A & B {
// 	return { ...a, ...b };
// }
Object.values = function (a) {
    var ret = [];
    for (var key in a)
        ret.push(a[key]);
    return ret;
};
var InvalidOptions = /** @class */ (function (_super) {
    __extends(InvalidOptions, _super);
    function InvalidOptions(uid, message) {
        var _this = _super.call(this, message) || this;
        _this.uid = uid;
        return _this;
    }
    return InvalidOptions;
}(Error));
var SourceError = /** @class */ (function (_super) {
    __extends(SourceError, _super);
    function SourceError(uid) {
        var _this = _super.call(this, "Source not assigned.") || this;
        _this.uid = uid;
        return _this;
    }
    return SourceError;
}(Error));
var MUTABLE_VOLUME = .8;
var SoundAPIPlayer = /** @class */ (function () {
    function SoundAPIPlayer(uid, options) {
        this.uid = uid;
        this.options = options;
        this.networkId = 0;
        this.source = null;
        this._distance = 16;
        this._volume = 1;
        this._sync = true;
        this._loop = false;
        this.prepared = false;
        this.paused = false;
        SoundAPIPlayer.players.push(this);
        this.volume(options.defaultVolume)
            .distance(options.defaultDistance)
            .loop(options.loop)
            .sync(options.sync);
    }
    SoundAPIPlayer.tick = function () {
        SoundAPIPlayer.players.forEach(function (player) { return player.tick(); });
    };
    Object.defineProperty(SoundAPIPlayer.prototype, "looped", {
        get: function () {
            return this._loop;
        },
        enumerable: false,
        configurable: true
    });
    SoundAPIPlayer.prototype.sync = function (sync) {
        if (sync === void 0) { sync = true; }
        if (this.prepared)
            throw new ReferenceError("Player was prepared.");
        this._sync = sync;
        if (this.networkId == 0)
            this.networkId = SoundAPIPlayer.networkId++;
        return this;
    };
    SoundAPIPlayer.prototype.at = function (target) {
        if (this.prepared)
            throw new ReferenceError("Player was prepared.");
        this.source = target;
        return this;
    };
    /**
     * Set sound distance
     * @param {number} dist - sound distance
     * @returns {this} this player
     */
    SoundAPIPlayer.prototype.distance = function (dist) {
        if (this.prepared)
            throw new ReferenceError("Player was prepared.");
        this._distance = dist;
        return this;
    };
    /**
     * Set volume for player
     * @param {number} volume - volume >= 0 and <= 1
     * @returns {this} this player
     */
    SoundAPIPlayer.prototype.volume = function (volume) {
        if (this.prepared)
            throw new ReferenceError("Player was prepared.");
        if (volume > 1 || volume < 0)
            throw new RangeError("volume mast be >= 0 and <= 1.");
        this._volume = volume;
        return this;
    };
    /**
     * Set looping
     * @param {boolean} looping - if true, enables playback looping, otherwise disables.
     * @returns {this} this player
     */
    SoundAPIPlayer.prototype.loop = function (looping) {
        if (looping === void 0) { looping = true; }
        if (this.prepared)
            throw new ReferenceError("Player was prepared.");
        this._loop = looping;
        return this;
    };
    SoundAPIPlayer.prototype._prepare = function () { };
    ;
    /**
     * Prepare player.
     */
    SoundAPIPlayer.prototype.prepare = function () {
        if (this.prepared)
            return this;
        this.prepared = true;
        this._prepare();
        return this;
    };
    /**
     * Start playing sound.
     */
    SoundAPIPlayer.prototype.play = function () {
        if (!this.prepared)
            this.prepare();
        this.send(SoundAPINetwork.NetworkPacket.Play, {
            id: this.networkId,
            uid: this.uid,
            loop: this._loop,
            volume: this._volume,
            distance: this._distance,
            target: this.source
        });
        if (this.paused)
            this.resume();
        else
            this._play();
    };
    /**
     * Pause playing sound.
     */
    SoundAPIPlayer.prototype.pause = function () {
        if (!this.prepared || this.paused)
            return;
        this.send(SoundAPINetwork.NetworkPacket.Pause, {
            id: this.networkId
        });
        this.paused = true;
        this._pause();
    };
    /**
     * Resume playing sound.
     */
    SoundAPIPlayer.prototype.resume = function () {
        if (!this.paused)
            return;
        this.paused = false;
        this._resume();
    };
    /**
     * Stop playing sound.
     */
    SoundAPIPlayer.prototype.stop = function () {
        if (!this.prepared)
            return;
        this.send(SoundAPINetwork.NetworkPacket.Stop, {
            id: this.networkId
        });
        this.stopWithoutSync();
    };
    SoundAPIPlayer.prototype.stopWithoutSync = function () {
        if (!this.prepared)
            return;
        this.prepared = false;
        this.paused = false;
        this._stop();
    };
    SoundAPIPlayer.prototype.simpleCalc = function (sourcePosition, listenerPosition, multiplyVolume) {
        var distance = Math.max(0, Vector.getDistance(sourcePosition, listenerPosition));
        var dVolume = Math.max(0, 1 - (distance / this._distance));
        var volume = dVolume * multiplyVolume;
        return { left: volume, right: volume };
    };
    SoundAPIPlayer.prototype.advancedCalc = function (sourcePosition, listenerPosition, lookVector, multiplyVolume) {
        //https://stackoverflow.com/questions/41518021
        var angle = Math.atan2(sourcePosition.z - listenerPosition.z, sourcePosition.x - listenerPosition.x) - Math.atan2(lookVector.z, lookVector.x);
        if (angle > Math.PI)
            angle -= 2 * Math.PI;
        else if (angle < -Math.PI)
            angle += 2 * Math.PI;
        var x = angle / Math.PI;
        var k = Math.sqrt(0.25 - Math.pow(Math.abs(x) - 0.5, 2));
        if (x < 0)
            k *= -1;
        var left = .75 - .5 * k;
        var right = .75 + .5 * k;
        var volume = this.simpleCalc(sourcePosition, listenerPosition, multiplyVolume);
        return { left: left * volume.left, right: right * volume.right };
    };
    SoundAPIPlayer.prototype.calcVolume = function () {
        var multiplyVolume = this._volume
            * parseFloat(SettingsManager.getSetting("audio_" + this.options.type))
            * parseFloat(SettingsManager.getSetting("audio_main"));
        if (!this.source)
            return { left: multiplyVolume, right: multiplyVolume };
        var sourceDimension = typeof this.source == "number" ? Entity.getDimension(this.source) : this.source.dimension;
        if (sourceDimension != Player.getDimension())
            return { left: 0, right: 0 };
        var sourcePosition = typeof this.source == "number" ? Entity.getPosition(this.source) : this.source;
        if (Block.isSolid(BlockSource.getDefaultForDimension(sourceDimension).getBlockId(sourcePosition.x, sourcePosition.y, sourcePosition.z)))
            multiplyVolume *= MUTABLE_VOLUME;
        var listenerPosition = Player.getPosition();
        var listenerLookVector = Entity.getLookVector(Player.get());
        var volume = CONFIG.forceOneChannel ?
            this.simpleCalc(sourcePosition, listenerPosition, multiplyVolume) :
            this.advancedCalc(sourcePosition, listenerPosition, listenerLookVector, multiplyVolume);
        if (volume.left < this.options.clampVolume.min)
            volume.left = this.options.clampVolume.min;
        if (volume.left > this.options.clampVolume.max)
            volume.left = this.options.clampVolume.max;
        if (volume.right < this.options.clampVolume.min)
            volume.right = this.options.clampVolume.min;
        if (volume.right > this.options.clampVolume.max)
            volume.right = this.options.clampVolume.max;
        return volume;
    };
    SoundAPIPlayer.prototype.tick = function () {
        if (!this.prepared || this.paused)
            return;
        this._tick(this.calcVolume());
    };
    SoundAPIPlayer.prototype.send = function (packet, data) {
        if (this._sync && (World.isWorldLoaded() || Network.inRemoteWorld()))
            Network.sendToServer(packet, data);
    };
    SoundAPIPlayer.stopAll = function () {
        for (var i in SoundAPIPlayer.players) {
            var player = SoundAPIPlayer.players[i];
            player._sync && player.stopWithoutSync();
        }
    };
    SoundAPIPlayer.players = [];
    SoundAPIPlayer.networkId = 1;
    return SoundAPIPlayer;
}());
Callback.addCallback("tick", SoundAPIPlayer.tick);
Callback.addCallback("LevelLeft", SoundAPIPlayer.stopAll);
Callback.addCallback("LevelLoaded", SoundAPIPlayer.stopAll);
/// <reference path="./SoundAPIPlayer.ts" />
// https://developer.android.com/reference/android/media/MediaPlayer
var MediaPlayer = /** @class */ (function (_super) {
    __extends(MediaPlayer, _super);
    function MediaPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.media = null;
        return _this;
    }
    MediaPlayer.prototype._prepare = function () {
        this.media = new android.media.MediaPlayer();
        var attributes = buildAudioAttributes();
        if (attributes)
            this.media.setAudioAttributes(attributes);
        this.media.setDataSource(this.options.source);
        this.media.setLooping(this.looped);
        this.media.prepare();
    };
    MediaPlayer.prototype._play = function () {
        var volume = this.calcVolume();
        this.media.setVolume(volume.left, volume.right);
        this.media.start();
    };
    MediaPlayer.prototype._resume = function () {
        this._play();
    };
    MediaPlayer.prototype._pause = function () {
        this.media.pause();
    };
    MediaPlayer.prototype._stop = function () {
        this.media.stop();
        this.media.release();
        this.media = null;
    };
    MediaPlayer.prototype._tick = function (volume) {
        this.media.setVolume(volume.left, volume.right);
    };
    return MediaPlayer;
}(SoundAPIPlayer));
/// <reference path="./SoundAPIPlayer.ts" />
// https://developer.android.com/reference/android/media/SoundPool
var SoundPlayer = /** @class */ (function (_super) {
    __extends(SoundPlayer, _super);
    function SoundPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.streamId = 0;
        return _this;
    }
    SoundPlayer.getMaxStreams = function () {
        return CONFIG.maxStreams || 10;
    };
    SoundPlayer.init = function () {
        if (this.SoundPool)
            return;
        var initFunction = 1;
        if (android.os.Build.VERSION.SDK_INT >= 21)
            initFunction = 21;
        this.SoundPool = this.initFunctions[initFunction](this.getMaxStreams());
    };
    SoundPlayer.load = function (file) {
        return this.SoundPool.load(file, 0);
    };
    Object.defineProperty(SoundPlayer.prototype, "SoundPool", {
        get: function () {
            return SoundPlayer.SoundPool;
        },
        enumerable: false,
        configurable: true
    });
    ;
    SoundPlayer.prototype._play = function () {
        var volume = this.calcVolume();
        this.streamId = this.SoundPool.play(this.options.soundId, volume.left, volume.right, 0, this.looped ? -1 : 0, 1);
    };
    SoundPlayer.prototype._resume = function () {
        var volume = this.calcVolume();
        this.SoundPool.setVolume(this.streamId, volume[0], volume[1]);
        this.SoundPool.resume(this.streamId);
    };
    SoundPlayer.prototype._pause = function () {
        this.SoundPool.pause(this.streamId);
    };
    SoundPlayer.prototype._stop = function () {
        this.SoundPool.stop(this.streamId);
    };
    SoundPlayer.prototype._tick = function (volume) {
        if (this.streamId)
            this.SoundPool.setVolume(this.streamId, volume.left, volume.right);
    };
    SoundPlayer.SoundPool = null;
    SoundPlayer.initFunctions = {
        21: function (maxStreams) {
            var SoundPoolBuilder = new android.media.SoundPool.Builder();
            SoundPoolBuilder.setMaxStreams(maxStreams);
            SoundPoolBuilder.setAudioAttributes(buildAudioAttributes());
            return SoundPoolBuilder.build();
        },
        1: function (maxStreams) {
            return new android.media.SoundPool(maxStreams, android.media.AudioManager.STREAM_MUSIC, 0);
        }
    };
    return SoundPlayer;
}(SoundAPIPlayer));
SoundPlayer.init();
/// <reference path="../utils/File.ts" />
/// <reference path="../utils/Object.ts" />
/// <reference path="errors/InvalidOptions.ts" />
/// <reference path="errors/SourceError.ts" />
/// <reference path="players/MediaPlayer.ts" />
/// <reference path="players/SoundPlayer.ts" />
function isPoolMeta(meta) {
    return meta.typePlayer == "pool";
}
var SoundAPI = /** @class */ (function () {
    function SoundAPI(mod_id) {
        this.mod_id = mod_id;
    }
    SoundAPI.getSoundOptions = function (options) {
        options = __assign(__assign({}, defaultOptions), options);
        if (!options.source || typeof options.source !== "string")
            throw new ReferenceError("Source not assigned");
        if (typeof options.defaultVolume != "number" ||
            options.defaultVolume < 0 ||
            options.defaultVolume > 1)
            throw new ReferenceError("defaultVolume was been number >=0 and <= 1");
        if (typeof options.clampVolume != "object" ||
            options.clampVolume.min === undefined ||
            options.clampVolume.max === undefined ||
            options.clampVolume.min < 0 ||
            options.clampVolume.max > 1 ||
            options.clampVolume.min > options.clampVolume.max)
            throw new ReferenceError("clampVolume was been object {min:(>=0 and <=max), max:(<=1 and >=min)>}");
        if (typeof options.loop != "boolean")
            throw new ReferenceError("loop was been boolean");
        var types = Object.values(SoundAPI.Type);
        if (!options.type || typeof options.type !== "string" || types.indexOf(options.type) == -1)
            throw new ReferenceError("type was been one from ".concat(types.join(", ")));
        return options;
    };
    SoundAPI.prototype.getUid = function (uid) {
        return this.mod_id + "." + uid;
    };
    SoundAPI.prototype.registerSound = function (uid, options) {
        if (SoundAPI.sounds.hasOwnProperty(this.getUid(uid)))
            throw new RangeError("Sound \"".concat(uid, "\" was been registered."));
        uid = this.getUid(uid);
        try {
            options = SoundAPI.getSoundOptions(typeof options == "string" ? { source: options } : options);
        }
        catch (e) {
            if (e instanceof Error)
                throw new InvalidOptions(uid, e.message);
            else
                throw e;
        }
        var sourceFile = new File(options.source);
        if (!sourceFile.exists())
            throw new java.io.FileNotFoundException("File ".concat(options.source, " not found"));
        var size = sourceFile.length();
        if (size <= 0xFFFFF) {
            SoundAPI.sounds[uid] = __assign({ typePlayer: "pool", soundId: SoundPlayer.load(options.source) }, options);
        }
        else {
            SoundAPI.sounds[uid] = __assign({ typePlayer: "player" }, options);
        }
    };
    SoundAPI.select = function (uid) {
        if (!SoundAPI.sounds.hasOwnProperty(uid))
            throw new RangeError("Sound \"".concat(uid, "\" not been registered."));
        var sound = SoundAPI.sounds[uid];
        if (isPoolMeta(sound)) {
            return new SoundPlayer(uid, sound);
        }
        else {
            return new MediaPlayer(uid, sound);
        }
    };
    SoundAPI.prototype.select = function (uid) {
        if (!SoundAPI.sounds.hasOwnProperty(this.getUid(uid)))
            throw new RangeError("Sound \"".concat(uid, "\" not been registered."));
        uid = this.getUid(uid);
        return SoundAPI.select(uid);
    };
    SoundAPI.sounds = {};
    return SoundAPI;
}());
(function (SoundAPI) {
    var Type;
    (function (Type) {
        Type["SOUND"] = "sound";
        Type["MUSIC"] = "music";
        Type["AMBIENT"] = "ambient";
        Type["BLOCK"] = "block";
        Type["HOSTILE"] = "hostile";
        Type["NEUTRAL"] = "neutral";
        Type["RECORD"] = "record";
        Type["PLAYER"] = "player";
        Type["WEATHER"] = "weather";
    })(Type = SoundAPI.Type || (SoundAPI.Type = {}));
    ;
})(SoundAPI || (SoundAPI = {}));
var defaultOptions = {
    defaultVolume: 1,
    clampVolume: { min: 0, max: 1 },
    loop: false,
    type: SoundAPI.Type.SOUND,
    defaultDistance: 16,
    sync: true,
    muteInSolidBlock: false
};
EXPORT("SoundAPI", SoundAPI);
function buildAudioAttributes() {
    if (android.os.Build.VERSION.SDK_INT < 21)
        return false;
    return new android.media.AudioAttributes.Builder()
        .setUsage(android.media.AudioAttributes.USAGE_GAME)
        .setContentType(android.media.AudioAttributes.CONTENT_TYPE_SONIFICATION)
        .build();
}
var Vector;
(function (Vector) {
    function getDistance(A, B) {
        return Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2) + Math.pow(A.z - B.z, 2));
    }
    Vector.getDistance = getDistance;
})(Vector || (Vector = {}));
