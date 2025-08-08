import { useState } from 'react';
import axios from 'axios';
import { useGlobal } from '../../context/GlobalContext';

const NewStudent = () => {
  const { base_url, token } = useGlobal()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('age', formData.age);
      data.append('email', formData.email);
      data.append('password', formData.password);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      const res = await axios.post(`${base_url}/student`, data, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('✅ Student created:', res.data);
    } catch (err) {
      console.error('❌ Error:', err.response?.data || err.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center">
        <div className='bg-white rounded '>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="file" name="avatar" accept="image/*" onChange={handleChange} />

      <button type="submit">Add Student</button>
    </form>

        </div>
    </div>
  );
};

export default NewStudent;
