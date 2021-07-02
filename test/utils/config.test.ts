import { Conf } from "../../utils/config";

test("Config is loaded and merged correctly", () => {
  const config = new Conf().get("test");
  expect(config.stage).toBe("test");
});

const expectedDefaultConfig = {
  awsAccount: "123456789",
  awsRegion: "eu-west-2",
  stage: "default",
};
describe.each([
  ["default", expectedDefaultConfig],
  [undefined, expectedDefaultConfig],
])("Config only gets default configuration", (stage, expected) => {
  test(`when stage is set to ${stage}`, () => {
    const config = new Conf().get(stage);
    expect(config).toEqual(expected);
  });
});
