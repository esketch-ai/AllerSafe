import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProfiles = [
  {
    id: 'self',
    name: '김민수',
    type: 'self',
    allergies: JSON.stringify(['견과류', '갑각류']),
    dietaryRestrictions: JSON.stringify(['비건']),
    religiousRestrictions: JSON.stringify(['돼지고기', '소고기']),
    personalDislikes: JSON.stringify(['매운맛', '생선류'])
  },
  {
    id: 'family1',
    name: '이지영',
    type: 'family',
    relation: '배우자',
    allergies: JSON.stringify(['우유', '달걀']),
    dietaryRestrictions: JSON.stringify(['글루텐프리']),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['양파', '마늘'])
  },
  {
    id: 'family2',
    name: '김도현',
    type: 'family',
    relation: '자녀',
    allergies: JSON.stringify(['견과류']),
    dietaryRestrictions: JSON.stringify([]),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['브로콜리', '당근'])
  },
  {
    id: 'family3',
    name: '김서윤',
    type: 'family',
    relation: '자녀',
    allergies: JSON.stringify([]),
    dietaryRestrictions: JSON.stringify([]),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['토마토'])
  },
  {
    id: 'family4',
    name: '김영희',
    type: 'family',
    relation: '어머니',
    allergies: JSON.stringify(['콩']),
    dietaryRestrictions: JSON.stringify(['저나트륨']),
    religiousRestrictions: JSON.stringify(['돼지고기']),
    personalDislikes: JSON.stringify([])
  },
  {
    id: 'pet1',
    name: '몽이',
    type: 'pet',
    species: '강아지',
    allergies: JSON.stringify(['초콜릿', '포도']),
    dietaryRestrictions: JSON.stringify(['저지방']),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['양파', '마늘'])
  },
  {
    id: 'pet2',
    name: '나비',
    type: 'pet',
    species: '고양이',
    allergies: JSON.stringify(['우유']),
    dietaryRestrictions: JSON.stringify([]),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['생선'])
  },
  {
    id: 'pet3',
    name: '코코',
    type: 'pet',
    species: '햄스터',
    allergies: JSON.stringify([]),
    dietaryRestrictions: JSON.stringify([]),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify(['감귤류'])
  },
  {
    id: 'pet4',
    name: '루비',
    type: 'pet',
    species: '앵무새',
    allergies: JSON.stringify(['아보카도']),
    dietaryRestrictions: JSON.stringify([]),
    religiousRestrictions: JSON.stringify([]),
    personalDislikes: JSON.stringify([])
  }
];

export default async function handler(req, res) {
  // 데이터베이스에 프로필이 없으면 초기 데이터 삽입
  if (req.method === 'GET') {
    try {
      let profiles = await prisma.profile.findMany();
      if (profiles.length === 0) {
        await prisma.profile.createMany({ data: initialProfiles });
        profiles = await prisma.profile.findMany(); // 다시 조회하여 삽입된 데이터 가져오기
      }
      res.status(200).json(profiles.map(p => ({
        ...p,
        allergies: JSON.parse(p.allergies),
        dietaryRestrictions: JSON.parse(p.dietaryRestrictions),
        religiousRestrictions: JSON.parse(p.religiousRestrictions),
        personalDislikes: JSON.parse(p.personalDislikes),
      })));
    } catch (error) {
      console.error('Error fetching or initializing profiles:', error);
      res.status(500).json({ error: 'Failed to fetch or initialize profiles' });
    }
  } else if (req.method === 'POST') {
    try {
      const { allergies, dietaryRestrictions, religiousRestrictions, personalDislikes, ...data } = req.body;
      const newProfile = await prisma.profile.create({
        data: {
          ...data,
          allergies: JSON.stringify(allergies || []),
          dietaryRestrictions: JSON.stringify(dietaryRestrictions || []),
          religiousRestrictions: JSON.stringify(religiousRestrictions || []),
          personalDislikes: JSON.stringify(personalDislikes || []),
        },
      });
      res.status(201).json({
        ...newProfile,
        allergies: JSON.parse(newProfile.allergies),
        dietaryRestrictions: JSON.parse(newProfile.dietaryRestrictions),
        religiousRestrictions: JSON.parse(newProfile.religiousRestrictions),
        personalDislikes: JSON.parse(newProfile.personalDislikes),
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Failed to create profile' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, allergies, dietaryRestrictions, religiousRestrictions, personalDislikes, ...data } = req.body;
      const updatedProfile = await prisma.profile.update({
        where: { id },
        data: {
          ...data,
          allergies: JSON.stringify(allergies || []),
          dietaryRestrictions: JSON.stringify(dietaryRestrictions || []),
          religiousRestrictions: JSON.stringify(religiousRestrictions || []),
          personalDislikes: JSON.stringify(personalDislikes || []),
        },
      });
      res.status(200).json({
        ...updatedProfile,
        allergies: JSON.parse(updatedProfile.allergies),
        dietaryRestrictions: JSON.parse(updatedProfile.dietaryRestrictions),
        religiousRestrictions: JSON.parse(updatedProfile.religiousRestrictions),
        personalDislikes: JSON.parse(updatedProfile.personalDislikes),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await prisma.profile.delete({
        where: { id },
      });
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
