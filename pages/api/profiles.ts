import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const profiles = await prisma.profile.findMany();
      res.status(200).json(profiles.map(p => ({
        ...p,
        allergies: JSON.parse(p.allergies),
        dietaryRestrictions: JSON.parse(p.dietaryRestrictions),
        religiousRestrictions: JSON.parse(p.religiousRestrictions),
        personalDislikes: JSON.parse(p.personalDislikes),
      })));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profiles' });
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
      res.status(500).json({ error: 'Failed to delete profile' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
