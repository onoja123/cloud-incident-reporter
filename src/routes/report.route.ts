import express from "express";
import { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport,
    deleteReport,
} from "../controllers/report.controller";
import MiddlewareService from "../middlewares/auth.middleware";

const ReportRouter = express.Router()

ReportRouter.use(MiddlewareService.protect)

ReportRouter.get('/get-reports', getAllReports)

ReportRouter.get('/one-report/:id', getReportById);

ReportRouter.post('/create-report', createReport);

ReportRouter.patch('/update-report/:id', updateReport);

ReportRouter.delete('/delete-report/:id', deleteReport)

export default ReportRouter;