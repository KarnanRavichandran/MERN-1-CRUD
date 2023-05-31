import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FormTbale = ({ handelSubmit,handelOnChange,rest,handelUpdate,handleEditOnChange }) => {
    return (
        <div>
            <form onSubmit={handelSubmit} >
                <div className='test' >
                    <Button variant="primary" style={{ marginLeft: '307px' }}>Add</Button>
                    <Form.Control style={{ marginLeft: '118px', width: '37%', marginTop: '30px' }}
                        type="text"
                        placeholder="Enter your Name"
                        name="name"
                        onChange={handelOnChange}
                        value={rest.name}

                    />
                    <br />
                    <Form.Control style={{ marginLeft: '118px', width: '37%' }}
                        type="text"
                        placeholder="Enter your Email"
                        name="email"
                        value={rest.email}
                        onChange={handelOnChange}

                    />
                    <br />

                    <Form.Control style={{ marginLeft: '118px', width: '37%' }}
                        type="number"
                        placeholder="Enter your Number"
                        name="mobile"
                        value={rest.mobile}
                        onChange={handelOnChange}
                    />
                    <br />

                    <Button variant="primary" type='submit' style={{ marginLeft: '117px' }}>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default FormTbale