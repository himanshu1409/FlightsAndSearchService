const { City } = require("../models/index");

class CityRepository {
  async createCity({ name }) {
    try {
      const city = await City.create({ name });
      return city;
    } catch (error) {
      console.log("Something went wrong at the Repository layer");
      throw { error };
    }
  }

  async deleteCity(cityId) {
    try {
      await City.destroy({
        where: {
          id: cityId,
        },
      });
      return true;
    } catch (error) {
      console.log("Something went wrong at the Repository layer");
      throw { error };
    }
  }

  async getCity(cityId) {
    try {
      const city = await City.findByPk(cityId);
      //   console.log(`City with id ${cityId} found`, city.name);
      return city;
    } catch (error) {
      console.log("Something went wrong at the Repository layer");
      throw { error };
    }
  }

  async updateCity(cityId, data) {
    try {
      // The below approach also works but will not return updated object instead an array
      // If we are using PostgreSQL then returning:true can be used, else not
      //   const city = await City.update(data, {
      //     where: { id: cityId },
      //   });
      const city = await City.findByPk(cityId);
      city.name = data.name;
      await city.save();
      return city;
    } catch (error) {
      console.log("Something went wrong at the Repository layer");
      throw { error };
    }
  }
}

module.exports = CityRepository;
