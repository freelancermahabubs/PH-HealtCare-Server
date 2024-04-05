
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ScheduleService } from "./schedule.sevice";

const inserIntoDB = catchAsync(async (req, res) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


export const ScheduleController = {
    inserIntoDB
};