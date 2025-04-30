import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import ReportService from '../services/report.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';


/**
 * @author
 * @description
 * @route `/api/v1/report/`
 * @access Public
 * @type POST
 */
export const createReport = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

            const newReport = await ReportService.createReport(req.user?.id, req.body);

            if (!newReport) {
                return next(new AppError('Report not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Report created successfully',
                data: newReport,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating report:', error);
        return next(new AppError('An error occurred while trying to create a report. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/report/`
 * @access Public
 * @type POST
 */
export const getAllReports = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const reports = await ReportService.getAll(req.user?.id);

        if(!reports || reports.length === 0) {
            return next(new AppError("Report not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: reports,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all reports. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/report/`
 * @access Public
 * @type POST
 */
export const getReportById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Report id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const report = await ReportService.getReportById(id);

        if (!report) {
            return next(new AppError("Report not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: report,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get your report. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/report/`
 * @access Public
 * @type POST
 */
export const updateReport = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Report id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const updatedReport = await ReportService.updateReport(id, req.body);

        if (!updatedReport) {
            return next(new AppError("Report not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Report updated successfully",
            data: updatedReport ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to update a report Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/report/`
 * @access Public
 * @type POST
 */
export const deleteReport = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Report id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deleteReport = await ReportService.deleteReport(id);

        if (!deleteReport) {
            return next(new AppError("Report not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Report deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete a report. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})