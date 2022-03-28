import "../src/components/vis-textarea";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import url from "./love.jpg";
document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <h3> Test vis-textarea component : </h3>
    <button id="vis-textarea-test-button"> text2html </button>
    <button id="vis-textarea-test-button2"> add image </button>
    <button id="vis-textarea-test-button3"> get value </button>
    <vis-textarea></vis-textarea>
    
`
);

const textarea = document.querySelector("vis-textarea");

const btn = document.querySelector("#vis-textarea-test-button");
const btn2 = document.querySelector("#vis-textarea-test-button2");
const btn3 = document.querySelector("#vis-textarea-test-button3");
let num = 0;
btn.onclick = () => {
  textarea.value = "hello ...";
  textarea.requestUpdate("value");
};

btn2.onclick = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.DataUrl,
  });
  var imageUrl = image.dataUrl;
  textarea.insertImage(imageUrl);
};

btn3.onclick = async () => {
  console.log(333);
  console.log(textarea.getValue());
};
