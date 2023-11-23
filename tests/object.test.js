import Joi from "joi";

describe("Joi", function () {
  it("should can validate object", function () {
    const loginSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      pessword: Joi.string().required().min(6).max(100),
    });

    const request = {
      username: "yuli2gmail.com",
      password: "123456",
    };

    const result = loginSchema.validate(request, {
      abortEarly: false,
    });

    console.log(result);
  });

  it("should can validate nested object", function () {
    const createUserSchema = Joi.object({
      id: Joi.string().required().max(100),
      name: Joi.string().required().max(100),
      address: Joi.object({
        street: Joi.string().required().max(200),
        city: Joi.string().required().max(100),
        country: Joi.string().required().max(100),
        zipCode: Joi.string().required().max(10),
      }).required(),
    });

    const request = {
      address: {},
    };

    const result = createUserSchema.validate(request, {
      abortEarly: false,
    });

    // console.info(result);

    if (result.error) {
      result.error.details.forEach((value) => {
        console.info(`${value.path} : ${value.message}`);
      });
    }
  });
});
