import { useState, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from './uploadFile.module.scss';
import dictionary from '../../dictionary.json';
import { darkTheme, langMode } from "../../appSlice";
import { getAttachmentsData, } from "../order/orderSlice";
import { orderData, addAttachLoading, setAttachLoading } from "../order/orderSlice";
import { uploadFile } from "../order/orderSliceAPI";
import { TestLoader } from "../statusOrder/attachments/testLoader";

export const UploadFile = props => {
  const dispatch  = useDispatch();
  
  const order = useSelector(orderData);
  const attachLoad = useSelector(addAttachLoading);
  const lang = useSelector(langMode);

  // const [fileURL, setFileURL] = useState();
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    if ( uploaded ) {
      dispatch(getAttachmentsData({ 'asz31_id': order.main.asz31_id, }));
      setUploaded(false);
    }
  }, [dispatch, order.main.asz31_id, uploaded]);

  // const fileReader = new FileReader();
  // fileReader.onloadend = () => setFileURL(fileReader.result);

  const stopDefault = e => {
    e.preventDefault();
    e.stopPropagation();
  }

  const chechNoFiles = files => files && files.length;

  const handlerChange = async e => {
    e.preventDefault();
    dispatch(setAttachLoading());
    if ( chechNoFiles(e.target.files) ) {
      const file = e.target.files[0];
      if ( file )  if ( await uploadFile({'file': file, 'asz31_id': order.main.asz31_id, }) ) {
        setUploaded(true);
      }
    }
  }

  const handlerDrop = async e => {
    stopDefault(e);
    dispatch(setAttachLoading());
    if ( chechNoFiles(e.dataTransfer.files) ) {
      const file = e.dataTransfer.files[0];
      if ( file )  if ( await uploadFile({'file': file, 'asz31_id': order.main.asz31_id, }) ) {
        setUploaded(true);
      }
    }
  }

  return (
    <section className={styles.uplodefile} >
      <label htmlFor="file"
        onDrop={handlerDrop}
        onDragEnter={stopDefault}
        onDragOver={stopDefault}        
      >{ attachLoad
         ? <TestLoader/> 
         : 'select_file'
      }</label>
      <input type="file"
        className={styles.file}
        id='file'
        onChange={handlerChange}
      />
    </section>
  )
}

