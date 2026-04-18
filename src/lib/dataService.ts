import baseLibros from "@/data/libros.json";

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  descripcion: string;
  imagen_url: string;
  precio: number;
}

export const getLibros = (): Libro[] => {
  const books: Libro[] = [...baseLibros];
  
  // Generate mock data to fulfill the 300+ titles requirement
  if (books.length < 300) {
    const categories = ["Aventura", "Misterio", "Romance", "Ciencia Ficción", "Filosofía", "Historia"];
    const authors = ["Autor Anónimo", "M. K. Anderson", "Elena Rivers", "John Doe", "Jane Smith"];
    
    for (let i = books.length + 1; i <= 305; i++) {
      const category = categories[i % categories.length];
      const author = authors[i % authors.length];
      books.push({
        id: i,
        titulo: `${category}: Crónicas de ${i}`,
        autor: author,
        editorial: "Editorial Demo S.A.",
        descripcion: `Esta es una descripción generada para el libro "${category}: Crónicas de ${i}". Un relato fascinante que explora los límites de la imaginación y el conocimiento humano en un contexto de ${category.toLowerCase()}.`,
        imagen_url: `https://images.unsplash.com/photo-1532012197367-bb83f5ff2d54?q=80&w=800&auto=format&fit=crop`,
        precio: Math.floor(Math.random() * (6000 - 1500) + 1500)
      });
    }
  }
  
  return books;
};
