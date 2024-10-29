import { and, eq } from 'drizzle-orm/expressions';
import db from '@/config/db.config';
import { takeUniqueOrAct, takeUniqueOrThrow } from '@/util/utils';
import {
	count,
	getTableColumns,
	InferInsertModel,
	InferSelectModel,
	SQLWrapper,
} from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { PagedResult } from '@/util/utils';
import usersTable from '@/user/user.entity';
import booksTable from '@/book/book.entity';

type EntityReturn<TableType extends PgTable> = InferSelectModel<TableType>;
type Entity<TableType extends PgTable> = InferInsertModel<TableType>;
type PrimaryKey<TableType extends PgTable> =
	InferSelectModel<TableType>[PgColumn['name']];

export class BaseRepository<TableType extends PgTable> {
	protected readonly table: TableType;
	protected readonly idColumn: PgColumn;

	constructor(table: TableType, idColumn: PgColumn) {
		this.table = table;
		this.idColumn = idColumn;
	}

	public async exists(id: PrimaryKey<TableType>): Promise<boolean> {
		return await db
			.select()
			.from(this.table)
			.where(eq(this.idColumn, id))
			.then((result) => result.length > 0);
	}

	public async findById(
		id: PrimaryKey<TableType>,
		callbackWhenNotFound: () => void = () => {
			throw new Error('Found non-unique or inexistent value');
		},
	): Promise<EntityReturn<TableType>> {
		return await db
			.select()
			.from(this.table)
			.where(eq(this.idColumn, id))
			.then(<T extends any[]>(values: T): T[number] =>
				takeUniqueOrAct(values, callbackWhenNotFound),
			);
	}

	//Este find aplica unicamente a books por ahora, pero si se necesita en otra entidad hay que mover este a book repository porque solo sirve para eso
	public async findAllWhere(
		andsConditions: (SQLWrapper | undefined)[] = [],
		page?: number,
		pageSize?: number,
	): Promise<any> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = getTableColumns(usersTable);
		const partialResp = db
			.select({
				user: { ...rest },
				book: booksTable,
			})
			.from(this.table)
			.innerJoin(usersTable, eq(booksTable.author_id, usersTable.id))
			.where(and(...andsConditions));

		const resp = await (page && pageSize
			? partialResp.limit(pageSize).offset((page - 1) * pageSize)
			: partialResp);

		const totalResp = await db
			.select({ count: count() })
			.from(this.table)
			.where(and(...andsConditions));

		const totalCount = totalResp[0]?.count || 0; // Accede al total de registros
		return {
			data: resp,
			total: totalCount,
			page: page || 0,
			pageSize: pageSize || 0,
		};
	}

	public async create(
		entity: Entity<TableType>,
	): Promise<EntityReturn<TableType>> {
		const columns = this.getColumns(this.table);
		return await db
			.insert(this.table)
			.values({
				...entity,
				...(columns.has('updated_at')
					? { updated_at: new Date() }
					: {}),
				...(columns.has('created_at')
					? { created_at: new Date() }
					: {}),
			})
			.returning()
			.then(takeUniqueOrThrow);
	}

	public async update(
		entity: Partial<Entity<TableType> & { id: PrimaryKey<TableType> }>,
	): Promise<EntityReturn<TableType>> {
		return this.updateById(entity, entity.id);
	}

	public async updateById(
		entity: Partial<Entity<TableType>>,
		id: PrimaryKey<TableType>,
	): Promise<EntityReturn<TableType>> {
		return await db
			.update(this.table)
			.set(
				this.getColumns(this.table).has('updated_at')
					? entity
					: { ...entity, updated_at: new Date() },
			)
			.where(eq(this.idColumn, id))
			.returning()
			.then(takeUniqueOrThrow);
	}

	public async delete(
		id: PrimaryKey<TableType>,
	): Promise<EntityReturn<TableType>> {
		return await db
			.delete(this.table)
			.where(eq(this.idColumn, id))
			.returning()
			.then(takeUniqueOrThrow);
	}

	private getColumns(table: TableType): Set<string> {
		return Object.keys(getTableColumns(table)).reduce(
			(acc, key) => acc.add(key),
			new Set<string>(),
		);
	}
}
