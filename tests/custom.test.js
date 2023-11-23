import Joi from "joi";

describe("Joi", function () {
  it("should can create custom validation", function () {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("yuli")) {
            return helpers.error("password.wrong");
          }
          return value;
        })
        .messages({
          "password.wrong": 'password can not start with "yuli"',
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        }
        return value;
      })
      .messages({
        "register.password.different": "password and confirmPassword are different",
      });

    const request = {
      username: "yuli@gmail.com",
      password: "yuli12345",
      confirmPassword: "yuli12345",
    };
    const result = registerSchema.validate(request, {
      abortEarly: false,
    });
    console.log(result);
  });
});
