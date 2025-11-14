import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Sparkles } from 'lucide-react';
import TaskTable from '../components/TaskTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getTasks } from '../utils/taskStorage';

const ITEMS_PER_PAGE = 5;

const Home = () => {
  const [tasks] = useState(getTasks());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'dueDate' || sortField === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, searchTerm, sortField, sortOrder]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedTasks, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedTasks.length / ITEMS_PER_PAGE);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4 border border-white/30">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Task Management</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Organize Your Work
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Streamline your tasks with our beautiful and intuitive task management system
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-sm border border-white/20 text-white transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Tasks</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-200" />
              </div>
            </div>
            <div className="card bg-gradient-to-br from-green-500/90 to-emerald-500/90 backdrop-blur-sm border border-white/20 text-white transform hover:scale-105 transition-all duration-300">
              <div>
                <p className="text-green-100">Completed</p>
                <p className="text-3xl font-bold">{stats.completed}</p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-yellow-500/90 to-amber-500/90 backdrop-blur-sm border border-white/20 text-white transform hover:scale-105 transition-all duration-300">
              <div>
                <p className="text-yellow-100">In Progress</p>
                <p className="text-3xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-red-500/90 to-rose-500/90 backdrop-blur-sm border border-white/20 text-white transform hover:scale-105 transition-all duration-300">
              <div>
                <p className="text-red-100">Pending</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <Link
                to="/create"
                className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transform hover:scale-105 transition-all duration-300 border border-white/30"
              >
                <Plus className="h-4 w-4" />
                <span>Add New Task</span>
              </Link>
            </div>

            {/* Task Table */}
            <TaskTable
              tasks={paginatedTasks}
              onSort={handleSort}
              sortField={sortField}
              sortOrder={sortOrder}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <div className="card bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
                    <p className="text-white/80 mb-6">Start organizing your work by creating your first task!</p>
                    <Link
                      to="/create"
                      className="btn-primary inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 border border-white/30"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create Your First Task</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;