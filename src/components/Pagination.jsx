import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all duration-200 border border-white/30 backdrop-blur-sm"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border border-white/30 ${
            currentPage === page
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white disabled:from-gray-600/50 disabled:to-gray-700/50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all duration-200 border border-white/30 backdrop-blur-sm"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;