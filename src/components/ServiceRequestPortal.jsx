import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, Clock, Flag, User, MessageSquare, X, Send, CheckCircle } from 'lucide-react';
import './ServiceRequestPortal.css';

// Mock data
const mockClients = [
  { id: 1, name: 'Acme Corp', email: 'john@acme.com' },
  { id: 2, name: 'TechStart Inc', email: 'sarah@techstart.com' },
  { id: 3, name: 'Global Solutions', email: 'mike@globalsol.com' }
];

const mockRequests = [
  {
    id: 101,
    clientId: 1,
    title: 'Website optimization needed',
    description: 'Our website is loading slowly. Need performance audit.',
    status: 'in-progress',
    priority: 'high',
    createdDate: '2024-04-15',
    updatedDate: '2024-04-20',
    category: 'technical',
    assignedTo: 'Alex Johnson',
    estimatedCompletion: '2024-04-28'
  },
  {
    id: 102,
    clientId: 1,
    title: 'Update billing information',
    description: 'Need to add a new payment method to account.',
    status: 'resolved',
    priority: 'medium',
    createdDate: '2024-04-10',
    updatedDate: '2024-04-18',
    category: 'billing',
    assignedTo: 'Emma Davis',
    estimatedCompletion: '2024-04-18'
  },
  {
    id: 103,
    clientId: 2,
    title: 'Integration with Salesforce',
    description: 'Setup Salesforce CRM integration for better data sync.',
    status: 'pending',
    priority: 'high',
    createdDate: '2024-04-18',
    updatedDate: '2024-04-20',
    category: 'integration',
    assignedTo: 'Alex Johnson',
    estimatedCompletion: '2024-05-02'
  },
  {
    id: 104,
    clientId: 2,
    title: 'User training session',
    description: 'Conduct online training for new team members.',
    status: 'scheduled',
    priority: 'medium',
    createdDate: '2024-04-12',
    updatedDate: '2024-04-19',
    category: 'training',
    assignedTo: 'Sarah Chen',
    estimatedCompletion: '2024-04-25'
  },
  {
    id: 105,
    clientId: 3,
    title: 'API documentation',
    description: 'Create comprehensive API documentation.',
    status: 'in-progress',
    priority: 'medium',
    createdDate: '2024-04-16',
    updatedDate: '2024-04-20',
    category: 'documentation',
    assignedTo: 'Marcus Lee',
    estimatedCompletion: '2024-04-30'
  },
  {
    id: 106,
    clientId: 3,
    title: 'Database migration',
    description: 'Migrate from PostgreSQL to MongoDB.',
    status: 'in-progress',
    priority: 'critical',
    createdDate: '2024-04-14',
    updatedDate: '2024-04-20',
    category: 'infrastructure',
    assignedTo: 'David Kim',
    estimatedCompletion: '2024-04-26'
  }
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: '#FFB23F', label: 'Pending', icon: Clock },
    'in-progress': { color: '#45B7D1', label: 'In Progress', icon: MessageSquare },
    resolved: { color: '#96CEB4', label: 'Resolved', icon: CheckCircle },
    scheduled: { color: '#A78BFA', label: 'Scheduled', icon: Clock }
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <motion.span
      className="status-badge"
      style={{ backgroundColor: `${config.color}20`, color: config.color, borderColor: config.color }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon size={14} />
      {config.label}
    </motion.span>
  );
};

const PriorityBadge = ({ priority }) => {
  const priorityConfig = {
    critical: { color: '#ff6b6b', label: '🔴 Critical' },
    high: { color: '#ffa500', label: '🟠 High' },
    medium: { color: '#45b7d1', label: '🔵 Medium' },
    low: { color: '#96ceb4', label: '🟢 Low' }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <motion.span
      className="priority-badge"
      style={{ backgroundColor: `${config.color}20`, color: config.color }}
      whileHover={{ scale: 1.05 }}
    >
      {config.label}
    </motion.span>
  );
};

