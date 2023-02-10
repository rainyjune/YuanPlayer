(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.YuanPlayerThemeBlueMonday = factory());
})(this, (function () { 'use strict';

  function anonymous$1(locals, escapeFn, include, rethrow
  ) {
  rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
    var lines = str.split('\n');
    var start = Math.max(lineno - 3, 0);
    var end = Math.min(lines.length, lineno + 3);
    var filename = esc(flnm);
    // Error context
    var context = lines.slice(start, end).map(function (line, i){
      var curr = i + start + 1;
      return (curr == lineno ? ' >> ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'ejs') + ':'
      + lineno + '\n'
      + context + '\n\n'
      + err.message;

    throw err;
  };
  escapeFn = escapeFn || function (markup) {
    return markup == undefined
      ? ''
      : String(markup)
        .replace(_MATCH_HTML, encode_char);
  };
  var _ENCODE_HTML_RULES = {
        "&": "&amp;"
      , "<": "&lt;"
      , ">": "&gt;"
      , '"': "&#34;"
      , "'": "&#39;"
      }
    , _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }var __line = 1
    , __lines = "<div class=\"jp-audio\" role=\"application\" aria-label=\"media player\">\r\n  <div class=\"jp-type-playlist\">\r\n    <div class=\"jp-gui jp-interface\">\r\n      <div class=\"jp-controls\">\r\n        <button class=\"jp-previous\" role=\"button\" tabindex=\"0\">previous</button>\r\n        <button class=\"jp-play\" role=\"button\" tabindex=\"0\">play</button>\r\n        <button class=\"jp-next\" role=\"button\" tabindex=\"0\">next</button>\r\n        <button class=\"jp-stop\" role=\"button\" tabindex=\"0\">stop</button>\r\n      </div>\r\n      <div class=\"jp-progress\">\r\n        <div class=\"jp-seek-bar\" style=\"width: 100%;\">\r\n          <div class=\"jp-play-bar\" style=\"width: 0%;\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"jp-volume-controls\">\r\n        <button class=\"jp-mute\" role=\"button\" tabindex=\"0\">mute</button>\r\n        <button class=\"jp-volume-max\" role=\"button\" tabindex=\"0\">max volume</button>\r\n        <div class=\"jp-volume-bar\">\r\n          <div class=\"jp-volume-bar-value\" style=\"width: 80%;\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"jp-time-holder\">\r\n        <div class=\"jp-current-time\" role=\"timer\" aria-label=\"time\">00:00</div>\r\n        <div class=\"jp-duration\" role=\"timer\" aria-label=\"duration\">04:27</div>\r\n      </div>\r\n      <div class=\"jp-toggles\">\r\n        <button class=\"jp-repeat\" role=\"button\" tabindex=\"0\">repeat</button>\r\n        <button class=\"jp-shuffle\" role=\"button\" tabindex=\"0\">shuffle</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>"
    , __filename = undefined;
  try {
    var __output = "";
    function __append(s) { if (s !== undefined && s !== null) __output += s; }
      ; __append("<div class=\"jp-audio\" role=\"application\" aria-label=\"media player\">\r\n  <div class=\"jp-type-playlist\">\r\n    <div class=\"jp-gui jp-interface\">\r\n      <div class=\"jp-controls\">\r\n        <button class=\"jp-previous\" role=\"button\" tabindex=\"0\">previous</button>\r\n        <button class=\"jp-play\" role=\"button\" tabindex=\"0\">play</button>\r\n        <button class=\"jp-next\" role=\"button\" tabindex=\"0\">next</button>\r\n        <button class=\"jp-stop\" role=\"button\" tabindex=\"0\">stop</button>\r\n      </div>\r\n      <div class=\"jp-progress\">\r\n        <div class=\"jp-seek-bar\" style=\"width: 100%;\">\r\n          <div class=\"jp-play-bar\" style=\"width: 0%;\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"jp-volume-controls\">\r\n        <button class=\"jp-mute\" role=\"button\" tabindex=\"0\">mute</button>\r\n        <button class=\"jp-volume-max\" role=\"button\" tabindex=\"0\">max volume</button>\r\n        <div class=\"jp-volume-bar\">\r\n          <div class=\"jp-volume-bar-value\" style=\"width: 80%;\"></div>\r\n        </div>\r\n      </div>\r\n      <div class=\"jp-time-holder\">\r\n        <div class=\"jp-current-time\" role=\"timer\" aria-label=\"time\">00:00</div>\r\n        <div class=\"jp-duration\" role=\"timer\" aria-label=\"duration\">04:27</div>\r\n      </div>\r\n      <div class=\"jp-toggles\">\r\n        <button class=\"jp-repeat\" role=\"button\" tabindex=\"0\">repeat</button>\r\n        <button class=\"jp-shuffle\" role=\"button\" tabindex=\"0\">shuffle</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>")
      ; __line = 32;
    return __output;
  } catch (e) {
    rethrow(e, __lines, __filename, __line, escapeFn);
  }

  }

  var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

  n(css,{});

  // @ts-ignore
  function getClass$1(Base) {
      return class YuanPlayer extends Base {
          constructor(options) {
              super(options);
              if (this.controls === 'default') {
                  this.renderPlayerUI();
              }
          }
          renderPlayerUI() {
              const div = document.createElement('div');
              div.innerHTML = anonymous$1();
              this.container.appendChild(div);
              const playButton = div.querySelector('.jp-play');
              playButton === null || playButton === void 0 ? void 0 : playButton.addEventListener('click', () => {
                  this.togglePlay();
              });
              const stopButton = div.querySelector('.jp-stop');
              stopButton === null || stopButton === void 0 ? void 0 : stopButton.addEventListener('click', () => {
                  this.stop();
              });
              const previousButton = div.querySelector('.jp-previous');
              previousButton === null || previousButton === void 0 ? void 0 : previousButton.addEventListener('click', () => {
                  this.playPreviousTrack();
              });
              const nextButton = div.querySelector('.jp-next');
              nextButton === null || nextButton === void 0 ? void 0 : nextButton.addEventListener('click', () => {
                  this.playNextTrack();
              });
              const currentTimeElement = div.querySelector('.jp-current-time');
              const durationElement = div.querySelector('.jp-duration');
              const audioContainer = div.querySelector('.jp-audio');
              this.on('play', () => {
                  audioContainer === null || audioContainer === void 0 ? void 0 : audioContainer.classList.add('jp-state-playing');
              });
              this.on('pause', () => {
                  audioContainer === null || audioContainer === void 0 ? void 0 : audioContainer.classList.remove('jp-state-playing');
              });
              this.on('durationchange', () => {
                  if (durationElement) {
                      durationElement.textContent = this.formatTime(Math.floor(this.mediaObject.duration));
                  }
              });
              this.on('timeupdate', () => {
                  const second = Math.floor(this.mediaObject.currentTime);
                  if (currentTimeElement) {
                      currentTimeElement.textContent = this.formatTime(second);
                  }
              });
          }
      };
  }

  function anonymous(locals, escapeFn, include, rethrow
  ) {
  rethrow = rethrow || function rethrow(err, str, flnm, lineno, esc) {
    var lines = str.split('\n');
    var start = Math.max(lineno - 3, 0);
    var end = Math.min(lines.length, lineno + 3);
    var filename = esc(flnm);
    // Error context
    var context = lines.slice(start, end).map(function (line, i){
      var curr = i + start + 1;
      return (curr == lineno ? ' >> ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'ejs') + ':'
      + lineno + '\n'
      + context + '\n\n'
      + err.message;

    throw err;
  };
  escapeFn = escapeFn || function (markup) {
    return markup == undefined
      ? ''
      : String(markup)
        .replace(_MATCH_HTML, encode_char);
  };
  var _ENCODE_HTML_RULES = {
        "&": "&amp;"
      , "<": "&lt;"
      , ">": "&gt;"
      , '"': "&#34;"
      , "'": "&#39;"
      }
    , _MATCH_HTML = /[&<>'"]/g;
  function encode_char(c) {
    return _ENCODE_HTML_RULES[c] || c;
  }var __line = 1
    , __lines = "<div class=\"jp-type-playlist\">\r\n  <div class=\"jp-playlist\">\r\n    <ul style=\"display: block;\">\r\n      <% locals.tracks.forEach(function(track, index){ %>\r\n        <li>\r\n          <div>\r\n            <a href=\"javascript:;\" class=\"jp-playlist-item-remove\" style=\"display: none;\">×</a>\r\n            <a href=\"javascript:;\" class=\"jp-playlist-item\" data-index=\"<%= index %>\" tabindex=\"0\"><%= track.title %></a>\r\n          </div>\r\n        </li>\r\n      <% }); %>\r\n    </ul>\r\n  </div>\r\n</div>"
    , __filename = undefined;
  try {
    var __output = "";
    function __append(s) { if (s !== undefined && s !== null) __output += s; }
      ; __append("<div class=\"jp-type-playlist\">\r\n  <div class=\"jp-playlist\">\r\n    <ul style=\"display: block;\">\r\n      ")
      ; __line = 4
      ;  locals.tracks.forEach(function(track, index){ 
      ; __append("\r\n        <li>\r\n          <div>\r\n            <a href=\"javascript:;\" class=\"jp-playlist-item-remove\" style=\"display: none;\">×</a>\r\n            <a href=\"javascript:;\" class=\"jp-playlist-item\" data-index=\"")
      ; __line = 8
      ; __append(escapeFn( index ))
      ; __append("\" tabindex=\"0\">")
      ; __append(escapeFn( track.title ))
      ; __append("</a>\r\n          </div>\r\n        </li>\r\n      ")
      ; __line = 11
      ;  }); 
      ; __append("\r\n    </ul>\r\n  </div>\r\n</div>")
      ; __line = 14;
    return __output;
  } catch (e) {
    rethrow(e, __lines, __filename, __line, escapeFn);
  }

  }

  // @ts-ignore
  function getClass(Base) {
      return class YuanPlayerPlayList extends Base {
          constructor(options) {
              super(options);
              this.on('playMusicAtIndex', (index) => {
                  this.updateHighlight();
              });
              this.renderUI();
              this.on('modeChanged', this.renderModeIcon.bind(this));
          }
          renderUI() {
              const div = document.createElement('div');
              div.textContent = 'playlist';
              div.innerHTML = anonymous({ tracks: this.list });
              this.container.appendChild(div);
              div.addEventListener('click', (e) => {
                  var _a;
                  const target = e.target;
                  if ((_a = target === null || target === void 0 ? void 0 : target.classList) === null || _a === void 0 ? void 0 : _a.contains('jp-playlist-item')) {
                      if (target.classList.contains('jp-playlist-current')) {
                          // do nothing
                          return;
                      }
                      this.index = target.getAttribute('data-index');
                      this.playAtIndex(this.index);
                  }
              });
              this.updateHighlight();
          }
          renderModeIcon() {
              const element = this.container.querySelector('.yuanplayer-mode-container');
              if (!element)
                  return;
              let text = '';
              // 'none' | 'single' | 'random' | 'order'
              switch (Base.modes[this.modeIndex]) {
                  case 'single':
                      text = 'repeat_one_on';
                      break;
                  case 'random':
                      text = 'shuffle_on';
                      break;
                  case 'order':
                      text = 'repeat_on';
                      break;
                  case 'none':
                  default:
                      text = 'repeat';
                      break;
              }
              element.textContent = text;
          }
          updateHighlight() {
              const playlistCOntainer = this.container.querySelector('.jp-playlist');
              if (!playlistCOntainer)
                  return;
              const highlightEl = playlistCOntainer.querySelector('li.jp-playlist-current');
              if (highlightEl) {
                  highlightEl.classList.remove('jp-playlist-current');
                  highlightEl.querySelector('a.jp-playlist-current').classList.remove('jp-playlist-current');
              }
              const newHighlightEl = playlistCOntainer.querySelectorAll('li')[this.index];
              if (newHighlightEl) {
                  newHighlightEl.classList.add('jp-playlist-current');
                  newHighlightEl.querySelector('a.jp-playlist-item').classList.add('jp-playlist-current');
              }
          }
      };
  }

  const obj = {
      name: 'blueMonday',
      Player: getClass$1,
      PlayList: getClass
  };

  return obj;

}));