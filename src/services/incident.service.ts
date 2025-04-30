import Incident from "../models/incident.model";
import User from "../models/user.model";
import { Iincident } from "../types/interfaces/incident.inter";

export default class IncidentService {

    static async getAll(): Promise<Iincident[]> {
        const incidents = await Incident.find()
        .populate('_createdBy')
        .populate('_assignedTo')
        return incidents;
    }

    static async getAllByUser(userId: string): Promise<Iincident[]> {
        const incidents = await Incident.find({ user: userId })
        .populate('_createdBy')
        .populate('_assignedTo')

        return incidents;
    }

    static async getIncidentById(id: string): Promise<Iincident | null> {
        const incidents = await Incident.findById(id)
        .populate('_createdBy')
        .populate('_assignedTo')
        return incidents;
    }

    static async createIncident(userId: string, data: Iincident): Promise<Iincident | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newIncident = await Incident.create({
          ...data,
          user: userId,
        });

        await newIncident.save();

        return newIncident;
      }

    static async updateIncident(id: string, data: Iincident): Promise<Iincident | null> {
        const updatedIncident = await Incident.findByIdAndUpdate(id, data,{new: true});
        return updatedIncident;
    }

    static async deleteIncident(id: string): Promise<Iincident | null> {
        const deleteIncident = await Incident.findByIdAndDelete(id, {new: true});
        return deleteIncident;
    }
}