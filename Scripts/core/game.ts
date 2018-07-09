//IIFE -- Immediately Invoked Function Expression
// also called self executing anonymous function
(function() {
  // Game Variables
  let canvas: HTMLCanvasElement;
  let stage: createjs.Stage;
  let welcomeLabel: objects.Label;
  let startButton: objects.Button;
  let AssetManager: createjs.LoadQueue;

  let Manifest = [
    {id: "StartButton", src:"/Assets/images/StartButton.png"}
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

    // This is where all the magic happens
    Main();
  }

  // game loop
  function Update(): void {
    //helloLabel.rotation += 5;

    stage.update();
  }

  function Main(): void {
    console.log(
      `%c Main Function`,
      "font-style:italic; font-size:16px; color:blue;"
    );

    welcomeLabel = new objects.Label(
      "Welcome",
      "60px",
      "Consolas",
      "#000000",
      320,
      200,
      true
    );
    stage.addChild(welcomeLabel);

    startButton = new objects.Button("StartButton", 320, 300, true);
    stage.addChild(startButton);

    startButton.on("click", function(){
        welcomeLabel.text = "Clicked!";
    });
}

  window.addEventListener("load", Init);
})();
