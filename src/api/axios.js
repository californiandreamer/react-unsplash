import * as Axios from "axios";

export const instanse = Axios.create({
    baseURL: `https://api.unsplash.com`,
});
