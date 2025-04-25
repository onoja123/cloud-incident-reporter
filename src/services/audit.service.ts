import User from "../models/user.model";
import Audit from "../models/audit.model";
import { Iaudit } from "../types/interfaces/audit.inter";

export default class AuditService {

    static async getAll(): Promise<Iaudit[]> {
        const audits = await Audit.find()
        .populate('_user')

        return audits;
    }

    static async getAllByUser(userId: string): Promise<Iaudit[]> {
        const audits = await Audit.find({ user: userId })
        .populate('_user')


        return audits;
    }

    static async getAuditById(id: string): Promise<Iaudit | null> {
        const audits = await Audit.findById(id)
        .populate('_user')

        return audits;
    }

    static async createAudit(userId: string, data: Iaudit): Promise<Iaudit | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newAudit = await Audit.create({
          ...data,
          _user: userId,
        });

        await newAudit.save();

        return newAudit;
      }

    static async updateAudit(id: string, data: Iaudit): Promise<Iaudit | null> {
        const updatedAudit = await Audit.findByIdAndUpdate(id, data,{new: true});
        return updatedAudit;
    }

    static async deleteAudit(id: string): Promise<Iaudit | null> {
        const deletedAudit = await Audit.findByIdAndDelete(id, {new: true});
        return deletedAudit;
    }
}