import React, { useState } from 'react';
import './NoticeCreation.css'; // Importing CSS file
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const NoticeCreation = () => {
    const [notice, setNotice] = useState({
        title: '',
        description: '',
        author: '',
        targetAudience: '',
        attachments: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachments') {
            setNotice({ ...notice, attachments: files });
        } else {
            setNotice({ ...notice, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(notice);

        try {
            const storeduser = localStorage.getItem("user");
            console.log(storeduser)
            const userrole = storeduser ? JSON.parse(storeduser).role : undefined;
            console.log(userrole)
            if (userrole == 'admin' || userrole == 'teacher') {
                const res = await axios.post("http://localhost:5000/api/notices/createnotice", { notices: notice }, { withCredentials: true });
                console.log(res.data);
                if (res.data.success) {
                    toast.success("Notice created successfully");
                    //email creation
                    EmailFetches();
                }
            }
            else {
                toast.error("You are Restricted to create Notices")
            }

        }
        catch (error) {
            console.log(error.message);
            toast.error("Notice already created")
        }
    };

    const EmailFetches = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/notices/fetchstudents");
            console.log(res.data);
            let emails = [];

            if (res.data.success) {
                res.data.user.map((user) => {
                    console.log(user.email);
                    emails.push(user.email);
                });
            }
            console.log(emails);

            if (emails.length > 0) { 
                const subjects = `New Notice is Created related to ${notice.title} , Go and Checkout Soon..` ;
                try {
                    const emailresponse = await axios.post("http://localhost:5000/api/notices/createemail", { emails   , subjects});
                    console.log(emailresponse.data);
                    if(emailresponse.data.id){
                        toast.success("emails send successfully");
                    }
                }
                catch (error) {
                    console.log(error.response?.data || error.message); 
                }
            } else {
                console.log("No students found to send emails.");
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className="notice-main-container">
            <div className="notice-form-container">
                <h2>Create Notice</h2>
                <form className="notice-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={notice.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={notice.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />

                    <input
                        type="text"
                        name="author"
                        placeholder="Author Name"
                        value={notice.author}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="targetAudience"
                        placeholder="Target Audience (e.g. All, CSE, 2nd Year)"
                        value={notice.targetAudience}
                        onChange={handleChange}
                    />

                    <input
                        type="file"
                        name="attachments"
                        onChange={handleChange}
                        multiple
                    />

                    <button type="submit">Create Notice</button>
                </form>
            </div>

            <div className="notice-image-container">
                <img src="/src/assets/6502423.jpg" alt="Notice Illustration" />
            </div>

            <ToastContainer />
        </div>
    );
};

export default NoticeCreation;