import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const scanRecords = await prisma.scanRecord.findMany({
        orderBy: {
          time: 'desc',
        },
      });
      res.status(200).json(Array.isArray(scanRecords) ? scanRecords : []);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch scan records' });
    }
  } else if (req.method === 'POST') {
    try {
      const newScanRecord = await prisma.scanRecord.create({
        data: req.body,
      });
      res.status(201).json(newScanRecord);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create scan record' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.scanRecord.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete scan record' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
