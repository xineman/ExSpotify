webpackJsonp([0],{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(7),__webpack_require__(28)):"function"==typeof define&&define.amd?define(["react","react-dom"],e):"object"==typeof exports?exports.ReactCustomScroll=e(require("react"),require("react-dom")):t.ReactCustomScroll=e(t.react,t["react-dom"])}(this,function(t,e){return function(t){function e(r){if(o[r])return o[r].exports;var l=o[r]={exports:{},id:r,loaded:!1};return t[r].call(l.exports,l,l.exports,e),l.loaded=!0,l.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(1)},function(t,e,o){"use strict";function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}function l(t,e,o){return e=e||0===e?e:t,o=o||0===o?o:t,e>o?(console.error("min limit is greater than max limit"),t):t<e?e:t>o?o:t}function s(t,e){var o=e.getBoundingClientRect();return t.clientX>o.left&&t.clientX<o.left+o.width&&t.clientY>o.top&&t.clientY<o.top+o.height}function n(t){var e=this.props.minScrollHandleHeight;if(t.height>=e)return t;var o=e-t.height,r=this.state.scrollPos/(this.contentHeight-this.visibleHeight),l=o*r,s=t.top-l;return{height:e,top:s}}var i=o(2),a=o(3);t.exports=i.createClass({displayName:"customScroll",propTypes:{allowOuterScroll:i.PropTypes.bool,heightRelativeToParent:i.PropTypes.string,onScroll:i.PropTypes.func,addScrolledClass:i.PropTypes.bool,freezePosition:i.PropTypes.bool,handleClass:i.PropTypes.string,minScrollHandleHeight:i.PropTypes.number,flex:i.PropTypes.string,rtl:i.PropTypes.bool,scrollTo:i.PropTypes.number},getDefaultProps:function(){return{handleClass:"inner-handle",minScrollHandleHeight:38}},getInitialState:function(){return this.scrollbarYWidth=0,{scrollPos:0,onDrag:!1}},componentDidMount:function(){this.forceUpdate()},componentDidUpdate:function(t){var e=a.findDOMNode(this),o=e.getBoundingClientRect(),r=this.getScrolledElement();this.contentHeight=r.scrollHeight,this.scrollbarYWidth=r.offsetWidth-r.clientWidth,this.visibleHeight=r.clientHeight,this.scrollRatio=this.contentHeight?this.visibleHeight/this.contentHeight:1,this.toggleScrollIfNeeded(),this.position={top:o.top+window.pageYOffset,left:o.left+window.pageXOffset},(this.props.freezePosition||t.freezePosition)&&this.adjustFreezePosition(t),"undefined"!=typeof this.props.scrollTo&&this.props.scrollTo!==t.scrollTo&&this.updateScrollPosition(this.props.scrollTo)},componentWillUnmount:function(){document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},adjustFreezePosition:function(t){var e=this.getScrolledElement(),o=this.refs.contentWrapper;this.props.freezePosition&&(o.scrollTop=this.state.scrollPos),t.freezePosition&&(e.scrollTop=this.state.scrollPos)},toggleScrollIfNeeded:function(){var t=this.contentHeight-this.visibleHeight>1;this.hasScroll!==t&&(this.hasScroll=t,this.forceUpdate())},getScrollTop:function(){return this.getScrolledElement().scrollTop},updateScrollPosition:function(t){var e=this.getScrolledElement();e.scrollTop=t,this.setState({scrollPos:t})},onClick:function(t){if(this.hasScroll&&this.isMouseEventOnCustomScrollbar(t)&&!this.isMouseEventOnScrollHandle(t)){var e=this.calculateNewScrollHandleTop(t),o=this.getScrollValueFromHandlePosition(e);this.updateScrollPosition(o)}},isMouseEventOnCustomScrollbar:function(t){var e=a.findDOMNode(this.refs.customScrollbar);return s(t,e)},isMouseEventOnScrollHandle:function(t){var e=a.findDOMNode(this.refs.scrollHandle);return s(t,e)},calculateNewScrollHandleTop:function(t){var e,o=t.pageY-this.position.top,r=this.getScrollHandleStyle().top,l=o>r+this.scrollHandleHeight;return e=l?r+Math.min(this.scrollHandleHeight,this.visibleHeight-this.scrollHandleHeight):r-Math.max(this.scrollHandleHeight,0)},getScrollValueFromHandlePosition:function(t){return t/this.scrollRatio},getScrollHandleStyle:function(){var t=this.state.scrollPos*this.scrollRatio;return this.scrollHandleHeight=this.visibleHeight*this.scrollRatio,{height:this.scrollHandleHeight,top:t}},adjustCustomScrollPosToContentPos:function(t){this.setState({scrollPos:t})},onScroll:function(t){this.props.freezePosition||(this.adjustCustomScrollPosToContentPos(t.currentTarget.scrollTop),this.props.onScroll&&this.props.onScroll(t))},getScrolledElement:function(){return this.refs.innerContainer},onMouseDown:function(t){this.hasScroll&&this.isMouseEventOnScrollHandle(t)&&(this.startDragHandlePos=this.getScrollHandleStyle().top,this.startDragMousePos=t.pageY,this.setState({onDrag:!0}),document.addEventListener("mousemove",this.onHandleDrag),document.addEventListener("mouseup",this.onHandleDragEnd))},onHandleDrag:function(t){t.preventDefault();var e=t.pageY-this.startDragMousePos,o=l(this.startDragHandlePos+e,0,this.visibleHeight-this.scrollHandleHeight),r=this.getScrollValueFromHandlePosition(o);this.updateScrollPosition(r)},onHandleDragEnd:function(t){this.setState({onDrag:!1}),t.preventDefault(),document.removeEventListener("mousemove",this.onHandleDrag),document.removeEventListener("mouseup",this.onHandleDragEnd)},blockOuterScroll:function(t){if(!this.props.allowOuterScroll){var e=t.currentTarget,o=t.currentTarget.scrollHeight,r=o-t.currentTarget.offsetHeight,l=t.deltaY%3?t.deltaY:10*t.deltaY;e.scrollTop+l<=0?(e.scrollTop=0,t.preventDefault()):e.scrollTop+l>=r&&(e.scrollTop=r,t.preventDefault()),t.stopPropagation()}},getInnerContainerClasses:function(){var t="inner-container";return this.state.scrollPos&&this.props.addScrolledClass&&(t+=" content-scrolled"),t},getScrollStyles:function(){var t,e,o=this.scrollbarYWidth||20,l=this.props.rtl?"marginLeft":"marginRight",s=(t={},r(t,l,-1*o),r(t,"height",this.props.heightRelativeToParent||this.props.flex?"100%":""),t),n=(e={},r(e,l,this.scrollbarYWidth?0:o),r(e,"height",this.props.heightRelativeToParent||this.props.flex?"100%":""),r(e,"overflowY",this.props.freezePosition?"hidden":"visible"),e);return{innerContainer:s,contentWrapper:n}},getOuterContainerStyle:function(){return{height:this.props.heightRelativeToParent||this.props.flex?"100%":""}},getRootStyles:function(){var t={};return this.props.heightRelativeToParent?t.height=this.props.heightRelativeToParent:this.props.flex&&(t.flex=this.props.flex),t},render:function(){var t=this.getScrollStyles(),e=this.getRootStyles(),o=n.call(this,this.getScrollHandleStyle());return i.createElement("div",{className:"custom-scroll "+(this.state.onDrag?"scroll-handle-dragged":""),style:e},i.createElement("div",{className:"outer-container",style:this.getOuterContainerStyle(),onMouseDown:this.onMouseDown,onClick:this.onClick},this.hasScroll?i.createElement("div",{ref:"customScrollbar",className:"custom-scrollbar"+(this.props.rtl?" custom-scrollbar-rtl":""),key:"scrollbar"},i.createElement("div",{ref:"scrollHandle",className:"custom-scroll-handle",style:o},i.createElement("div",{className:this.props.handleClass}))):null,i.createElement("div",{ref:"innerContainer",className:this.getInnerContainerClasses(),style:t.innerContainer,onScroll:this.onScroll,onWheel:this.blockOuterScroll},i.createElement("div",{className:"content-wrapper",ref:"contentWrapper",style:t.contentWrapper},this.props.children))))}})},function(e,o){e.exports=t},function(t,o){t.exports=e}])});

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getExtensionUrl = getExtensionUrl;
exports.getCookie = getCookie;
exports.refreshToken = refreshToken;
exports.hasMore = hasMore;
exports.loginVk = loginVk;
var PROJECT_URL = exports.PROJECT_URL = "http://localhost:3000/";
var VK_AUDIO_URL = exports.VK_AUDIO_URL = "https://vk.com/al_audio.php";
function getExtensionUrl() {
	return chrome.extension.getURL('public/index.html');
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

function refreshToken(callback) {
	chrome.cookies.get({ url: "http://localhost", name: "refresh_token" }, function (cookie) {
		console.log("Going to refresh token");
		$.ajax({
			url: PROJECT_URL + "refresh_token",
			data: {
				refresh_token: cookie.value
			}
		}).done(function (data) {
			console.log("Refreshed");
			callback();
		});
	});
}

function hasMore(list) {
	if (list) {
		return list.next ? true : false;
	}
	return false;
}

function loginVk(cb) {
	var popup = window.open("localhost:3000/auth/vk", "", "width=655,height=350,status=no,left=300,top=150");
	var checking = setInterval(function () {
		if (popup.closed) {
			console.log("just closed");
			clearInterval(checking);

			chrome.cookies.get({ url: "http://localhost", name: "vk_access_token" }, function (cookie) {
				return cb(cookie.value);
			});

			// cb(getCookie("vk_access_token"));
		}
	}, 1000);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var CustomScroll = __webpack_require__(110);

module.exports = CustomScroll;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InfiniteScroll = function (_Component) {
    _inherits(InfiniteScroll, _Component);

    function InfiniteScroll(props) {
        _classCallCheck(this, InfiniteScroll);

        var _this = _possibleConstructorReturn(this, (InfiniteScroll.__proto__ || Object.getPrototypeOf(InfiniteScroll)).call(this, props));

        _this.scrollListener = _this.scrollListener.bind(_this);
        return _this;
    }

    _createClass(InfiniteScroll, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.pageLoaded = this.props.pageStart;
            this.attachScrollListener();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.attachScrollListener();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var children = _props.children;
            var element = _props.element;
            var hasMore = _props.hasMore;
            var initialLoad = _props.initialLoad;
            var isReverse = _props.isReverse;
            var loader = _props.loader;
            var loadMore = _props.loadMore;
            var pageStart = _props.pageStart;
            var threshold = _props.threshold;
            var useCapture = _props.useCapture;
            var useWindow = _props.useWindow;

            var props = _objectWithoutProperties(_props, ['children', 'element', 'hasMore', 'initialLoad', 'isReverse', 'loader', 'loadMore', 'pageStart', 'threshold', 'useCapture', 'useWindow']);

            props.ref = function (node) {
                _this2.scrollComponent = node;
            };

            return _react2.default.createElement(element, props, children, hasMore && (loader || this._defaultLoader));
        }
    }, {
        key: 'calculateTopPosition',
        value: function calculateTopPosition(el) {
            if (!el) {
                return 0;
            }
            return el.offsetTop + this.calculateTopPosition(el.offsetParent);
        }
    }, {
        key: 'scrollListener',
        value: function scrollListener() {
            var el = this.scrollComponent;
            var scrollEl = window;

            var offset = void 0;
            if (this.props.useWindow) {
                var scrollTop = scrollEl.pageYOffset !== undefined ? scrollEl.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                if (this.props.isReverse) offset = scrollTop;else offset = this.calculateTopPosition(el) + el.offsetHeight - scrollTop - window.innerHeight;
            } else {
                if (this.props.isReverse) offset = el.parentNode.scrollTop;else offset = el.scrollHeight - el.parentNode.scrollTop - el.parentNode.clientHeight;
            }

            if (offset < Number(this.props.threshold)) {
                this.detachScrollListener();
                // Call loadMore after detachScrollListener to allow for non-async loadMore functions
                if (typeof this.props.loadMore == 'function') {
                    this.props.loadMore(this.pageLoaded += 1);
                }
            }
        }
    }, {
        key: 'attachScrollListener',
        value: function attachScrollListener() {
            if (!this.props.hasMore) {
                return;
            }

            var scrollEl = window;
            if (this.props.useWindow == false) {
                scrollEl = this.scrollComponent.parentNode;
            }

            scrollEl.addEventListener('scroll', this.scrollListener, this.props.useCapture);
            scrollEl.addEventListener('resize', this.scrollListener, this.props.useCapture);

            if (this.props.initialLoad) {
                this.scrollListener();
            }
        }
    }, {
        key: 'detachScrollListener',
        value: function detachScrollListener() {
            var scrollEl = window;
            if (this.props.useWindow == false) {
                scrollEl = this.scrollComponent.parentNode;
            }

            scrollEl.removeEventListener('scroll', this.scrollListener, this.props.useCapture);
            scrollEl.removeEventListener('resize', this.scrollListener, this.props.useCapture);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachScrollListener();
        }

        // Set a defaut loader for all your `InfiniteScroll` components

    }, {
        key: 'setDefaultLoader',
        value: function setDefaultLoader(loader) {
            this._defaultLoader = loader;
        }
    }]);

    return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
    element: _react.PropTypes.string,
    hasMore: _react.PropTypes.bool,
    initialLoad: _react.PropTypes.bool,
    isReverse: _react.PropTypes.bool,
    loadMore: _react.PropTypes.func.isRequired,
    pageStart: _react.PropTypes.number,
    threshold: _react.PropTypes.number,
    useCapture: _react.PropTypes.bool,
    useWindow: _react.PropTypes.bool
};
InfiniteScroll.defaultProps = {
    element: 'div',
    hasMore: false,
    initialLoad: true,
    pageStart: 0,
    threshold: 250,
    useWindow: true,
    isReverse: false,
    useCapture: false
};
exports.default = InfiniteScroll;
module.exports = exports['default'];


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Nickname = __webpack_require__(89);

