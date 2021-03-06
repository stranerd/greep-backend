import { generateChangeStreams, mongoose } from '@stranerd/api-commons'
import { CustomerFromModel } from '../models/customers'
import { CustomerChangeStreamCallbacks } from '@utils/changeStreams/users/customers'
import { CustomerEntity } from '../../domain/entities/customers'
import { CustomerMapper } from '../mappers/customers'

const CustomerSchema = new mongoose.Schema<CustomerFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	name: {
		type: String,
		required: true
	},
	driverId: {
		type: String,
		required: true
	},
	trips: {
		type: Number,
		required: false,
		default: 0
	},
	debt: {
		type: Number,
		required: false,
		default: 0
	}
}, { minimize: false })

export const Customer = mongoose.model<CustomerFromModel>('UsersCustomer', CustomerSchema)

generateChangeStreams<CustomerFromModel, CustomerEntity>(Customer, CustomerChangeStreamCallbacks, new CustomerMapper().mapFrom).then()