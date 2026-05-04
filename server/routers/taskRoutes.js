const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { getTasks, createTask } = require('../controllers/taskController');
router.put('/:id', auth, updateTask);
router.get('/', auth, getTasks);
router.post('/', auth, createTask);

module.exports = router;
