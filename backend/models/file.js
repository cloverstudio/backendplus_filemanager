const validate = require("../lib/validate");
const utils = require("../lib/utils");
const conf = require("../config");

const Adapter = require("./adapter");

// model
class File extends Adapter {
  constructor(param) {
    super();

    this.id = param.id;
    this.user_id = param.user_id;
    this.modified_at = param.modified_at;
    this.created_at = param.created_at;

    this.file = param.file;

    this.description = param.description;

    this.tag = param.tag;
  }

  static async validate(connection, values, updateId) {
    let errors = [];

    return errors;
  }

  static async findAll(connection, params, limit, offset, sort) {
    const result = await Adapter.find(
      connection,
      conf.tablePrefix + "file",
      params,
      limit,
      offset,
      sort
    );

    if (!result) return null;

    return result.map((row) => new File(row));
  }

  static async findOne(connection, params) {
    const result = await Adapter.findOne(
      connection,
      conf.tablePrefix + "file",
      params
    );

    if (!result) return null;

    return new File(result);
  }

  static async findCount(connection, params) {
    const result = await Adapter.findCount(
      connection,
      conf.tablePrefix + "file",
      params
    );

    if (!result) return null;

    return result;
  }

  static async insert(connection, params) {
    params = Object.keys(params).reduce((result, key) => {
      const val = params[key];

      if (val || val === "" || val === "null") result[key] = val;

      return result;
    }, {});

    console.log("params", params);

    const newId = await Adapter.insert(
      connection,
      conf.tablePrefix + "file",
      params
    );

    if (!newId) return null;

    return newId;
  }

  static async deleteOne(connection, params) {
    const result = await Adapter.deleteOne(
      connection,
      conf.tablePrefix + "file",
      params
    );

    if (!result) return null;

    return result;
  }

  static async updateOne(connection, params, conditions) {
    params = Object.keys(params).reduce((result, key) => {
      const val = params[key];

      if (val || val === "") result[key] = val;

      return result;
    }, {});

    const result = await Adapter.updateOne(
      connection,
      conf.tablePrefix + "file",
      params,
      conditions
    );

    if (!result) return null;

    return result;
  }
}

module.exports = File;
