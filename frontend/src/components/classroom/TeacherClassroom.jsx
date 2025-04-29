import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import './classroom.css';
import { FaBook, FaUser, FaClipboardList, FaPodcast, FaTasks, FaSeedling } from 'react-icons/fa';
import JoinedClasses from './JoinedClasses';
import CreateTest from './CreateTest';
import Submissions from './Submissions';

const TeacherClassroom = () => {
  const { currentClass, setCurrentClass } = useApp();
  const [showMembers, setShowMembers] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [doPost, setDoPost] = useState(false);
  const [createAss , setCreaateAss] = useState(false); 
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const storedClass = localStorage.getItem('curr_classroom');
    if (storedClass) {
      const parsedClass = JSON.parse(storedClass);
      setCurrentClass(parsedClass);
    }
  }, [setCurrentClass]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !file) return alert("All fields are required");

    const formData = new FormData();
    formData.append("classroomId", currentClass._id);
    formData.append("authorId", currentClass.teacher._id);  // or use current user context
    formData.append("title", title);
    formData.append("content", content);
    formData.append("files", file); // Important: the field name must match your multer config

    try {
      const response = await fetch("http://localhost:5000/api/classroom/create-post", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Post created successfully!");
        setTitle('');
        setContent('');
        setFile(null);
        window.location.reload(); // or better: refetch classroom data
      } else {
        alert("Failed to create post.");
      }
    } catch (error) {
      console.error("Error posting:", error);
      alert("Server error.");
    }
    setDoPost(false);
  };

  return (
    <>
      <div className="classroom-container">
        <div className="sidebar">
          <h2 className="sidebar-title">My Classes</h2>
          <JoinedClasses />
        </div>

        <div className="main-content">
          <div className="class-header">
            <FaBook className="class-icon" />
            <h2>{currentClass?.name || "Select a Class"}</h2>
          </div>

          <div className="nav-tabs">
            <button onClick={() => {
              setShowPosts(true);
              setShowMembers(false);
              setDoPost(false);
              setCreaateAss(false);
              setShowResult(false);
            }} className={showPosts ? 'active-tab' : ''}>
              <FaClipboardList /> Posts
            </button>
            <button onClick={() => {
              setShowPosts(false);
              setShowMembers(true);
              setDoPost(false);
              setCreaateAss(false);
              setShowResult(false)
            }} className={showMembers ? 'active-tab' : ''}>
              <FaUser /> Members
            </button>
            <button onClick={() => {
              setShowPosts(true);
              setShowMembers(false);
              setCreaateAss(false)
              setShowResult(false)
              setDoPost(prev => !prev);
            }} className={showPosts ? 'active-tab' : ''}>
              <FaPodcast /> Add Post
            </button>
            <button onClick={() => {
              setShowPosts(false);
              setShowMembers(false);
              setDoPost(false);
              setShowResult(false)
              setCreaateAss(prev => !prev);
            }} className={showPosts ? 'active-tab' : ''}>
              <FaTasks /> Add Assignments
            </button>
            <button onClick={() => {
               setShowPosts(false);
               setShowMembers(false);
               setDoPost(false);
               setCreaateAss(false);
               setShowResult(true)
            }} className={showPosts ? 'active-tab' : ''}>
              <FaSeedling /> Submitted
            </button>
          </div>

          <div className="content-box">
            {showPosts && (
              <div className="section">
                <div className='boxxx'>
                  {doPost ? (
                    <form onSubmit={handlePostSubmit} className="post-form">
                      <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        required
                      />
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="*"
                        required
                      />
                      <button type="submit">Post</button>
                    </form>
                  ) : (
                    currentClass?.posts?.length > 0 ? (
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
                                  <li style={{ "listStyle": "none" }} key={idx}>
                                    <a style={{ "textDecoration": "none", "color": "white" }} href={`http://localhost:5000${file.url}`} target="_blank" rel="noopener noreferrer">
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
                    )
                  )}
                </div>
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
            {
              createAss && <CreateTest/>
            }
            {
              showResult && <Submissions />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherClassroom;
