import mongoose, { Document } from "mongoose";

export interface Ireport extends Document{
	_incident: mongoose.Types.ObjectId;
	_generatedBy: mongoose.Types.ObjectId;
	content: string;
	signed: Boolean;
	signature: string;
	createdAt: Date;
}
