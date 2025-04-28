import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import './stuClassroom.css';
import { FaBook, FaUser, FaClipboardList } from 'react-icons/fa';
import JoinedClasses from './JoinedClasses';

const StudentClassroom = () => {
  const { currentClass, setCurrentClass } = useApp();
  const [showMembers, setShowMembers] = useState(false);
  const [showPosts, setShowPosts] = useState(true);

  useEffect(() => {
    const storedClass = localStorage.getItem('curr_classroom');
    if (storedClass) {
      const parsedClass = JSON.parse(storedClass);
      setCurrentClass(parsedClass);
    }
  }, [setCurrentClass]);

  return (
    <div className="classroom-container">
      <div className="sidebar">
        <h2 className="sidebar-title">My Classes</h2>
        <JoinedClasses />
      </div>

      <div className="main-content">
        <div className="class-header">
          <FaBook className="class-icon" />
          <h2>{currentClass?.name || 'Select a Class'}</h2>
        </div>

        <div className="nav-tabs">
          <button onClick={() => {
            setShowPosts(true);
            setShowMembers(false);
          }} className={showPosts ? 'active-tab' : ''}>
            <FaClipboardList /> Posts
          </button>
          <button onClick={() => {
            setShowPosts(false);
            setShowMembers(true);
          }} className={showMembers ? 'active-tab' : ''}>
            <FaUser /> Members
          </button>
        </div>

        <div className="content-box">
          {showPosts && (
            <div className="section">
              {currentClass?.posts?.length > 0 ? (
                currentClass.posts.map((post, index) => (
                  <div className="post-card" key={post._id || index}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>By: {post.author}</p>
                    <p><strong>Posted on:</strong> {new Date(post.createdAt).toLocaleString()}</p>
                    {post.attachments?.length > 0 && (
                      <div className="attachments">
                        <h4>Documents / files:</h4>
                        <ul>
                          {post.attachments.map((file, idx) => (
                            <li key={idx}>
                              <a href={`http://localhost:5000${file.url}`} target="_blank" rel="noopener noreferrer">
                                {file.fileName} ({file.fileType})
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <hr />
                  </div>
                ))
              ) : (
                <p>No posts available for this class.</p>
              )}
            </div>
          )}

          {showMembers && (
            <div className="section">
              <h3>Class Members</h3>
              <ul className="member-list">
                {currentClass?.student?.map((student, idx) => (
                  <li key={idx}><FaUser /> {student.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentClassroom;
