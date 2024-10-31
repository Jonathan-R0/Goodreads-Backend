import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { BaseRepository } from './base.repository';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

type EntityReturn<TableType extends PgTable> = InferSelectModel<TableType>;
type Entity<TableType extends PgTable> = InferInsertModel<TableType>;
type PrimaryKey<TableType extends PgTable> =
	InferSelectModel<TableType>[PgColumn['name']];

export class BaseService<
	TableType extends PgTable,
	R extends BaseRepository<TableType>,
> {
	constructor(private readonly repository: R) {}

	async create(entity: Entity<TableType>): Promise<EntityReturn<TableType>> {
		return await this.repository.create(entity);
	}

	async update(
		entity: Partial<Entity<TableType> & { id: PrimaryKey<TableType> }>,
	): Promise<EntityReturn<TableType>> {
		return await this.repository.update(entity);
	}

	async delete(id: PrimaryKey<TableType>): Promise<EntityReturn<TableType>> {
		return await this.repository.delete(id);
	}

	async findById(
		id: PrimaryKey<TableType>,
	): Promise<EntityReturn<TableType>> {
		return await this.repository.findById(id);
	}
}
