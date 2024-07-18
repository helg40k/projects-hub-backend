import express from 'express';
import Controller from '../controller/index.js';
import Validation from '../validation/index.js';
import validate from '../../../middlewares/validate.js';

const router = express.Router();

router.route('/').post(validate(Validation.getProjects), Controller.getProjects);
router.route('/load').post(Controller.loadDatabase);

export default router;
