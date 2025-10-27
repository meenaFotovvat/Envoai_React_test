import { useState, useEffect } from 'react'
import './SystemMonitorTable.css'

function SystemMonitorTable() {
  const [systemStats, setSystemStats] = useState({
    ramUsed: 0,
    ramTotal: 8,
    cpuUsage: 0,
    networkSpeedRx: 0,
    networkSpeedTx:0,
    diskUsage: 0
  })

  const [isMonitoring, setIsMonitoring] = useState(true)

  useEffect(() => {
    if (!isMonitoring) return

    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:3001/stats");
        const data = await res.json();
        
        setSystemStats({
        ramUsed: data?.ramUsage,
        ramTotal: 8,
        cpuUsage: data?.cpuUsage,
        networkSpeedRx: data?.networkSpeed?.rx,
        networkSpeedTx: data?.networkSpeed?.tx,
        diskUsage: data?.diskUsage
      })
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();

        const interval = setInterval(fetchStats, 2000); // refresh every 2s


    return () => clearInterval(interval)
  }, [isMonitoring])



  const getStatusColor = (value, thresholds) => {
    if (value < thresholds.good) return 'status-good'
    if (value < thresholds.warning) return 'status-warning'
    return 'status-critical'
  }

  const getCpuStatus = () => {
    const cpu = parseFloat(systemStats.cpuUsage)
    return getStatusColor(cpu, { good: 50, warning: 75 })
  }

  const getRamStatus = () => {
    const percentage = (systemStats.ramUsed / systemStats.ramTotal) * 100
    return getStatusColor(percentage, { good: 60, warning: 80 })
  }

  const getDiskStatus = () => {
    const disk = parseFloat(systemStats.diskUsage)
    return getStatusColor(disk, { good: 60, warning: 80 })
  }

  const getNetworkStatus = () => {
    const speed = parseFloat(systemStats.networkSpeed)
    if (speed > 50) return 'status-good'
    if (speed > 10) return 'status-warning'
    return 'status-critical'
  }

  return (
    <div className="system-monitor-container">
      <div className="monitor-header">
        <h3>System Resource Monitor</h3>
        <button 
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={isMonitoring ? 'monitoring-active' : 'monitoring-paused'}
        >
          {isMonitoring ? '⏸ Pause' : '▶ Resume'}
        </button>
      </div>
      
      <p className="subtitle">Real-time hardware resource monitoring</p>

      <div className="stats-grid">
        <div className={`stat-card ${getRamStatus()}`}>
          <div className="stat-icon">💾</div>
          <div className="stat-details">
            <h4>RAM Usage</h4>
            <div className="stat-value">
              {(((systemStats.ramUsed*systemStats.ramTotal)/100).toFixed(2))} GB / {systemStats.ramTotal} GB
            </div>
            <div className="stat-percentage">
              {systemStats.ramUsed}%
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(systemStats.ramUsed / systemStats.ramTotal) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`stat-card ${getCpuStatus()}`}>
          <div className="stat-icon">⚡</div>
          <div className="stat-details">
            <h4>CPU Usage</h4>
            <div className="stat-value">{systemStats.cpuUsage}%</div>
            <div className="stat-percentage">
              {parseFloat(systemStats?.cpuUsage) < 50 ? 'Normal' : 
               parseFloat(systemStats?.cpuUsage) < 75 ? 'Moderate' : 'High'}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${systemStats?.cpuUsage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`stat-card ${getNetworkStatus()}`}>
          <div className="stat-icon">🌐</div>
          <div className="stat-details">
            <h4>Network Speed</h4>
            <div className="stat-value">{systemStats?.networkSpeedRx} MB</div>
            <div className="stat-percentage">
              {parseFloat(systemStats?.networkSpeedRx) > 50 ? 'Fast' : 
               parseFloat(systemStats?.networkSpeedRx) > 10 ? 'Moderate' : 'Slow'}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(parseFloat(systemStats?.networkSpeedRx), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className={`stat-card ${getDiskStatus()}`}>
          <div className="stat-icon">💿</div>
          <div className="stat-details">
            <h4>Disk Usage</h4>
            <div className="stat-value">{systemStats?.diskUsage}%</div>
            <div className="stat-percentage">
              {parseFloat(systemStats?.diskUsage) < 60 ? 'Healthy' : 
               parseFloat(systemStats?.diskUsage) < 80 ? 'Moderate' : 'High'}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${systemStats?.diskUsage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="monitor-info">
        <p>
          <strong>Note:</strong> This is a real-time system monitor. 
          Implemented by nodeJs.
          {isMonitoring && ' Updates every 2 seconds.'}
        </p>
      </div>
    </div>
  )
}

export default SystemMonitorTable