var _Nickname2 = _interopRequireDefault(_Nickname);

var _LoginBtn = __webpack_require__(88);

var _LoginBtn2 = _interopRequireDefault(_LoginBtn);

var _utilities = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return React.createElement(
				'header',
				{ className: 'header' },
				React.createElement(
					'div',
					{ className: 'header__nav container' },
					React.createElement(
						'ul',
						{ className: 'header__navigation_left' },
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ className: 'header__nav-item header__title', href: '#' },
								'ExSpotify'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'a',
								{ className: 'header__nav-item', href: '#' },
								'Help'
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'div',
								{ className: 'header__services-dropdown dropdown_no-arrow' },
								React.createElement(
									'div',
									{ className: 'header__dropdown-title dropdown-title' },
									React.createElement(
										'p',
										{ className: 'header__nav-item' },
										React.createElement('i', { className: 'fa fa-spotify fa-lg', 'aria-hidden': 'true' })
									),
									this.props.state.spotifyLogin && React.createElement('i', { className: 'fa fa-check-circle header__login-status', 'aria-hidden': 'true' })
								),
								this.props.state.spotifyLogin && React.createElement(
									'div',
									{ className: 'header__dropdown-content dropdown-content' },
									React.createElement(
										'ul',
										{ className: 'header__dropdown-options' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ className: 'header__dropdown-item', href: '#' },
												'Logout'
											)
										)
									)
								)
							)
						),
						React.createElement(
							'li',
							null,
							React.createElement(
								'div',
								{ className: 'header__services-dropdown dropdown_no-arrow' },
								React.createElement(
									'div',
									{ className: 'header__dropdown-title dropdown-title' },
									React.createElement(
										'p',
										{ className: 'header__nav-item', onClick: function onClick() {
												return !_this2.props.state.vkLogin && (0, _utilities.loginVk)(function (token) {
													return _this2.props.setLoginStatus({ vkLogin: token });
												});
											} },
										React.createElement('i', { className: 'fa fa-vk fa-lg', 'aria-hidden': 'true' })
									),
									this.props.state.vkLogin && React.createElement('i', { className: 'fa fa-check-circle header__login-status', 'aria-hidden': 'true' })
								),
								this.props.state.vkLogin && React.createElement(
									'div',
									{ className: 'header__dropdown-content dropdown-content' },
									React.createElement(
										'ul',
										{ className: 'header__dropdown-options' },
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ className: 'header__dropdown-item', href: '#', onClick: function onClick() {
														return window.location.replace(_utilities.PROJECT_URL + "auth/vk/logout?url=" + (0, _utilities.getExtensionUrl)());
													} },
												'Logout'
											)
										)
									)
								)
							)
						)
					),
					this.props.state.spotifyLogin ? React.createElement(_Nickname2.default, { spotifyLogin: this.props.state.spotifyLogin }) : React.createElement(_LoginBtn2.default, null)
				)
			);
		}
	}]);

	return Header;
}(React.Component);

