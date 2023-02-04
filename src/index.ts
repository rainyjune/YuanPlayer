import { isArray, isHtml5AudioSupported, innerText } from './utils';

interface CSSSelector {
  duration: string
  durationTime: string
  currentTime: string
}

interface YuanPlayerOptions {
  container: string | HTMLElement
  cssSelector?: CSSSelector
}

class YuanPlayer {
  container;
  mediaObject: any;
  errorCode: number;
  errorMessage: string;
  eventHandlers: any;
  loop = false;
  cssSelector: CSSSelector;
  source: Array<string>;
  static error = {
    MEDIA_ERR_URLEMPTY: {
      code: -2,
      message: 'Media playback command not possible as no media is set.'
    },
    MEDIA_ERR_UNKNOWN: {
      code: -1,
      message: 'An unknown error occurred.'
    },
    MEDIA_ERR_ABORTED: {
      code: 1,
      message: 'You aborted the video playback.'
    },
    MEDIA_ERR_NETWORK: {
      code: 2,
      message: 'A network error caused the video download to fail part-way.'
    },
    MEDIA_ERR_DECODE: {
      code: 3,
      message: 'The video playback was aborted due to a corruption problem or because the video used features your browser did not support.'
    },
    MEDIA_ERR_SRC_NOT_SUPPORTED: {
      code: 4,
      message: 'The video could not be loaded, either because the server or network failed or because the format is not supported.'
    }
  };
  constructor(options: YuanPlayerOptions) {
    if (!isHtml5AudioSupported()) {
      throw new Error("Your browser does not support HTML5 Audio.");
    }
    this.container = 'yuanplayer';
    this.mediaObject = null;

    this.errorCode = 0;
    this.errorMessage = '';
    this.eventHandlers = {};

    this.init(options);
  }

  init(options: any) {
    this.initOptions(options);
    // If no valid container exists, we do nothing.
    if(!this.container || !document.getElementById(this.container)) return ;
    this.addMediaElement();
    this.bindMediaEvents();
  }

  initOptions(options: YuanPlayerOptions) {
    for (const prop in options) {
      // @ts-ignore
      this[prop] = options[prop];
    }
  }

  addMediaElement() {
    var container = document.getElementById(this.container);
    if (container) {
      var mediaElement = document.createElement('audio');
      this.mediaObject = mediaElement;

      mediaElement.controls = true;
      if ( typeof this.loop !== "undefined") {
        mediaElement.loop = !!this.loop;
      }

      this.addMediaSource();
      container.appendChild(mediaElement);
    }
  }

