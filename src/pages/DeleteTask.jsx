import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, AlertTriangle, Calendar, Flag, Shield } from 'lucide-react';
import { deleteTask, getTaskById } from '../utils/taskStorage';

const DeleteTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = getTaskById(id);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    
    setTimeout(() => {
      deleteTask(id);
      setIsDeleting(false);
      navigate('/');
    }, 500);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-400/20 text-red-100 border border-red-300/30';
      case 'medium': return 'bg-yellow-400/20 text-yellow-100 border border-yellow-300/30';
      case 'low': return 'bg-green-400/20 text-green-100 border border-green-300/30';
      default: return 'bg-gray-400/20 text-gray-100 border border-gray-300/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20 text-green-100 border border-green-300/30';
      case 'in-progress': return 'bg-blue-400/20 text-blue-100 border border-blue-300/30';
      case 'pending': return 'bg-orange-400/20 text-orange-100 border border-orange-300/30';
      default: return 'bg-gray-400/20 text-gray-100 border border-gray-300/30';
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-rose-500 to-pink-600 relative overflow-hidden">
        <div className="relative z-10 py-8">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card bg-white/10 backdrop-blur-lg border border-white/20 text-white">
              <h2 className="text-2xl font-bold mb-4">Task Not Found</h2>
              <p className="mb-6">The task you're trying to delete doesn't exist.</p>
              <Link to="/" className="btn-primary bg-gradient-to-r from-red-500 to-pink-500 border border-white/30">
                Back to Tasks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-rose-500 to-pink-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-600/20 animate-pulse"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-red-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-rose-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4 border border-white/30">
              <Shield className="h-5 w-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Delete Task</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Confirm Deletion
            </h1>
            <p className="text-white/80">Permanently remove this task</p>
          </div>

          {/* Warning Card */}
          <div className="card bg-red-500/20 backdrop-blur-lg border border-red-300/30 mb-6 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-200" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-100 mb-2">
                  Are you sure you want to delete this task?
                </h3>
                <p className="text-red-200">
                  This action cannot be undone. The task will be permanently removed from the system.
                </p>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Task Details</h4>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-white">Title:</span>
                <span className="ml-2 text-white/90">{task.title}</span>
              </div>
              <div>
                <span className="font-medium text-white">Description:</span>
                <span className="ml-2 text-white/80">{task.description}</span>
              </div>
              <div>
                <span className="font-medium text-white">Priority:</span>
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  <Flag className="h-3 w-3 mr-1" />
                  {task.priority}
                </span>
              </div>
              <div>
                <span className="font-medium text-white">Status:</span>
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
              {task.dueDate && (
                <div>
                  <span className="font-medium text-white">Due Date:</span>
                  <span className="ml-2 text-white/80 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div>
                <span className="font-medium text-white">Created:</span>
                <span className="ml-2 text-white/80">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              to="/"
              className="btn-secondary bg-gradient-to-r from-gray-600/80 to-gray-700/80 backdrop-blur-sm border border-white/30 text-white hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Cancel
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              <span>{isDeleting ? 'Deleting...' : 'Delete Task'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;