export const app_env = process.env.APP_ENV || 'product';

export const API_URLs = {
  dev: '/',
  test: 'https://pet.wq-info.com/',
  production: 'https://pet.wq-info.com/'
}

export const OSS_URLs = {
  dev: '/',
  test: 'https://admin.yaojunzhiku.com/',
  production: 'https://admin.yaojunzhiku.com/'
}


export const API_URL_DEFINE = API_URLs[app_env];
export const OSS_URL_DEFINE = OSS_URLs[app_env];




