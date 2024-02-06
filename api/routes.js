const express = require("express");
const EnergyModel = require("./Model");
const router = express.Router();

router.post("api/dashboard/energy", async (req, res) => {
  try {
    const newData = new EnergyModel(req.body);
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("api/dashboard/insights", async (req, res) => {
  try {
    const insights = await EnergyModel.find();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("api/dashboard/filter", async (req, res) => {
  try {
    const { end_year, topic, sector, region, pestle, source, country } =
      req.query;

    const filterObject = {};

    if (end_year) filterObject.end_year = end_year;
    if (topic) filterObject.topic = { $in: topic.split(",") };
    if (sector) filterObject.sector = new RegExp(sector, "i");
    if (region) filterObject.region = new RegExp(region, "i");
    if (pestle) filterObject.pestle = new RegExp(pestle, "i");
    if (source) filterObject.source = new RegExp(source, "i");
    if (country) filterObject.country = new RegExp(country, "i");

    const filteredInsights = await EnergyModel.find(filterObject);
    res.json(filteredInsights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("api/dashboard/visualization", async (req, res) => {
  try {
    const averageIntensityOverTime = await EnergyModel.aggregate([
      {
        $group: {
          _id: "$start_year",
          averageIntensity: { $avg: "$intensity" },
        },
      },
    ]);

    const topicDistribution = await EnergyModel.aggregate([
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
        },
      },
    ]);

    const countryDistribution = await EnergyModel.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
    ]);

    const regionDistribution = await EnergyModel.aggregate([
      {
        $group: {
          _id: "$region",
          count: { $sum: 1 },
        },
      },
    ]);

    const mostCommonTopic = await EnergyModel.aggregate([
      { $group: { _id: "$topic", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    const highestRelevance = await EnergyModel.aggregate([
      { $match: { relevance: { $ne: "" } } },
      { $group: { _id: null, maxRelevance: { $max: "$relevance" } } },
    ]);

    const highestLikelihood = await EnergyModel.aggregate([
      { $match: { likelihood: { $ne: "" } } },
      { $group: { _id: null, maxLikelihood: { $max: "$likelihood" } } },
    ]);

    const mostCommonCity = await EnergyModel.aggregate([
      { $match: { region: { $ne: "" } } },
      { $group: { _id: "$region", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 1 },
    ]);

    res.json({
      averageIntensityOverTime,
      topicDistribution,
      countryDistribution,
      regionDistribution,
      mostCommonTopic,
      highestRelevance,
      highestLikelihood,
      mostCommonCity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("api/dashboard/average", async (req, res) => {
  try {
    const intensityStats = await EnergyModel.aggregate([
      {
        $group: {
          _id: null,
          averageIntensity: { $avg: "$intensity" },
          highestIntensity: {
            $max: {
              $cond: {
                if: { $ne: ["$intensity", ""] },
                then: "$intensity",
                else: null,
              },
            },
          },
          lowestIntensity: { $min: "$intensity" },
        },
      },
    ]);

    if (intensityStats.length === 0) {
      return res.status(404).json({ message: "No documents found." });
    }

    const { averageIntensity, highestIntensity, lowestIntensity } =
      intensityStats[0];

    const aboveAverageCount = await EnergyModel.countDocuments({
      intensity: { $gt: averageIntensity },
    });

    const totalDocuments = await EnergyModel.countDocuments();

    const percentage = (aboveAverageCount / totalDocuments) * 100;

    res.json({
      percentage,
      averageIntensity,
      highestIntensity,
      lowestIntensity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
