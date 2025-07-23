import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialScanRecords = [
  { name: '오리온 초코파이', status: 'safe', icon: 'ri-check-line' },
  { name: '롯데 아몬드 과자', status: 'warning', icon: 'ri-error-warning-line' },
  { name: '해태 감자칩', status: 'safe', icon: 'ri-check-line' },
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let scanRecords = await prisma.scanRecord.findMany({
        orderBy: {
          time: 'desc',
        },
      });

      if (scanRecords.length === 0) {
        // 초기 데이터 삽입
        await prisma.scanRecord.createMany({ data: initialScanRecords });
        scanRecords = await prisma.scanRecord.findMany({
          orderBy: {
            time: 'desc',
          },
        });
      }
      res.status(200).json(scanRecords);
    } catch (error) {
      console.error('Error fetching or initializing scan records:', error);
      res.status(500).json({ error: 'Failed to fetch or initialize scan records' });
    }
  } else if (req.method === 'POST') {
    try {
      const newScanRecord = await prisma.scanRecord.create({
        data: req.body,
      });
      res.status(201).json(newScanRecord);
    } catch (error) {
      console.error('Error creating scan record:', error);
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
      console.error('Error deleting scan record:', error);
      res.status(500).json({ error: 'Failed to delete scan record' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
