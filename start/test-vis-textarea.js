import "../src/components/atom/vis-textarea";
import { html, render, css } from "lit";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

render(
  html`
    <div>
      <h3>Test vis-textarea component</h3>
      <vis-textarea
        @vis-change=${(e) => console.log(e.detail.editor.innerText)}
        .value=${html` <div>Hello world</div> `}
      ></vis-textarea>
    </div>
  `,
  document.body
);

const textarea = document.querySelector("vis-textarea");

setTimeout(async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    source: CameraSource.Camera,
    resultType: CameraResultType.Uri,
  });
  var imageUrl = image.webPath;
  const img = new Image();
  img.src = imageUrl;
  textarea.insert(img);

  textarea.editorStyle = css`
    img {
      display: block;
      width: 100px;
    }
  `;
}, 3000);