  bindMediaEvents() {
    var that = this;
    var media = this.mediaObject;
    if (!media) return ;

    var t = window.setInterval(function(){
      if (media.networkState === 3) {
        that.errorCode = YuanPlayer.error.MEDIA_ERR_URLEMPTY.code;
        that.errorMessage = YuanPlayer.error.MEDIA_ERR_URLEMPTY.message;
        clearInterval(t);
        that.trigger('error');
      }
    }, 100);

    function updateDuration() {
      if (that.cssSelector && that.cssSelector.duration && !isNaN(media.duration)) {
        const element = document.querySelector(that.cssSelector.duration) as HTMLElement;
        if (element) {
          innerText(element, that.formatTime(Math.floor(media.duration)));
        }
      }
    }
    function updateCurrentTime() {
      if (that.cssSelector && that.cssSelector.currentTime && !isNaN(media.currentTime) && !isNaN(media.duration)) {
        const element = document.querySelector(that.cssSelector.currentTime) as HTMLElement;
        if (element) {
          innerText(element, that.formatTime(Math.floor(media.currentTime)));
        }
      }
    }
    media.addEventListener('abort', function() {
      that.trigger('abort');
      }, false);
    media.addEventListener('canplay', function() {
      that.trigger('canplay');
      }, false);
    media.addEventListener('canplaythrough', function() {
      that.trigger('canplaythrough');
      }, false);
    media.addEventListener('durationchange', function() {
      updateDuration();
      that.trigger('durationchange');
      }, false);
    media.addEventListener('emptied', function() {
      that.trigger('emptied');
      }, false);
    media.addEventListener('ended', function() {
      that.trigger('ended');
      }, false);
    media.addEventListener('error', function(e: any) {
      switch (e.target.error.code) {
        case e.target.error.MEDIA_ERR_ABORTED:
          that.errorCode = YuanPlayer.error.MEDIA_ERR_ABORTED.code;
          that.errorMessage = YuanPlayer.error.MEDIA_ERR_ABORTED.message;
          break;
        case e.target.error.MEDIA_ERR_NETWORK:
          that.errorCode = YuanPlayer.error.MEDIA_ERR_NETWORK.code;
          that.errorMessage = YuanPlayer.error.MEDIA_ERR_NETWORK.message;
          break;
        case e.target.error.MEDIA_ERR_DECODE:
          that.errorCode = YuanPlayer.error.MEDIA_ERR_DECODE.code;
          that.errorMessage = YuanPlayer.error.MEDIA_ERR_DECODE.message;
          break;
        case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          that.errorCode = YuanPlayer.error.MEDIA_ERR_SRC_NOT_SUPPORTED.code;
          that.errorMessage = YuanPlayer.error.MEDIA_ERR_SRC_NOT_SUPPORTED.message;
          break;
        default:
          that.errorCode = YuanPlayer.error.MEDIA_ERR_UNKNOWN.code;
          that.errorMessage = YuanPlayer.error.MEDIA_ERR_UNKNOWN.message;
          break;
      }
      clearInterval(t);
      that.trigger('error');
    }, false);
    media.addEventListener('loadeddata', function() {
      that.trigger('loadeddata');
      }, false);
    media.addEventListener('loadedmetadata', function() {
      that.trigger('loadedmetadata');
      }, false);
    media.addEventListener('loadstart', function() {
      that.trigger('loadstart');
      }, false);
    media.addEventListener('pause', function() {
      that.trigger('pause');
      }, false);
    media.addEventListener('play', function() {
      that.trigger('play');
      }, false);
    media.addEventListener('playing', function() {
      that.trigger('playing');
      }, false);
    media.addEventListener('progress', function() {
      updateDuration();
      that.trigger('progress');
      }, false);
    media.addEventListener('ratechange', function() {
      that.trigger('ratechange');
      }, false);
    media.addEventListener('seeked', function() {
      that.trigger('seeked');
      }, false);
    media.addEventListener('seeking', function() {
      that.trigger('seeking');
      }, false);
    // Fixes for Android 2.2,this event will be triggered in Android 2.2 when the media file load failed with HTTP status 403.
    media.addEventListener('stalled', function() {
      that.trigger('stalled');
      that.errorCode = YuanPlayer.error.MEDIA_ERR_URLEMPTY.code;
      that.errorMessage = YuanPlayer.error.MEDIA_ERR_URLEMPTY.message;
      that.trigger('error');
      clearInterval(t);
      }, false);
    media.addEventListener('suspend', function() {
      that.trigger('suspend');
      }, false);
    media.addEventListener('timeupdate', function(){
      updateCurrentTime();
      that.trigger('timeupdate');
    }, false);
    media.addEventListener('volumechange', function() {
      that.trigger('volumechange');
      }, false);
    media.addEventListener('waiting', function() {
      that.trigger('waiting');
      }, false);
  }

  addMediaSource(){
    var media = this.mediaObject;
    var sources = this.source;
    if (sources) {
      this.setMedia(sources);
    }
  }

  setMedia(mediaParam: any) {
    var media = this.mediaObject;
    if (!media) return;
    media.innerHTML = '';
    if (typeof mediaParam === 'string') {
      var sourceElement = document.createElement('source');
      sourceElement.src = mediaParam;
      sourceElement.type = this.getMimeType(mediaParam);
      media.appendChild(sourceElement);
    } else if (typeof mediaParam === 'object'){
      if (isArray(mediaParam)) {
        for (var i = 0; i < mediaParam.length; i++) {
          this.setMediaItem(mediaParam[i]);
        }
      } else {
        this.setMediaItem(mediaParam);
      }
    }
  }

