import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getRemoteUser = ( data ) => service.getResource(`${apiBase}/?q=remoteuser`, data);
export const setUserLang = ( data ) => service.updateResource(`${apiBase}/?q=user`, data);
