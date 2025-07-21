import e, { Request, Response } from 'express';
import * as publicationService from '../service/publication.service';
import axios from 'axios';

export const createPublication = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Validar token con el user-service
    const verifyResponse = await axios.post(
      'http://user-service:8083/api/user/verify-token',
      {}, // Body vacío
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = verifyResponse.data.decoded; 
    const publicationData = {
      ...req.body,
      authorId: user.id,
    };

    const publication = await publicationService.register(publicationData);

    res.status(201).json(publication);
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    res.status(500).json({ message: 'Error creating publication', error: error.message });
  }
};


export const getPublications = async (req: Request, res: Response) => {
  try {
    const publications = await publicationService.getAllPublications();
    res.status(200).json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publications', error });
  }
}

export const likePublication = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Validar token con user-service
    const verifyResponse = await axios.post(
      'http://user-service:8083/api/user/verify-token',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = verifyResponse.data.user;

    const { publicationId, likes } = req.body;
    console.log('cuerpo de la solicitud:', req.body);

    const updatedPublication = await publicationService.registerLike(publicationId, likes);

    res.status(200).json(updatedPublication);
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    res.status(500).json({ message: 'Error al registrar el like', error: error.message });
  }
};
