import * as fs from "fs";
import * as jsYaml from "js-yaml";
import * as path from "path";

/**
 * Config interface allows for easy dot notation access to configuration loaded
 * via the config files in `<project_root>/config/`
 */
interface IConf {
  awsAccount: string;
  awsRegion: string;
  stage: string;
}

/**
 * Conf class manages getting and merging configuration required for Stacks
 */
export class Conf {
  private load(stage: string): IConf {
    let cfg = {} as IConf;
    const configDir = path.join(__dirname, "../config");

    try {
      cfg = jsYaml.load(
        fs.readFileSync(`${configDir}/${stage}.yaml`, "utf8")
        // ) as {};
      ) as IConf;
    } catch (error) {
      /* tslint:disable */
      console.log(
        `Something went reading the ${stage} config file. Error: ${error}`
      );
      /* tslint:enable */
      process.exit(1);
    }
    return cfg;
  }

  /**
   * get retrieves default and stage configuration from files and merges, returning one
   * object. If the same key exists in both default and stage, stage overwrites default
   */
  public get(stage: string | undefined): IConf {
    let config = {} as IConf;

    if (stage == undefined || stage == "default") {
      config = this.load("default");
    } else {
      let defaultConfig = {} as IConf;
      let stageConfig = {} as IConf;
      defaultConfig = this.load("default");
      stageConfig = this.load(stage);
      config = { ...defaultConfig, ...stageConfig };
    }

    return config;
  }
}
