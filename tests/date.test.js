import Joi from "joi";

describe("Joi", function () {
  it("should can validate date", function () {
    const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

    const result = birthDateSchema.validate("1-1-1987");
    console.info(result);

    const result2 = birthDateSchema.validate("12-5-1998");
    console.info(result2);

    const result3 = birthDateSchema.validate("12-25-2027");
    console.info(result3);
  });

  it("should can validate basic data type", function () {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("yuli@gmail.com");
    console.info(resultUsername);

    const resultIsAdmin = isAdminSchema.validate("true");
    console.info(resultIsAdmin);

    console.info(typeof "true");
    console.info(typeof resultIsAdmin.value);
    console.info(typeof resultIsAdmin.error);

    const resultPrice = priceSchema.validate("10000");
    console.info(resultPrice);
  });
});
