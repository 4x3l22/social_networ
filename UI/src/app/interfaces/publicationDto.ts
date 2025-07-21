interface Author {
  id: number;
  alias: string;
  name: string;
  lastName: string;
}

interface Publication {
  id: number;
  title: string;
  content: string;
  likes?: number;
  createdAt: string;
  author: Author;
}