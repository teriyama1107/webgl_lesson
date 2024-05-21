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
    _defineProperty(this, "particlesGeometry", void 0);
    // トーラスジオメトリ
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
    this.particlesGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
    var count = 10000;
    var colorArray = new Float32Array(count * 3);
    var positionArray = new Float32Array(count * 3);
    var velocityArray = new Float32Array(count);
    for (var i = 0; i < count; ++i) {
      // 座標をランダムに散らす
      positionArray[i] = (Math.random() - 0.5) * 50;
      positionArray[i + 1] = (Math.random() - 0.5) * 50;
      positionArray[i + 2] = (Math.random() - 0.5) * 50;
      colorArray[i] = Math.random();
      colorArray[i + 1] = Math.random();
      colorArray[i + 2] = Math.random();
      velocityArray[i] = Math.random() * 0.02 + 0.01;
    }

    //ジオメトリ
    this.particlesGeometry.setAttribute("position",
    //この3というのはx,y,zの位置座標。
    new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(positionArray, 3));

    //カラー
    this.particlesGeometry.setAttribute("color",
    //この3というのはx,y,zの位置座標。
    new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(colorArray, 3));
    this.particlesGeometry.setAttribute('velocity', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(velocityArray, 1));

    //マテリアル
    var PointsMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.PointsMaterial({
      //つぶつぶのサイズ
      size: 0.08,
      vertexColors: true,
      //カラーを有効にする
      blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
      //加算合成 パーティクルが重なるところが光る。
      transparent: true
    });
    // 軸ヘルパー
    var axesBarLength = 5.0;
    this.axesHelper = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(axesBarLength);
    this.scene.add(this.axesHelper);

    //メッシュ化
    //第一引数にはジオメトリ、第二引数にはマテリアル
    var particles = new three__WEBPACK_IMPORTED_MODULE_0__.Points(this.particlesGeometry, PointsMaterial);
    this.scene.add(particles);
    // コントロール
    this.controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_1__.OrbitControls(this.camera, this.renderer.domElement);

    // this のバインド
    this.render = this.render.bind(this);

    // キーの押下状態を保持するフラグ
    this.isstart = false;
    document.body.addEventListener('click', function () {
      _this.isstart = !_this.isstart; // クリック時にフラグを切り替え
    });

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
      requestAnimationFrame(this.render);
      var positionAttribute = this.particlesGeometry.getAttribute('position');
      var velocityAttribute = this.particlesGeometry.getAttribute('velocity');
      var posArray = positionAttribute.array;
      var velArray = velocityAttribute.array;
      for (var i = 0; i < posArray.length; i += 3) {
        if (this.isstart) {
          posArray[i + 2] += velArray[i / 3] * 10;
        } else {
          posArray[i + 2] += velArray[i / 3];
        }
        if (posArray[i + 2] > 50) {
          posArray[i + 2] = -50;
        }
      }
      positionAttribute.needsUpdate = true;
      this.controls.update();
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
  position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0.0, 1.0, 1.0),
  // カメラの注視点
  lookAt: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0.0, 0.0, 0.0)
});
/**
 * レンダラー定義のための定数
 */
_defineProperty(ThreeApp, "RENDERER_PARAM", {
  clearColor: 0x000000,
  // 画面をクリアする色
  width: window.innerWidth,
  // レンダラーに設定する幅
  height: window.innerHeight // レンダラーに設定する高さ
});
/**
 * 平行光源定義のための定数
 */
