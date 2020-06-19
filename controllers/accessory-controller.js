const cubeService = require('../controllers/cube-service');
const accessoryService = require('../controllers/accessory-service');
const { list } = require('../controllers/cube-service');

module.exports = {
    //Create new accessory
    create: {
        async get(request, response) {
            await response.render('accessoryCreate',
                {
                    user: request.user,
                });
            return true
        },
        async post(request, response) {
            try {
                const item = await accessoryService.add(request.body);
                await request.user.update('accessories', item._id);
            }
            catch (err) {
                console.error(err);
            }

            return true
        }
    },
    // <--------------------

    //Attach accessory to cube
    attach: {
        async get(request, response) {
            try {
                const cubeDetail = await cubeService.details(request.params.id);
                const accessories = await accessoryService.list() || [];
                const list = accessories.filter(x => {
                    const temp = JSON.stringify(cubeDetail.accessories);
                    const item = x._id.toString();
                    if (!temp.includes(item)) {
                        return true
                    }

                    return false
                });

                response.render(
                    'accessoryAttach',
                    {
                        user: request.user,
                        cube: cubeDetail,
                        accessories: list,
                        isFullAttached: cubeDetail.accessories.length === accessories.length
                    }
                );
            }
            catch (err) {
                console.error(err);
            }

            return true
        },
        async post(request, response) {
            try {
                await cubeService.update(request.params.id, 'accessories', request.body.accessory);
                await accessoryService.update(request.body.accessory, 'cubes', request.params.id);
            }
            catch (err) {
                console.error(err);
            }
            return true
        }
    }
    
};