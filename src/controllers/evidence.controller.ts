import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import EvidenceService from '../services/evidence.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';


/**
 * @author
 * @description
 * @route `/api/v1/evidence/`
 * @access Public
 * @type POST
 */
export const createEvidence = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

            const newEvidence= await EvidenceService.createEvidence(req.user?.id, req.body);

            if (!newEvidence) {
                return next(new AppError('Evidence not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Evidence created successfully',
                data: newEvidence,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating evidence:', error);
        return next(new AppError('An error occurred while trying to create an evidence. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/evidence/`
 * @access Public
 * @type POST
 */
export const getAllEvidence = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const evidences = await EvidenceService.getAll(req.user?.id);

        if(!evidences || evidences.length === 0) {
            return next(new AppError("Evidence not found", ResponseHelper.RESOURCE_NOT_FOUND))
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: evidences,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all evidences. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/evidence/`
 * @access Public
 * @type POST
 */
export const getEvidenceById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Evidence id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const evidence = await EvidenceService.getEvidenceById(id);

        if (!evidence) {
            return next(new AppError("Evidence not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: evidence,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to get your evidence. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/evidence/`
 * @access Public
 * @type POST
 */
export const updateEvidence = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Evidence id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const updatedEvidence= await EvidenceService.updateEvidence(id, req.body);

        if (!updatedEvidence) {
            return next(new AppError("Evidence not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Evidence updated successfully",
            data: updatedEvidence ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to update an evidence Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/evidence/`
 * @access Public
 * @type POST
 */
export const deleteEvidence = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Evidence id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deleteEvidence = await EvidenceService.deleteEvidence(id);

        if (!deleteEvidence) {
            return next(new AppError("Evidence not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Evidence deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete a report. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})