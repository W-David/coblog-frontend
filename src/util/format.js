export function articles2Archive(rawArchive) {
	let curTime = '',
		curArticles = null,
		_list = [],
		format = rawArchive[0].month ? 'month' : rawArchive[0].week ? 'week' : 'day'
	for (let i = 0, len = rawArchive.length; i < len; i++) {
		const year = rawArchive[i][format].split('-')[0]
		const time =
			format === 'month'
				? `${year}年, ${rawArchive[i][format].split('-')[1]}月`
				: format === 'week'
				? `${year}年, 第${rawArchive[i][format].split('-')[1]}周`
				: `${year}年, ${rawArchive[i][format].split('-')[1]}月, ${rawArchive[i][format].split('-')[2]}日`
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
