export interface Post {
  _id: string;
  titulo: string;
  descricao: string;
  autor: string;
  postAtivo: boolean;
  comentarios: unknown[]; // ou o tipo correto se existir
  dataCriacao: string;
  dataAtualizacao: string;
}
