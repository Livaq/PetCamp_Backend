const Router = require('express');
const adminController = require('../controllers/adminControllers/adminController');
const authCheckMiddleware = require('../middlewares/authCheckMiddleware');

const router = new Router();

router.get('/getBookings/:manager',authCheckMiddleware, adminController.getClientsBooking);
router.get('/get-rooms',authCheckMiddleware, adminController.getRooms)
router.get('/get-reports-number',authCheckMiddleware, adminController.getReportNumber)
router.post('/post-report',authCheckMiddleware, adminController.postReport)
router.get('/get-reports', authCheckMiddleware, adminController.getReports);
router.get('/get-pet/:petId', authCheckMiddleware, adminController.getPet);
router.delete('/disable-booking/:id', authCheckMiddleware, adminController.disableBooking);


module.exports = router;
