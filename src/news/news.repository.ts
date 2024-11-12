import { BaseRepository } from '@/util/base.repository';
import newsTable from './news.entity';

export class NewsRepository extends BaseRepository<typeof newsTable> {
	constructor() {
		super(newsTable, newsTable.id);
	}
}
