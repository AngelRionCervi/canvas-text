import createTextBuffer from "./src/main";

const optionModel = {
  textNodes: [
    {
      value: "hey it's some text ey",
      styles: {
        underline: true,
      },
      onClick: () => console.log("hey"),
      onMouseEnter: () => {
        document.body.style.cursor = 'pointer';
      },
      onMouseLeave: () => {
        document.body.style.cursor = 'auto';
      }
    },
    {
      value: "some other text",
      styles: {
        underline: false,
        position: { x: '0.5rem', y: '5rem' },
        bold: true,
      }
    }
  ],
}

const WIDTH = 500;
const HEIGHT = 200;

const renderer = document.getElementById('canvas') as HTMLCanvasElement;
renderer.width = WIDTH;
renderer.height = HEIGHT;
const rendererCtx = renderer?.getContext('2d');


const text1 = createTextBuffer(WIDTH, HEIGHT, optionModel, renderer);

console.log(text1)
rendererCtx?.drawImage(text1, 0, 0);