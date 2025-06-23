import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import './profile.css';

const Profile = () => {

  const [userData,setUserData]=useState({});

  const { username } = useParams();

  const [recentTests, setRecentTests] = useState([]);
  // Generate streak calendar data for the last 12 months
  const [streakData, setStreakData] = useState({});

  useEffect(()=>{
    const fetchUserProfile=async(username)=>{

      try{
        const res=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${username}`,{
          method:"GET",
           credentials: "include",
        })
        const data=await res.json();
        console.log(data);
  
        setUserData(data.user[0]);

        setStreakData(data?.user[0]?.stats?.streakList)

        console.log(data?.user[0]?.stats?.streakList)
  
        // toast.success("data fetched successfully");
        setRecentTests(data?.user[0]?.stats?.testHistory?.slice(-5).reverse())

      }catch(error){
        console.log("error while fetching user profile")
        toast.error(error.message)
      }

    }

    fetchUserProfile(username);
  },[username])






  const [userStats, setUserStats] = useState({
    username: "SpeedTyper123",
    email: "user@example.com",
    joinDate: "2024-01-15",
    totalTests: 247,
    averageWpm: 78,
    bestWpm: 112,
    averageAccuracy: 94.5,
    bestAccuracy: 99.2,
    totalTimeTyped: 2840, // in minutes
    currentStreak: 15,
    longestStreak: 42,
    totalKeystrokes: 125640,
    level: "Expert",
    experiencePoints: 8420
  });

  // useEffect(() => {
  //   generateStreakData();
  // }, []);

  // const generateStreakData = () => {
  //   const data = {};
  //   const today = new Date();
  //   const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1);
    
  //   for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
  //     const dateStr = d.toISOString().split('T')[0];
  //     // Mock activity data - replace with actual data
  //     const activity = Math.random();
  //     if (activity > 0.3) {
  //       data[dateStr] = Math.floor(activity * 5) + 1; // 1-5 tests per day
  //     }
  //   }
  //   setStreakData(data);
  // };

  const getActivityColor = (count) => {
    if (!count) return 'var(--streak-empty)';
    if (count === 1) return 'var(--streak-light)'; 
    if (count <= 3) return 'var(--streak-high)';
    return 'var(--streak-highest)';
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressPercentage = () => {
    const nextLevelXP = Math.ceil(userStats.experiencePoints / 1000) * 1000;
    const currentLevelXP = Math.floor(userStats.experiencePoints / 1000) * 1000;
    return ((userStats.experiencePoints - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
  };
const renderStreakCalendar = () => {
  const today = new Date();
  const months = [];

  for (let i = 11; i >= 0; i--) {
    const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() - i + 1, 0);
    const monthName = monthStart.toLocaleDateString('en-US', { month: 'short' });

    const days = [];
    for (let d = new Date(monthStart); d <= monthEnd; d.setDate(d.getDate() + 1)) {
      const year = d.getFullYear();
      const month = d.getMonth() + 1; // month is 0-indexed
      const day = d.getDate();

      const formattedDate = `${month}/${day}/${year}`; // MM/DD/YYYY format
      const count = streakData[formattedDate] || 0;

      days.push(
        <div
          key={formattedDate}
          className="streak-day"
          style={{ backgroundColor: getActivityColor(count) }}
          title={`${formattedDate}: ${count} tests`}
        />
      );
    }

    months.push(
      <div key={monthName} className="streak-month">
        <div className="month-label">{monthName}</div>
        <div className="month-days">{days}</div>
      </div>
    );
  }

  return months;
};


  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {userData.username?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1 className="username">{userData?.username}</h1>
          <p className="email">The Copy Ninja</p>
          <div className="level-info">
            <span className="level-badge">{userStats.level}</span>
            <span className="xp-text">{userStats.experiencePoints} XP</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
          <p className="join-date">Member since {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{userStats.averageWpm.toFixed(1)}</div>
            <div className="stat-label">Average WPM</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">{userData?.stats?.bestWpm.toFixed(1)}</div>
            <div className="stat-label">Best WPM</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{userData?.stats?.bestAccuracy.toFixed(1)}%</div>
            <div className="stat-label">Best Accuracy</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{userData?.stats?.testHistory?.length}</div>
            <div className="stat-label">Tests Completed</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{formatTime(userStats.totalTimeTyped)}</div>
            <div className="stat-label">Time Practiced</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⌨️</div>
          <div className="stat-content">
            <div className="stat-value">{userData?.stats?.totalKeyStrokes}</div>
            <div className="stat-label">Keystrokes</div>
          </div>
        </div>
      </div>

      <div className="streak-section">
        <div className="section-header">
          <h2>Activity Streak</h2>
          <div className="streak-stats">
            <div className="streak-stat">
              <span className="streak-number">{userData?.stats?.currentStreak}</span>
              <span className="streak-text">Current Streak</span>
            </div>
            <div className="streak-stat">
              <span className="streak-number">{userData?.stats?.bestStreak}</span>
              <span className="streak-text">Longest Streak</span>
            </div>
          </div>
        </div>
        
        <div className="streak-calendar">
          {renderStreakCalendar()}
        </div>
        
        <div className="streak-legend">
          <span>Less</span>
          <div className="legend-colors">
            <div className="legend-color" style={{ backgroundColor: 'var(--streak-empty)' }} />
            <div className="legend-color" style={{ backgroundColor: 'var(--streak-light)' }} />
            <div className="legend-color" style={{ backgroundColor: 'var(--streak-medium)' }} />
            <div className="legend-color" style={{ backgroundColor: 'var(--streak-high)' }} />
            <div className="legend-color" style={{ backgroundColor: 'var(--streak-highest)' }} />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="recent-tests-section">
        <h2>Recent Tests</h2>
        <div className="tests-table">
          <div className="table-header">
            <div className="header-cell">Date</div>
            <div className="header-cell">WPM</div>
            <div className="header-cell">Accuracy</div>
            <div className="header-cell">Duration</div>
          </div>
          {recentTests.map((test, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{test.testDate}</div>
              <div className="table-cell">{test.wpm}</div>
              <div className="table-cell">{test.accuracy}%</div>
              <div className="table-cell">{test.duration}s</div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-section">
        <h2>Recent Achievements</h2>
        <div className="achievements-grid">
          <div className="achievement-card earned">
            <div className="achievement-icon">🔥</div>
            <div className="achievement-info">
              <h3>Speed Demon</h3>
              <p>Reach 100+ WPM</p>
            </div>
          </div>
          <div className="achievement-card earned">
            <div className="achievement-icon">🎯</div>
            <div className="achievement-info">
              <h3>Precision Master</h3>
              <p>99%+ Accuracy</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">⚡</div>
            <div className="achievement-info">
              <h3>Lightning Fast</h3>
              <p>Reach 120+ WPM</p>
            </div>
          </div>
          <div className="achievement-card">
            <div className="achievement-icon">🏃</div>
            <div className="achievement-info">
              <h3>Marathon Runner</h3>
              <p>30-day streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;