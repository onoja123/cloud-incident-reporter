import mongoose, { Schema } from "mongoose";
import { Iincident, Status } from "../types/interfaces/incident.inter";

const incidentSchema = new Schema<Iincident>({
	_createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	_assignedTo: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
	},
	targetModel: {
		type: String,
	},
	targetId: {
		type: Schema.Types.ObjectId,
	},
	description: {
		type: String,
	},
	location: {
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		},
	},
	tag: {
		type: [String],
	},
	status: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	  },
});


const Incident = mongoose.model<Iincident>('Incident', incidentSchema)

export default Incident;