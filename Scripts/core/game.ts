//IIFE -- Immediately Invoked Function Expression
// also called self executing anonymous function
(function() {
  // Game Variables
  let canvas: HTMLCanvasElement;
  let stage: createjs.Stage;

  let AssetManager: createjs.LoadQueue;

  let currentScene: objects.Scene;
  let currentState: config.Scene;

  let Manifest = [
    {id: "StartButton", src:"/Assets/images/StartButton.png"},
    {id: "NextButton", src:"/Assets/images/NextButton.png"},
    {id: "BackButton", src:"/Assets/images/BackButton.png"}
  ]

  function Init():void {
    console.log(`%c Assets Loading...`, "font-weight:bold; font-size:20px; color: green;")
    AssetManager = new createjs.LoadQueue();
    managers.Game.AssetManager = AssetManager;
    AssetManager.installPlugin(createjs.Sound); // enables preloading of sound assets
    AssetManager.on("complete", Start);
    AssetManager.loadManifest(Manifest);
  }

  function Start(): void {
    console.log(
      `%c App Starting...`,
      "font-weight:bold; font-size:20px; color: red;"
    );
    canvas = document.getElementsByTagName("canvas")[0];
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // enables mouseover events
    createjs.Ticker.framerate = 60; // sets framerate to 60fps
    createjs.Ticker.on("tick", Update);

    currentState = config.Scene.START;

    // This is where all the magic happens
    Main();
  }

  // game loop
  function Update(): void {
    if(managers.Game.CurrentState != currentState) {
      currentState = managers.Game.CurrentState;
      Main();
    }
    currentScene.Update();

    stage.update();
  }

  function Main(): void {
    console.log(
      `%c Finite State Machine`,
      "font-style:italic; font-size:16px; color:blue;"
    );

    switch(currentState) {
      case config.Scene.START:
        currentScene = new Scenes.Start();
        
      break;

      case config.Scene.PLAY:
        currentScene = new Scenes.Play();
      break;

      case config.Scene.END:
      break;
    }

    stage.addChild(currentScene);
}

  window.addEventListener("load", Init);
})();
