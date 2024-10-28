import { PasswordlessUser, User } from '@/user/user.entity';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const takeUniqueOrThrow = <T extends any[]>(values: T): T[number] => {
	if (values.length !== 1)
		throw new Error('Found non-unique or inexistent value');
	return values[0]!;
};

export const takeUniqueOrNull = <T extends any[]>(
	values: T,
): T[number] | null => {
	if (values.length > 1) return null;
	return values[0]!;
};

export const takeUniqueOrAct = <T extends any[]>(
	values: T,
	callback: () => void,
): T[number] => {
	if (values.length !== 1) callback();
	return values[0]!;
};

export function ApiPaged() {
	return applyDecorators(
		ApiQuery({
			name: 'page',
			required: false,
			type: Number,
			description: 'Page number',
		}),
		ApiQuery({
			name: 'pageSize',
			required: false,
			type: Number,
			description: 'Number of items per page',
		}),
	);
}

export interface GoodResponse<T> {
	status: 'success';
	data: T | null;
}

export interface BadResponse {
	status: 'error';
	message: string | null;
	url: string;
}

export type StandardResponse<T> = GoodResponse<T> | BadResponse;

export function success<T>(data?: T | null): GoodResponse<T> {
	return {
		status: 'success',
		data: data ?? null,
	};
}

export function removePassword<T extends { password: string | null }>(data: T) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...rest } = data;
	return rest;
}

export function successWithoutUserPassword(
	user: User,
): StandardResponse<PasswordlessUser> {
	return success(removePassword(user));
}

export function successWithoutUsersPasswords(
	users: User[],
): StandardResponse<PasswordlessUser[]> {
	return success(users.map((user) => removePassword(user)));
}

export function failure(message: string | undefined, url: string): BadResponse {
	return {
		status: 'error',
		message: message ?? null,
		url,
	};
}

export interface PagedResult<T> {
	data: T;
	total: number;
	page: number;
	pageSize: number;
}
export interface PagedResult<T> {
	data: T;
	total: number;
	page: number;
	pageSize: number;
}
