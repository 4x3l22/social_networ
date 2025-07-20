import { PublicationRepository } from '../repository/publication.repository';
import { PublicationCreationAttributes } from '../models/publication';
import db from '../models';

interface RegisterResponse {
  publication: any; 
}
const publicationRepo = new PublicationRepository(db.publication);

export const register = async (data: PublicationCreationAttributes): Promise<RegisterResponse> => {
  const { title, content, ...rest } = data;

  const publication = await publicationRepo.createPublication({ ...rest, title, content });

  if(!publication.id){
    throw new Error('Error al crear la publicación');
  }
  return { publication };
};

export const getAllPublications = async (): Promise<any[]> => {
  const publications = await publicationRepo.findAllPublications();
  return publications;
}

export const registerLike = async (publicationId: number, likes: number): Promise<any> => {
  const publication = await publicationRepo.registerLike(publicationId, likes);
  if (!publication) {
    throw new Error('Publicación no encontrada');
  }
  return publication;
};