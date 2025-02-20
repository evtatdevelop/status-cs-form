let mode = 'local';
// mode = 'prod';

export let apiBase;
export let pathBase = '';
switch ( mode ) {              
  case 'local':   apiBase = 'https://asuz.digtp.com/api_tst'; break;
  case 'prod':    apiBase = `https://${window.location.hostname}/api`; break;
  default:        apiBase = 'https://asuz.digtp.com/api_tst';
}
export let oredrType = 'corpsystems';
// oredrType = 'workplace';
// oredrType = 'resource';
