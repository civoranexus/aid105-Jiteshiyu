import Joi from "joi";

export const recommendationSchema = Joi.object({
  age: Joi.number().integer().min(0).required(),
  annual_income: Joi.number().integer().min(0).required(),
  category: Joi.string().required(),
  state: Joi.string().required(),
  education: Joi.string().required(),
});
