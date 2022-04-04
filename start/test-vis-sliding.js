import "../src/components/mix/vis-sliding";
import { Sliding } from "../src/components/mix/vis-sliding";
import {
  SlideEventDispatcher, 
  SlideEventInit,
} from "../src/lib/SlideEventDispatcher";
document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <h3> Test vis-sliding component </h3>
    <div style="height:100px">
    <vis-sliding  id="vis-sliding1"> 
      <div style="height:100px" >hello sliding me </div>
        <button  slot="start0"> AAA </button>
        <button  slot="start1"> BBB </button>
        <button  slot="start2"> CCC </button>

        <button class="create" slot="end0"> create </button>
        <button class="edit" slot="end1"> edit </button>
        <button class="delete" slot="end2"> delete </button>
    </vis-sliding>
    </div>
`
);

const sliding = document.querySelector("#vis-sliding1");
const createbtn = sliding.querySelector(".create");
const editbtn = sliding.querySelector(".edit");
const deletebtn = sliding.querySelector(".delete");

const drag = (e) => {
  sliding.accordion.slide(e.detail.deltaX);
};
const end = (e) => {};
new SlideEventDispatcher(sliding);
sliding.addEventListener("slide-drag", drag);
sliding.addEventListener("slide-end", end);

createbtn.onclick = function () {
  if (sliding.endSwitcher.switched) {
    sliding.endSwitcher.disSwitch();
  } else {
    sliding.endSwitcher.switch(0);
  }
};
editbtn.onclick = function () {
  if (sliding.endSwitcher.switched) {
    sliding.endSwitcher.disSwitch();
  } else {
    sliding.endSwitcher.switch(1);
  }
};
deletebtn.onclick = function () {
  if (sliding.endSwitcher.switched) {
    sliding.endSwitcher.disSwitch();
  } else {
    sliding.endSwitcher.switch(2);
  }
};
