import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in format: +380XXXXXXXXX',
      'string.empty': 'Phome number is required',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'personal', 'home').required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base': 'Phone number must be in format: +380XXXXXXXXX',
      'string.empty': 'Phome number is required',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'personal', 'home'),
});