  formatTime(timeInSeconds: number): string {
    var result = "";
    var seconds = Math.floor(timeInSeconds),
        hours = Math.floor(seconds / 3600),
        minutes = Math.floor((seconds - (hours * 3600)) / 60),
        seconds = seconds - (hours * 3600) - (minutes * 60);

    const minutesStr = (hours >0 && minutes < 10) ? "0" + minutes : '' + minutes;
    const secondsStr = (seconds < 10) ? "0" + seconds : '' + seconds;
    result = hours ? (hours + ':') : '' + minutesStr + ':' + secondsStr;
    return result;
  }

  play(){
    if (this.mediaObject) {
      this.mediaObject.play();
    }
  }
  togglePlay() {
    var media = this.mediaObject;
    if (media) {
      if (media.paused) {
        media.play();
      } else {
        media.pause();
      }
    }
  }
  stop(){
    var media = this.mediaObject;
    if (media) {
      media.pause();
      media.currentTime = 0;
    }
  }
  toggleLoop() {
    var media = this.mediaObject;
    if (media) {
      media.loop = !media.loop;
    }
    this.trigger('loopchanged');
  }
  getMimeType(fileName: string) {
    var type = 'wav';
    if (fileName) {
      var fileExtension = fileName.split('.').pop();
      switch(fileExtension) {
        case 'aac':
          type = 'aac';
          break;
        case 'mp4':
        case 'm4a':
          type = 'mp4';
          break;
        case 'mp1':
        case 'mp2':
        case 'mp3':
        case 'mpg':
        case 'mpeg':
          type = 'mpeg';
          break;
        case 'oga':
        case 'ogg':
          type = 'ogg';
          break;
        case 'wav':
          type = 'wav';
          break;
        case 'webm':
          type = 'webm';
          break;
        default :
          type = 'wav';
      }
    }
    return 'audio/' + type;
  }
  pause(){
    var media = this.mediaObject;
    if (media) {
      media.pause();
    }
  }

  setMediaItem(mediaObj: any) {
    var media = this.mediaObject;
    var sourceElement = document.createElement('source');
    sourceElement.src = mediaObj.src;
    sourceElement.type = mediaObj.type ? mediaObj.type : this.getMimeType(mediaObj.src);
    media.appendChild(sourceElement);
  }
  mute() {
    var media = this.mediaObject;
    if (media) {
      media.muted = true;;
    }
  }
  unmute() {
    var media = this.mediaObject;
    if (media) {
      media.muted = false;
    }
  }
  toggleMute() {
    var media = this.mediaObject;
    if (media) {
      media.muted = !media.muted;
    }
  }
  addVolume() {
    var media = this.mediaObject;
    if (media) {
      var temp = media.volume + 0.2;
      media.volume = (temp >= 1.0) ? 1.0 : temp;
    }
  }
  minusVolume() {
    var media = this.mediaObject;
    if (media) {
      var temp = media.volume - 0.2;
      media.volume = (temp >= 0.0) ? temp : 0.0;
    }
  }
  on(event: string, callback: Function) {
    var Events = this.eventHandlers;
    if (!Events[event]) {
      Events[event] = [];
    }
    Events[event].push(callback);
  }
  off(event: string, callback: Function) {
    var Events = this.eventHandlers;
    if (!Events[event]) return ;
    if (callback) {
      var index = Events[event].indexOf(callback);
      if (index !== -1) {
        Events[event].splice(index, 1);
      }
    } else {
      Events[event] = [];
    }
  }
  trigger(event: string) {
    var Events = this.eventHandlers;
    if (!Events[event]) return ;
    var args = Array.prototype.slice.call(arguments, 1);
    var callbackArray = Events[event];
    for (var i = callbackArray.length - 1; i >= 0; i--) {
      callbackArray[i].apply(callbackArray[i], args);
    };
  }
}

export default YuanPlayer;