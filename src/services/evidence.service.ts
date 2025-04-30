import User from "../models/user.model";
import Evidence from "../models/evidence.model";
import { Ievidence } from "../types/interfaces/evidence.inter";

export default class EvidenceService {

    static async getAll(userId: string): Promise<Ievidence[]> {
        const evidence = await Evidence.find({ user: userId })
        .populate('_incident')
        .populate('_uploadedBy')

        return evidence;
    }

    static async getEvidenceById(id: string): Promise<Ievidence | null> {
        const evidence = await Evidence.findById(id)
        .populate('_incident')
        .populate('_uploadedBy')

        return evidence;
    }

    static async createEvidence(userId: string, data: Ievidence): Promise<Ievidence | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newEvidence = await Evidence.create({
          ...data,
          _user: userId,
        });

        await newEvidence.save();

        return newEvidence;
      }

    static async updateEvidence(id: string, data: Ievidence): Promise<Ievidence | null> {
        const updatedEvidence = await Evidence.findByIdAndUpdate(id, data,{new: true});
        return updatedEvidence;
    }

    static async deleteEvidence(id: string): Promise<Ievidence | null> {
        const deletedEvidence = await Evidence.findByIdAndDelete(id, {new: true});
        return deletedEvidence;
    }
}