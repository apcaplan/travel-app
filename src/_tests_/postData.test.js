import "@babel/polyfill";
import { postData } from "../client/js/app";

describe("POST on submit", () => {
  test("Should return true", () => {
    expect(postData).toBeDefined();
  });
});
