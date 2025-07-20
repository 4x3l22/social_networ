import { PublicationInstance, PublicationCreationAttributes } from '../models/publication';
import { ModelStatic } from 'sequelize';
import { AuthorDTO, PublicationDTO } from '../interface/publication.dto';
import axios from 'axios';

export const getAuthorsByIds = async (ids: number[]): Promise<AuthorDTO[]> => {
  const response = await axios.get('http://user-service:8083/api/user/ids', {
    params: { ids: ids.join(',') },
  });

  return response.data;
};

export class PublicationRepository {
  private publicationModel: ModelStatic<PublicationInstance>;

  constructor(publicationModel: ModelStatic<PublicationInstance>) {
    this.publicationModel = publicationModel;
  }

  public async createPublication(publicationData: PublicationCreationAttributes): Promise<PublicationInstance> {
    return this.publicationModel.create(publicationData);
  }

  public async findAllPublications(): Promise<PublicationDTO[]> {
    const publications = await this.publicationModel.findAll();

    const authorIds = Array.from(new Set(publications.map(pub => pub.authorId)));

    const authors: AuthorDTO[] = await getAuthorsByIds(authorIds);

    const authorMap: Record<number, AuthorDTO> = {};
    authors.forEach(author => {
      (authorMap as any)[(author as any).id] = author;
    });

    const result: PublicationDTO[] = publications.map(pub => ({
      id: pub.id,
      title: pub.title,
      content: pub.content,
      likes: pub.likes,
      createdAt: pub.createdAt,
      author: authorMap[pub.authorId] || {
        alias: authors.length > 0 ? authors[0].alias : 'Desconocido',
        name: authors.length > 0 ? authors[0].name : 'Desconocido',
        lastName: authors.length > 0 ? authors[0].lastName : 'Desconocido'
      },
    }));

    return result;
  }

  public async registerLike(publicationId: number, likes: number): Promise<PublicationInstance | null> {
    const publication = await this.publicationModel.findByPk(publicationId);
    if (publication) {
      publication.likes = likes;
      return publication.save();
    }
    return null;
  }

  public async getAllPublications(): Promise<PublicationInstance[]> {
    return this.publicationModel.findAll();
  }
}


