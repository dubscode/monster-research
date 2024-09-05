'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import Image from 'next/image';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

export default function MonsterLeaderboard() {
  const monsters = useQuery(api.monsters.all, {});

  const sortedMonsters = monsters
    ?.sort(
      (a, b) =>
        b.safeVotes + b.dangerousVotes - (a.safeVotes + a.dangerousVotes)
    )
    .slice(0, 20);

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>
          Monster Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedMonsters?.map((monster, index) => (
          <div key={monster._id} className='mb-4 flex items-center space-x-4'>
            <div className='text-2xl font-bold'>{index + 1}.</div>
            <div className='relative h-12 w-12'>
              <Image
                src={monster.imageUrl || '/placeholder.svg?height=48&width=48'}
                alt={monster.name}
                layout='fill'
                objectFit='cover'
                className='rounded-full'
              />
            </div>
            <div className='flex-grow'>
              <p className='font-semibold'>{monster.name}</p>
              <p className='text-sm text-gray-500'>
                Votes: {monster.safeVotes + monster.dangerousVotes}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
