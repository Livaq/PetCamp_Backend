const Router = require('express');
const clientProfileController = require('../controllers/clientControllers/clientProfileController');
const petCampController = require('../controllers/clientControllers/petCampController');
const petsController = require('../controllers/clientControllers/petsController');
const bookingsController = require('../controllers/clientControllers/bookingController');
const mySettingsController = require('../controllers/clientControllers/mySettingsController');
const authCheckMiddleware = require('../middlewares/authCheckMiddleware');
const reportController = require('../controllers/clientControllers/reportController');
const forgotPasswordController = require('../controllers/clientControllers/forgotPasswordController');
const calendarController = require('../controllers/clientControllers/calendarController');

const router = Router();

router.get(
  '/clientProfileInfo/:id',
  authCheckMiddleware,
  clientProfileController.responseProfileInfo
);

router.get('/petCamps', petCampController.getCamps);
router.get(
  '/freeRooms/:id/:start/:end',
  petCampController.getFreeRoomsController
);

router.get('/pets/:id', authCheckMiddleware, petsController.getPets);
router.delete('/delete-pet/:id', authCheckMiddleware, petsController.deletePet);
router.post('/pets/:id', authCheckMiddleware, petsController.postPet);
router.get('/pets/:type/:id', authCheckMiddleware, petsController.getPets);
router.post('/bookings', authCheckMiddleware, bookingsController.sendBooking);
router.get(
  '/bookings/:id',
  authCheckMiddleware,
  bookingsController.receiveUserBooking
);
router.delete(
  '/delete-booking/:id',
  authCheckMiddleware,
  bookingsController.deleteBooking
);
router.get(
  '/mySettings/:id',
  authCheckMiddleware,
  mySettingsController.responseMySettings
);
router.put(
  '/mySettings',
  authCheckMiddleware,
  mySettingsController.sendMySettings
);
router.get(
  '/reports/:id',
  authCheckMiddleware,
  reportController.receiveReports
);
router.post('/forgot-password', forgotPasswordController.forgotPassword);
router.post('/change-password', forgotPasswordController.changePassword);
router.get('/get-calendar', calendarController.getCalendar);

router.delete(
  '/disable-booking/:id',
  authCheckMiddleware,
  bookingsController.disableBooking
);

module.exports = router;
