/* route diagram and logic
* так-как в lib express есть модуль routs мы можем заменять старые app.use/get/post/etc на 
* router.
* также не забываем прописать более понятную логку в самих роутов на более приемлимый вид
* для этого создадим модуль оброботки собыйтий в парке app>controllers и создадим там post-controller.js
* который будет отвечать за всю логику внутри страници связаные с сервером. Такие манипуляции делают код более собранный, позволяя людям(программистом) лучше ориентироваться в коде.
*
* изменение path
* ранише path был интегрирован в server.js 
* но для меньшей путаници было принято решение создать отдельный модуль UIpath.js в разделе core>lib
* Для того чтобы отрисовка ui-элементы в веб приложении, так же названия ммодулля
*/

// import
const express = require('express');
const {
  getPost,
  getPosts,
} = require('../../app/controllers/post-controller');


//include render        
const router = express.Router();


// router
router.get('/posts', getPosts);
router.get('/posts/:id', getPost);


//export rouetr
module.exports = router;