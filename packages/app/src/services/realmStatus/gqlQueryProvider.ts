export class GraphQLQueryProvider {
	public get retailUsAndOce() {
		return `{"operationName":"GetInitialRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"us"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"426cde8247fd29903deb1eba33b8891a388724326f75f0ce73d852b6dce66c72"}}}` as const;
	}

	public get retailEu() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"eu"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get retailKr() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"kr"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get retailTw() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"tw"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicUsAndOcea() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic1x-us"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicEu() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic1x-eu"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicKr() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic1x-kr"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicTw() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic1x-tw"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicCataUsAndOce() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic-us"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicCataEu() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic-eu"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicCataKr() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic-kr"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}

	public get classicCataTw() {
		return `{"operationName":"GetRealmStatusData","variables":{"input":{"compoundRegionGameVersionSlug":"classic-tw"}},"extensions":{"persistedQuery":{"version":1,"sha256Hash":"b37e546366a58e211e922b8c96cd1ff74249f564a49029cc9737fef3300ff175"}}}` as const;
	}
}