_defineProperty(ThreeApp, "DIRECTIONAL_LIGHT_PARAM", {
  color: 0x000000,
  // 光の色
  intensity: 4.0,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU0sRUFBRXdELE1BQU0sQ0FBQ0UsV0FBVyxDQUFFO0FBQzlCLENBQUM7QUFDRDtBQUNGO0FBQ0E7QUFGRXBFLGVBQUEsQ0ExQklKLFFBQVEsNkJBNkJxQjtFQUMvQkssS0FBSyxFQUFFLFFBQVE7RUFBNkI7RUFDNUMyQixTQUFTLEVBQUUsR0FBRztFQUE4QjtFQUM1Q04sUUFBUSxFQUFFLElBQUk1QiwwQ0FBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUU7QUFDOUMsQ0FBQztBQUNEO0FBQ0Y7QUFDQTtBQUZFTSxlQUFBLENBbENJSixRQUFRLHlCQXFDaUI7RUFDM0JLLEtBQUssRUFBRSxRQUFRO0VBQUU7RUFDakIyQixTQUFTLEVBQUUsR0FBRyxDQUFHO0FBQ25CLENBQUM7QUFDRDtBQUNGO0FBQ0E7QUFGRTVCLGVBQUEsQ0F6Q0lKLFFBQVEsb0JBNENZO0VBQ3RCSyxLQUFLLEVBQUUsUUFBUSxDQUFFO0FBQ25CLENBQUM7O0FBZ0tILGlFQUFlTCxRQUFROzs7Ozs7Ozs7Ozs7Ozs7O0FDak5BO0FBQ2E7QUFFaUI7QUFFckRzRSxNQUFNLENBQUNELGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBTXBFLE9BQU8sR0FBR2tFLFFBQVEsQ0FBQ3FCLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDaEQsSUFBTUMsR0FBRyxHQUFHLElBQUl6RixxRUFBUSxDQUFDQyxPQUFPLENBQUM7RUFDakN3RixHQUFHLENBQUN6QixNQUFNLENBQUMsQ0FBQztBQUNkLENBQUMsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7O0FDVFQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdGF0aWMtcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvdGhyZWVfYXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljLXJlc291cmNlcy9qcy9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljLXJlc291cmNlcy9zYXNzL3N0eWxlLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gJ3RocmVlL2V4YW1wbGVzL2pzbS9jb250cm9scy9PcmJpdENvbnRyb2xzLmpzJztcblxuY2xhc3MgVGhyZWVBcHAge1xuICAvKipcbiAgICog44Kr44Oh44Op5a6a576p44Gu44Gf44KB44Gu5a6a5pWwXG4gICAqL1xuICBzdGF0aWMgQ0FNRVJBX1BBUkFNID0ge1xuICAgIC8vIGZvdnkg44GvIEZpZWxkIG9mIFZpZXcgWSDjga7jgZPjgajjgafjgIHnuKbmlrnlkJHjga7oppbph47op5LjgpLmhI/lkbPjgZnjgotcbiAgICBmb3Z5OiA2MCxcbiAgICAvLyDmj4/nlLvjgZnjgovnqbrplpPjga7jgqLjgrnjg5rjgq/jg4jmr5TvvIjnuKbmqKrmr5TvvIlcbiAgICBhc3BlY3Q6IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0LFxuICAgIC8vIOaPj+eUu+OBmeOCi+epuumWk+OBruODi+OCouOCr+ODquODg+ODl+mdou+8iOacgOi/kemdou+8iVxuICAgIG5lYXI6IDAuMSxcbiAgICAvLyDmj4/nlLvjgZnjgovnqbrplpPjga7jg5XjgqHjg7zjgq/jg6rjg4Pjg5fpnaLvvIjmnIDpgaDpnaLvvIlcbiAgICBmYXI6IDIwLjAsXG4gICAgLy8g44Kr44Oh44Op44Gu5bqn5qiZXG4gICAgcG9zaXRpb246IG5ldyBUSFJFRS5WZWN0b3IzKDAuMCwgMS4wLCAxLjApLFxuICAgIC8vIOOCq+ODoeODqeOBruazqOimlueCuVxuICAgIGxvb2tBdDogbmV3IFRIUkVFLlZlY3RvcjMoMC4wLCAwLjAsIDAuMCksXG4gIH07XG4gIC8qKlxuICAgKiDjg6zjg7Pjg4Djg6njg7zlrprnvqnjga7jgZ/jgoHjga7lrprmlbBcbiAgICovXG4gIHN0YXRpYyBSRU5ERVJFUl9QQVJBTSA9IHtcbiAgICBjbGVhckNvbG9yOiAweDAwMDAwMCwgICAgICAgLy8g55S76Z2i44KS44Kv44Oq44Ki44GZ44KL6ImyXG4gICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCAgIC8vIOODrOODs+ODgOODqeODvOOBq+ioreWumuOBmeOCi+W5hVxuICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LCAvLyDjg6zjg7Pjg4Djg6njg7zjgavoqK3lrprjgZnjgovpq5jjgZVcbiAgfTtcbiAgLyoqXG4gICAqIOW5s+ihjOWFiea6kOWumue+qeOBruOBn+OCgeOBruWumuaVsFxuICAgKi9cbiAgc3RhdGljIERJUkVDVElPTkFMX0xJR0hUX1BBUkFNID0ge1xuICAgIGNvbG9yOiAweDAwMDAwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5YWJ44Gu6ImyXG4gICAgaW50ZW5zaXR5OiA0LjAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhYnjga7lvLfluqZcbiAgICBwb3NpdGlvbjogbmV3IFRIUkVFLlZlY3RvcjMoMS4wLCAxLjAsIDEuMCksIC8vIOWFieOBruWQkeOBjVxuICB9O1xuICAvKipcbiAgICog44Ki44Oz44OT44Ko44Oz44OI44Op44Kk44OI5a6a576p44Gu44Gf44KB44Gu5a6a5pWwXG4gICAqL1xuICBzdGF0aWMgQU1CSUVOVF9MSUdIVF9QQVJBTSA9IHtcbiAgICBjb2xvcjogMHhmZmZmZmYsIC8vIOWFieOBruiJslxuICAgIGludGVuc2l0eTogMC4xLCAgLy8g5YWJ44Gu5by35bqmXG4gIH07XG4gIC8qKlxuICAgKiDjg57jg4bjg6rjgqLjg6vlrprnvqnjga7jgZ/jgoHjga7lrprmlbBcbiAgICovXG4gIHN0YXRpYyBNQVRFUklBTF9QQVJBTSA9IHtcbiAgICBjb2xvcjogMHgzMzk5ZmYsIC8vIOODnuODhuODquOCouODq+OBruWfuuacrOiJslxuICB9O1xuXG4gIHJlbmRlcmVyOyAgICAgICAgIC8vIOODrOODs+ODgOODqVxuICBzY2VuZTsgICAgICAgICAgICAvLyDjgrfjg7zjg7NcbiAgY2FtZXJhOyAgICAgICAgICAgLy8g44Kr44Oh44OpXG4gIGRpcmVjdGlvbmFsTGlnaHQ7IC8vIOW5s+ihjOWFiea6kO+8iOODh+OCo+ODrOOCr+OCt+ODp+ODiuODq+ODqeOCpOODiO+8iVxuICBhbWJpZW50TGlnaHQ7ICAgICAvLyDnkrDlooPlhYnvvIjjgqLjg7Pjg5Pjgqjjg7Pjg4jjg6njgqTjg4jvvIlcbiAgbWF0ZXJpYWw7ICAgICAgICAgLy8g44Oe44OG44Oq44Ki44OrXG4gIHBhcnRpY2xlc0dlb21ldHJ5OyAgICAvLyDjg4jjg7zjg6njgrnjgrjjgqrjg6Hjg4jjg6pcbiAgY29udHJvbHM7ICAgICAgICAgLy8g44Kq44O844OT44OD44OI44Kz44Oz44OI44Ot44O844OrXG4gIGF4ZXNIZWxwZXI7ICAgICAgIC8vIOi7uOODmOODq+ODkeODvFxuICBpc0Rvd247ICAgICAgICAgICAvLyDjgq3jg7zjga7mirzkuIvnirbmhYvnlKjjg5Xjg6njgrBcblxuICAvKipcbiAgICog44Kz44Oz44K544OI44Op44Kv44K/XG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB3cmFwcGVyIC0gY2FudmFzIOimgee0oOOCkiBhcHBlbmQg44GZ44KL6Kaq6KaB57SgXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih3cmFwcGVyKSB7XG4gICAgLy8g44Os44Oz44OA44Op44O8XG4gICAgY29uc3QgY29sb3IgPSBuZXcgVEhSRUUuQ29sb3IoVGhyZWVBcHAuUkVOREVSRVJfUEFSQU0uY2xlYXJDb2xvcik7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRDbGVhckNvbG9yKGNvbG9yKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUoVGhyZWVBcHAuUkVOREVSRVJfUEFSQU0ud2lkdGgsIFRocmVlQXBwLlJFTkRFUkVSX1BBUkFNLmhlaWdodCk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgLy8g44K344O844OzXG4gICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gICAgLy8g44Kr44Oh44OpXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICBUaHJlZUFwcC5DQU1FUkFfUEFSQU0uZm92eSxcbiAgICAgIFRocmVlQXBwLkNBTUVSQV9QQVJBTS5hc3BlY3QsXG4gICAgICBUaHJlZUFwcC5DQU1FUkFfUEFSQU0ubmVhcixcbiAgICAgIFRocmVlQXBwLkNBTUVSQV9QQVJBTS5mYXIsXG4gICAgKTtcbiAgICB0aGlzLmNhbWVyYS5wb3NpdGlvbi5jb3B5KFRocmVlQXBwLkNBTUVSQV9QQVJBTS5wb3NpdGlvbik7XG4gICAgdGhpcy5jYW1lcmEubG9va0F0KFRocmVlQXBwLkNBTUVSQV9QQVJBTS5sb29rQXQpO1xuXG4gICAgLy8g44OH44Kj44Os44Kv44K344On44OK44Or44Op44Kk44OI77yI5bmz6KGM5YWJ5rqQ77yJXG4gICAgdGhpcy5kaXJlY3Rpb25hbExpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoXG4gICAgICBUaHJlZUFwcC5ESVJFQ1RJT05BTF9MSUdIVF9QQVJBTS5jb2xvcixcbiAgICAgIFRocmVlQXBwLkRJUkVDVElPTkFMX0xJR0hUX1BBUkFNLmludGVuc2l0eVxuICAgICk7XG4gICAgdGhpcy5kaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLmNvcHkoVGhyZWVBcHAuRElSRUNUSU9OQUxfTElHSFRfUEFSQU0ucG9zaXRpb24pO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMuZGlyZWN0aW9uYWxMaWdodCk7XG5cbiAgICAvLyDjgqLjg7Pjg5Pjgqjjg7Pjg4jjg6njgqTjg4jvvIjnkrDlooPlhYnvvIlcbiAgICB0aGlzLmFtYmllbnRMaWdodCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoXG4gICAgICBUaHJlZUFwcC5BTUJJRU5UX0xJR0hUX1BBUkFNLmNvbG9yLFxuICAgICAgVGhyZWVBcHAuQU1CSUVOVF9MSUdIVF9QQVJBTS5pbnRlbnNpdHksXG4gICAgKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmFtYmllbnRMaWdodCk7XG5cbiAgICAvLyDjg57jg4bjg6rjgqLjg6tcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKFRocmVlQXBwLk1BVEVSSUFMX1BBUkFNKTtcblxuICAgIC8vIOWFsemAmuOBruOCuOOCquODoeODiOODquOAgeODnuODhuODquOCouODq+OBi+OCieOAgeikh+aVsOOBruODoeODg+OCt+ODpeOCpOODs+OCueOCv+ODs+OCueOCkuS9nOaIkOOBmeOCiyBAQEBcbiAgICB0aGlzLnBhcnRpY2xlc0dlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgY29uc3QgY291bnQgPSAxMDAwMDtcbiAgICBjb25zdCBjb2xvckFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xuICAgIGNvbnN0IHBvc2l0aW9uQXJyYXkgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7XG4gICAgY29uc3QgdmVsb2NpdHlBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkoY291bnQpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgKytpKSB7XG4gICAgICAvLyDluqfmqJnjgpLjg6njg7Pjg4Djg6DjgavmlaPjgonjgZlcbiAgICAgIHBvc2l0aW9uQXJyYXlbaV0gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA1MDtcbiAgICAgIHBvc2l0aW9uQXJyYXlbaSArIDFdID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNTA7XG4gICAgICBwb3NpdGlvbkFycmF5W2kgKyAyXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDUwO1xuICAgICAgY29sb3JBcnJheVtpXSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb2xvckFycmF5W2kgKyAxXSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICBjb2xvckFycmF5W2kgKyAyXSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICB2ZWxvY2l0eUFycmF5W2ldID0gTWF0aC5yYW5kb20oKSAqIDAuMDIgKyAwLjAxO1xuICAgIH1cblxuICAgIC8v44K444Kq44Oh44OI44OqXG4gICAgdGhpcy5wYXJ0aWNsZXNHZW9tZXRyeS5zZXRBdHRyaWJ1dGUoXG4gICAgICBcInBvc2l0aW9uXCIsLy/jgZPjga4z44Go44GE44GG44Gu44GveCx5LHrjga7kvY3nva7luqfmqJnjgIJcbiAgICAgIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocG9zaXRpb25BcnJheSwgMylcbiAgICApO1xuXG4gICAgLy/jgqvjg6njg7xcbiAgICB0aGlzLnBhcnRpY2xlc0dlb21ldHJ5LnNldEF0dHJpYnV0ZShcbiAgICAgIFwiY29sb3JcIiwvL+OBk+OBrjPjgajjgYTjgYbjga7jga94LHkseuOBruS9jee9ruW6p+aomeOAglxuICAgICAgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvckFycmF5LCAzKVxuICAgICk7XG5cbiAgICB0aGlzLnBhcnRpY2xlc0dlb21ldHJ5LnNldEF0dHJpYnV0ZShcbiAgICAgICd2ZWxvY2l0eScsXG4gICAgICBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlbG9jaXR5QXJyYXksIDEpXG4gICAgKTtcblxuICAgIC8v44Oe44OG44Oq44Ki44OrXG4gICAgY29uc3QgUG9pbnRzTWF0ZXJpYWwgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAvL+OBpOOBtuOBpOOBtuOBruOCteOCpOOCulxuICAgICAgc2l6ZTogMC4wOCxcbiAgICAgIHZlcnRleENvbG9yczogdHJ1ZSwgLy/jgqvjg6njg7zjgpLmnInlirnjgavjgZnjgotcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLCAvL+WKoOeul+WQiOaIkCDjg5Hjg7zjg4bjgqPjgq/jg6vjgYzph43jgarjgovjgajjgZPjgo3jgYzlhYnjgovjgIJcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIH0pO1xuICAgIC8vIOi7uOODmOODq+ODkeODvFxuICAgIGNvbnN0IGF4ZXNCYXJMZW5ndGggPSA1LjA7XG4gICAgdGhpcy5heGVzSGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoYXhlc0Jhckxlbmd0aCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5heGVzSGVscGVyKTtcblxuICAgIC8v44Oh44OD44K344Ol5YyWXG4gICAgLy/nrKzkuIDlvJXmlbDjgavjga/jgrjjgqrjg6Hjg4jjg6rjgIHnrKzkuozlvJXmlbDjgavjga/jg57jg4bjg6rjgqLjg6tcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKHRoaXMucGFydGljbGVzR2VvbWV0cnksIFBvaW50c01hdGVyaWFsKTtcbiAgICB0aGlzLnNjZW5lLmFkZChwYXJ0aWNsZXMpO1xuICAgIC8vIOOCs+ODs+ODiOODreODvOODq1xuICAgIHRoaXMuY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyh0aGlzLmNhbWVyYSwgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIC8vIHRoaXMg44Gu44OQ44Kk44Oz44OJXG4gICAgdGhpcy5yZW5kZXIgPSB0aGlzLnJlbmRlci5iaW5kKHRoaXMpO1xuXG4gICAgLy8g44Kt44O844Gu5oq85LiL54q25oWL44KS5L+d5oyB44GZ44KL44OV44Op44KwXG4gICAgdGhpcy5pc3N0YXJ0ID0gZmFsc2U7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5pc3N0YXJ0ID0gIXRoaXMuaXNzdGFydDsgLy8g44Kv44Oq44OD44Kv5pmC44Gr44OV44Op44Kw44KS5YiH44KK5pu/44GIXG4gICAgfSk7XG5cbiAgICAvLyDjgqbjgqPjg7Pjg4njgqbjga7jg6rjgrXjgqTjgrrjgpLmpJzlh7rjgafjgY3jgovjgojjgYbjgavjgZnjgotcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRTaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuICAgICAgdGhpcy5jYW1lcmEuYXNwZWN0ID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICB0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG4gIFxuICAvKipcbiAgICog5o+P55S75Yem55CGXG4gICAqL1xuICByZW5kZXIoKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKTtcblxuICAgIGNvbnN0IHBvc2l0aW9uQXR0cmlidXRlID0gdGhpcy5wYXJ0aWNsZXNHZW9tZXRyeS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7XG4gICAgY29uc3QgdmVsb2NpdHlBdHRyaWJ1dGUgPSB0aGlzLnBhcnRpY2xlc0dlb21ldHJ5LmdldEF0dHJpYnV0ZSgndmVsb2NpdHknKTtcbiAgICBjb25zdCBwb3NBcnJheSA9IHBvc2l0aW9uQXR0cmlidXRlLmFycmF5O1xuICAgIGNvbnN0IHZlbEFycmF5ID0gdmVsb2NpdHlBdHRyaWJ1dGUuYXJyYXk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc0FycmF5Lmxlbmd0aDsgaSArPSAzKSB7XG4gICAgICBpZiAodGhpcy5pc3N0YXJ0KSB7XG4gICAgICAgIHBvc0FycmF5W2kgKyAyXSArPSB2ZWxBcnJheVtpIC8gM10gKiAxMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvc0FycmF5W2kgKyAyXSArPSB2ZWxBcnJheVtpIC8gM107XG4gICAgICB9XG5cbiAgICAgIGlmIChwb3NBcnJheVtpICsgMl0gPiA1MCkge1xuICAgICAgICBwb3NBcnJheVtpICsgMl0gPSAtNTA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcG9zaXRpb25BdHRyaWJ1dGUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgdGhpcy5jb250cm9scy51cGRhdGUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGhyZWVBcHA7IiwiaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIlxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCJcblxuaW1wb3J0IFRocmVlQXBwIGZyb20gJy4vY29tcG9uZW50cy90aHJlZV9hcHBsaWNhdGlvbidcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd2ViZ2wnKTtcbiAgY29uc3QgYXBwID0gbmV3IFRocmVlQXBwKHdyYXBwZXIpO1xuICBhcHAucmVuZGVyKCk7XG59LCBmYWxzZSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIlRIUkVFIiwiT3JiaXRDb250cm9scyIsIlRocmVlQXBwIiwid3JhcHBlciIsIl90aGlzIiwiX2NsYXNzQ2FsbENoZWNrIiwiX2RlZmluZVByb3BlcnR5IiwiY29sb3IiLCJDb2xvciIsIlJFTkRFUkVSX1BBUkFNIiwiY2xlYXJDb2xvciIsInJlbmRlcmVyIiwiV2ViR0xSZW5kZXJlciIsInNldENsZWFyQ29sb3IiLCJzZXRTaXplIiwid2lkdGgiLCJoZWlnaHQiLCJhcHBlbmRDaGlsZCIsImRvbUVsZW1lbnQiLCJzY2VuZSIsIlNjZW5lIiwiY2FtZXJhIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJDQU1FUkFfUEFSQU0iLCJmb3Z5IiwiYXNwZWN0IiwibmVhciIsImZhciIsInBvc2l0aW9uIiwiY29weSIsImxvb2tBdCIsImRpcmVjdGlvbmFsTGlnaHQiLCJEaXJlY3Rpb25hbExpZ2h0IiwiRElSRUNUSU9OQUxfTElHSFRfUEFSQU0iLCJpbnRlbnNpdHkiLCJhZGQiLCJhbWJpZW50TGlnaHQiLCJBbWJpZW50TGlnaHQiLCJBTUJJRU5UX0xJR0hUX1BBUkFNIiwibWF0ZXJpYWwiLCJNZXNoUGhvbmdNYXRlcmlhbCIsIk1BVEVSSUFMX1BBUkFNIiwicGFydGljbGVzR2VvbWV0cnkiLCJCdWZmZXJHZW9tZXRyeSIsImNvdW50IiwiY29sb3JBcnJheSIsIkZsb2F0MzJBcnJheSIsInBvc2l0aW9uQXJyYXkiLCJ2ZWxvY2l0eUFycmF5IiwiaSIsIk1hdGgiLCJyYW5kb20iLCJzZXRBdHRyaWJ1dGUiLCJCdWZmZXJBdHRyaWJ1dGUiLCJQb2ludHNNYXRlcmlhbCIsInNpemUiLCJ2ZXJ0ZXhDb2xvcnMiLCJibGVuZGluZyIsIkFkZGl0aXZlQmxlbmRpbmciLCJ0cmFuc3BhcmVudCIsImF4ZXNCYXJMZW5ndGgiLCJheGVzSGVscGVyIiwiQXhlc0hlbHBlciIsInBhcnRpY2xlcyIsIlBvaW50cyIsImNvbnRyb2xzIiwicmVuZGVyIiwiYmluZCIsImlzc3RhcnQiLCJkb2N1bWVudCIsImJvZHkiLCJhZGRFdmVudExpc3RlbmVyIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIl9jcmVhdGVDbGFzcyIsImtleSIsInZhbHVlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicG9zaXRpb25BdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJ2ZWxvY2l0eUF0dHJpYnV0ZSIsInBvc0FycmF5IiwiYXJyYXkiLCJ2ZWxBcnJheSIsImxlbmd0aCIsIm5lZWRzVXBkYXRlIiwidXBkYXRlIiwiVmVjdG9yMyIsInF1ZXJ5U2VsZWN0b3IiLCJhcHAiXSwic291cmNlUm9vdCI6IiJ9