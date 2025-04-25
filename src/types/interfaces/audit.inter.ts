import mongoose, { Document } from "mongoose";

export interface Iaudit extends Document{
	_user: mongoose.Types.ObjectId;
	action: string;
	targetModel: string;
	targetId: mongoose.Types.ObjectId;
	description: string;
	createdAt: Date;
}
