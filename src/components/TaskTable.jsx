import { Edit, Trash2, ArrowUpDown, Calendar, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskTable = ({ tasks, onSort, sortField, sortOrder, onDelete }) => {
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

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider cursor-pointer hover:bg-white/10 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <ArrowUpDown className="h-4 w-4" />
        {sortField === field && (
          <span className="text-yellow-300">
            {sortOrder === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );

  return (
    <div className="card bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/20">
          <thead className="bg-gradient-to-r from-purple-500/50 to-pink-500/50">
            <tr>
              <SortableHeader field="title">Title</SortableHeader>
              <SortableHeader field="description">Description</SortableHeader>
              <SortableHeader field="priority">Priority</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="dueDate">Due Date</SortableHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/5 divide-y divide-white/10">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-white/10 transition-all duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{task.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-white/80 max-w-xs truncate">{task.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-white/80">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      to={`/edit/${task.id}`}
                      className="text-blue-300 hover:text-blue-100 bg-blue-500/20 hover:bg-blue-500/30 p-2 rounded-lg transition-all duration-200 border border-blue-400/30 hover:border-blue-300/50"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/delete/${task.id}`}
                      className="text-red-300 hover:text-red-100 bg-red-500/20 hover:bg-red-500/30 p-2 rounded-lg transition-all duration-200 border border-red-400/30 hover:border-red-300/50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {tasks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white text-lg mb-2">No tasks found</div>
            <div className="text-white/70">Create your first task to get started!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskTable;