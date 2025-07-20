// src/dto/publication.dto.ts
export interface AuthorDTO {
  alias: string;
  name?: string;
  lastName?: string;
}

export interface PublicationDTO {
  id: number;
  title?: string;
  content?: string;
  likes?: number;
  createdAt?: Date;
  author?: AuthorDTO;
}
