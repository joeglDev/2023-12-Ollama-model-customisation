import { getModelOptions } from "./api";

export const getModelOptionsController = async () => {
    const response = await getModelOptions();
    console.log(response)

    const models = response?.models.map((model) => {
        const value = model.name.split(':')[0];
        const name = value.charAt(0).toUpperCase() + value.slice(1);
        return {name, value}
    });

    return models
}