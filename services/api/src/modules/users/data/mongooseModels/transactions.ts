import { generateChangeStreams, mongoose } from '@stranerd/api-commons'
import { TransactionFromModel } from '../models/transactions'
import { TransactionChangeStreamCallbacks } from '@utils/changeStreams/users/transactions'
import { TransactionEntity } from '../../domain/entities/transactions'
import { TransactionMapper } from '../mappers/transactions'
import { TransactionData } from '../../domain/types'

const TransactionSchema = new mongoose.Schema<TransactionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	driverId: {
		type: String,
		required: true
	},
	managerId: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: false,
		default: ''
	},
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as TransactionData,
		required: true
	},
	recordedAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Transaction = mongoose.model<TransactionFromModel>('UsersTransaction', TransactionSchema)

generateChangeStreams<TransactionFromModel, TransactionEntity>(Transaction, TransactionChangeStreamCallbacks, new TransactionMapper().mapFrom).then()