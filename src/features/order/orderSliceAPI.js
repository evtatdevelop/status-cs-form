import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getOrder = ( data ) => service.getResource(`${apiBase}/?q=get_order&order_type=${data.order_type}&order_id=${data.id}`, data);
export const getAttachments = ( data ) => service.getResource(`${apiBase}/?q=attachment&asz31_id=${data.asz31_id}`, data);
export const delAttachment = ( data ) => service.updateResource(`${apiBase}/?q=attachment`, data);
export const uploadFile = ( data ) => service.uploadFile(`${apiBase}/?q=uploadfile`, data);
// export const uploadFile = ( data ) => service.uploadFile(`${apiBase}/?q=uploadfile&asz31_id=${data.asz31_id}`, data);
