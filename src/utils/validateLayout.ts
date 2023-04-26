import Joi from "joi";

function validateLayout(layout: object): boolean {
    const layoutSchema = Joi.object({
        links: Joi.array().items(
            Joi.object({
                name: Joi.string().required(),
                link: Joi.string().uri().required(),
            })
        ),
    });
    const { error } = layoutSchema.validate(layout);
    return error === undefined;
};

export default validateLayout;