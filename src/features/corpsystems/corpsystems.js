import React, { useEffect, useState } from "react";
import styles from './corpsystems.module.scss';
import { useSelector, useDispatch } from "react-redux";
import { user, loading } from '../user/userSlice';
import dictionary from '../../dictionary.json';
import info from '../../info.json';
import { darkTheme } from "../main/mainpageSlice";
import { TopBar } from "../topBar/topBar";
import { useParams } from "react-router-dom";
import { corpSyst, getSessionKey, getCorpsystem, userData, 
  setBoss, clearForm, getSystemList, processGroupListData, roleListData, rolesData, } from "./corpsystemsSlice";
import { changeTheme } from "../main/mainpageSlice";
import { UserData } from "../userData/userData";
import { Row } from "../components/row/row";
import { SelectInput } from "../components/selectInput/selectInput";
import { Systems } from "./systems/systems";
import { Roles } from "./roles/roles";
import { Approvals } from "./approvals/approvals";
import { setShowInfo, showInfoData, textInfoData, processLevel, sessionKeyData, clearApprovals, approvalsData, getGetParam, getGuides, getHints, } from "./corpsystemsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faTriangleExclamation, faCircleXmark, } from '@fortawesome/free-solid-svg-icons'
import { Submit } from "./submit/submit";
import { InfoList } from "../components/infoList/infoList";
import { Hint } from "../components/hint/hint";
import { RowHint } from "../components/rowHint/rowHint";

