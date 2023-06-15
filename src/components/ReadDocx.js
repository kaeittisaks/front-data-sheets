import React, { useState, useEffect } from 'react';

import { Button, Form, Container, Header, Table } from 'semantic-ui-react';
import axios from 'axios';

function SaveToSheets() {

  const [Sendername, setSendername] = useState('');
  const [Recipientname, setRecipientname] = useState('');
  const [details, setdetails] = useState('');

  
  const [file, setFile] = useState(null); // upload

const [data, setdata] = useState(null);

  const userData = {
    Sendername,
    Recipientname,
    details
  }

const submitHandler = (e) => {
  e.preventDefault();
console.log(Sendername);
console.log(Recipientname);
console.log(details);

axios.post('https://sheet.best/api/sheets/e7b7d694-e1e0-46cb-89ec-b748b05ff996', userData)
      .then(res =>{
        console.log(res);
        alert('🧑🏻‍💻inserted successfully ✅');
        window.location.reload();
      })
      setSendername('');
      setRecipientname('');
      setdetails('');
        }

useEffect(() =>{
  axios.get('https://sheet.best/api/sheets/e7b7d694-e1e0-46cb-89ec-b748b05ff996')
      .then(res => setdata(res))
      console.log(data);
}, []);

  if (!data) {
    return <div />
  }
console.log(data);





// upload


const handleFileChange = (event) => {
  setFile(event.target.files[0]);
};

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    if (!file) {
      console.error('กรุณาเลือกไฟล์ที่ต้องการอัปโหลด');
      alert('Please select the file you want to upload.!');
      return;
    }

    if (file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.error('กรุณาเลือกไฟล์ .docx เท่านั้น');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://back-data-sheets-6-8otp.vercel.app/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.location.href = url;
      alert('Download file ✅');
    } else {
      console.error('เกิดข้อผิดพลาดในการอัปโหลดไฟล์');
    }
  } catch (error) {
    console.error(error);
  }
};




  return (
    <Container>
      <br />
      <br />
      <div>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <h1>Upload file (.docx)</h1>
  <form onSubmit={handleSubmit}>
    <input type="file" accept=".docx" onChange={handleFileChange} style={{ color: 'blue' }}/>
    <button type="submit" style={{ backgroundColor: 'green', color: 'white', padding: '5px', borderRadius: '5px', borderBlockColor: 'white' }}>⏏︎ Download Excel</button>
  </form>
</div>
      </div>
      <hr style={{ borderTop: '1px solid #ccc', margin: '20px 0', backgroundColor: 'white', height: '1px' }} />
      <Header as="h2">
      </Header>
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>กรอกข้อมูลด้วยตัวเอง</div>
        <Form onSubmit={submitHandler} className="from">
        <Form.Field>
        <label htmlFor="Sendername"> Sender's name</label>
        <input type="text" value={Sendername} onChange={(e) => setSendername(e.target.value)} placeholder="Enter Sender'sname"></input>
        </Form.Field>
        <Form.Field>
          <label htmlFor="Recipientname"> Recipient's name</label>
          <input type="text" value={Recipientname} onChange={(e) => setRecipientname(e.target.value)} placeholder="Enter Recipient's name"></input>
          </Form.Field>
          <Form.Field>
          <label htmlFor="details"> details</label>
          <input type="text" value={details} onChange={(e) => setdetails(e.target.value)} placeholder="Enter details"></input>
          </Form.Field>

          <Button color="green" type="submit">Save</Button>
          </Form>
          </div>
          <br />
          <br />

          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>data from google sheets 📗</div>
  <div>
  <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    const password = prompt('กรุณากรอกรหัสผ่าน:');
    if (password === '1234') { // เปลี่ยน 'your_password' เป็นรหัสผ่านที่คุณต้องการ
      window.open('https://docs.google.com/spreadsheets/d/1nA2MH4in3MwpKGmWhSsFM8zENgh0UeP7HI9u3HRtPXU/edit?usp=sharing', '_blank');
    }
  }}
  style={{
    backgroundColor: 'white',
    color: 'green',
    padding: '10px',
    borderRadius: '5px',
    textDecoration: 'none',
    border: '2px solid green',
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={(e) => { e.target.style.backgroundColor = 'green'; e.target.style.color = 'white'; }}
  onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = 'green'; }}
>
  Google Sheet Link
</a>



  </div>
</div>
            
          <Table celled>
      <Table.Header>
      <Table.HeaderCell>Sender name</Table.HeaderCell>
      <Table.HeaderCell>Recipientname</Table.HeaderCell>
      <Table.HeaderCell>details</Table.HeaderCell>
      </Table.Header>

      <Table.Body>
        {data.data.map((val, idx) =>(
          <Table.Row key={idx}>
            <Table.Cell>{val.Sendername}</Table.Cell>
            <Table.Cell>{val.Recipientname}</Table.Cell>
            <Table.Cell>{val.details}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
          </Table>
          </div>
          <br />
          <br />
    </Container>
  );
}

export default SaveToSheets;