exports.default = Header;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(16);

var _MainHeader = __webpack_require__(90);

var _MainHeader2 = _interopRequireDefault(_MainHeader);

var _SongList = __webpack_require__(92);

var _SongList2 = _interopRequireDefault(_SongList);

var _PlaylistList = __webpack_require__(91);

var _PlaylistList2 = _interopRequireDefault(_PlaylistList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainSection = function (_React$Component) {
  _inherits(MainSection, _React$Component);

  function MainSection() {
    _classCallCheck(this, MainSection);

    var _this = _possibleConstructorReturn(this, (MainSection.__proto__ || Object.getPrototypeOf(MainSection)).call(this));

    _this.ajaxRequest = null;
    _this.state = {
      source: "library",
      library: {
        state: "playlist", //playlist, album, songs
        songlist: null,
        playlistList: null,
        albumList: null,
        playlistSonglist: null,
        albumSonglist: null,
        selectedPlaylist: null,
        selectedAlbum: null,
        selectionSet: {
          playlists: [
            // {
            //   index: 0,
            //   whole: false,
            //   items: []
            // }
          ]
        }
      },
      popular: {
        state: "intro",
        songlist: null
      },
      url: {
        state: "intro", //states: intro, loading, playlist
        songlist: null
      }
    };
    return _this;
  }

  _createClass(MainSection, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      chrome.cookies.get({
        url: "http://localhost",
        name: "access_token"
      }, function (cookie) {
        return cookie ? _this2.changeSource(null, "choose-library") : _this2.changeSource(null, "choose-url");
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      console.log("Now");
      console.log(this.state.library.selectionSet.playlists);
    }
  }, {
    key: 'getSelection',
    value: function getSelection(index) {
      return this.state.library.selectionSet.playlists.find(function (playlist) {
        return playlist.index == index;
      });
    }
  }, {
    key: 'setSelection',
    value: function setSelection(data) {
      switch (this.state.library.state) {
        case "playlist":
          // console.log("was");
          // console.log(this.state.library.selectionSet.playlists);
          if (data.whole || data.items) {
            this.setState({ library: Object.assign({}, this.state.library, { selectionSet: Object.assign({}, this.state.library.selectionSet, {
                  playlists: [].concat(_toConsumableArray(this.state.library.selectionSet.playlists), [data])
                }) }) });
          } else {
            var toRemove = this.state.library.selectionSet.playlists.indexOf(this.getSelection(data.index));
            var newList = this.state.library.selectionSet.playlists.slice();
            newList.splice(toRemove, 1);
            this.setState({ library: Object.assign({}, this.state.library, { selectionSet: Object.assign({}, this.state.library.selectionSet, {
                  playlists: newList
                }) }) });
          }
          break;
        case "album":

          break;
      }
    }
    //Source can be provided either by event object or string

  }, {
    key: 'changeSource',
    value: function changeSource(event, source) {
      var src = source || event.target.id;
      if (event) $(event.target).parents('.dropdown-content').removeClass('dropdown-content_active');
      switch (src) {
        case "choose-library":
          {
            this.setState({ source: "library" });
            break;
          }
        case "choose-popular":
          {
            this.setState({ source: "popular" });
            break;
          }
        case "choose-url":
          this.setState({ source: "url" });
          break;
        default:
      }
    }
    //TODO calculate window location

  }, {
    key: 'changeDest',
    value: function changeDest(event) {
      var _this3 = this;

      if (!this.props.state.vkLogin) {
        (0, _utilities.loginVk)(function (token) {
          _this3.props.setLoginStatus({ vkLogin: token });
        });
      }
      /*
      $.ajax({
        url: VK_AUDIO_URL,
        // xhrFields: {
        //   withCredentials: true
        // },
        method: "POST",
        // dataType: "text",
        data: {
          act: "edit_album_box",
          al: 1,
          album_id:0,
          oid: 70059105
        },
        success: (data) => {
          console.log("Got hash");
          console.log(data.substr(data.indexOf("hash")+7,18));
          var hash = data.substr(data.indexOf("hash")+7,18);
          $.ajax({
            url: VK_AUDIO_URL,
            // xhrFields: {
            //   withCredentials: true
            // },
            method: "POST",
            // dataType: "text",
            data: {
              Audios:"456239200,456239199",
              act:"save_album",
              al:1,
              album_id:0,
              gid:0,
              hash:hash,
              name:"Works"
            },
            success: () => {
              console.log("Created playlist");
            },
            error: () => {
              console.log("Error while creating");
            }
          });
        },
        error: () => {
          console.log("Error while getting");
        }
      });
      */

      var query = "ain't nothing";
      var aid;
      var oid;
      var hash;
      $.ajax({
        url: 'https://vk.com/search?c%5Bq%5D=' + query + '&c%5Bsection%5D=audio',
        success: function success(data) {
          console.log("loaded page");
          // console.log(data);
          var el = document.createElement('html');
          el.innerHTML = data;
          var parsed = JSON.parse(el.getElementsByClassName('audio_row')[0].dataset.audio);
          aid = parsed[0];
          oid = parsed[1];
          hash = parsed[13].substr(0, 18); //18
          console.log(parsed);
          console.log(hash);

          $.ajax({
            url: _utilities.VK_AUDIO_URL,
            // xhrFields: {
            //   withCredentials: true
            // },
            method: "POST",
            // dataType: "text",
            data: {
              act: "add",
              aid: aid,
              al: 1,
              gid: 0,
              hash: hash,
              oid: oid
            },
            success: function success() {
              console.log("Added song");
              window.open("https://vk.com/audio");
            },
            error: function error() {
              console.log("Error while adding");
            }
          });
        },
        error: function error() {
          console.log("Error while loading");
        }
      });
    }
  }, {
    key: 'changeUrl',
    value: function changeUrl() {
      this.setState({
        url: {
          state: "intro"
        }
      });
    }
  }, {
    key: 'selectLibrarySource',
    value: function selectLibrarySource(source) {
      this.setState({ library: Object.assign({}, this.state.library, { state: source }) });
    }
  }, {
    key: 'setPlaylistList',
    value: function setPlaylistList(list, isAppend) {
      if (isAppend) this.setState({ library: Object.assign({}, this.state.library, { playlistList: Object.assign({}, this.state.library.playlistList, {
            items: [].concat(_toConsumableArray(this.state.library.playlistList.items), _toConsumableArray(list.items)),
            next: list.next
          }) }) });else this.setState({ library: Object.assign({}, this.state.library, {
          playlistList: list,
          selectedPlaylist: 0
        }) });
    }
  }, {
    key: 'setAlbumList',
    value: function setAlbumList(list, isAppend) {
      if (isAppend) this.setState({ library: Object.assign({}, this.state.library, { albumList: Object.assign({}, this.state.library.albumList, {
            items: [].concat(_toConsumableArray(this.state.library.albumList.items), _toConsumableArray(list.items)),
            next: list.next
          }) }) });else this.setState({ library: Object.assign({}, this.state.library, {
          albumList: list,
          selectedAlbum: 0
        }) });
    }
  }, {
    key: 'setPlaylistSonglist',
    value: function setPlaylistSonglist(list, isAppend) {
      if (isAppend) {
        this.setState({ library: Object.assign({}, this.state.library, { playlistSonglist: Object.assign({}, this.state.library.playlistSonglist, {
              items: [].concat(_toConsumableArray(this.state.library.playlistSonglist.items), _toConsumableArray(list.items)),
              next: list.next
            }) }) });
      } else {
        this.setState({ library: Object.assign({}, this.state.library, { playlistSonglist: list }) });
      }
    }
  }, {
    key: 'setAlbumSonglist',
    value: function setAlbumSonglist(list, isAppend) {
      if (isAppend) {
        this.setState({ library: Object.assign({}, this.state.library, { albumSonglist: Object.assign({}, this.state.library.albumSonglist, {
              items: [].concat(_toConsumableArray(this.state.library.albumSonglist.items), _toConsumableArray(list.items)),
              next: list.next
            }) }) });
      } else {
        this.setState({ library: Object.assign({}, this.state.library, { albumSonglist: list }) });
      }
    }
  }, {
    key: 'setSavedSonglist',
    value: function setSavedSonglist(list, isAppend) {
      if (isAppend) {
        this.setState({ library: Object.assign({}, this.state.library, { songlist: Object.assign({}, this.state.library.songlist, {
              items: [].concat(_toConsumableArray(this.state.library.songlist.items), _toConsumableArray(list.items)),
              next: list.next
            }) }) });
      } else {
        this.setState({ library: Object.assign({}, this.state.library, { songlist: list }) });
      }
    }
  }, {
    key: 'selectPlaylist',
    value: function selectPlaylist(index) {
      if (index != this.state.library.selectedPlaylist) {
        this.setState({ library: Object.assign({}, this.state.library, {
            playlistSonglist: null,
            selectedPlaylist: index
          }) });
      }
    }
  }, {
    key: 'selectAlbum',
    value: function selectAlbum(index) {
      if (index != this.state.library.selectedAlbum) {
        this.setState({ library: Object.assign({}, this.state.library, {
            albumSonglist: null,
            selectedAlbum: index
          }) });
      }
    }
  }, {
    key: 'parseUrl',
    value: function parseUrl(event) {
      event.preventDefault();
      var url = $('input[name="playlist-url"]').val();
      this.setState({
        url: {
          state: "loading"
        }
      });
      if (url) {
        var userId = url.match(/user\/(.*)\/playlist/)[1];
        var playlistId = url.match(/playlist\/(.*)$/)[1];
        var apiUrl = "https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId;
        this.getPublicPlaylist(apiUrl);
      }
    }
  }, {
    key: 'getPublicPlaylist',
    value: function getPublicPlaylist(playlistUrl) {
      var _this4 = this;

      this.ajaxRequest = $.ajax({
        url: "/get-playlist",
        data: {
          playlistUrl: playlistUrl
        }
      }).done(function (playlist) {
        console.log(playlist);
        _this4.setState({
          url: {
            state: "playlist",
            songlist: playlist
          }
        });
        // $(".content-header__url-playlist-name").text(playlist.name);
      }).fail(function (xhr, status, errorThrown) {
        _this4.setState({
          url: {
            state: "intro",
            songlist: null
          }
        });
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      });
    }
  }, {
    key: 'showPlaylists',
    value: function showPlaylists() {
      var _this5 = this;

      if (this.props.state.spotifyLogin) switch (this.state.source) {
        case "library":
          switch (this.state.library.state) {
            case "playlist":
              return React.createElement(_PlaylistList2.default, { setSelection: function setSelection(data, remove) {
                  return _this5.setSelection(data, remove);
                }, token: this.props.state.spotifyLogin, state: this.state, setPlaylistList: function setPlaylistList(list, isAppend) {
                  return _this5.setPlaylistList(list, isAppend);
                }, selectPlaylist: function selectPlaylist(indexx) {
                  return _this5.selectPlaylist(indexx);
                } });
            case "album":
              return React.createElement(_PlaylistList2.default, { setSelection: function setSelection(data, remove) {
                  return _this5.setSelection(data, remove);
                }, token: this.props.state.spotifyLogin, state: this.state, setAlbumList: function setAlbumList(list, isAppend) {
                  return _this5.setAlbumList(list, isAppend);
                }, selectAlbum: function selectAlbum(indexx) {
                  return _this5.selectAlbum(indexx);
                } });
          }
        default:
      }
      return null;
    }
  }, {
    key: 'showSongList',
    value: function showSongList() {
      var _this6 = this;

      if (!this.props.state.spotifyLogin && this.state.source != "url") return React.createElement(
        'h3',
        { className: 'main-section__status-message' },
        'You have to sign in'
      );
      switch (this.state.source) {
        case "url":
          switch (this.state.url.state) {
            case "intro":
              return React.createElement(
                'h3',
                { className: 'main-section__status-message' },
                'Insert playlist link into field above and click "Open"'
              );
            case "loading":
              return React.createElement(
                'h3',
                { className: 'main-section__status-message' },
                'Loading from URL...'
              );
            default:
              return React.createElement(_SongList2.default, { state: this.state });
          }
        case "library":
          switch (this.state.library.state) {
            case "playlist":
              return React.createElement(_SongList2.default, { setSelection: function setSelection(data, remove) {
                  return _this6.setSelection(data, remove);
                }, token: this.props.state.spotifyLogin, setPlaylistSonglist: function setPlaylistSonglist(list, isAppend) {
                  return _this6.setPlaylistSonglist(list, isAppend);
                }, state: this.state });
            case "album":
              return React.createElement(_SongList2.default, { setSelection: function setSelection(data, remove) {
                  return _this6.setSelection(data, remove);
                }, token: this.props.state.spotifyLogin, setAlbumSonglist: function setAlbumSonglist(list, isAppend) {
                  return _this6.setAlbumSonglist(list, isAppend);
                }, state: this.state });
            case "songs":
              return React.createElement(_SongList2.default, { setSelection: function setSelection(data, remove) {
                  return _this6.setSelection(data, remove);
                }, token: this.props.state.spotifyLogin, setSavedSonglist: function setSavedSonglist(list, isAppend) {
                  return _this6.setSavedSonglist(list, isAppend);
                }, state: this.state });
          }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      console.log("Main section render");
      return React.createElement(
        'main',
        { className: 'main' },
        React.createElement(_MainHeader2.default, { state: this.state, openUrlClick: function openUrlClick(event) {
            return _this7.parseUrl(event);
          }, changeSource: function changeSource(source) {
            return _this7.changeSource(source);
          }, changeDest: function changeDest(source) {
            return _this7.changeDest(source);
          }, changeUrl: function changeUrl() {
            return _this7.changeUrl();
          }, cancelRequest: function cancelRequest() {
            return _this7.ajaxRequest.abort();
          }, selectLibrarySource: function selectLibrarySource(s) {
            return _this7.selectLibrarySource(s);
          } }),
        React.createElement(
          'section',
          { className: 'main-section container' },
          this.showPlaylists(),
          this.showSongList()
        )
      );
    }
  }]);

  return MainSection;
}(React.Component);

exports.default = MainSection;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(13)))

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, React, ReactDOM) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Header = __webpack_require__(85);

