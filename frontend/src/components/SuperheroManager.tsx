import React, { useState, useEffect } from 'react';
import './SuperheroManager.css';
import { superherosApi, Superhero } from '../services/api';

const SuperheroManager: React.FC = () => {
  const [superheros, setSuperheros] = useState<Superhero[]>([]);
  const [newName, setNewName] = useState('');
  const [newSuperpower, setNewSuperpower] = useState('');
  const [humilityScore, setHumilityScore] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSuperheros();
  }, []);

  const loadSuperheros = async () => {
    try {
      const response = await superherosApi.getAll();
      setSuperheros(response.data || []);
    } catch (error) {
      console.error('Error loading superheros:', error);
      setError('Failed to load superheroes');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!newName || !newSuperpower || !humilityScore) {
        throw new Error('All fields are required');
      }

      await superherosApi.create({
        name: newName,
        superpower: newSuperpower,
        humilityScore: humilityScore,
      });

      // Refresh the full list after creation
      await loadSuperheros();

      // Reset form
      setNewName('');
      setNewSuperpower('');
      setHumilityScore(1);
    } catch (error) {
      console.error('Submit error:', error);
      setError(
        error instanceof Error ? error.message : 'Failed to create superhero',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const sortedHeroes = [...superheros].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className='superhero-manager'>
      <h1>Superhero Manager</h1>
      {error && <div className='error'>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Hero name'
          required
        />
        <input
          type='text'
          value={newSuperpower}
          onChange={(e) => setNewSuperpower(e.target.value)}
          placeholder='Superpower'
          required
        />
        <input
          type='number'
          min='1'
          max='10'
          value={humilityScore}
          onChange={(e) => setHumilityScore(Number(e.target.value))}
          required
        />
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Hero'}
        </button>
      </form>

      <div className='heroes-list'>
        {sortedHeroes.map((hero) => (
          <div key={hero.id} className='hero-card'>
            <h4>Hero: {hero.name}</h4>
            <p> Super Power: {hero.superpower}</p>
            <p> Humility Score: {hero.humilityScore}</p>
            {/* <button
            // onClick={() =>
            //   hero.id !== undefined ? handleDelete(hero.id) : null
            // }
            >
              Delete
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperheroManager;
