const router=require('express').Router();
const {read,add,update,deleteblog,like,watch,readByDate,bylike,bywatch}=require('../controller/blogController');
router.get('/read',read);
router.get('/date',readByDate);
router.get('/bylike',bylike);
router.get('/bywatch',bywatch);
router.post('/add/',add);
router.put('/edit/',update);
router.delete('/delete/:id',deleteblog);
router.get('/like/:id',like);
router.put('/watch/:id',watch);

module.exports = router;