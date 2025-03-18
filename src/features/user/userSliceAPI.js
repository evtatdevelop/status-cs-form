import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getRemoteUser = ( data ) => service.getResource(`${apiBase}/?q=remoteuser`, data);
export const setUserLang = ( data ) => service.updateResource(`${apiBase}/?q=user`, data);

export const getUserData = ( data ) => {
  const mode = data.app12_id ? `&app12_id=${data.app12_id}` : data.login ? `&login=${data.login}` : null;
  return mode ? service.getResource(`${apiBase}/?q=user${mode}`, data) : []
}

export const searchUsers = ( data ) => {
  const string = data.string ? data.string : '';
  const author_id = data.author_id ? data.author_id : '';
  return service.getResource(`${apiBase}/?q=users&string=${string}&author_id=${author_id}`, data)
}
