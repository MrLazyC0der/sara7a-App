export const findOne = async ({ model, select = "", filter = {}, options = {} }) => {
    const doc = model.findOne(filter);
    if (select?.length) doc.select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.lean) doc.lean();
    return await doc.exec();
};
export const findById = async ({ model, select = "", id, options = {} }) => {
    const doc = model.findById(id);
    if (select?.length) doc.select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.lean) doc.lean();
    return await doc.exec();
};
export const find = async ({ model, select = "", filter = {}, options = {} }) => {
    const doc = model.find(filter);
    if (select?.length) doc.select(select);
    if (options?.populate) doc.populate(options.populate);
    if (options?.sort) doc.sort(options.sort);
    if (options?.skip != null) doc.skip(options.skip);
    if (options?.limit) doc.limit(options.limit);
    if (options?.lean) doc.lean();
    return await doc.exec();
};
export const create = async ({ model, document, options = { validateBeforeSave: true } }) => {
    const [doc] = await model.create([document], options);
    return doc;
};
export const insertMany = async ({model,documents = [],options = {}}) => {
    if (!Array.isArray(documents) || !documents.length) {
        return [];
    }
    return await model.insertMany(documents, options);
};
export const updateOne = async ({ model, filter, update, options = { new: true, runValidators: true } }) => {
    return await model.updateOne(filter, { ...update, $inc: { __v: 1 } }, options);
};
export const findOneAndUpdate = async ({ model, filter, update, options = { new: true, runValidators: true } }) => {
    return await model.findOneAndUpdate(filter, { ...update, $inc: { __v: 1 } }, options);
};
export const findByIdAndUpdate = async ({ model, id, update, options = { new: true, runValidators: true } }) => {
    return await model.findByIdAndUpdate(id, { ...update, $inc: { __v: 1 } }, options);
};
export const deleteOne = async ({ model, filter, options = {} }) => {
    return await model.deleteOne(filter, options);
};