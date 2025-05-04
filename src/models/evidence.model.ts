import mongoose, { Schema } from "mongoose";
import { Ievidence } from "../types/interfaces/evidence.inter";

const evidenceSchema = new Schema<Ievidence>({
	_incident: {
		type: Schema.Types.ObjectId,
		ref: "Incident",
	},
	_uploadedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	fileUrl: {
		type: String,
	},
	fileType: {
		type: String,
	},
	description: {
		type: String,
	},

	hash: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Evidence = mongoose.model<Ievidence>('Evidence ', evidenceSchema)

export default Evidence;