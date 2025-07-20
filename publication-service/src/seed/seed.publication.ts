import db  from '../models';
import { PublicationInstance } from '../models/publication';
import { PublicationRepository } from '../repository/publication.repository';

const publicationRepository = new PublicationRepository(db.publication);

export const seedPublications = async (): Promise<PublicationInstance[]> => {
  const existingPublications = await publicationRepository.getAllPublications();

  if (existingPublications.length > 0) {
    console.log('Publicaciones ya existen, omitiendo seeder.');
    return existingPublications;
  }

  const publications = await Promise.all([
    publicationRepository.createPublication({ title: 'Publicación 1', content: 'Contenido de la publicación 1', authorId: 1 }),
    publicationRepository.createPublication({ title: 'Publicación 2', content: 'Contenido de la publicación 2', authorId: 2 }),
    publicationRepository.createPublication({ title: 'Publicación 3', content: 'Contenido de la publicación 3', authorId: 3 }),
    publicationRepository.createPublication({ title: 'Publicación 4', content: 'Contenido de la publicación 4', authorId: 4 }),
  ]);

  console.log('Publicaciones de prueba creadas.');
  return publications;
};