var _Header2 = _interopRequireDefault(_Header);

var _MainSection = __webpack_require__(86);

var _MainSection2 = _interopRequireDefault(_MainSection);

var _utilities = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import React from 'react';
// import ReactDOM from 'react-dom';


$(document).ready(function () {
	$('.dropdown-title').hover(function () {
		$(this).siblings('.dropdown-content').addClass('dropdown-content_active');
		$(this).find('.dropdown-arrow').addClass('dropdown-arrow_active');
	}, function () {
		$(this).siblings('.dropdown-content').removeClass('dropdown-content_active');
		$(this).find('.dropdown-arrow').removeClass('dropdown-arrow_active');
	});
	$('.dropdown-content').hover(function () {
		$(this).siblings('.dropdown-title').find('.dropdown-arrow').addClass('dropdown-arrow_active');
		$(this).addClass('dropdown-content_active');
	}, function () {
		$(this).siblings('.dropdown-title').find('.dropdown-arrow').removeClass('dropdown-arrow_active');
		$(this).removeClass('dropdown-content_active');
	});
});

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

		_this.state = {
			spotifyLogin: null,
			vkLogin: null
		};
		return _this;
	}

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			chrome.cookies.get({ url: "http://localhost", name: "vk_access_token" }, function (cookie) {
				return _this2.setState({ vkLogin: cookie ? cookie.value : null });
			});
			chrome.cookies.get({ url: "http://localhost", name: "access_token" }, function (cookie) {
				return _this2.setState({ spotifyLogin: cookie ? cookie.value : null });
			});
			chrome.cookies.onChanged.addListener(function (info) {
				switch (info.cookie.name) {
					case "access_token":
						info.cause != "overwrite" && _this2.setState({ spotifyLogin: info.removed ? null : info.cookie.value });
						break;
					case "vk_access_token":
						info.cause != "overwrite" && _this2.setState({ vkLogin: info.removed ? null : info.cookie.value });
						break;
				}
			});
		}
	}, {
		key: 'setLoginStatus',
		value: function setLoginStatus(status) {
			this.setState(status);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				{ id: 'react-container' },
				React.createElement(_Header2.default, { setLoginStatus: function setLoginStatus(status) {
						return _this3.setLoginStatus(status);
					}, state: this.state }),
				React.createElement(_MainSection2.default, { setLoginStatus: function setLoginStatus(status) {
						return _this3.setLoginStatus(status);
					}, state: this.state })
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("react-app"));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(7), __webpack_require__(28)))

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginBtn = function (_React$Component) {
	_inherits(LoginBtn, _React$Component);

	function LoginBtn() {
		_classCallCheck(this, LoginBtn);

		return _possibleConstructorReturn(this, (LoginBtn.__proto__ || Object.getPrototypeOf(LoginBtn)).call(this));
	}

	_createClass(LoginBtn, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"a",
				{ className: "header__nav-item header__login-btn", href: _utilities.PROJECT_URL + "login?url=" + (0, _utilities.getExtensionUrl)() },
				"Login with Spotify"
			);
		}
	}]);

	return LoginBtn;
}(React.Component);

