import express, {NextFunction, Request, Response} from "express";
import {AdminController} from "./admin.controllers";
import {AnyZodObject, z} from "zod";
const router = express.Router();

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});
const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({body: req.body});
      return next();
    } catch (error) {
      next(error);
    }
  };
router.get("/", validateRequest(update), AdminController.getAllFromDB);
router.get("/:id", AdminController.getByIdFromDB);
router.patch("/:id", AdminController.updateIntoDB);
router.delete("/:id", AdminController.deleteFromDB);
router.delete("/soft/:id", AdminController.softDeleteFromDB);
export const adminRoutes = router;
