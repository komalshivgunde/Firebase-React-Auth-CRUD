import React, { useEffect, useState } from 'react'
import './FirebaseFirestore.css'
import { firestore } from './FirebaseConfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { signOut } from "firebase/auth";
import { auth } from './FirebaseConfig';
import { useNavigate } from "react-router-dom";

function FirebaseFirestore(){
    const history = useNavigate()

    const handleClick = () =>{
        signOut(auth).then(val=>{
            console.log(val,"val")
            history('/')
        })
    }
    const [fname,setFname] =useState('')
    const [lname,setLname] =useState('')
    const [id,setId] =useState('')

    const [show,setShow] =useState(false)
    


    const [val,setVal] =useState([])


    
    const value = collection(firestore,"demo")


    useEffect(()=>{
        const getData= async()=>{
          const dbVal = await getDocs(value)
          setVal(dbVal.docs.map(doc=>({...doc.data(),id:doc.id})))
        }
        getData()
    })

    const handleCreate =async()=>{
        await addDoc(value,{name1:fname,name2:lname})
        setFname("")
        setLname("")
    }

    const handleDelete =async(id)=>{
       const deleteVal =  doc(firestore,"demo",id)
       await deleteDoc(deleteVal)
    }

    const handleEdit =async(id,name1,name2)=>{
        setFname(name1)
        setLname(name2)
        setId(id)
        setShow(true)
    }

    const handleUpdate =async()=>{
        const updateData = doc(firestore,"demo",id)
        await updateDoc(updateData,{name1:fname,name2:lname})
        setShow(false)
        setFname("")
        setLname("")
    }

    return(
        <>
        
        <div className='container1'>
        <div>
            <button onClick={handleClick}>SignOut</button>
        </div><br/><br/>
           <input value={fname} onChange={(e) => setFname(e.target.value)} /><br/>
           <input value={lname} onChange={(e) => setLname(e.target.value)} /><br/><br></br>
           {!show?<button onClick={handleCreate}>Create</button>:
           <button onClick={handleUpdate}>Update</button>}
            <input type="date" onChange={(event) => this.setState({startDate: event.target.value})}/>
           {
            val.map(values=>
            <div>
                <h4>{values.name1}</h4>
                <p>{values.name2}</p>
                <button onClick={()=>handleDelete(values.id)}>Delete</button>
                <button onClick={()=>handleEdit(values.id,values.name1,values.name2)}>Edit</button>
            </div>)
           }
        </div>
        </>
    )
}
export default FirebaseFirestore;