exports.default = LoginBtn;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, $) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(16);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nickname = function (_React$Component) {
	_inherits(Nickname, _React$Component);

	function Nickname() {
		_classCallCheck(this, Nickname);

		var _this = _possibleConstructorReturn(this, (Nickname.__proto__ || Object.getPrototypeOf(Nickname)).call(this));

		_this.state = {
			loaded: false
		};
		return _this;
	}

	_createClass(Nickname, [{
		key: 'getUserData',
		value: function getUserData() {
			var _this2 = this;

			$.ajax({
				url: 'https://api.spotify.com/v1/me',
				headers: {
					'Authorization': 'Bearer ' + this.props.spotifyLogin
				}
			}).done(function (data) {
				_this2.setState({
					loaded: true,
					name: data.display_name ? data.display_name : data.id,
					imgUrl: data.images[0].url
				});
				// this.props.setUserId(data.id);
			}).fail(function (xhr, status, errorThrown) {
				(0, _utilities.refreshToken)(function () {
					return _this2.getUserData();
				});
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.getUserData();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			$('.dropdown-title').hover(function () {
				$(this).siblings('.dropdown-content').addClass('dropdown-content_active');
				$(this).find('.dropdown-arrow').addClass('dropdown-arrow_active');
			}, function () {
				$(this).siblings('.dropdown-content').removeClass('dropdown-content_active');
				$(this).find('.dropdown-arrow').removeClass('dropdown-arrow_active');
			});
			$('.dropdown-content').hover(function () {
				$(this).siblings('.dropdown-title').find('.dropdown-arrow').addClass('dropdown-arrow_active');
				$(this).addClass('dropdown-content_active');
			}, function () {
				$(this).siblings('.dropdown-title').find('.dropdown-arrow').removeClass('dropdown-arrow_active');
				$(this).removeClass('dropdown-content_active');
			});
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.state.loaded) return React.createElement(
				'div',
				{ className: 'header__navigation_right header__nickname-dropdown dropdown' },
				React.createElement(
					'div',
					{ className: 'header__dropdown-title dropdown-title' },
					React.createElement('div', { className: 'header__profile-picture-wrapper', style: {
							backgroundImage: "url(" + this.state.imgUrl + ")"
						} }),
					React.createElement(
						'p',
						{ className: 'header__nav-item' },
						this.state.name
					),
					React.createElement('div', { className: 'header__dropdown-arrow dropdown-arrow' })
				),
				React.createElement(
					'div',
					{ className: 'header__dropdown-content dropdown-content' },
					React.createElement(
						'ul',
						{ className: 'header__dropdown-options' },
						React.createElement(
							'li',
							{ className: 'header__dropdown-item' },
							'Settings'
						),
						React.createElement(
							'li',
							{ className: 'header__dropdown-item', onClick: function onClick() {
									return window.location.replace(_utilities.PROJECT_URL + "logout?url=" + (0, _utilities.getExtensionUrl)());
								} },
							'Logout'
						)
					)
				)
			);else return null;
		}
	}]);

	return Nickname;
}(React.Component);

exports.default = Nickname;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(13)))

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UrlInputBox = __webpack_require__(94);

var _UrlInputBox2 = _interopRequireDefault(_UrlInputBox);

var _UrlPlaylistName = __webpack_require__(95);

var _UrlPlaylistName2 = _interopRequireDefault(_UrlPlaylistName);

var _LibrarySources = __webpack_require__(93);

