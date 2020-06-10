const Cubes = require('../models/Cube');

const cube = {
    async  add(input) {
        try {
            const data = new Cubes(input);
            return await data.save();
        }
        catch (err) {
            console.error(err);
        }
    },

    async remove(id) {
        try {
            return await Cubes.deleteOne({ _id: id });
        }
        catch (err) {
            console.error(err);
        }
    },

    async list() {
        try {
            return await Cubes.find().lean();
        }
        catch (err) {
            console.error(err);
        }
    },

    async  details(id) {
        try {
            return await Cubes.findById(id).populate('accessory').lean();
        }
        catch (err) {
            console.error(err);
        }
    },

    async edit(id, data) {
        try {
            return await Cubes.updateOne({ _id: id }, { $addToSet: { accessory: data } });
        }
        catch (err) {
            console.error(err);
        }
    },
}

module.exports = cube;