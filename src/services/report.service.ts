import User from "../models/user.model";
import Report from "../models/report.model";
import { Ireport } from "../types/interfaces/report.inter";

export default class ReportService {

    static async getAll(userId: string): Promise<Ireport[]> {
        const reports = await Report.find({ user: userId })
        .populate('_incident')
        .populate('_generatedBy')

        return reports;
    }

    static async getReportById(id: string): Promise<Ireport | null> {
        const reports = await Report.findById(id)
        .populate('_incident')
        .populate('_generatedBy')

        return reports;
    }

    static async createReport(userId: string, data: Ireport): Promise<Ireport | null> {
        const user = await User.findById(userId);

        if (!user) {
          return null;
        }

        const newReport = await Report.create({
          ...data,
          _user: userId,
        });

        await newReport.save();

        return newReport;
      }

    static async updateReport(id: string, data: Ireport): Promise<Ireport | null> {
        const updatedReport = await Report.findByIdAndUpdate(id, data,{new: true});
        return updatedReport;
    }

    static async deleteReport(id: string): Promise<Ireport | null> {
        const deletedReport = await Report.findByIdAndDelete(id, {new: true});
        return deletedReport;
    }
}