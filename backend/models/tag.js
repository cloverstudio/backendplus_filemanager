const validate = require("../lib/validate");
const utils = require("../lib/utils");
const conf = require("../config");

const Adapter = require("./adapter");

// model
class Tag extends Adapter {
  constructor(param) {
    super();

    this.id = param.id;
    this.user_id = param.user_id;
    this.modified_at = param.modified_at;
    this.created_at = param.created_at;

    this.tag = param.tag;
  }

  static async validate(connection, values, updateId) {
    let errors = [];

    if (!values.tag || values.tag == "") errors.push("Tag cannot be empty");

    // check duplication
    const existingRowTag = await Tag.findOne(connection, { tag: values.tag });

    if (updateId) {
      if (existingRowTag && updateId != existingRowTag.id)
        errors.push("The Tag already exists");
    } else {
      if (existingRowTag) errors.push("The Tag already exists");
    }

    return errors;
  }

  static async findAll(connection, params, limit, offset, sort) {
    const result = await Adapter.find(
      connection,
      conf.tablePrefix + "tag",
      params,
      limit,
      offset,
      sort
    );

    if (!result) return null;

    return result.map((row) => new Tag(row));
  }

  static async findOne(connection, params) {
    const result = await Adapter.findOne(
      connection,
      conf.tablePrefix + "tag",
      params
    );

    if (!result) return null;

    return new Tag(result);
  }

  static async findCount(connection, params) {
    const result = await Adapter.findCount(
      connection,
      conf.tablePrefix + "tag",
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
      conf.tablePrefix + "tag",
      params
    );

    if (!newId) return null;

    return newId;
  }

  static async deleteOne(connection, params) {
    const result = await Adapter.deleteOne(
      connection,
      conf.tablePrefix + "tag",
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
      conf.tablePrefix + "tag",
      params,
      conditions
    );

    if (!result) return null;

    return result;
  }
}

module.exports = Tag;
