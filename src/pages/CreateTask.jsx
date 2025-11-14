import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Stars } from 'lucide-react';
import { useTaskForm } from '../hooks/useTaskForm';
import { addTask } from '../utils/taskStorage';

const CreateTask = () => {
  const navigate = useNavigate();
  const { formData, errors, handleChange, validateForm } = useTaskForm({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      addTask(formData);
      setIsSubmitting(false);
      navigate('/');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 animate-pulse"></div>
      <div className="absolute top-10 left-10 w-96 h-96 bg-green-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-4 border border-white/30">
              <Stars className="h-5 w-5 text-white animate-pulse" />
              <span className="text-white font-semibold">Create New Task</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
              Create Something Amazing
            </h1>
            <p className="text-white/80">Add a new task to your management system</p>
          </div>

          {/* Form Card */}
          <div className="card bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input-field bg-white/10 border-white/30 text-white placeholder-white/60 backdrop-blur-sm ${errors.title ? 'border-red-300 focus:ring-red-500' : 'focus:ring-white'}`}
                  placeholder="Enter task title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-200">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`input-field bg-white/10 border-white/30 text-white placeholder-white/60 backdrop-blur-sm resize-none ${errors.description ? 'border-red-300 focus:ring-red-500' : 'focus:ring-white'}`}
                  placeholder="Describe your task in detail..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-200">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Priority */}
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-white mb-2">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className={`input-field bg-white/10 border-white/30 text-white backdrop-blur-sm ${errors.priority ? 'border-red-300 focus:ring-red-500' : 'focus:ring-white'}`}
                  >
                    <option value="low" className="text-gray-800">Low</option>
                    <option value="medium" className="text-gray-800">Medium</option>
                    <option value="high" className="text-gray-800">High</option>
                  </select>
                  {errors.priority && (
                    <p className="mt-1 text-sm text-red-200">{errors.priority}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="input-field bg-white/10 border-white/30 text-white backdrop-blur-sm focus:ring-white"
                  >
                    <option value="pending" className="text-gray-800">Pending</option>
                    <option value="in-progress" className="text-gray-800">In Progress</option>
                    <option value="completed" className="text-gray-800">Completed</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-white mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="input-field bg-white/10 border-white/30 text-white backdrop-blur-sm focus:ring-white"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Link
                  to="/"
                  className="btn-secondary bg-gradient-to-r from-gray-600/80 to-gray-700/80 backdrop-blur-sm border border-white/30 text-white hover:from-gray-700 hover:to-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  <span>{isSubmitting ? 'Creating...' : 'Create Task'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;