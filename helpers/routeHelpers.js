const Joi = require('joi');

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req['params'][name] }, schema);
      if(result.error){
        return res.status(400).json(result.error);
      } else {
        if(!req.value) {
          req.value = {};
        }
        if(!req.value['params']) {
          req.value['params'] = {};
        }
        req.value['params'][name] = result.value.param;
        next();
      }
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if(result.error){
        return res.status(400).json(result.error);
      } else {
        if(!req.value) {
          req.value = {};
        }
        if(!req.value['body']) {
          req.value['body'] = {};
        }
        req.value['body'] = result.value;
        next();
      }
    }
  },

  schemas: {

    sizeSchema: Joi.object().keys ({
      param: Joi.string()
    }),

    lngSchema: Joi.object().keys ({
      param: Joi.number().min(-300).max(300)
    }),

    latSchema: Joi.object().keys ({
      param: Joi.number().min(-300).max(300)
    }),

    yearSchema: Joi.object().keys ({
      param: Joi.number().integer().min(1910).max(2016)
    }),

    nameSchema: Joi.object().keys ({
      param: Joi.string()
    }),

    sexSchema: Joi.object().keys ({
      param: Joi.string()
    })

  }
}
