export function articles2Archive(rawArchive) {
  let curTime = '',
    curArticles = null,
    _list = []
  for (let i = 0, len = rawArchive.length; i < len; i++) {
    const time = rawArchive[i].createdAt.split(' ')[0]
    if (curTime !== time) {
      const curArchive = { time, articles: [] }
      _list.push(curArchive)
      curTime = time
      curArticles = curArchive.articles
    }
    curArticles.push(rawArchive[i])
  }
  return _list
}

export function concatArchive(cachedArchive, newArchive) {
  const lastCachedArchive = cachedArchive[cachedArchive.length - 1]
  const firstNewArchive = newArchive[0]
  const needConcatArticle = lastCachedArchive.time === firstNewArchive.time
  if (needConcatArticle) {
    lastCachedArchive.articles.push(...firstNewArchive.articles)
    cachedArchive.push(...newArchive.slice(1))
  } else {
    cachedArchive.push(...newArchive)
  }
}
