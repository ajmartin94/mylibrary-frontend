import React,{useState} from 'react';

function AddLibrary(props) {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleAddNewLibrary(name)
        setName('')
        props.setVisible(false)
    }

    const updateName = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    return (
        <form className='form-inline' onSubmit={(e)=>handleSubmit(e)}>
            <input 
                type='text' 
                placeholder='library name'
                className='form-control mb-2 mr-sm-2' 
                onChange={(e)=>{updateName(e)}}
                autoFocus
                onBlur={()=>props.setVisible(false)}
            />
            <button type='submit' className='btn btn-primary mb-2'>Add Library</button>
        </form>
    )
}

export default AddLibrary;