var _LibrarySources2 = _interopRequireDefault(_LibrarySources);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MainHeader = function (_React$Component) {
	_inherits(MainHeader, _React$Component);

	function MainHeader() {
		_classCallCheck(this, MainHeader);

		return _possibleConstructorReturn(this, (MainHeader.__proto__ || Object.getPrototypeOf(MainHeader)).call(this));
	}

	_createClass(MainHeader, [{
		key: 'selectSourceOption',
		value: function selectSourceOption() {
			var _this2 = this;

			switch (this.props.state.source) {
				case "library":
					return React.createElement(_LibrarySources2.default, { libraryState: this.props.state.library, selectLibrarySource: function selectLibrarySource(s) {
							return _this2.props.selectLibrarySource(s);
						} });
					break;
				case "popular":
					return null;
					break;
				case "url":
					switch (this.props.state.url.state) {
						case "intro":
							return React.createElement(_UrlInputBox2.default, { openUrlClick: function openUrlClick(event) {
									return _this2.props.openUrlClick(event);
								} });
							break;
						case "loading":
							return React.createElement(_UrlPlaylistName2.default, { onClick: function onClick() {
									return _this2.props.cancelRequest();
								} });
							break;
						case "playlist":
							return React.createElement(_UrlPlaylistName2.default, { playlistName: this.props.state.url.songlist.name, onClick: function onClick() {
									return _this2.props.changeUrl();
								} });
							break;
						default:

					}
					break;
				default:

			}
		}
	}, {
		key: 'getSourceName',
		value: function getSourceName() {
			switch (this.props.state.source) {
				case "library":
					return "Library";
					break;
				case "popular":
					return "Popular";
					break;
				case "url":
					return "Playlist URL";
			}
		}
		// getDestName() {
		// 	switch (this.props.state.dest) {
		// 		case "vk":
		// 			return "VK";
		// 			break;
		// 		case "popular":
		// 			return "Popular";
		// 			break;
		// 		case "url":
		// 			return "Playlist URL"
		// 	}
		// }

	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'section',
				{ className: 'content-header' },
				React.createElement(
					'div',
					{ className: 'header__nav container' },
					React.createElement(
						'div',
						{ className: 'flex-item' },
						React.createElement(
							'div',
							{ className: 'content-header__source-wrapper' },
							React.createElement(
								'div',
								{ className: 'content-header__source-dropdown dropdown' },
								React.createElement(
									'div',
									{ className: 'content-header__dropdown-title dropdown-title' },
									React.createElement(
										'p',
										{ id: 'current-source', className: 'content-header__nav-item' },
										'From: ',
										this.getSourceName()
									),
									React.createElement('div', { className: 'header__dropdown-arrow dropdown-arrow' })
								),
								React.createElement(
									'div',
									{ className: 'content-header__dropdown-content dropdown-content' },
									React.createElement(
										'ul',
										{ className: 'content-header__dropdown-options' },
										React.createElement(
											'li',
											{ id: 'choose-library', className: 'content-header__dropdown-item', onClick: function onClick(event) {
													return _this3.props.changeSource(event);
												} },
											'Library'
										),
										React.createElement(
											'li',
											{ id: 'choose-popular', className: 'content-header__dropdown-item', onClick: function onClick(event) {
													return _this3.props.changeSource(event);
												} },
											'Popular'
										),
										React.createElement(
											'li',
											{ id: 'choose-url', className: 'content-header__dropdown-item', onClick: function onClick(event) {
													return _this3.props.changeSource(event);
												} },
											'URL'
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'content-header__source-options' },
						this.selectSourceOption()
					),
					React.createElement(
						'div',
						{ className: 'flex-item' },
						React.createElement(
							'div',
							{ className: 'content-header__dest-wrapper' },
							React.createElement(
								'div',
								{ className: 'content-header__source-dropdown dropdown' },
								React.createElement(
									'div',
									{ className: 'content-header__dropdown-title dropdown-title' },
									React.createElement(
										'p',
										{ id: 'current-source', className: 'content-header__nav-item' },
										'Convert to'
									),
									React.createElement('div', { className: 'header__dropdown-arrow dropdown-arrow' })
								),
								React.createElement(
									'div',
									{ className: 'content-header__dropdown-content dropdown-content' },
									React.createElement(
										'ul',
										{ className: 'content-header__dropdown-options' },
										React.createElement(
											'li',
											{ id: 'choose-library', className: 'content-header__dropdown-item', onClick: function onClick(event) {
													return _this3.props.changeDest(event);
												} },
											'VK'
										),
										React.createElement(
											'li',
											{ id: 'choose-popular', className: 'content-header__dropdown-item' },
											'Youtube'
										),
										React.createElement(
											'li',
											{ id: 'choose-url', className: 'content-header__dropdown-item' },
											'Google Play Music'
										)
									)
								)
							)
						)
					)
				)
			);
		}
	}]);

	return MainHeader;
}(React.Component);

exports.default = MainHeader;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, $) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(16);

var _reactCustomScroll = __webpack_require__(59);

var _reactCustomScroll2 = _interopRequireDefault(_reactCustomScroll);

var _reactInfiniteScroller = __webpack_require__(81);

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlaylistList = function (_React$Component) {
	_inherits(PlaylistList, _React$Component);

	function PlaylistList() {
		_classCallCheck(this, PlaylistList);

		return _possibleConstructorReturn(this, (PlaylistList.__proto__ || Object.getPrototypeOf(PlaylistList)).call(this));
	}

	_createClass(PlaylistList, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (nextProps.state.source == this.props.state.source && nextProps.state.library.state == this.props.state.library.state) {
				switch (this.props.state.library.state) {
					case "playlist":
						if (JSON.stringify(nextProps.state.library.playlistList) == JSON.stringify(this.props.state.library.playlistList)) return false;
						break;
					case "album":
						if (JSON.stringify(nextProps.state.library.albumList) == JSON.stringify(this.props.state.library.albumList)) return false;
						break;
				}
			}
			return true;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.setListeners();
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.setListeners();
		}
	}, {
		key: 'setListeners',
		value: function setListeners() {
			// $('.main-section__playlist-summary').click(function(event) {
			//
			//
			// });
			// $('.main-section__playlists-checkbox-label').click(function(event) {
			// 	event.stopPropagation();
			// });
			// $('.main-section__playlists-checkbox').change(function(event) {
			// 	if ($(this).parent().hasClass('main-section__playlist-summary_active'))
			// 		if ($(this).prop("checked"))
			// 			$('.main-section__song-checkbox').prop("checked", true);
			// 		else
			// 			$('.main-section__song-checkbox').prop("checked", false);
			// 		}
			// 	);
		}
	}, {
		key: 'getUserPlaylists',
		value: function getUserPlaylists(isAppend) {
			var _this2 = this;

			$.ajax({
				url: isAppend ? this.props.state.library.playlistList.next : 'https://api.spotify.com/v1/me/playlists',
				headers: {
					'Authorization': 'Bearer ' + this.props.token
				}
			}).done(function (list) {
				_this2.props.setPlaylistList(list, isAppend);
			}).fail(function (xhr, status, errorThrown) {
				(0, _utilities.refreshToken)(function () {
					return _this2.getUserPlaylists(isAppend);
				});
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});
		}
	}, {
		key: 'getUserAlbums',
		value: function getUserAlbums(isAppend) {
			var _this3 = this;

			$.ajax({
				url: isAppend ? this.props.state.library.albumList.next : 'https://api.spotify.com/v1/me/albums',
				headers: {
					'Authorization': 'Bearer ' + this.props.token
				}
			}).done(function (list) {
				_this3.props.setAlbumList(list, isAppend);
			}).fail(function (xhr, status, errorThrown) {
				(0, _utilities.refreshToken)(function () {
					return _this3.getUserAlbums(isAppend);
				});
				console.log("Error: " + errorThrown);
				console.log("Status: " + status);
				console.dir(xhr);
			});
		}
	}, {
		key: 'playlistClick',
		value: function playlistClick(event, index) {
			if (!event.target.classList.contains("main-section__playlists-checkbox") && !event.target.classList.contains("main-section__playlists-checkbox-label")) {
				$('.main-section__playlist-summary').removeClass("main-section__playlist-summary_active");
				$(event.target).closest(".main-section__playlist-summary").addClass('main-section__playlist-summary_active');
				this.props.selectPlaylist(index);
			}
		}
	}, {
		key: 'setSelection',
		value: function setSelection(e, index) {
			if (e.target.checked) {
				this.props.setSelection({
					index: index,
					whole: true
				});
				// console.log("Found");
			} else {
				// console.log("Not Found");
				this.props.setSelection({
					index: index,
					whole: false
				});
			}
		}
	}, {
		key: 'parsePlaylist',
		value: function parsePlaylist(playlist, isActive) {
			var _this4 = this;

			var index = this.props.state.library.playlistList.items.indexOf(playlist);
			return React.createElement(
				'div',
				{ key: playlist.id, className: "main-section__playlist-summary" + (isActive ? " main-section__playlist-summary_active" : ""), onClick: function onClick(e) {
						return _this4.playlistClick(e, index);
					} },
				React.createElement('img', { className: 'main-section__playlist-cover', src: playlist.images.length ? playlist.images[0].url : "img/album art.jpg", alt: 'Album cover' }),
				React.createElement(
					'div',
					{ className: 'main-section__playlist-text' },
					React.createElement(
						'h3',
						{ className: 'main-section__playlist-name' },
						playlist.name
					),
					React.createElement(
						'h4',
						{ className: 'main-section__playlist-author' },
						'by ',
						playlist.owner.id
					)
				),
				React.createElement('input', { id: playlist.id, className: 'main-section__playlists-checkbox css-checkbox', type: 'checkbox', onChange: function onChange(e) {
						return _this4.setSelection(e, index);
					} }),
				React.createElement('label', { className: 'main-section__playlists-checkbox-label css-label', htmlFor: playlist.id })
			);
		}
	}, {
		key: 'renderList',
		value: function renderList(playlistList) {
			var _this5 = this;

			var playlists = [];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = playlistList.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var playlist = _step.value;

					if (playlistList.items.indexOf(playlist) == this.props.state.library.selectedPlaylist) {
						playlists.push(this.parsePlaylist(playlist, true));
					} else playlists.push(this.parsePlaylist(playlist));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return (
				// <CustomScroll heightRelativeToParent="100%" onScroll={() => console.log(document.getElementsByClassName('main-section__playlists-list')[0].scrollHeight)}>

				React.createElement(
					'aside',
					{ ref: 'test', className: 'main-section__playlists-list' },
					React.createElement(
						_reactInfiniteScroller2.default,
						{
							pageStart: 0,
							loadMore: function loadMore() {
								return _this5.getUserPlaylists(true);
							},
							hasMore: (0, _utilities.hasMore)(this.props.state.library.playlistList),
							loader: React.createElement(
								'div',
								{ className: 'loader' },
								'Loading ...'
							),
							useWindow: false
						},
						playlists
					)
				)
				// </CustomScroll>

			);
		}
	}, {
		key: 'parseAlbum',
		value: function parseAlbum(a, isActive) {
			var _this6 = this;

			var index = this.props.state.library.albumList.items.indexOf(a);
			var album = a.album;
			return React.createElement(
				'div',
				{ key: album.id, className: "main-section__playlist-summary" + (isActive ? " main-section__playlist-summary_active" : ""), onClick: function onClick() {
						return _this6.props.selectAlbum(index);
					} },
				React.createElement('img', { className: 'main-section__playlist-cover', src: album.images.length > 2 ? album.images[2].url : album.images[0].url, alt: 'Album cover' }),
				React.createElement(
					'div',
					{ className: 'main-section__playlist-text' },
					React.createElement(
						'h3',
						{ className: 'main-section__playlist-name' },
						album.name
					),
					React.createElement(
						'h4',
						{ className: 'main-section__playlist-author' },
						album.artists[0].name
					)
				),
				React.createElement('input', { id: album.id, className: 'main-section__playlists-checkbox css-checkbox', type: 'checkbox' }),
				React.createElement('label', { className: 'main-section__playlists-checkbox-label css-label', htmlFor: album.id })
			);
		}
	}, {
		key: 'renderAlbumList',
		value: function renderAlbumList(albumList) {
			var _this7 = this;

			var albums = [];
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = albumList.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var album = _step2.value;

					if (albumList.items.indexOf(album) == this.props.state.library.selectedAlbum) {
						albums.push(this.parseAlbum(album, true));
					} else albums.push(this.parseAlbum(album));
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			return (
				// <CustomScroll heightRelativeToParent="100%">
				React.createElement(
					'aside',
					{ className: 'main-section__playlists-list' },
					React.createElement(
						_reactInfiniteScroller2.default,
						{
							pageStart: 0,
							loadMore: function loadMore() {
								return _this7.getUserAlbums(true);
							},
							hasMore: (0, _utilities.hasMore)(this.props.state.library.albumList),
							loader: React.createElement(
								'div',
								{ className: 'loader' },
								'Loading ...'
							),
							useWindow: false
						},
						albums
					)
				)
				// </CustomScroll>

			);
		}
	}, {
		key: 'render',
		value: function render() {
			console.log("PlaylistList render");
			// console.log(this.props.state.library);
			switch (this.props.state.library.state) {
				case "playlist":
					if (this.props.state.library.playlistList == null) {
						this.getUserPlaylists();
						return React.createElement(
							'h3',
							{ className: 'main-section__playlists-status' },
							'Loading playlists...'
						);
					}
					return this.renderList(this.props.state.library.playlistList);
					break;
				case "album":
					if (this.props.state.library.albumList == null) {
						this.getUserAlbums();
						return React.createElement(
							'h3',
							{ className: 'main-section__playlists-status' },
							'Loading albums...'
						);
					}
					return this.renderAlbumList(this.props.state.library.albumList);
					break;
			}
		}
	}]);

	return PlaylistList;
}(React.Component);

