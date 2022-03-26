import { css } from "lit";
export default css `
  .vis-only-container {
    display: flex;
  }

  .vis-only-container > *,
  .vis-only-container > ::slotted(*) {
    overflow: hidden;
    width: 0;
  }

  .vis-only-container > [data-vis-only],
  .vis-only-container > ::slotted([data-vis-only]) {
    width: 100%;
  }
`;
