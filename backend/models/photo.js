const validate = require("../lib/validate");
const utils = require("../lib/utils");
const conf = require("../config");

const Adapter = require("./adapter");

// model
class Photo extends Adapter {
  constructor(param) {
    super();

    this.id = param.id;
    this.user_id = param.user_id;
    this.modified_at = param.modified_at;
    this.created_at = param.created_at;

    this.photo = param.photo;

    this.tag = param.tag;
  }

  static async validate(connection, values, updateId) {
    let errors = [];

    return errors;
  }

  static async findAll(connection, params, limit, offset, sort) {
    const result = await Adapter.find(
      connection,
      conf.tablePrefix + "photo",
      params,
      limit,
      offset,
      sort
    );

    if (!result) return null;

    return result.map((row) => new Photo(row));
  }

  static async findOne(connection, params) {
    const result = await Adapter.findOne(
      connection,
      conf.tablePrefix + "photo",
      params
    );

    if (!result) return null;

    return new Photo(result);
  }

  static async findCount(connection, params) {
    const result = await Adapter.findCount(
      connection,
      conf.tablePrefix + "photo",
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
      conf.tablePrefix + "photo",
      params
    );

    if (!newId) return null;

    return newId;
  }

  static async deleteOne(connection, params) {
    const result = await Adapter.deleteOne(
      connection,
      conf.tablePrefix + "photo",
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
      conf.tablePrefix + "photo",
      params,
      conditions
    );

    if (!result) return null;

    return result;
  }
}

module.exports = Photo;
