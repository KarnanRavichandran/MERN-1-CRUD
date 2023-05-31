import './App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import FormTbale from './components/FormTbale';


axios.defaults.baseURL = "http://localhost:8080"

function App() {

  // define an set all your data's create an insert 
  const [addSectoin, setaddSection] = useState(false)
  const [editSection, seteditSection] = useState(true)
  const [formData, setFormdata] = useState({
    name: '',
    email: '',
    mobile: ''
  })

  // find api using usestate
  const [dataList, setDataList] = useState([])


  // edit useState calling
  const [edit,setEdit] = useState({
    name: '',
    email: '',
    mobile: '',
    _id:''
  })

  // 
  const handelOnChange = (e) => {
    const { value, name } = e.target
    setFormdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handelSubmit = async (e) => {
    e.preventDefault(e.target)
    const data = await axios.post("/create", formData)
    if (data.data.success) {
      alert(data.data.success)
    }

  }


  // find method u can call useEffect function
  const getFetchData = async () => {
    const data = await axios.get("/")
    if (data.data.success) {
      setDataList(data.data.data)

    }

  }

  // delete method
  const handeleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    if(data.data.success){
    getFetchData()
    alert(data.data.message)
    }
  }


  // update method calling
  const handelUpdate = async (e) => {
  e.preventDefault();
  const data = await axios.put("/update",edit)
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
    }
  }

  const handleEditOnChange = async (e)=>{
    const { value, name } = e.target
    setEdit((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

const handleEdit = (item)=>{
  setEdit(item)
}


  useEffect(() => {
    getFetchData();
  }, []);

  console.log(dataList)


  return (
    <>

      <div className='container'>
        {
          addSectoin && (
        
        <FormTbale
          handelSubmit={handelSubmit}
          handelOnChange={handelOnChange}
          rest={formData}
        />
          )
        }

        {
          editSection &&(
            <FormTbale
            handelSubmit={handelUpdate}
            handelOnChange={handleEditOnChange}
            rest={edit}
          />
          )
        }


        <div style={{ marginTop: '30px' }}>
          <Table striped bordered hover>

            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email </th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {dataList[0] ? (
                dataList.map((item, index) => {
                  return (
                    <tr key={item.index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td><Button variant="warning" type='submit' onClick={()=>handleEdit(item)}  style={{}}>Edit</Button>
                        <Button variant="danger" type='submit' onClick={() => handeleDelete(item._id)} style={{ marginLeft: '17px' }}>Delete</Button></td>
                    </tr>
                  )
                }))

                : (
                  <p style={{ textAlign: 'center' }}>No data</p>
                )
              }
            </tbody>


          </Table>
        </div>
      </div>

    </>
  );
}

export default App;
