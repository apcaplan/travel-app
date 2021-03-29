import "@babel/polyfill";
import { handleSubmit } from "../client/js/formHandler";

describe("formHandler function", () => {
  test("Should be a function", () => {
    expect(typeof handleSubmit).toBe("function");
  });
});
