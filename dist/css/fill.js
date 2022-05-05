import { css } from "lit";
export default css `
  .vis-fill-container {
    display: flex;
  }

  .vis-fill-container > *,
  .vis-fill-container > ::slotted(*) {
    flex-grow: 1;
    height: auto;
    margin:0;
  }
`;
