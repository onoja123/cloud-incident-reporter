import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AuditService from '../services/audit.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';


/**
 * @author
 * @description
 * @route `/api/v1/audit/`
 * @access Public
 * @type POST
 */
export const createAudit = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

            const newAudit = await AuditService.createAudit(req.user?.id, req.body);

            if (!newAudit) {
                return next(new AppError('Audit not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Audit created successfully',
                data: newAudit,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating audit:', error);
        return next(new AppError('An error occurred while trying to create an audit. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/audit/`
 * @access Public
 * @type POST
 */
export const getAllAudits = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const audits = await AuditService.getAll(req.user?.id);

        // if(!audits || audits.length === 0) {
        //     return next(new AppError("Audits not found", ResponseHelper.RESOURCE_NOT_FOUND))
        // }

        ResponseHelper.sendSuccessResponse(res, {
            data: audits,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all audits. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/audit/`
 * @access Public
 * @type POST
 */
export const getAuditById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Audit id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const audit = await AuditService.getAuditById(id);

        if (!audit) {
            return next(new AppError("Audit not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: audit,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get your audit. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/audit/`
 * @access Public
 * @type POST
 */
export const updateAudit = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Audit id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const updatedAudit = await AuditService.updateAudit(id, req.body);

        if (!updatedAudit) {
            return next(new AppError("Audit not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Audit updated successfully",
            data: updatedAudit ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to update a audit Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/audit/`
 * @access Public
 * @type POST
 */
export const deleteAudit = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Audit id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deleteAudit = await AuditService.deleteAudit(id);

        if (!deleteAudit) {
            return next(new AppError("Audit not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Audit deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete an audit. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})