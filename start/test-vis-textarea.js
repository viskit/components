import "../src/components/vis-textarea";

document.body.insertAdjacentHTML(
  "afterbegin",
  `
    <h3> Test vis-textarea component : </h3>
    <button id="vis-textarea-test-button"> text2html </button>
    <button id="vis-textarea-test-button2"> html2text </button>
    <vis-textarea></vis-textarea>
    
`
);

const textarea = document.querySelector("vis-textarea");

const btn = document.querySelector("#vis-textarea-test-button");
const btn2 = document.querySelector("#vis-textarea-test-button2");
btn2.onclick = () => {
  console.log(textarea.container.innerText);
}
btn.onclick = () => {
  textarea.value = `aaa \n \n \n bbbb \\<script\> 
  alert(32332)>
</script> \r\s\\s\\s  bbcc \n ddddd`;
};
