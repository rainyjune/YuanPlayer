// @ts-nocheck
export function isArray(vArg: any) {
  if (Array.isArray) {
    return Array.isArray(vArg);
  }
  return Object.prototype.toString.call(vArg) === "[object Array]";
}

export const isHtml5AudioSupported = function () {
  return document.createElement("audio").play;
};

export const innerText = function(element: HTMLElement, text: string) {
  (typeof element.textContent !== 'undefined') ? (element.textContent = text) : (element.innerText = text);
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

/**
 * http://stackoverflow.com/questions/171251#16178864
 * Recursively merge properties and return new object
 * obj1 &lt;- obj2 [ &lt;- ... ]
 */
export function merge(...args) {
  const dst = {};
  let src, p;

  while (args.length > 0) {
    src = args.splice(0, 1)[0];
    if (Object.prototype.toString.call(src) == '[object Object]') {
      for (p in src) {
        if (src.hasOwnProperty && src.hasOwnProperty(p)) {
          if (Object.prototype.toString.call(src[p]) == '[object Object]') {
            dst[p] = merge(dst[p] || {}, src[p]);
          } else {
            dst[p] = src[p];
          }
        }
      }
    }
  }

  return dst;
}

export function trunc(x: number) {
  if ('trunc' in Math) {
    return Math.trunc(x);
  }
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

export function matches(element, selectors) {
  if (element.matches) {
    return element.matches(selectors);
  } else if (element.msMatchesSelector) {
    return element.msMatchesSelector(selectors);
  } else if (element.webkitMatchesSelector) {
    return element.webkitMatchesSelector(selectors);
  }
  return false;
}

export function isHLSNativelySupported() {
  const videoElement = document.createElement('video');
  return videoElement.canPlayType('application/x-mpegURL') || videoElement.canPlayType('application/vnd.apple.mpegURL');
}

export function isHLSJSSupported() {
  return typeof Hls === 'function' && Hls.isSupported();
}

export function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  for (const attr in attributes) {
    if (attributes.hasOwnProperty(attr)) {
      if (attr === 'style') {
        element.style.cssText = attributes[attr];
      } else {
        element[attr] = attributes[attr];
      }
    }
  }
  return element;
}

export function includes(arr, searchElement) {
  if (Array.prototype.includes) {
    return arr.includes(searchElement);
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === searchElement) {
      return true;
    }
  }
  return false;
}

// Check if the browser supports the Fullscreen API
export function isFullScreenEnabled() {
  return !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
}

// Checks if the document is currently in fullscreen mode
export function isFullScreen() {
  return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

export function requestFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and 
    // ensures that our custom controls are visible:
    // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
    // figure[data-fullscreen=true] .controls { z-index:2147483647; }
    element.webkitRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

export function getFullScreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
}

export function debounce(fn, limit) {
  let timer;
  const ans= function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.call(context, ...args);
    }, limit);
  };
  ans.timer = () => {
    return timer;
  };
  return ans;
}

/**
 * Return MIME type for the media file.
 * @param fileName 
 * @returns 
 */
export function getMediaMimeType(fileName, isVideo = false): string {
  let category = isVideo ? 'video' : 'audio';
  let type = 'wav';
  if (fileName) {
    const fileExtension = fileName.split('.').pop();
    const videoElement = document.createElement('video');
    if (fileExtension === 'm3u8') {
      if (videoElement.canPlayType('application/x-mpegURL')) {
        return 'application/x-mpegURL';
      } else {
        return 'application/vnd.apple.mpegurl';
      }
    }
    switch(fileExtension) {
      case '3gp':
        type = '3gpp';
        break;
      case 'aac':
        category = 'audio';
        type = 'aac';
        break;
      case 'flac':
        category = 'audio';
        type = 'flac';
        break;
      case 'm4v':
      case 'm4p':
        category = 'video';
        type = 'mp4';
        break;
      case 'mp3':
        category = 'audio';
        type = 'mp3';
        break;
      case 'mp4':
        type = 'mp4';
        break;
      case 'm4a':
        category = 'audio';
        type = 'mp4';
        break;
      case 'mpg':
      case 'mpeg':
        type = 'mpeg';
        break;
      case 'oga':
        category = 'audio';
        type = 'ogg';
        break;
      case 'ogv':
        category = 'video';
        type = 'ogg';
        break;
      case 'ogg':
        type = 'ogg';
        break;
      case 'mov':
        category = 'video';
        type = 'quicktime';
        break;
      case 'webm':
        type = 'webm';
        break;
      case 'wav':
        category = 'audio';
        type = 'wav';
      default:
        type = 'wav';
        break;
    }
  }
  return `${category}/${type}`;
}

/**
 * Convert a number in seconds into a string in the format of 'h-mm-ss'
 * @param secs - A number in seconds
 * @returns A string
 */
export function formatTime(secs: number): string {
  let minutes = Math.floor(secs / 60);
  const hours = Math.floor(minutes / 60);
  const seconds = Math.floor(secs % 60);
  const ans: string[] = [];
  if (hours > 0) {
    ans.push(String(hours));
  }
  minutes = hours > 0 ? minutes % 60 : minutes;
  const minutesStr = minutes < 10 ? `0${minutes}` : String(minutes);
  ans.push(minutesStr);
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
  ans.push(secondsStr);
  return ans.join(':');
}