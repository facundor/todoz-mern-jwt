// https://stackoverflow.com/a/48772430/948938

toJSON = {
    transform: function(doc, ret, options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  };

module.exports = toJSON;