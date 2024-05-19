"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["/public/assets/js/script"],{

/***/ "./static-resources/js/components/three_application.js":
/*!*************************************************************!*\
  !*** ./static-resources/js/components/three_application.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var ThreeApp = /*#__PURE__*/function () {
  // キーの押下状態用フラグ

  /**
   * コンストラクタ
   * @constructor
   * @param {HTMLElement} wrapper - canvas 要素を append する親要素
   */
  function ThreeApp(wrapper) {
    var _this = this;
    _classCallCheck(this, ThreeApp);
    _defineProperty(this, "renderer", void 0);
    // レンダラ
    _defineProperty(this, "scene", void 0);
    // シーン
    _defineProperty(this, "camera", void 0);
    // カメラ
    _defineProperty(this, "directionalLight", void 0);
    // 平行光源（ディレクショナルライト）
    _defineProperty(this, "ambientLight", void 0);
    // 環境光（アンビエントライト）
    _defineProperty(this, "material", void 0);
    // マテリアル
    _defineProperty(this, "torusGeometry", void 0);
    // トーラスジオメトリ
    _defineProperty(this, "torusArray", void 0);
    // トーラスメッシュの配列 @@@
    _defineProperty(this, "controls", void 0);
    // オービットコントロール
    _defineProperty(this, "axesHelper", void 0);
    // 軸ヘルパー
    _defineProperty(this, "isDown", void 0);
    // レンダラー
    var color = new three__WEBPACK_IMPORTED_MODULE_0__.Color(ThreeApp.RENDERER_PARAM.clearColor);
    this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();
    this.renderer.setClearColor(color);
    this.renderer.setSize(ThreeApp.RENDERER_PARAM.width, ThreeApp.RENDERER_PARAM.height);
    wrapper.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();

    // カメラ
    this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(ThreeApp.CAMERA_PARAM.fovy, ThreeApp.CAMERA_PARAM.aspect, ThreeApp.CAMERA_PARAM.near, ThreeApp.CAMERA_PARAM.far);
    this.camera.position.copy(ThreeApp.CAMERA_PARAM.position);
    this.camera.lookAt(ThreeApp.CAMERA_PARAM.lookAt);

    // ディレクショナルライト（平行光源）
    this.directionalLight = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(ThreeApp.DIRECTIONAL_LIGHT_PARAM.color, ThreeApp.DIRECTIONAL_LIGHT_PARAM.intensity);
    this.directionalLight.position.copy(ThreeApp.DIRECTIONAL_LIGHT_PARAM.position);
    this.scene.add(this.directionalLight);

    // アンビエントライト（環境光）
    this.ambientLight = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(ThreeApp.AMBIENT_LIGHT_PARAM.color, ThreeApp.AMBIENT_LIGHT_PARAM.intensity);
    this.scene.add(this.ambientLight);

    // マテリアル
    this.material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial(ThreeApp.MATERIAL_PARAM);

    // 共通のジオメトリ、マテリアルから、複数のメッシュインスタンスを作成する @@@
    var torusCount = 10;
    var transformScale = 5.0;
    this.torusGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(0.5, 0.2, 8, 16);
    this.torusArray = [];
    for (var i = 0; i < torusCount; ++i) {
      // トーラスメッシュのインスタンスを生成
      var torus = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(this.torusGeometry, this.material);
      // 座標をランダムに散らす
      torus.position.x = (Math.random() * 2.0 - 1.0) * transformScale;
      torus.position.y = (Math.random() * 2.0 - 1.0) * transformScale;
      torus.position.z = (Math.random() * 2.0 - 1.0) * transformScale;
      // シーンに追加する
      this.scene.add(torus);
      // 配列に入れておく
      this.torusArray.push(torus);
    }

    // 軸ヘルパー
    var axesBarLength = 5.0;
    this.axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(axesBarLength);
    this.scene.add(this.axesHelper);

    // コントロール
    this.controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(this.camera, this.renderer.domElement);

    // this のバインド
    this.render = this.render.bind(this);

    // キーの押下状態を保持するフラグ
    this.isDown = false;

    // キーの押下や離す操作を検出できるようにする
    window.addEventListener('keydown', function (keyEvent) {
      switch (keyEvent.key) {
        case ' ':
          _this.isDown = true;
          break;
        default:
      }
    }, false);
    window.addEventListener('keyup', function (keyEvent) {
      _this.isDown = false;
    }, false);

    // ウィンドウのリサイズを検出できるようにする
    window.addEventListener('resize', function () {
      _this.renderer.setSize(window.innerWidth, window.innerHeight);
      _this.camera.aspect = window.innerWidth / window.innerHeight;
      _this.camera.updateProjectionMatrix();
    }, false);
  }

  /**
   * 描画処理
   */
  _createClass(ThreeApp, [{
    key: "render",
    value: function render() {
      // 恒常ループの設定
      requestAnimationFrame(this.render);

      // コントロールを更新
      this.controls.update();

      // フラグに応じてオブジェクトの状態を変化させる
      if (this.isDown === true) {
        // Y 軸回転 @@@
        this.torusArray.forEach(function (torus) {
          torus.rotation.y += 0.05;
        });
      }

      // レンダラーで描画
      this.renderer.render(this.scene, this.camera);
    }
  }]);
  return ThreeApp;
}();
/**
 * カメラ定義のための定数
 */
