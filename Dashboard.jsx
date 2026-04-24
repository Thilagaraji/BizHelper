import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, CheckCircle2, TrendingUp, Calendar, Clock, Smile, BarChart2 } from 'lucide-react';
import './Dashboard.css';

// Mock data with extended stats
const mockStats = {
  openRequests: 3,
  resolvedThisMonth: 8,
  avgResponseTime: '2.5h',
  satisfactionScore: 94,
  activeClients: 3,
  totalRequests: 6,
  requestsByStatus: {
    pending: 1,
    inProgress: 2,
    resolved: 1,
    scheduled: 1
  },
  requestsByPriority: {
    critical: 1,
    high: 2,
    medium: 2,
    low: 1
  },
  // 7-day volume data
  volumeData: [
    { day: 'Mon', count: 5 },
    { day: 'Tue', count: 8 },
    { day: 'Wed', count: 6 },
    { day: 'Thu', count: 12 },
    { day: 'Fri', count: 9 },
    { day: 'Sat', count: 3 },
    { day: 'Sun', count: 4 }
  ],
  recentActivity: [
    { id: 1, clientId: 1, action: 'Created new request', timestamp: '2024-04-20T14:30:00', type: 'create' },
    { id: 2, clientId: 1, action: 'Request status updated to in-progress', timestamp: '2024-04-20T12:15:00', type: 'update' },
    { id: 3, clientId: 2, action: 'Request assigned to Alex Johnson', timestamp: '2024-04-20T10:45:00', type: 'assign' },
    { id: 4, clientId: 3, action: 'Request marked as resolved', timestamp: '2024-04-19T16:20:00', type: 'resolve' }
  ]
};

// Choreographed entrance animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const AnimatedCard = ({ icon: Icon, title, value, color, delay }) => {
  return (
    <motion.div
      className="stat-card"
      style={{ borderLeftColor: color }}
      variants={itemVariants}
      whileHover={{ translateY: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
    >
      <div className="card-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={24} />
      </div>
      <div className="card-content">
        <p className="card-label">{title}</p>
        <motion.h3 
          className="card-value"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        >
          {value}
        </motion.h3>
      </div>
    </motion.div>
  );
};

// 7-Day Volume Chart Component
const VolumeChart = () => {
  const maxVolume = Math.max(...mockStats.volumeData.map(d => d.count));

  return (
    <motion.div
      className="volume-chart"
      variants={itemVariants}
    >
      <h2>7-Day Request Volume</h2>
      <div className="chart-bars">
        {mockStats.volumeData.map((data, idx) => (
          <motion.div
            key={data.day}
            className="bar-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
          >
            <motion.div
              className="bar"
              initial={{ height: 0 }}
              animate={{ height: `${(data.count / maxVolume) * 100}%` }}
              transition={{ delay: 0.4 + idx * 0.05, duration: 0.6, type: 'spring' }}
              style={{ backgroundColor: '#667eea' }}
              whileHover={{ backgroundColor: '#764ba2' }}
            />
            <span className="bar-label">{data.day}</span>
            <span className="bar-value">{data.count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const ActivityItem = ({ activity, index }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'create': return '✨';
      case 'update': return '📝';
      case 'assign': return '👤';
      case 'resolve': return '✅';
      default: return '📌';
    }
  };

  return (
    <motion.div
      className="activity-item"
      variants={itemVariants}
      whileHover={{ x: 4 }}
    >
      <span className="activity-icon">{getActivityIcon(activity.type)}</span>
      <div className="activity-details">
        <p>{activity.action}</p>
        <time>{activity.timestamp}</time>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const [stats] = useState(mockStats);

  useEffect(() => {
    // Simulate loading delay for smooth animation
    return () => {};
  }, []);

  return (
    <div className="dashboard-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="dashboard-header">
          <h1>Client Dashboard</h1>
          <p className="subtitle">Real-time overview of all service requests</p>
        </div>

        {/* Main Stats Grid */}
        <div className="stats-grid">
          <AnimatedCard
            icon={Users}
            title="Active Clients"
            value={stats.activeClients}
            color="#FF6B6B"
            delay={0}
          />
          <AnimatedCard
            icon={BarChart3}
            title="Total Requests"
            value={stats.totalRequests}
            color="#4ECDC4"
            delay={0.1}
          />
          <AnimatedCard
            icon={TrendingUp}
            title="In Progress"
            value={stats.requestsByStatus.inProgress}
            color="#45B7D1"
            delay={0.2}
          />
          <AnimatedCard
            icon={CheckCircle2}
            title="Resolved"
            value={stats.requestsByStatus.resolved}
            color="#96CEB4"
            delay={0.3}
          />
        </div>

        {/* Status Breakdown */}
        <motion.div
          className="status-breakdown"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Request Status Breakdown</h2>
          <div className="status-cards">
            {Object.entries(stats.requestsByStatus).map(([status, count], idx) => (
              <motion.div
                key={status}
                className="status-item"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
              >
                <span className="status-label">
                  {status.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </span>
                <div className="status-bar">
                  <motion.div
                    className="status-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.totalRequests) * 100}%` }}
                    transition={{ delay: 0.6 + idx * 0.05, duration: 0.8 }}
                    style={{
                      backgroundColor: {
                        pending: '#FFB23F',
                        inProgress: '#45B7D1',
                        resolved: '#96CEB4',
                        scheduled: '#A78BFA'
                      }[status]
                    }}
                  />
                </div>
                <span className="status-count">{count}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Priority Distribution */}
        <motion.div
          className="priority-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2>Priority Distribution</h2>
          <div className="priority-grid">
            {Object.entries(stats.requestsByPriority).map(([priority, count], idx) => (
              <motion.div
                key={priority}
                className={`priority-card priority-${priority}`}
                whileHover={{ scale: 1.05, rotate: 2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + idx * 0.05 }}
              >
                <div className="priority-label">{priority.toUpperCase()}</div>
                <div className="priority-count">{count}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="recent-activity"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="activity-header">
            <Calendar size={20} />
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-list">
            {stats.recentActivity && stats.recentActivity.map((activity, idx) => (
              <ActivityItem key={activity.id} activity={activity} index={idx} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
