module.exports = async function handleMongooseValidationErrors(ctx, next) {
    try {
        await next();
    } catch (err) {
        if (err.name !== 'ValidationError') throw err;
        ctx.status = 400;
        ctx.body = Object.keys(err.errors).reduce((acc, value) => {
            return {
                ...acc,
                [value]: err.errors[value].message,
            }
        }, {});
    }
}