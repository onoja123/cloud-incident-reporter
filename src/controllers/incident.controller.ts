import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import IncidentService from '../services/incident.service';
import AppError from '../utils/appError';
import ResponseHelper from '../utils/response';


/**
 * @author
 * @description
 * @route `/api/v1/incident/`
 * @access Public
 * @type POST
 */
export const createIncident = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {

            const newIncident = await IncidentService.createIncident(req.user?.id, req.body);

            if (!newIncident) {
                return next(new AppError('Incident not found', ResponseHelper.RESOURCE_NOT_FOUND));
            }

            ResponseHelper.sendSuccessResponse(res, {
                message: 'Incident created successfully',
                data: newIncident,
                statusCode: ResponseHelper.RESOURCE_CREATED,
            });

    } catch (error) {
        console.error('Error creating incident:', error);
        return next(new AppError('An error occurred while trying to create a incident. Please try again.', ResponseHelper.INTERNAL_SERVER_ERROR));
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/incident/`
 * @access Public
 * @type POST
 */
export const getAllIncidents = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const incidents = await IncidentService.getAll(req.user?.id);

        if (!incidents || incidents.length === 0) {
            return ResponseHelper.sendSuccessResponse(res, {
                data: [],
                statusCode: ResponseHelper.OK,
            });
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: incidents,
            statusCode: ResponseHelper.OK,
        });
    } catch (error) {
        return next(new AppError("An error occurred while trying to get all incidents. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/incident/`
 * @access Public
 * @type POST
 */
export const getIncidentById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Incident id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const Incident = await IncidentService.getIncidentById(id);

        if (!Incident) {
            return ResponseHelper.sendSuccessResponse(res, {
                data: [],
                statusCode: ResponseHelper.OK,
            });
        }

        ResponseHelper.sendSuccessResponse(res, {
            data: Incident,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        console.log("Error getting incident:", error);
        return next(new AppError("An error occurred while trying to get your incident. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/incident/`
 * @access Public
 * @type POST
 */
export const updateIncident = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Incident id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const updatedIncident = await IncidentService.updateIncident(id, req.body);

        if (!updatedIncident) {
            return ResponseHelper.sendSuccessResponse(res, {
                data: [],
                statusCode: ResponseHelper.OK,
            });
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Incident updated successfully",
            data: updatedIncident ,
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to update a incident Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})

/**
 * @author
 * @description
 * @route `/api/v1/incident/`
 * @access Public
 * @type POST
 */
export const deleteIncident = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
	try {
        const { id } = req.params;

		if(!id) {
			return next(new AppError("Incident id not found", ResponseHelper.RESOURCE_NOT_FOUND));
		}

        const deletedIncident = await IncidentService.deleteIncident(id);

        if (!deletedIncident) {
            return next(new AppError("Incident not found", ResponseHelper.RESOURCE_NOT_FOUND));
        }

        ResponseHelper.sendSuccessResponse(res, {
            message: "Incident deleted successfully",
            statusCode: ResponseHelper.OK
        });

    } catch (error) {
        return next(new AppError("An error occurred while trying to delete an incident. Please try again.", ResponseHelper.INTERNAL_SERVER_ERROR))
    }
})