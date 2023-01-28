const OSS = require('ali-oss')

const getOssClient = store => {
  const sts = store.getters.sts
  if (sts) {
    const client = new OSS({
      secure: true,
      region: 'oss-cn-beijing',
      bucket: 'coblog-upload',
      accessKeyId: sts.AccessKeyId,
      accessKeySecret: sts.AccessKeySecret,
      stsToken: sts.SecurityToken,
      refreshToken: async () => {
        const sts = await store.dispatch('alioss/FetchSTS')
        const stsObj = {
          accessKeyId: sts.AccessKeyId,
          accessKeySecret: sts.AccessKeySecret,
          stsToken: sts.SecurityToken
        }
        return stsObj
      },
      refreshSTSTokenInternal: 300000
    })
    return client
  } else {
    return null
  }
}

export default getOssClient
