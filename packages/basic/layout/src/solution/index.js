import Component from "./component";
import Template from "./template";

function setValue(data, key, value) {
  const arr = key.split(".");
  let obj = data;
  if (arr.length === 1) {
    obj[arr[0]] = value;
  } else {
    try {
      for (let i = 0; i < arr.length - 1; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = {};
        }
        obj = obj[arr[i]];
      }
      obj[arr[arr.length - 1]] = value;
    } catch (e) {}
  }
}

function Solution(name) {
  if (!Template[name]) {
    return new Error(name + "模板不存在！");
  }
  this.template = Template[name]();
  this.template._actions = {};

  this.extends = function(name, options) {
    if (options) {
      for (let x in options) {
        setValue(this.template[name], x, options[x]);
      }
    }
  };
  this.install = function(name, options) {
    this.template[name] = options;
  };
  this.uninstall = function(name) {
    delete this.template[name];
  };
  this.export = function() {
    return this.template;
  };
  this.bindAction = function(options) {
    this.template._actions = options;
  };
}

export default {
  use(name) {
    return new Solution(name);
  },
};
