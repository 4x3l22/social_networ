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

  const authorIds: number[] = Array.from(new Set(
    publications.map(pub => Number(pub.authorId))
  ));

  console.log('IDs de autores:', authorIds);

  const authors: AuthorDTO[] = await getAuthorsByIds(authorIds);

  console.log('Autores encontrados:', authors);

  const authorMap: Record<number, AuthorDTO> = {};
  authors.forEach(author => {
    authorMap[author.id] = author;
  });

  console.log('Mapa de autores:', authorMap);

  const result: PublicationDTO[] = publications.map(pub => {
    const author = authorMap[Number(pub.authorId)];

    return {
      id: pub.id,
      title: pub.title,
      content: pub.content,
      likes: pub.likes,
      createdAt: pub.createdAt,
      author: author
        ? {
            id: author.id,
            alias: author.alias,
            name: author.name,
            lastName: author.lastName
          }
        : {
            id: 0,
            alias: 'Desconocido',
            name: 'Desconocido',
            lastName: 'Desconocido'
          }
    };
  });

  return result;
}


  public async registerLike(publicationId: number, likes: number): Promise<PublicationInstance | null> {
    const id = Number(publicationId); // 👈 Conversión segura
    console.log(`Intentando actualizar publicación con ID: ${id} y likes: ${likes}`);

    const [affectedRows] = await this.publicationModel.update(
      { likes },
      { where: { id } }
    );

    console.log('Filas afectadas:', affectedRows);

    if (affectedRows > 0) {
      const updated = await this.publicationModel.findByPk(id);
      console.log('Likes actualizados a:', updated?.likes);
      return updated;
    } else {
      console.warn(`No se encontró la publicación con ID ${id} para actualizar`);
      return null;
    }
  }


  public async getAllPublications(): Promise<PublicationInstance[]> {
    return this.publicationModel.findAll();
  }
}