exports.default = PlaylistList;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(13)))

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, $) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(16);

var _reactInfiniteScroller = __webpack_require__(81);

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

var _reactCustomScroll = __webpack_require__(59);

var _reactCustomScroll2 = _interopRequireDefault(_reactCustomScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SongList = function (_React$Component) {
  _inherits(SongList, _React$Component);

  function SongList() {
    _classCallCheck(this, SongList);

    return _possibleConstructorReturn(this, (SongList.__proto__ || Object.getPrototypeOf(SongList)).call(this));
  }

  _createClass(SongList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      switch (this.props.state.library.state) {
        case "playlist":
          if (this.props.state.library.playlistSonglist) if ($('.main-section__playlist-summary').eq(this.props.state.library.selectedPlaylist).find(".main-section__playlists-checkbox").prop("checked")) $('.main-section__song-checkbox').prop("checked", true);
          break;
        case "album":
          if (this.props.state.library.albumSonglist) if ($('.main-section__playlist-summary').eq(this.props.state.library.selectedAlbum).find(".main-section__playlists-checkbox").prop("checked")) $('.main-section__song-checkbox').prop("checked", true);
          break;
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.state.source == this.props.state.source) {
        if (JSON.stringify(nextProps.state.library) == JSON.stringify(this.props.state.library)) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'songClickListener',
    value: function songClickListener(e, id) {
      var checkbox = document.getElementById(id).firstChild.firstChild;
      if (e.target.className == "main-section__song-checkbox") {
        if (checkbox.checked) {
          if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album") && this.isAllSongsChecked()) document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = true;
        } else {
          if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album")) document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = false;
        }
      } else {
        checkbox.checked = !checkbox.checked;
        if (!checkbox.checked) {
          if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album")) document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = false;
        } else {
          if (this.props.state.source == "library" && (this.props.state.library.state == "playlist" || this.props.state.library.state == "album") && this.isAllSongsChecked()) document.getElementsByClassName('main-section__playlist-summary_active')[0].childNodes[2].checked = true;
        }
      }
    }

    // setListeners() {
    // 	$('.main-section__song-row').click(function(event) {
    // 		$(this).find('.main-section__song-checkbox').trigger('change');
    // 	});
    // 	$('.main-section__song-checkbox').change((event) => {
    // 		if ($(event.target).is(':checked')) {
    // 			$(event.target).prop('checked', false);
    // 			if (this.props.state.source == "playlist")
    // 				$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', false);
    // 			}
    // 		else {
    // 			$(event.target).prop("checked", true);
    // 			if (this.props.state.source == "playlist" && this.isAllSongsChecked())
    // 				$('.main-section__playlist-summary_active').find('.main-section__playlists-checkbox').prop('checked', true);
    // 			}
    // 		});
    // }

  }, {
    key: 'isAllSongsChecked',
    value: function isAllSongsChecked() {
      var songs = document.getElementsByClassName('main-section__song-checkbox');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = songs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var song = _step.value;

          if (!song.checked) return false;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: 'getPlaylist',
    value: function getPlaylist(playlist, isAppend) {
      var _this2 = this;

      $.ajax({
        url: isAppend ? this.props.state.library.playlistSonglist.next : 'https://api.spotify.com/v1/users/' + playlist.owner.id + '/playlists/' + playlist.id + '/tracks',
        headers: {
          'Authorization': 'Bearer ' + this.props.token
        }
      }).done(function (songs) {
        _this2.props.setPlaylistSonglist(songs, isAppend);
      }).fail(function (xhr, status, errorThrown) {
        (0, _utilities.refreshToken)(function () {
          return _this2.getPlaylist(playlist, isAppend);
        });
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      });
    }
  }, {
    key: 'getAlbum',
    value: function getAlbum(albumId, isAppend) {
      var _this3 = this;

      $.ajax({
        url: isAppend ? this.props.state.library.albumSonglist.next : 'https://api.spotify.com/v1/albums/' + albumId + '/tracks'
      }).done(function (songs) {
        _this3.props.setAlbumSonglist(songs, isAppend);
      }).fail(function (xhr, status, errorThrown) {
        (0, _utilities.refreshToken)(function () {
          return _this3.getAlbum(albumId, isAppend);
        });
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      });
    }
  }, {
    key: 'getSavedSongs',
    value: function getSavedSongs(isAppend) {
      var _this4 = this;

      $.ajax({
        url: isAppend ? this.props.state.library.songlist.next : 'https://api.spotify.com/v1/me/tracks',
        headers: {
          'Authorization': 'Bearer ' + this.props.token
        }
      }).done(function (songs) {
        console.log(songs);
        _this4.props.setSavedSonglist(songs, isAppend);
      }).fail(function (xhr, status, errorThrown) {
        (0, _utilities.refreshToken)(function () {
          return _this4.getSavedSongs(isAppend);
        });
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      });
    }
  }, {
    key: 'convertDuration',
    value: function convertDuration(ms) {
      var mins = Math.floor(ms / 1000 / 60);
      var secs = ms % (1000 * 60);
      return mins + ':' + secs.toString().substring(0, 2);
    }
  }, {
    key: 'parseArtists',
    value: function parseArtists(song) {
      var artists = "";
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = song.artists[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var artist = _step2.value;

          artists += artist.name;
          if (song.artists.indexOf(artist) != song.artists.length - 1) artists += ", ";
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return artists;
    }
  }, {
    key: 'parseSong',
    value: function parseSong(song) {
      var _this5 = this;

      return React.createElement(
        'li',
        { key: song.id, id: song.id, className: 'main-section__songs-row', onClick: function onClick(e) {
            return _this5.songClickListener(e, song.id);
          } },
        React.createElement(
          'div',
          { className: 'main-section__songs-col main-section__check-col' },
          React.createElement('input', { id: 'input', className: 'main-section__song-checkbox', type: 'checkbox' })
        ),
        React.createElement(
          'div',
          { className: "main-section__songs-col " + (this.props.state.library.state != "album" ? "main-section__song-col" : "main-section__song-wide-col") },
          song.name
        ),
        React.createElement(
          'div',
          { className: 'main-section__songs-col main-section__artist-col' },
          this.parseArtists(song)
        ),
        this.props.state.library.state != "album" && React.createElement(
          'div',
          { className: 'main-section__songs-col main-section__album-col' },
          song.album.name
        ),
        React.createElement(
          'div',
          { className: 'main-section__songs-col main-section__duration-col' },
          this.convertDuration(song.duration_ms)
        )
      );
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      switch (this.props.state.library.state) {
        case "playlist":
          this.getPlaylist(this.props.state.library.playlistList.items[this.props.state.library.selectedPlaylist], true);
          break;
        case "album":
          this.getAlbum(this.props.state.library.albumList.items[this.props.state.library.selectedAlbum].album.id, true);
          break;
        case "songs":
          this.getSavedSongs(true);
          break;
      }
    }
  }, {
    key: 'hasMore',
    value: function hasMore() {
      switch (this.props.state.library.state) {
        case "playlist":
          return (0, _utilities.hasMore)(this.props.state.library.playlistSonglist);
          break;
        case "album":
          return (0, _utilities.hasMore)(this.props.state.library.albumSonglist);
          break;
        case "songs":
          return (0, _utilities.hasMore)(this.props.state.library.songlist);
          break;
      }
    }
  }, {
    key: 'renderPlaylist',
    value: function renderPlaylist(playlist) {
      var _this6 = this;

      var songs = [];
      var list = this.props.state.library.state == "songs" ? playlist.items : playlist.items;
      if (this.props.state.source == "url") list = playlist.tracks.items;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var song = _step3.value;

          if (this.props.state.library.state == "album") songs.push(this.parseSong(song));else songs.push(this.parseSong(song.track));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return React.createElement(
        'section',
        { className: 'main-section__songs' },
        React.createElement(
          'div',
          { className: 'main-section__songs-header main-section__songs-row' },
          React.createElement(
            'div',
            { className: 'main-section__songs-col main-section__check-col' },
            'C'
          ),
          React.createElement(
            'div',
            { className: "main-section__songs-col " + (this.props.state.library.state != "album" ? "main-section__song-col" : "main-section__song-wide-col") },
            'Song'
          ),
          React.createElement(
            'div',
            { className: 'main-section__songs-col main-section__artist-col' },
            'Artist'
          ),
          this.props.state.library.state != "album" && React.createElement(
            'div',
            { className: 'main-section__songs-col main-section__album-col' },
            'Album'
          ),
          React.createElement(
            'div',
            { className: 'main-section__songs-col main-section__duration-col' },
            'Duration'
          )
        ),
        React.createElement(
          'ul',
          { className: 'main-section__songs-list' },
          React.createElement(
            _reactInfiniteScroller2.default,
            { pageStart: 0, loadMore: function loadMore() {
                return _this6.loadMore();
              }, hasMore: this.hasMore(), loader: React.createElement(
                'div',
                { className: 'loader main-section__songs-row' },
                ' Loading ...'
              ), useWindow: false },
            songs
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      console.log("SongList render!!!!!!!");
      switch (this.props.state.source) {

        case "url":
          return this.renderPlaylist(this.props.state.url.songlist);
        case "library":
          switch (this.props.state.library.state) {
            case "playlist":
              if (!this.props.state.library.playlistSonglist) {
                if (this.props.state.library.playlistList) this.getPlaylist(this.props.state.library.playlistList.items[this.props.state.library.selectedPlaylist]);
                return React.createElement(
                  'h3',
                  { className: 'main-section__status-message' },
                  'Loading songs...'
                );
              }
              return this.renderPlaylist(this.props.state.library.playlistSonglist);
            case "album":
              if (!this.props.state.library.albumSonglist) {
                if (this.props.state.library.albumList) this.getAlbum(this.props.state.library.albumList.items[this.props.state.library.selectedAlbum].album.id);
                return React.createElement(
                  'h3',
                  { className: 'main-section__status-message' },
                  'Loading songs...'
                );
              }
              return this.renderPlaylist(this.props.state.library.albumSonglist);
            case "songs":
              if (!this.props.state.library.songlist) {
                this.getSavedSongs();
                return React.createElement(
                  'h3',
                  { className: 'main-section__status-message' },
                  'Loading songs...'
                );
              }
              return this.renderPlaylist(this.props.state.library.songlist);
          }
        default:
          return React.createElement(
            'h3',
            null,
            'Undefined'
          );
      }
    }
  }]);

  return SongList;
}(React.Component);

exports.default = SongList;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(13)))

/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React, $) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LibrarySources = function (_React$Component) {
	_inherits(LibrarySources, _React$Component);

	function LibrarySources(props) {
		_classCallCheck(this, LibrarySources);

		return _possibleConstructorReturn(this, (LibrarySources.__proto__ || Object.getPrototypeOf(LibrarySources)).call(this, props));
	}

	_createClass(LibrarySources, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			$('.content-header__library-source').click(function (event) {
				switch (event.target.id) {
					case "choose-playlists":
						_this2.props.selectLibrarySource("playlist");
						break;
					case "choose-albums":
						_this2.props.selectLibrarySource("album");
						break;

					case "choose-songs":
						_this2.props.selectLibrarySource("songs");
						break;

					default:
				}
			});
		}
	}, {
		key: "isActive",
		value: function isActive(source) {
			var value;
			this.props.libraryState.state == source ? value = " content-header__library-source_active" : value = "";
			return value;
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "content-header__library-source-wrapper" },
				React.createElement(
					"ul",
					null,
					React.createElement(
						"li",
						{ id: "choose-playlists", className: "content-header__nav-item content-header__library-source" + this.isActive("playlist") },
						"Playlists"
					),
					React.createElement(
						"li",
						{ id: "choose-albums", className: "content-header__nav-item content-header__library-source" + this.isActive("album") },
						"Albums"
					),
					React.createElement(
						"li",
						{ id: "choose-songs", className: "content-header__nav-item content-header__library-source" + this.isActive("songs") },
						"Songs"
					)
				)
			);
		}
	}]);

	return LibrarySources;
}(React.Component);

