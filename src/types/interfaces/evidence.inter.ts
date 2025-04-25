import mongoose, { Document } from "mongoose";

export interface Ievidence extends Document{
	_incident: mongoose.Types.ObjectId;
	_uploadedBy: mongoose.Types.ObjectId;
	fileUrl: string;
	fileType: Boolean;
	description: string;
	hash: string;
	createdAt: Date;
}
