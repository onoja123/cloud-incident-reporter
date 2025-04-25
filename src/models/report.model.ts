import mongoose, { Schema } from "mongoose";
import { Ireport } from "../types/interfaces/report.inter";

const reportSchema = new Schema<Ireport>({
	_incident: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	_generatedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: String,
	},
	signed: {
		type: String,
	},
	signature: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Report = mongoose.model<Ireport>('Report', reportSchema)

export default Report;