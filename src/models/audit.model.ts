import mongoose, { Schema } from "mongoose";
import { Iaudit } from "../types/interfaces/audit.inter";

const auditSchema = new Schema<Iaudit>({
	_user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	action: {
		type: String,
	},
	targetModel: {
		type: String,
	},
	description: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Audit = mongoose.model<Iaudit>('Audit ', auditSchema)

export default Audit;