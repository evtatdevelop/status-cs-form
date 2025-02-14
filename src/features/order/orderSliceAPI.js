import Service from "../../services";
import { apiBase, } from "../../config";

const service = new Service();

export const getOrder = ( data ) => service.getResource(`${apiBase}/?q=get_order&order_type=corpsystems&order_id=${data.id}`, data);