exports.default = LibrarySources;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7), __webpack_require__(13)))

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import React from 'react';
// import ReactDOM from 'react-dom';
var UrlInputBox = function (_React$Component) {
	_inherits(UrlInputBox, _React$Component);

	function UrlInputBox() {
		_classCallCheck(this, UrlInputBox);

		var _this = _possibleConstructorReturn(this, (UrlInputBox.__proto__ || Object.getPrototypeOf(UrlInputBox)).call(this));

		_this.state = {
			value: ''
		};
		_this.handleChange = _this.handleChange.bind(_this);
		return _this;
	}

	_createClass(UrlInputBox, [{
		key: "handleChange",
		value: function handleChange(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"form",
				{ className: "content-header__url-source-wrapper transition", onSubmit: function onSubmit(event) {
						return _this2.props.openUrlClick(event);
					} },
				React.createElement("input", { className: "content-header__url-input", type: "text", name: "playlist-url", value: this.state.value, onChange: this.handleChange, placeholder: "Playlist url" }),
				React.createElement("input", { type: "submit", value: "Open", id: "open-url-btn", className: "content-header__url-button" })
			);
		}
	}]);

	return UrlInputBox;
}(React.Component);

exports.default = UrlInputBox;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(React) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UrlPlaylistName = function (_React$Component) {
	_inherits(UrlPlaylistName, _React$Component);

	function UrlPlaylistName() {
		_classCallCheck(this, UrlPlaylistName);

		return _possibleConstructorReturn(this, (UrlPlaylistName.__proto__ || Object.getPrototypeOf(UrlPlaylistName)).call(this));
	}

	_createClass(UrlPlaylistName, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			return React.createElement(
				"div",
				{ className: "content-header__url-playlist-wrapper" },
				React.createElement(
					"h3",
					{ className: "content-header__nav-item content-header__url-playlist-name" },
					this.props.playlistName ? this.props.playlistName : "Loading..."
				),
				React.createElement(
					"a",
					{ id: "change-url-btn", className: "content-header__url-button", onClick: function onClick() {
							return _this2.props.onClick();
						} },
					this.props.playlistName ? "Close" : "Cancel"
				)
			);
		}
	}]);

	return UrlPlaylistName;
}(React.Component);

exports.default = UrlPlaylistName;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ })

},[87]);