const mode = 'local';
// const mode = 'prod';;

// export const root = 'mainpage';
export const root = 'ams-fornm';
  // export const mainpage = ['MartynenkoAA', 'TatarenkoEG', 'GanakovskiiFS'];
  export const mainpage = [];

export let offlinelang; // if it defined the project use offline mode 
export let apiBase;
export let pathBase = '';
switch ( mode ) {
  case 'local':   apiBase = 'https://asuz.digtp.com/api_tst'; 
                  break;
  case 'prod':    apiBase = `https://${window.location.hostname}/api`;
                  pathBase = `/${root}`
                  break;

  default:        apiBase = 'https://asuz.digtp.com/ams_api_tst';
}