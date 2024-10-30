const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res) => {
    try {
      // check row saleTemp
      const rowSaleTemp = await prisma.saleTemp.findFirst({
        where: {
          userId: req.body.userId,
          tableNo: req.body.tableNo,
        },
      });
      let saleTempId = 0;

      // if row not exist
      if (!rowSaleTemp) {
        const saleTemp = await prisma.saleTemp.create({
          data: {
            userId: req.body.userId,
            tableNo: req.body.tableNo,
          },
        });
        saleTempId = saleTemp.id;
      } else {
        saleTempId = rowSaleTemp.id;
      }

      await prisma.saleTempDetail.create({
        data: {
          saleTempId: saleTempId,
          foodId: req.body.foodId,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  list: async (req, res) => {
    try {
      const saleTemps = await prisma.saleTemp.findMany({
        include: {
          SaleTempDetails: {
            include: {
              Food: true,
              Taste: true,
              FoodSize: true,
            },
          },
        },
      });
      return res.send({ results: saleTemps });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  remove: async (req, res) => {
    try {
      await prisma.saleTempDetail.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
  removeAll: async (req, res) => {
    try {
      const saleTemp = await prisma.saleTemp.findFirst({
        where: {
          userId: parseInt(req.body.userId),
          tableNo: parseInt(req.body.tableNo),
        },
      });

      await prisma.saleTempDetail.deleteMany({
        where: {
          saleTempId: saleTemp.id,
        },
      });

      await prisma.saleTemp.delete({
        where: {
          id: saleTemp.id,
        },
      });

      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.message });
    }
  },
};