const RequestCard = ({ request, onClick, delay }) => {
  return (
    <motion.div
      className="request-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      onClick={onClick}
    >
      <div className="request-header">
        <h3 className="request-title">{request.title}</h3>
        <StatusBadge status={request.status} />
      </div>
      <p className="request-description">{request.description}</p>
      <div className="request-meta">
        <div className="meta-item">
          <Flag size={16} />
          <PriorityBadge priority={request.priority} />
        </div>
        <div className="meta-item">
          <User size={16} />
          <span>{request.assignedTo}</span>
        </div>
        <div className="meta-item">
          <Clock size={16} />
          <span>{new Date(request.createdDate).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
};

const CreateRequestModal = ({ isOpen, onClose, onSubmit, clients }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    title: '',
    description: '',
    priority: 'medium',
    category: 'technical'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ clientId: '', title: '', description: '', priority: 'medium', category: 'technical' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="modal-header">
              <h2>Create Service Request</h2>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="request-form">
              <div className="form-group">
                <label>Client</label>
                <select
                  required
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  required
                  placeholder="Request title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  required
                  placeholder="Describe the service request"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="integration">Integration</option>
                    <option value="training">Training</option>
                    <option value="documentation">Documentation</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <Send size={18} />
                  Create Request
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const RequestDetailModal = ({ request, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && request && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content modal-large"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="modal-header">
              <h2>{request.title}</h2>
              <button className="close-btn" onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            <div className="request-detail">
              <div className="detail-badges">
                <StatusBadge status={request.status} />
                <PriorityBadge priority={request.priority} />
              </div>

              <div className="detail-section">
                <h3>Description</h3>
                <p>{request.description}</p>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <label>ID</label>
                  <p>#{request.id}</p>
                </div>
                <div className="detail-item">
                  <label>Category</label>
                  <p>{request.category}</p>
                </div>
                <div className="detail-item">
                  <label>Assigned To</label>
                  <p>{request.assignedTo}</p>
                </div>
                <div className="detail-item">
                  <label>Created</label>
                  <p>{new Date(request.createdDate).toLocaleDateString()}</p>
                </div>
                <div className="detail-item">
                  <label>Updated</label>
                  <p>{new Date(request.updatedDate).toLocaleDateString()}</p>
                </div>
                <div className="detail-item">
                  <label>Estimated Completion</label>
                  <p>{request.estimatedCompletion}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function ServiceRequestPortal() {
  const [requests, setRequests] = useState(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateRequest = (formData) => {
    const newId = Math.max(...requests.map(r => r.id)) + 1;
    const newRequest = {
      id: newId,
      clientId: parseInt(formData.clientId),
      ...formData,
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned',
      estimatedCompletion: '2024-05-15'
    };
    setRequests([newRequest, ...requests]);
    setIsCreateOpen(false);
    setSuccessMessage('Request created successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="portal-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="portal-header">
          <div>
            <h1>Service Requests</h1>
            <p className="subtitle">Manage and track all client service requests</p>
          </div>
          <motion.button
            className="btn-create"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus size={20} />
            New Request
          </motion.button>
        </div>

        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <CheckCircle size={20} />
            {successMessage}
          </motion.div>
        )}

        <div className="filters-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <Filter size={18} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="scheduled">Scheduled</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="filter-group">
              <Flag size={18} />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="results-info">
          <p>{filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found</p>
        </div>

        <div className="requests-list">
          <AnimatePresence>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, idx) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  delay={idx * 0.05}
                  onClick={() => {
                    setSelectedRequest(request);
                    setIsDetailOpen(true);
                  }}
                />
              ))
            ) : (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MessageSquare size={48} />
                <h3>No requests found</h3>
                <p>Try adjusting your filters or create a new request</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <CreateRequestModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateRequest}
        clients={mockClients}
      />

      <RequestDetailModal
        request={selectedRequest}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
