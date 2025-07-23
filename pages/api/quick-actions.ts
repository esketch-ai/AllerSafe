import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialQuickActions = [
  {
    icon: 'ri-scan-line',
    title: '바코드 스캔',
    desc: '식품 안전성 확인',
    href: '/scan',
    bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20barcode%20scanner%2C%20modern%20scanning%20device%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20blue%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=scan&orientation=squarish'
  },
  {
    icon: 'ri-restaurant-line',
    title: '안전 식당',
    desc: '알레르기 대응 식당',
    href: '/restaurants',
    bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20restaurant%20building%2C%20modern%20cafe%20storefront%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20orange%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=restaurant&orientation=squarish'
  },
  {
    icon: 'ri-heart-pulse-line',
    title: '응급 도움',
    desc: '알레르기 응급상황',
    href: '/emergency',
    bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20medical%20cross%2C%20emergency%20medical%20symbol%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20red%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=emergency&orientation=squarish'
  },
  {
    icon: 'ri-book-open-line',
    title: '알레르기 정보',
    desc: '상세 정보 확인',
    href: '/info',
    bg: 'https://readdy.ai/api/search-image?query=icon%2C%203D%20cartoon%20open%20book%2C%20educational%20book%20with%20pages%2C%20clean%20white%20background%2C%20the%20icon%20should%20take%20up%2070%25%20of%20the%20frame%2C%20vibrant%20green%20and%20white%20colors%20with%20soft%20gradients%2C%20minimalist%20design%2C%20smooth%20rounded%20shapes%2C%20subtle%20shading%2C%20no%20outlines%2C%20centered%20composition%2C%20isolated%20on%20white%20background%2C%20playful%20and%20friendly%20aesthetic%2C%20isometric%20perspective%2C%20high%20detail%20quality%2C%20clean%20and%20modern%20look%2C%20single%20object%20focus&width=100&height=100&seq=info&orientation=squarish'
  },
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let quickActions = await prisma.quickAction.findMany();
      if (quickActions.length === 0) {
        await prisma.quickAction.createMany({ data: initialQuickActions });
        quickActions = await prisma.quickAction.findMany();
      }
      res.status(200).json(quickActions);
    } catch (error) {
      console.error('Error fetching or initializing quick actions:', error);
      res.status(500).json({ error: 'Failed to fetch or initialize quick actions' });
    }
  } else if (req.method === 'POST') {
    try {
      const newQuickAction = await prisma.quickAction.create({
        data: req.body,
      });
      res.status(201).json(newQuickAction);
    } catch (error) {
      console.error('Error creating quick action:', error);
      res.status(500).json({ error: 'Failed to create quick action' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, ...data } = req.body;
      const updatedQuickAction = await prisma.quickAction.update({
        where: { id },
        data,
      });
      res.status(200).json(updatedQuickAction);
    } catch (error) {
      console.error('Error updating quick action:', error);
      res.status(500).json({ error: 'Failed to update quick action' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.quickAction.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting quick action:', error);
      res.status(500).json({ error: 'Failed to delete quick action' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
