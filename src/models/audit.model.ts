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


const Evidence = mongoose.model<Iaudit>('Evidence ', auditSchema)

export default Evidence;