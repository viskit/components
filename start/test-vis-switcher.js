import "../src/components/layout/vis-switcher";

document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <h3> Test vis-switcher component </h3>
    <div style="height:100px">
    <vis-switcher id="vis-switcher1">
        <button class="create"> create </button>
        <button class="edit"> edit </button>
        <button class="delete" > delete </button>
    </vis-switcher>
    </div>
`
);

const switcher = document.querySelector("#vis-switcher1");
const create = document.querySelector("#vis-switcher1 > .create");
const edit = document.querySelector("#vis-switcher1 > .edit");
const del = document.querySelector("#vis-switcher1 > .delete");
const click = (e) => {
  switcher.switch(e.target);
};
create.addEventListener("click", click);
edit.addEventListener("click", click);
del.addEventListener("click", click);