_defineProperty(ThreeApp, "CAMERA_PARAM", {
  // fovy は Field of View Y のことで、縦方向の視野角を意味する
  fovy: 60,
  // 描画する空間のアスペクト比（縦横比）
  aspect: window.innerWidth / window.innerHeight,
  // 描画する空間のニアクリップ面（最近面）
  near: 0.1,
  // 描画する空間のファークリップ面（最遠面）
  far: 20.0,
  // カメラの座標
  position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0.0, 2.0, 10.0),
  // カメラの注視点
  lookAt: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0.0, 0.0, 0.0)
});
/**
 * レンダラー定義のための定数
 */
_defineProperty(ThreeApp, "RENDERER_PARAM", {
  clearColor: 0x666666,
  // 画面をクリアする色
  width: window.innerWidth,
  // レンダラーに設定する幅
  height: window.innerHeight // レンダラーに設定する高さ
});
/**
 * 平行光源定義のための定数
 */
_defineProperty(ThreeApp, "DIRECTIONAL_LIGHT_PARAM", {
  color: 0xffffff,
  // 光の色
  intensity: 1.0,
  // 光の強度
  position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1.0, 1.0, 1.0) // 光の向き
});
/**
 * アンビエントライト定義のための定数
 */
_defineProperty(ThreeApp, "AMBIENT_LIGHT_PARAM", {
  color: 0xffffff,
  // 光の色
  intensity: 0.1 // 光の強度
});
/**
 * マテリアル定義のための定数
 */
_defineProperty(ThreeApp, "MATERIAL_PARAM", {
  color: 0x3399ff // マテリアルの基本色
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThreeApp);

/***/ }),

/***/ "./static-resources/js/script.js":
/*!***************************************!*\
  !*** ./static-resources/js/script.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/stable */ "./node_modules/core-js/stable/index.js");
/* harmony import */ var core_js_stable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_stable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_three_application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/three_application */ "./static-resources/js/components/three_application.js");



window.addEventListener('DOMContentLoaded', function () {
  var wrapper = document.querySelector('#webgl');
  var app = new _components_three_application__WEBPACK_IMPORTED_MODULE_2__["default"](wrapper);
  app.render();
}, false);

/***/ }),

