import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/bookService';
import { Book } from '../../types';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { useAI } from '../../hooks/useAI';
import { AISuggestionsModal } from '../../components/ai/AISuggestionsModal';
import { AISummaryCard } from '../../components/ai/AISummaryCard';

export const CatalogPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const { getSummary, getTopicSuggestions, loading: aiLoading } = useAI();
  const [bookSummary, setBookSummary] = useState<any>(null);

  const fetchBooks = async (query?: string) => {
    try {
      const data = await bookService.getBooks(query);
      setBooks(data);
    } catch {
      // Mock data inicial si la API aún no está activa
      setBooks([
        {
          id: '1',
          titulo: 'Patrones de Diseño: Elementos de Software Orientado a Objetos',
          autor: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
          editorial: 'Addison-Wesley',
          categoria: 'Ingeniería de Software',
          total_ejemplares: 5,
          disponibles: 3,
        },
        {
          id: '2',
          titulo: 'Clean Code: A Handbook of Agile Software Craftsmanship',
          autor: 'Robert C. Martin',
          editorial: 'Prentice Hall',
          categoria: 'Programación',
          total_ejemplares: 4,
          disponibles: 2,
        }
      ]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks(searchTerm);
  };

  const handleAISuggestions = async () => {
    if (!searchTerm.trim()) return;
    const res = await getTopicSuggestions(searchTerm);
    if (res) {
      setAiSuggestions(res);
      setModalOpen(true);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setBookSummary(null);
  };

  const handleGenerateSummary = async () => {
    if (!selectedBook) return;
    const summary = await getSummary(selectedBook.titulo, selectedBook.autor, selectedBook.sinopsis);
    if (summary) {
      setBookSummary(summary);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Catálogo Bibliotecario</h2>
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Buscar por título, autor, ISBN o tema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn-search"><Search size={16} /> Buscar</button>
          <button
            type="button"
            className="btn-ai-search"
            onClick={handleAISuggestions}
            disabled={!searchTerm.trim() || aiLoading}
          >
            <Sparkles size={16} /> {aiLoading ? 'Pensando...' : 'Sugerencias IA'}
          </button>
        </form>
      </div>

      <div className="catalog-grid-layout">
        <div className="books-list">
          {books.map((b) => (
            <div
              key={b.id}
              className={`book-card ${selectedBook?.id === b.id ? 'active' : ''}`}
              onClick={() => handleSelectBook(b)}
            >
              <div className="book-card-icon"><BookOpen size={24} /></div>
              <div className="book-card-info">
                <h4>{b.titulo}</h4>
                <p className="author">{b.autor}</p>
                <div className="badges">
                  <span className="badge-cat">{b.categoria || 'General'}</span>
                  <span className={`badge-disp ${b.disponibles > 0 ? 'available' : 'unavailable'}`}>
                    {b.disponibles} disponibles de {b.total_ejemplares}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedBook && (
          <div className="book-detail-panel">
            <h3>{selectedBook.titulo}</h3>
            <p><strong>Autor:</strong> {selectedBook.autor}</p>
            <p><strong>Editorial:</strong> {selectedBook.editorial || 'N/A'}</p>
            <p><strong>Disponibles:</strong> {selectedBook.disponibles} de {selectedBook.total_ejemplares}</p>

            <AISummaryCard
              summary={bookSummary}
              loading={aiLoading}
              onGenerate={handleGenerateSummary}
            />
          </div>
        )}
      </div>

      <AISuggestionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        suggestions={aiSuggestions}
        onSelectTopic={(topic) => {
          setSearchTerm(topic);
          fetchBooks(topic);
        }}
      />
    </div>
  );
};