export const Corpsystems = () => {
  
  const { system } = useParams();
  const dispatch  = useDispatch();

  const { lang, api_key, last_name, first_name, 
  middle_name, }        = useSelector(user);
  const dark              = useSelector(darkTheme);
  const load              = useSelector(loading);
  const cs                = useSelector(corpSyst);
  const mainUser          = useSelector(userData);
  const processGroupList  = useSelector(processGroupListData);
  const roleList          = useSelector(roleListData);
  const roles             = useSelector(rolesData);
  const showInfo          = useSelector(showInfoData);
  const textInfo          = useSelector(textInfoData);
  const sessionKey        = useSelector(sessionKeyData);
  const approvals         = useSelector(approvalsData);

  useEffect(() => {
    dispatch(getSessionKey( {'api_key': api_key} ))
    dispatch(getCorpsystem({'url': 'corpsystems', 'path': system, 'api_key': api_key}));
    dispatch(changeTheme( false || JSON.parse(localStorage.getItem('darkTheme')) ));
  }, [api_key, dispatch, system]);

  useEffect(() => {
    if ( cs && cs.asz22_id && cs.instance_type ) 
      dispatch(getSystemList( {'api_key': api_key, 'asz22_id': cs.asz22_id, 'instance_type': cs.instance_type, 'lang': lang} ))
  }, [api_key, cs, dispatch, lang]);


  useEffect(() => {
    if ( cs?.asz22_id ) dispatch(getGetParam( {'api_key': api_key, 'asz22_id': cs.asz22_id,} ));
  },[api_key, cs?.asz22_id, dispatch]);

  useEffect(() => {
    if ( cs?.system_prefix ) dispatch(getGuides( {'api_key': api_key, 'system_prefix': cs.system_prefix,} ));
    if ( cs?.system_prefix ) dispatch(getHints( {'api_key': api_key, 'system_prefix': cs.system_prefix,} ));
  },[api_key, cs?.system_prefix, dispatch]);


  const removeSession = () => {
    dispatch(processLevel({api_key, event: 'rmSession', session_key: sessionKey, }));
  }

  let corpsystemsStyle = dark 
    ? `${styles.corpsystems} ${styles.dark}`
    : `${styles.corpsystems}`

  corpsystemsStyle = cs && cs.instance_type === "TEST"
    ? `${corpsystemsStyle} ${styles.test}`
    : `${corpsystemsStyle}`

  const onSetBoss = val => {
    if ( !val ) {
      dispatch(clearForm());
      removeSession();
      dispatch(clearApprovals())
    }
    dispatch(setBoss(val))
  };

  const infoIconStyle = textInfo && info[textInfo]['mode'] ? `${styles.infoIcon} ${styles[info[textInfo]['mode']]}` : `${styles.infoIcon}`;

  const [showHint, setShowHint] = useState(null); 

  return (
    <section className={corpsystemsStyle} >
      <div className={styles.wrapperCS} >
        <TopBar/>
        
        { !load
          ? <form className={styles.form}>
              { cs 
                ? <h3 className={styles.nameForm}>{
                    lang === 'ZH' 
                    ? `${cs.name} ${dictionary.application_for_access_to[lang]}`
                    : `${dictionary.application_for_access_to[lang]} ${cs.name}`
                  }</h3>
                : null
              }

              <div className={styles.guides}>
                <InfoList/>
              </div>

              <div className={styles.aplicantRow}
                onMouseOver = {() => setShowHint('aplicant')}
                onMouseOut = {() => setShowHint(null)}              
              >
                <div className={styles.aplicantLabel}>{`${dictionary.applicant[lang]}:`}</div>
                <div className={styles.applicantName}>{`${last_name} ${first_name} ${middle_name} `}</div>
                <div className = {styles.hint}>
                  <Hint
                    isData = {true}
                    field = 'aplicant'
                    over = {showHint}
                    className = {styles.hint}
                  />                 
                </div>

              </div>

              <UserData 
                removeSession = { removeSession }
              />

              { mainUser.id 
                && mainUser.company.hrs01_id 
                && mainUser.branch.hrs05_id 
                && mainUser.department.app22_id 
                && mainUser.position_name 
                && mainUser.email
                ? <>
                    {/* <Row>
                      <label>{`${dictionary.user_boss[lang]}`}</label>
                      <div className={styles.wrapField}
                        onMouseOver = {() => setShowHint('user_boss')}
                        onMouseOut = {() => setShowHint(null)}
                      >
                        <SelectInput
                          selectHandler = { val => onSetBoss(val) }
                          placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
                          val = ''
                          name='bossName'
                          mode = 'boss'
                          id = 'oredrBoss'
                        />  
                        <Hint
                          isData = {mainUser.boss}
                          field = 'user_boss'
                          over = {showHint}
                        />                 
                      </div>                     
                    </Row> */}

                    <RowHint
                      label = {dictionary.user_boss[lang]}
                      field = {'oredrBoss'}
                      thereIs = {true}
                      isData = {mainUser.boss}
                    >
                      <SelectInput
                        selectHandler = { val => onSetBoss(val) }
                        placeholder = {`${dictionary.userNameOlaceholder[lang]}`}
                        val = ''
                        name='bossName'
                        mode = 'boss'
                        id = 'oredrBoss'
                      />
                    </RowHint>

                    { mainUser.boss
                      ? <>
                          <Systems 
                            removeSession = { removeSession }
                          />

                          { processGroupList.length && roleList.length
                            ? <>
                                <div className={styles.gapRow}></div>
                                <Roles/>

                                { roles.length
                                  ? <>
                                      <div className={styles.gapRow}></div>  
                                      <Approvals/>

                                      { approvals.length
                                        ? <Submit/>
                                        : null
                                      }
                                      
                                    </> 
                                  : null
                                }  

                              </>
                            : null
                          }
                        </>
                      : null
                    }
                  </>
                : null
              }
            </form>
          : null
        }
      </div>

      { showInfo === 'on'
          ? <div className={styles.info}>
              <div className={styles.infoWindow}>
                
                <div className={infoIconStyle}>
                  { info[textInfo]['mode'] === 'info'
                    ? <FontAwesomeIcon icon={ faCircleInfo }/>
                    : info[textInfo]['mode'] === 'warning'
                      ? <FontAwesomeIcon icon={ faTriangleExclamation }/>
                      : info[textInfo]['mode'] === 'error'
                        ? <FontAwesomeIcon icon={ faCircleXmark }/>
                        : null  
                  }                  
                </div>

                <div className={styles.textArea}>{info[textInfo][lang]}</div>
                
                <button className={styles.closeInfoBtn}
                  type="buttton"
                  onClick={() => dispatch(setShowInfo({showInfo: 'off', data: '', })) }
                >{info[textInfo]['btn'][lang]}</button>                
              </div>

          
            </div>
          : null
      }

    </section>
  )
}