/***/ "./static-resources/sass/style.scss":
/*!******************************************!*\
  !*** ./static-resources/sass/style.scss ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["public/assets/css/style","/public/assets/js/vendor"], () => (__webpack_exec__("./static-resources/js/script.js"), __webpack_exec__("./static-resources/sass/style.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLElBQUk1QiwwQ0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUU7QUFDOUMsQ0FBQztBQUNEO0FBQ0Y7QUFDQTtBQUZFTSxlQUFBLENBbENJSixRQUFRLHlCQXFDaUI7RUFDM0JLLEtBQUssRUFBRSxRQUFRO0VBQUU7RUFDakIyQixTQUFTLEVBQUUsR0FBRyxDQUFHO0FBQ25CLENBQUM7QUFDRDtBQUNGO0FBQ0E7QUFGRTVCLGVBQUEsQ0F6Q0lKLFFBQVEsb0JBNENZO0VBQ3RCSyxLQUFLLEVBQUUsUUFBUSxDQUFFO0FBQ25CLENBQUM7O0FBc0lILGlFQUFlTCxRQUFROzs7Ozs7Ozs7Ozs7Ozs7O0FDdkxBO0FBQ2E7QUFFaUI7QUFFckQ2RCxNQUFNLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBTTdELE9BQU8sR0FBRzBFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUNoRCxJQUFNQyxHQUFHLEdBQUcsSUFBSTdFLHFFQUFRLENBQUNDLE9BQU8sQ0FBQztFQUNqQzRFLEdBQUcsQ0FBQ25CLE1BQU0sQ0FBQyxDQUFDO0FBQ2QsQ0FBQyxFQUFFLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7QUNUVCIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3N0YXRpYy1yZXNvdXJjZXMvanMvY29tcG9uZW50cy90aHJlZV9hcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMtcmVzb3VyY2VzL2pzL3NjcmlwdC5qcyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMtcmVzb3VyY2VzL3Nhc3Mvc3R5bGUuc2Nzcz8zNTFiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scy5qcyc7XG5cbmNsYXNzIFRocmVlQXBwIHtcbiAgLyoqXG4gICAqIOOCq+ODoeODqeWumue+qeOBruOBn+OCgeOBruWumuaVsFxuICAgKi9cbiAgc3RhdGljIENBTUVSQV9QQVJBTSA9IHtcbiAgICAvLyBmb3Z5IOOBryBGaWVsZCBvZiBWaWV3IFkg44Gu44GT44Go44Gn44CB57im5pa55ZCR44Gu6KaW6YeO6KeS44KS5oSP5ZGz44GZ44KLXG4gICAgZm92eTogNjAsXG4gICAgLy8g5o+P55S744GZ44KL56m66ZaT44Gu44Ki44K544Oa44Kv44OI5q+U77yI57im5qiq5q+U77yJXG4gICAgYXNwZWN0OiB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAvLyDmj4/nlLvjgZnjgovnqbrplpPjga7jg4vjgqLjgq/jg6rjg4Pjg5fpnaLvvIjmnIDov5HpnaLvvIlcbiAgICBuZWFyOiAwLjEsXG4gICAgLy8g5o+P55S744GZ44KL56m66ZaT44Gu44OV44Kh44O844Kv44Oq44OD44OX6Z2i77yI5pyA6YGg6Z2i77yJXG4gICAgZmFyOiAyMC4wLFxuICAgIC8vIOOCq+ODoeODqeOBruW6p+aomVxuICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDIuMCwgMTAuMCksXG4gICAgLy8g44Kr44Oh44Op44Gu5rOo6KaW54K5XG4gICAgbG9va0F0OiBuZXcgVEhSRUUuVmVjdG9yMygwLjAsIDAuMCwgMC4wKSxcbiAgfTtcbiAgLyoqXG4gICAqIOODrOODs+ODgOODqeODvOWumue+qeOBruOBn+OCgeOBruWumuaVsFxuICAgKi9cbiAgc3RhdGljIFJFTkRFUkVSX1BBUkFNID0ge1xuICAgIGNsZWFyQ29sb3I6IDB4NjY2NjY2LCAgICAgICAvLyDnlLvpnaLjgpLjgq/jg6rjgqLjgZnjgovoibJcbiAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsICAgLy8g44Os44Oz44OA44Op44O844Gr6Kit5a6a44GZ44KL5bmFXG4gICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsIC8vIOODrOODs+ODgOODqeODvOOBq+ioreWumuOBmeOCi+mrmOOBlVxuICB9O1xuICAvKipcbiAgICog5bmz6KGM5YWJ5rqQ5a6a576p44Gu44Gf44KB44Gu5a6a5pWwXG4gICAqL1xuICBzdGF0aWMgRElSRUNUSU9OQUxfTElHSFRfUEFSQU0gPSB7XG4gICAgY29sb3I6IDB4ZmZmZmZmLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhYnjga7oibJcbiAgICBpbnRlbnNpdHk6IDEuMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOWFieOBruW8t+W6plxuICAgIHBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMygxLjAsIDEuMCwgMS4wKSwgLy8g5YWJ44Gu5ZCR44GNXG4gIH07XG4gIC8qKlxuICAgKiDjgqLjg7Pjg5Pjgqjjg7Pjg4jjg6njgqTjg4jlrprnvqnjga7jgZ/jgoHjga7lrprmlbBcbiAgICovXG4gIHN0YXRpYyBBTUJJRU5UX0xJR0hUX1BBUkFNID0ge1xuICAgIGNvbG9yOiAweGZmZmZmZiwgLy8g5YWJ44Gu6ImyXG4gICAgaW50ZW5zaXR5OiAwLjEsICAvLyDlhYnjga7lvLfluqZcbiAgfTtcbiAgLyoqXG4gICAqIOODnuODhuODquOCouODq+Wumue+qeOBruOBn+OCgeOBruWumuaVsFxuICAgKi9cbiAgc3RhdGljIE1BVEVSSUFMX1BBUkFNID0ge1xuICAgIGNvbG9yOiAweDMzOTlmZiwgLy8g44Oe44OG44Oq44Ki44Or44Gu5Z+65pys6ImyXG4gIH07XG5cbiAgcmVuZGVyZXI7ICAgICAgICAgLy8g44Os44Oz44OA44OpXG4gIHNjZW5lOyAgICAgICAgICAgIC8vIOOCt+ODvOODs1xuICBjYW1lcmE7ICAgICAgICAgICAvLyDjgqvjg6Hjg6lcbiAgZGlyZWN0aW9uYWxMaWdodDsgLy8g5bmz6KGM5YWJ5rqQ77yI44OH44Kj44Os44Kv44K344On44OK44Or44Op44Kk44OI77yJXG4gIGFtYmllbnRMaWdodDsgICAgIC8vIOeSsOWig+WFie+8iOOCouODs+ODk+OCqOODs+ODiOODqeOCpOODiO+8iVxuICBtYXRlcmlhbDsgICAgICAgICAvLyDjg57jg4bjg6rjgqLjg6tcbiAgdG9ydXNHZW9tZXRyeTsgICAgLy8g44OI44O844Op44K544K444Kq44Oh44OI44OqXG4gIHRvcnVzQXJyYXk7ICAgICAgIC8vIOODiOODvOODqeOCueODoeODg+OCt+ODpeOBrumFjeWIlyBAQEBcbiAgY29udHJvbHM7ICAgICAgICAgLy8g44Kq44O844OT44OD44OI44Kz44Oz44OI44Ot44O844OrXG4gIGF4ZXNIZWxwZXI7ICAgICAgIC8vIOi7uOODmOODq+ODkeODvFxuICBpc0Rvd247ICAgICAgICAgICAvLyDjgq3jg7zjga7mirzkuIvnirbmhYvnlKjjg5Xjg6njgrBcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB3cmFwcGVyIC0gY2FudmFzIOimgee0oOOCkiBhcHBlbmQg44GZ44KL6Kaq6KaB57SgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih3cmFwcGVyKSB7XG4gICAgLy8g44Os44Oz44OA44Op44O8XG4gICAgY29uc3QgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoVGhyZWVBcHAuUkVOREVSRVJfUEFSQU0uY2xlYXJDb2xvcik7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKGNvbG9yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoVGhyZWVBcHAuUkVOREVSRVJfUEFSQU0ud2lkdGgsIFRocmVlQXBwLlJFTkRFUkVSX1BBUkFNLmhlaWdodCk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgLy8g44K344O844OzXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgLy8g44Kr44Oh44OpXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICBUaHJlZUFwcC5DQU1FUkFfUEFSQU0uZm92eSxcbiAgICAgIFRocmVlQXBwLkNBTUVSQV9QQVJBTS5hc3BlY3QsXG4gICAgICBUaHJlZUFwcC5DQU1FUkFfUEFSQU0ubmVhcixcbiAgICAgIFRocmVlQXBwLkNBTUVSQV9QQVJBTS5mYXIsXG4gICAgKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KFRocmVlQXBwLkNBTUVSQV9QQVJBTS5wb3NpdGlvbik7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KFRocmVlQXBwLkNBTUVSQV9QQVJBTS5sb29rQXQpO1xuXG4gICAgLy8g44OH44Kj44Os44Kv44K344On44OK44Or44Op44Kk44OI77yI5bmz6KGM5YWJ5rqQ77yJXG4gICAgdGhpcy5kaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoXG4gICAgICBUaHJlZUFwcC5ESVJFQ1RJT05BTF9MSUdIVF9QQVJBTS5jb2xvcixcbiAgICAgIFRocmVlQXBwLkRJUkVDVElPTkFMX0xJR0hUX1BBUkFNLmludGVuc2l0eVxuICAgICk7XG4gICAgdGhpcy5kaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLmNvcHkoVGhyZWVBcHAuRElSRUNUSU9OQUxfTElHSFRfUEFSQU0ucG9zaXRpb24pO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWxMaWdodCk7XG5cbiAgICAvLyDjgqLjg7Pjg5Pjgqjjg7Pjg4jjg6njgqTjg4jvvIjnkrDlooPlhYnvvIlcbiAgICB0aGlzLmFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoXG4gICAgICBUaHJlZUFwcC5BTUJJRU5UX0xJR0hUX1BBUkFNLmNvbG9yLFxuICAgICAgVGhyZWVBcHAuQU1CSUVOVF9MSUdIVF9QQVJBTS5pbnRlbnNpdHksXG4gICAgKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnRMaWdodCk7XG5cbiAgICAvLyDjg57jg4bjg6rjgqLjg6tcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKFRocmVlQXBwLk1BVEVSSUFMX1BBUkFNKTtcblxuICAgIC8vIOWFsemAmuOBruOCuOOCquODoeODiOODquOAgeODnuODhuODquOCouODq+OBi+OCieOAgeikh+aVsOOBruODoeODg+OCt+ODpeOCpOODs+OCueOCv+ODs+OCueOCkuS9nOaIkOOBmeOCiyBAQEBcbiAgICBjb25zdCB0b3J1c0NvdW50ID0gMTA7XG4gICAgY29uc3QgdHJhbnNmb3JtU2NhbGUgPSA1LjA7XG4gICAgdGhpcy50b3J1c0dlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMC41LCAwLjIsIDgsIDE2KTtcbiAgICB0aGlzLnRvcnVzQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvcnVzQ291bnQ7ICsraSkge1xuICAgICAgLy8g44OI44O844Op44K544Oh44OD44K344Ol44Gu44Kk44Oz44K544K/44Oz44K544KS55Sf5oiQXG4gICAgICBjb25zdCB0b3J1cyA9IG5ldyBUSFJFRS5NZXNoKHRoaXMudG9ydXNHZW9tZXRyeSwgdGhpcy5tYXRlcmlhbCk7XG4gICAgICAvLyDluqfmqJnjgpLjg6njg7Pjg4Djg6DjgavmlaPjgonjgZlcbiAgICAgIHRvcnVzLnBvc2l0aW9uLnggPSAoTWF0aC5yYW5kb20oKSAqIDIuMCAtIDEuMCkgKiB0cmFuc2Zvcm1TY2FsZTtcbiAgICAgIHRvcnVzLnBvc2l0aW9uLnkgPSAoTWF0aC5yYW5kb20oKSAqIDIuMCAtIDEuMCkgKiB0cmFuc2Zvcm1TY2FsZTtcbiAgICAgIHRvcnVzLnBvc2l0aW9uLnogPSAoTWF0aC5yYW5kb20oKSAqIDIuMCAtIDEuMCkgKiB0cmFuc2Zvcm1TY2FsZTtcbiAgICAgIC8vIOOCt+ODvOODs+OBq+i/veWKoOOBmeOCi1xuICAgICAgdGhpcy5zY2VuZS5hZGQodG9ydXMpO1xuICAgICAgLy8g6YWN5YiX44Gr5YWl44KM44Gm44GK44GPXG4gICAgICB0aGlzLnRvcnVzQXJyYXkucHVzaCh0b3J1cyk7XG4gICAgfVxuXG4gICAgLy8g6Lu444OY44Or44OR44O8XG4gICAgY29uc3QgYXhlc0Jhckxlbmd0aCA9IDUuMDtcbiAgICB0aGlzLmF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcihheGVzQmFyTGVuZ3RoKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmF4ZXNIZWxwZXIpO1xuXG4gICAgLy8g44Kz44Oz44OI44Ot44O844OrXG4gICAgdGhpcy5jb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgLy8gdGhpcyDjga7jg5DjgqTjg7Pjg4lcbiAgICB0aGlzLnJlbmRlciA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICAvLyDjgq3jg7zjga7mirzkuIvnirbmhYvjgpLkv53mjIHjgZnjgovjg5Xjg6njgrBcbiAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xuXG4gICAgLy8g44Kt44O844Gu5oq85LiL44KE6Zui44GZ5pON5L2c44KS5qSc5Ye644Gn44GN44KL44KI44GG44Gr44GZ44KLXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoa2V5RXZlbnQpID0+IHtcbiAgICAgIHN3aXRjaCAoa2V5RXZlbnQua2V5KSB7XG4gICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgIHRoaXMuaXNEb3duID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGtleUV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIOOCpuOCo+ODs+ODieOCpuOBruODquOCteOCpOOCuuOCkuaknOWHuuOBp+OBjeOCi+OCiOOBhuOBq+OBmeOCi1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG4gICAgICB0aGlzLmNhbWVyYS5hc3BlY3QgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICog5o+P55S75Yem55CGXG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgLy8g5oGS5bi444Or44O844OX44Gu6Kit5a6aXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcblxuICAgIC8vIOOCs+ODs+ODiOODreODvOODq+OCkuabtOaWsFxuICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAvLyDjg5Xjg6njgrDjgavlv5zjgZjjgabjgqrjg5bjgrjjgqfjgq/jg4jjga7nirbmhYvjgpLlpInljJbjgZXjgZvjgotcbiAgICBpZiAodGhpcy5pc0Rvd24gPT09IHRydWUpIHtcbiAgICAgIC8vIFkg6Lu45Zue6LuiIEBAQFxuICAgICAgdGhpcy50b3J1c0FycmF5LmZvckVhY2goKHRvcnVzKSA9PiB7XG4gICAgICAgIHRvcnVzLnJvdGF0aW9uLnkgKz0gMC4wNTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIOODrOODs+ODgOODqeODvOOBp+aPj+eUu1xuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaHJlZUFwcDsiLCJpbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIlxuXG5pbXBvcnQgVGhyZWVBcHAgZnJvbSAnLi9jb21wb25lbnRzL3RocmVlX2FwcGxpY2F0aW9uJ1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3ZWJnbCcpO1xuICBjb25zdCBhcHAgPSBuZXcgVGhyZWVBcHAod3JhcHBlcik7XG4gIGFwcC5yZW5kZXIoKTtcbn0sIGZhbHNlKTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiVEhSRUUiLCJPcmJpdENvbnRyb2xzIiwiVGhyZWVBcHAiLCJ3cmFwcGVyIiwiX3RoaXMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydHkiLCJjb2xvciIsIkNvbG9yIiwiUkVOREVSRVJfUEFSQU0iLCJjbGVhckNvbG9yIiwicmVuZGVyZXIiLCJXZWJHTFJlbmRlcmVyIiwic2V0Q2xlYXJDb2xvciIsInNldFNpemUiLCJ3aWR0aCIsImhlaWdodCIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsInNjZW5lIiwiU2NlbmUiLCJjYW1lcmEiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIkNBTUVSQV9QQVJBTSIsImZvdnkiLCJhc3BlY3QiLCJuZWFyIiwiZmFyIiwicG9zaXRpb24iLCJjb3B5IiwibG9va0F0IiwiZGlyZWN0aW9uYWxMaWdodCIsIkRpcmVjdGlvbmFsTGlnaHQiLCJESVJFQ1RJT05BTF9MSUdIVF9QQVJBTSIsImludGVuc2l0eSIsImFkZCIsImFtYmllbnRMaWdodCIsIkFtYmllbnRMaWdodCIsIkFNQklFTlRfTElHSFRfUEFSQU0iLCJtYXRlcmlhbCIsIk1lc2hQaG9uZ01hdGVyaWFsIiwiTUFURVJJQUxfUEFSQU0iLCJ0b3J1c0NvdW50IiwidHJhbnNmb3JtU2NhbGUiLCJ0b3J1c0dlb21ldHJ5IiwiVG9ydXNHZW9tZXRyeSIsInRvcnVzQXJyYXkiLCJpIiwidG9ydXMiLCJNZXNoIiwieCIsIk1hdGgiLCJyYW5kb20iLCJ5IiwieiIsInB1c2giLCJheGVzQmFyTGVuZ3RoIiwiYXhlc0hlbHBlciIsIkF4ZXNIZWxwZXIiLCJjb250cm9scyIsInJlbmRlciIsImJpbmQiLCJpc0Rvd24iLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwia2V5RXZlbnQiLCJrZXkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiX2NyZWF0ZUNsYXNzIiwidmFsdWUiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ1cGRhdGUiLCJmb3JFYWNoIiwicm90YXRpb24iLCJWZWN0b3IzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwIl0sInNvdXJjZVJvb3QiOiIifQ==