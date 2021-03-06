import { BaseMapper } from '@stranerd/api-commons'
import { TransactionEntity } from '../../domain/entities/transactions'
import { TransactionFromModel, TransactionToModel } from '../models/transactions'

export class TransactionMapper extends BaseMapper<TransactionFromModel, TransactionToModel, TransactionEntity> {
	mapFrom (param: TransactionFromModel | null) {
		return !param ? null : new TransactionEntity({
			id: param._id.toString(),
			driverId: param.driverId,
			managerId: param.managerId,
			amount: param.amount,
			description: param.description,
			data: param.data,
			recordedAt: param.recordedAt,
			createdAt: param.createdAt,
			updatedAt: param.updatedAt
		})
	}

	mapTo (param: TransactionEntity) {
		return {
			driverId: param.driverId,
			managerId: param.managerId,
			amount: param.amount,
			description: param.description,
			data: param.data,
			recordedAt: param.recordedAt
		}
	}
}