// import "core-js/stable"
// import "regenerator-runtime/runtime"

//import ThreeApp from './three_application'

window.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('#webgl');
  const app = new ThreeApp(wrapper);
  app.render();
}, false);


import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class ThreeApp {
  /**
   * カメラ定義のための定数
   */
  static CAMERA_PARAM = {
    // fovy は Field of View Y のことで、縦方向の視野角を意味する
    fovy: 60,
    // 描画する空間のアスペクト比（縦横比）
    aspect: window.innerWidth / window.innerHeight,
    // 描画する空間のニアクリップ面（最近面）
    near: 0.1,
    // 描画する空間のファークリップ面（最遠面）
    far: 20.0,
    // カメラの座標
    position: new THREE.Vector3(0.0, 0.0, 1.0),
    // カメラの注視点
    lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
  };
  /**
   * レンダラー定義のための定数
   */
  static RENDERER_PARAM = {
    clearColor: 0x000000,       // 画面をクリアする色
    width: window.innerWidth,   // レンダラーに設定する幅
    height: window.innerHeight, // レンダラーに設定する高さ
  };
  /**
   * 平行光源定義のための定数
   */
  static DIRECTIONAL_LIGHT_PARAM = {
    color: 0x000000,                            // 光の色
    intensity: 4.0,                             // 光の強度
    position: new THREE.Vector3(1.0, 1.0, 1.0), // 光の向き
  };
  /**
   * アンビエントライト定義のための定数
   */
  static AMBIENT_LIGHT_PARAM = {
    color: 0xffffff, // 光の色
    intensity: 0.1,  // 光の強度
  };
  /**
   * マテリアル定義のための定数
   */
  static MATERIAL_PARAM = {
    color: 0x3399ff, // マテリアルの基本色
  };

  renderer;         // レンダラ
  scene;            // シーン
  camera;           // カメラ
  directionalLight; // 平行光源（ディレクショナルライト）
  ambientLight;     // 環境光（アンビエントライト）
  material;         // マテリアル
  particlesGeometry;    // トーラスジオメトリ
  controls;         // オービットコントロール
  axesHelper;       // 軸ヘルパー
  isDown;           // キーの押下状態用フラグ

  /**
   * コンストラクタ
   * @constructor
   * @param {HTMLElement} wrapper - canvas 要素を append する親要素
   */
  constructor(wrapper) {
    // レンダラー
    const color = new THREE.Color(ThreeApp.RENDERER_PARAM.clearColor);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(color);
    this.renderer.setSize(ThreeApp.RENDERER_PARAM.width, ThreeApp.RENDERER_PARAM.height);
    wrapper.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      ThreeApp.CAMERA_PARAM.fovy,
      ThreeApp.CAMERA_PARAM.aspect,
      ThreeApp.CAMERA_PARAM.near,
      ThreeApp.CAMERA_PARAM.far,
    );
    this.camera.position.copy(ThreeApp.CAMERA_PARAM.position);
    this.camera.lookAt(ThreeApp.CAMERA_PARAM.lookAt);

    // ディレクショナルライト（平行光源）
    this.directionalLight = new THREE.DirectionalLight(
      ThreeApp.DIRECTIONAL_LIGHT_PARAM.color,
      ThreeApp.DIRECTIONAL_LIGHT_PARAM.intensity
    );
    this.directionalLight.position.copy(ThreeApp.DIRECTIONAL_LIGHT_PARAM.position);
    this.scene.add(this.directionalLight);

    // アンビエントライト（環境光）
    this.ambientLight = new THREE.AmbientLight(
      ThreeApp.AMBIENT_LIGHT_PARAM.color,
      ThreeApp.AMBIENT_LIGHT_PARAM.intensity,
    );
    this.scene.add(this.ambientLight);

    // マテリアル
    this.material = new THREE.MeshPhongMaterial(ThreeApp.MATERIAL_PARAM);

    // 共通のジオメトリ、マテリアルから、複数のメッシュインスタンスを作成する @@@
    this.particlesGeometry = new THREE.BufferGeometry();
    const count = 10000;
    const colorArray = new Float32Array(count * 3);
    const positionArray = new Float32Array(count * 3);
    const velocityArray = new Float32Array(count);

    for (let i = 0; i < count; ++i) {
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
    this.particlesGeometry.setAttribute(
      "position",//この3というのはx,y,zの位置座標。
      new THREE.BufferAttribute(positionArray, 3)
    );

    //カラー
    this.particlesGeometry.setAttribute(
      "color",//この3というのはx,y,zの位置座標。
      new THREE.BufferAttribute(colorArray, 3)
    );

    this.particlesGeometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocityArray, 1)
    );

    //マテリアル
    const PointsMaterial = new THREE.PointsMaterial({
     //つぶつぶのサイズ
      size: 0.08,
      vertexColors: true, //カラーを有効にする
      blending: THREE.AdditiveBlending, //加算合成 パーティクルが重なるところが光る。
      transparent: true,
    });
    // 軸ヘルパー
    // const axesBarLength = 5.0;
    // this.axesHelper = new THREE.AxesHelper(axesBarLength);
    // this.scene.add(this.axesHelper);

    //メッシュ化
    //第一引数にはジオメトリ、第二引数にはマテリアル
    const particles = new THREE.Points(this.particlesGeometry, PointsMaterial);
    this.scene.add(particles);
    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // this のバインド
    this.render = this.render.bind(this);

    // キーの押下状態を保持するフラグ
    this.isstart = false;

    document.body.addEventListener('click', () => {
      this.isstart = !this.isstart; // クリック時にフラグを切り替え
    });

    // ウィンドウのリサイズを検出できるようにする
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);
  }
  
  /**
   * 描画処理
   */
  render() {
    requestAnimationFrame(this.render);

    const positionAttribute = this.particlesGeometry.getAttribute('position');
    const velocityAttribute = this.particlesGeometry.getAttribute('velocity');
    const posArray = positionAttribute.array;
    const velArray = velocityAttribute.array;

    for (let i = 0; i < posArray.length; i += 3) {
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
}

export default ThreeApp;