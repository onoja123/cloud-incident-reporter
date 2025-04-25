import mongoose, { Document } from "mongoose";

export enum Status {
	OPEN = 'open',
	IN_PROGRESS = 'in_progress',
	RESOLVED = 'resolved',
}

export interface Location{
	latitude: number;
	longitude: number;
}

export interface Iincident extends Document{
	_createdBy: mongoose.Types.ObjectId;
	_assignedTo: mongoose.Types.ObjectId;
	title: string;
	targetModel: string;
	targetId: mongoose.Types.ObjectId;
	description: string;
	location: Location;
	tag: [string];
	status: Status;
	createdAt: Date;
}
