const { check, validationResult } = require("express-validator");

exports.registerRules = () => [
  check("name", "name is required").notEmpty(),
  check("lastName", "lastname is required").notEmpty(),
  check("email", "email is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check("password", "password must be  between 6 and 12 character").isLength({
    min: 6,
    max: 12,
  }),
];
exports.loginRules = () => [
  check("email", "email is required").notEmpty(),
  check("email", "check email again").isEmail(),
  check("password", "password must be  between 6 and 12 character").isLength({
    min: 6,
    max: 12,
  }),
];

// project fields validator

exports.ProjectRules = () => [
  check("project_name", "project name is required").notEmpty(),
  check("id_user", "select user").notEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      errors: errors.array().map((e) => ({
        msg: e.msg,
      })),
    });
  }
  next();
};
