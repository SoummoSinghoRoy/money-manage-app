const router = require('express').Router()

const {
  transactionsGetContoller,
  createTransactionPostController,
  singleTransactionGetController,
  transactionEditController,
  transactionDeleteController
} = require('../controllers/transactionController');
const { passportAuthentication } = require('../middleware/authentication');

router.get('/', passportAuthentication, transactionsGetContoller);
router.post('/createTransaction', passportAuthentication, createTransactionPostController);
router.get('/:transactionId', passportAuthentication, singleTransactionGetController);
router.put('/edit/:transactionId', passportAuthentication, transactionEditController);
router.delete('/delete/:transactionId', passportAuthentication, transactionDeleteController);

module.exports = router;